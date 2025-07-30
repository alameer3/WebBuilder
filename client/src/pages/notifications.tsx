import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Check, Trash2, Star, Film, Tv, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Notification } from "@shared/schema";

export default function Notifications() {
  const queryClient = useQueryClient();
  
  const { data: notifications, isLoading } = useQuery<Notification[]>({
    queryKey: ["/api/notifications", "user-1"], // This would come from auth context
    queryFn: async () => {
      const response = await fetch("/api/users/user-1/notifications");
      if (!response.ok) throw new Error("Failed to fetch notifications");
      return response.json();
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to mark as read");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_movie':
        return <Film className="h-5 w-5 text-blue-500" />;
      case 'new_series':
        return <Tv className="h-5 w-5 text-green-500" />;
      case 'favorite_update':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-orange-500" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'new_movie':
        return 'فيلم جديد';
      case 'new_series':
        return 'مسلسل جديد';
      case 'favorite_update':
        return 'تحديث المفضلة';
      case 'system':
        return 'إشعار النظام';
      case 'message':
        return 'رسالة';
      default:
        return 'إشعار';
    }
  };

  // Mock notifications data if none exist
  const mockNotifications: Notification[] = [
    {
      id: "1",
      userId: "user-1",
      type: "new_movie",
      title: "فيلم جديد متاح",
      message: "تم إضافة فيلم 'الكلاب' الجديد إلى مكتبتنا. شاهده الآن!",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "2",
      userId: "user-1",
      type: "favorite_update",
      title: "تحديث في المفضلة",
      message: "تم إضافة ترجمة عربية لفيلم '28 سنة لاحقاً' من مفضلتك",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "3",
      userId: "user-1",
      type: "system",
      title: "مرحباً بك في يمن فليكس",
      message: "نتمنى لك تجربة مشاهدة رائعة. لا تنس استكشاف مكتبتنا الواسعة من الأفلام والمسلسلات",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ];

  const displayNotifications = notifications && notifications.length > 0 ? notifications : mockNotifications;
  const unreadCount = displayNotifications?.filter(n => !n.isRead).length || 0;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">الإشعارات</h1>
          <p className="text-gray-400">جاري تحميل الإشعارات...</p>
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-800 h-20 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-white">الإشعارات</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount} جديد
            </Badge>
          )}
        </div>
        <p className="text-gray-400">
          ابق على اطلاع بأحدث الأفلام والمسلسلات والتحديثات
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <Button 
          variant="outline" 
          className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          onClick={() => {
            displayNotifications?.forEach(notification => {
              if (!notification.isRead) {
                markAsReadMutation.mutate(notification.id);
              }
            });
          }}
          disabled={unreadCount === 0}
        >
          <Check className="h-4 w-4 mr-2" />
          تحديد الكل كمقروء
        </Button>
        
        <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
          <Trash2 className="h-4 w-4 mr-2" />
          حذف المقروء
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {displayNotifications?.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all ${
              notification.isRead 
                ? 'bg-gray-800 border-gray-700 opacity-75' 
                : 'bg-gray-800 border-orange-500/30 shadow-lg shadow-orange-500/10'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white truncate">
                      {notification.title}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-gray-700 text-gray-300"
                    >
                      {getNotificationTypeLabel(notification.type)}
                    </Badge>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(notification.createdAt || new Date())}
                    </span>
                    
                    {!notification.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsReadMutation.mutate(notification.id)}
                        disabled={markAsReadMutation.isPending}
                        className="text-orange-500 hover:text-orange-400 hover:bg-orange-500/10"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        تحديد كمقروء
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {(!displayNotifications || displayNotifications.length === 0) && (
        <div className="text-center py-16">
          <Bell className="h-24 w-24 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">لا توجد إشعارات</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            سنقوم بإرسال إشعارات عند إضافة أفلام جديدة أو تحديث المحتوى المفضل لديك
          </p>
        </div>
      )}

      {/* Notification Settings */}
      <Card className="mt-8 bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">إعدادات الإشعارات</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">أفلام جديدة</h4>
                <p className="text-gray-400 text-sm">إشعار عند إضافة أفلام جديدة</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">تحديثات المفضلة</h4>
                <p className="text-gray-400 text-sm">إشعار عند تحديث الأعمال المفضلة</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">إشعارات النظام</h4>
                <p className="text-gray-400 text-sm">إشعارات عامة من الموقع</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
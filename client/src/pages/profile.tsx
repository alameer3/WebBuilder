import { useState } from "react";
import { User, Mail, Calendar, Settings, Heart, Bell, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const [user] = useState({
    id: "1",
    username: "مستخدم_يمني",
    email: "user@yemenflix.com",
    avatar: null,
    joinDate: new Date("2024-01-01"),
    isActive: true,
    favoriteCount: 25,
    watchedCount: 156
  });

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">الملف الشخصي</h1>
        <p className="text-gray-400">إدارة حسابك وتفضيلاتك</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className="bg-orange-500 text-white text-2xl">
                {user.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                <Badge className="bg-green-500/10 text-green-500 border border-green-500/20">
                  نشط
                </Badge>
              </div>
              
              <div className="flex items-center text-gray-400 mb-4">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
              
              <div className="flex items-center text-gray-400 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>منضم منذ {user.joinDate.toLocaleDateString('ar-YE')}</span>
              </div>

              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{user.favoriteCount}</div>
                  <div className="text-sm text-gray-400">المفضلة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{user.watchedCount}</div>
                  <div className="text-sm text-gray-400">تم مشاهدتها</div>
                </div>
              </div>
            </div>

            <Button className="yf-btn-primary">
              <Edit className="h-4 w-4 mr-2" />
              تعديل الملف الشخصي
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-800 border border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500">
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-orange-500">
            المفضلة
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500">
            الإعدادات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-500" />
                  النشاط الأخير
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">أضفت "الكلاب" للمفضلة</p>
                      <p className="text-gray-400 text-xs">منذ ساعة</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">شاهدت "28 سنة لاحقاً"</p>
                      <p className="text-gray-400 text-xs">منذ 3 ساعات</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">قيمت فيلم "حياة تشاك"</p>
                      <p className="text-gray-400 text-xs">منذ يوم</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-500" />
                  إحصائيات المشاهدة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">الأفلام المشاهدة</span>
                    <span className="text-white font-semibold">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">المسلسلات المشاهدة</span>
                    <span className="text-white font-semibold">67</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">ساعات المشاهدة</span>
                    <span className="text-white font-semibold">245 ساعة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">النوع المفضل</span>
                    <span className="text-orange-500 font-semibold">دراما</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                المفضلة ({user.favoriteCount})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">لا توجد عناصر في المفضلة</h3>
                <p className="text-gray-500 mb-4">ابدأ بإضافة أفلامك ومسلسلاتك المفضلة</p>
                <Button className="yf-btn-primary">استكشاف المحتوى</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">إعدادات الحساب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  تعديل المعلومات الشخصية
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  تغيير البريد الإلكتروني
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  تغيير كلمة المرور
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">الإعدادات العامة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  إعدادات الإشعارات
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  إدارة المفضلة
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-red-900/20 border-red-800">
              <CardHeader>
                <CardTitle className="text-red-400">منطقة الخطر</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  حذف الحساب نهائياً
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
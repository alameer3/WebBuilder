import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ThumbsUp, ThumbsDown, Reply, Flag, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import RatingSystem from "./RatingSystem";
import type { Comment } from "@shared/schema";

interface CommentSystemProps {
  movieId: string;
  showRating?: boolean;
}

interface CommentWithUser extends Comment {
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export default function CommentSystem({ movieId, showRating = true }: CommentSystemProps) {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["/api/comments", movieId],
    queryFn: async () => {
      const response = await fetch(`/api/comments?movieId=${movieId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      return data as CommentWithUser[];
    },
  });

  // Submit comment mutation
  const submitCommentMutation = useMutation({
    mutationFn: async ({ content, rating }: { content: string; rating?: number }) => {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          content,
          rating,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit comment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comments", movieId] });
      setNewComment("");
      setNewRating(0);
      toast({
        title: "تم إرسال التعليق",
        description: "سيتم مراجعة تعليقك قبل النشر",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في إرسال التعليق. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  // Like/Unlike comment mutation
  const toggleLikeMutation = useMutation({
    mutationFn: async ({ commentId, action }: { commentId: string; action: "like" | "unlike" }) => {
      const response = await fetch(`/api/comments/${commentId}/${action}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error(`Failed to ${action} comment`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comments", movieId] });
    },
  });

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: "تنبيه",
        description: "يرجى كتابة تعليق",
        variant: "destructive",
      });
      return;
    }

    if (showRating && newRating === 0) {
      toast({
        title: "تنبيه", 
        description: "يرجى اختيار تقييم",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitCommentMutation.mutateAsync({
        content: newComment,
        rating: showRating ? newRating : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleLike = (commentId: string, isLiked: boolean) => {
    toggleLikeMutation.mutate({
      commentId,
      action: isLiked ? "unlike" : "like",
    });
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true, 
      locale: ar 
    });
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            إضافة تعليق
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rating */}
          {showRating && (
            <div className="space-y-2">
              <label className="text-sm font-medium">تقييمك للعمل</label>
              <RatingSystem
                movieId={movieId}
                currentRating={newRating}
                onRate={setNewRating}
                readonly={false}
                size="lg"
                showText={false}
              />
            </div>
          )}

          {/* Comment Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium">تعليقك</label>
            <Textarea
              placeholder="شاركنا رأيك في هذا العمل..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] text-right"
              dir="rtl"
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newComment.trim() || (showRating && newRating === 0)}
            className="w-full"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال التعليق"}
          </Button>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          التعليقات ({comments.length})
        </h3>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            جاري تحميل التعليقات...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            لا توجد تعليقات حتى الآن. كن أول من يعلق!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onToggleLike={handleToggleLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface CommentCardProps {
  comment: CommentWithUser;
  onToggleLike: (commentId: string, isLiked: boolean) => void;
}

function CommentCard({ comment, onToggleLike }: CommentCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // This should come from user data

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {/* User Info & Rating */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>
                  {comment.user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{comment.user.username}</div>
                <div className="text-sm text-gray-500">
                  {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { 
                    addSuffix: true, 
                    locale: ar 
                  }) : 'منذ لحظات'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {comment.rating && (
                <RatingSystem
                  movieId=""
                  currentRating={comment.rating}
                  readonly={true}
                  size="sm"
                  showText={false}
                />
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Flag className="w-4 h-4 mr-2" />
                    إبلاغ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Comment Content */}
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {comment.content}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleLike(comment.id, isLiked)}
              className={`gap-1 ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {comment.likeCount || 0}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-gray-500"
            >
              <ThumbsDown className="w-4 h-4" />
              {comment.dislikeCount || 0}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="gap-1 text-gray-500"
            >
              <Reply className="w-4 h-4" />
              رد
            </Button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <>
              <Separator />
              <div className="space-y-3 pt-3">
                <Textarea
                  placeholder="اكتب ردك..."
                  className="text-right"
                  dir="rtl"
                />
                <div className="flex gap-2">
                  <Button size="sm">إرسال الرد</Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowReplyForm(false)}
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
import { useState } from "react";
import { MessageCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم إرسال الرسالة بنجاح",
        description: "سنقوم بالرد عليك في أقرب وقت ممكن",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "خطأ في إرسال الرسالة",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MessageCircle className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-white">اتصل بنا</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          نحن هنا لمساعدتك. يمكنك التواصل معنا في أي وقت للحصول على الدعم أو الإجابة على أسئلتك
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Send className="h-5 w-5 text-orange-500" />
                إرسال رسالة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">الموضوع</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="موضوع الرسالة"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">الرسالة</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="اكتب رسالتك هنا..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-gray-600 text-white min-h-32"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full yf-btn-primary"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? (
                    "جاري الإرسال..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      إرسال الرسالة
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">معلومات التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-white font-medium">البريد الإلكتروني</p>
                  <p className="text-gray-400 text-sm">support@yemenflix.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-white font-medium">رقم الهاتف</p>
                  <p className="text-gray-400 text-sm">+967 1 234 567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-white font-medium">العنوان</p>
                  <p className="text-gray-400 text-sm">صنعاء، الجمهورية اليمنية</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">ساعات العمل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">السبت - الخميس</span>
                <span className="text-white">9:00 ص - 6:00 م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">الجمعة</span>
                <span className="text-white">2:00 م - 6:00 م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">الدعم الفني</span>
                <span className="text-green-500">24/7</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <h3 className="text-orange-500 font-semibold mb-2">نصيحة سريعة</h3>
              <p className="text-gray-300 text-sm">
                للحصول على رد أسرع، يرجى تحديد موضوع الرسالة بوضوح وتقديم أكبر قدر من التفاصيل حول مشكلتك أو استفسارك.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
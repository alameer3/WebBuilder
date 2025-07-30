import { useState } from "react";
import { Link } from "wouter";
import { LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في يمن فليكس",
      });
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يمكنك الآن تسجيل الدخول",
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-md">
      <div className="mb-8 text-center">
        <div className="text-4xl font-bold mb-2">
          <span className="text-white">يمن</span>
          <span className="text-orange-500">فليكس</span>
        </div>
        <p className="text-gray-400">الموقع اليمني الأول للأفلام والمسلسلات</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-center">الدخول إلى حسابك</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-900">
              <TabsTrigger value="login" className="data-[state=active]:bg-orange-500">
                <LogIn className="h-4 w-4 mr-2" />
                تسجيل الدخول
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-orange-500">
                <UserPlus className="h-4 w-4 mr-2" />
                حساب جديد
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      className="bg-gray-900 border-gray-600 text-white pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      className="bg-gray-900 border-gray-600 text-white pr-10 pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 rtl:space-x-reverse">
                    <input type="checkbox" className="rounded border-gray-600" />
                    <span className="text-sm text-gray-400">تذكرني</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-400">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <Button type="submit" className="w-full yf-btn-primary" disabled={isLoading}>
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">اسم المستخدم</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="أدخل اسم المستخدم"
                      className="bg-gray-900 border-gray-600 text-white pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-white">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      className="bg-gray-900 border-gray-600 text-white pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-white">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      className="bg-gray-900 border-gray-600 text-white pr-10 pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أعد إدخال كلمة المرور"
                      className="bg-gray-900 border-gray-600 text-white pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input type="checkbox" className="rounded border-gray-600" required />
                  <span className="text-sm text-gray-400">
                    أوافق على{" "}
                    <Link href="/terms" className="text-orange-500 hover:text-orange-400">
                      الشروط والأحكام
                    </Link>
                  </span>
                </div>

                <Button type="submit" className="w-full yf-btn-primary" disabled={isLoading}>
                  {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب جديد"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">أو</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button variant="outline" className="w-full bg-gray-900 border-gray-600 hover:bg-gray-700">
                متابعة كضيف
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-400">
        <Link href="/" className="text-orange-500 hover:text-orange-400">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
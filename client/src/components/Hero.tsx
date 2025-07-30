import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-right animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              موقع إنترنت{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                متطور
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              نقدم لك أحدث المواصفات والتقنيات في تطوير المواقع الإلكترونية
              مع تصميم عصري ومتجاوب يناسب جميع الأجهزة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover-lift">
                اكتشف المزيد
              </Button>
              <Button variant="ghost" className="glass-effect text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                <Play className="ml-2 h-4 w-4" />
                شاهد العرض
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800"
              alt="Modern web development workspace"
              className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

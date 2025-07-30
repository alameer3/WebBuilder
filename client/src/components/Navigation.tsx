import { useState, useEffect } from "react";
import { Rocket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/50"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/50"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-slate-900">موقعي</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              عن الموقع
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              الخدمات
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              الأعمال
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              التواصل
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                الرئيسية
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                عن الموقع
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                الخدمات
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                الأعمال
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                التواصل
              </button>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium">
                ابدأ الآن
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

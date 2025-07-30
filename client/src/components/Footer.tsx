import { Rocket, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "عن الموقع", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "الأعمال", href: "#portfolio" },
];

const services = [
  { label: "تطوير المواقع", href: "#" },
  { label: "تطبيقات الجوال", href: "#" },
  { label: "التصميم الجرافيكي", href: "#" },
  { label: "التسويق الرقمي", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold">موقعي</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              نحن شركة رائدة في مجال تطوير المواقع والتطبيقات بأحدث التقنيات والمعايير العالمية
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="text-slate-400 hover:text-white transition-colors">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">النشرة الإخبارية</h3>
            <p className="text-slate-400 mb-4">اشترك ليصلك كل جديد</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-r-lg border-0 text-slate-900"
                required
              />
              <Button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded-l-lg hover:bg-blue-600 transition-colors"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            &copy; 2024 موقعي. جميع الحقوق محفوظة. تم التطوير بأحدث التقنيات
          </p>
        </div>
      </div>
    </footer>
  );
}

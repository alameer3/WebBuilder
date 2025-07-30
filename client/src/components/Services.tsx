import { Code, Palette, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "تطوير المواقع",
    description: "تطوير مواقع ويب احترافية باستخدام أحدث التقنيات والمعايير",
    iconBg: "bg-blue-500",
  },
  {
    icon: Palette,
    title: "التصميم الجرافيكي",
    description: "تصميم هوية بصرية متكاملة تعكس شخصية علامتك التجارية",
    iconBg: "bg-purple-500",
  },
  {
    icon: TrendingUp,
    title: "التسويق الرقمي",
    description: "استراتيجيات تسويقية متكاملة لزيادة وصولك وتحقيق أهدافك",
    iconBg: "bg-yellow-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات التقنية المتطورة
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Service Content */}
          <div>
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover-lift mb-8 last:mb-0">
                <div className="flex items-start space-x-reverse space-x-6">
                  <div className={`w-12 h-12 ${service.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <service.icon className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800"
              alt="Team collaboration in modern office"
              className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

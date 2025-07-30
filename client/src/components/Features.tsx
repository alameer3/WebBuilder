import { Smartphone, Rocket, Shield, Search, Users, Settings } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "تصميم متجاوب",
    description: "يتكيف الموقع تلقائياً مع جميع أحجام الشاشات والأجهزة المختلفة",
    gradient: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-500",
  },
  {
    icon: Rocket,
    title: "أداء فائق",
    description: "تحميل سريع وأداء محسّن لضمان تجربة مستخدم مثالية",
    gradient: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
  },
  {
    icon: Shield,
    title: "أمان عالي",
    description: "حماية متقدمة وتشفير قوي لضمان أمان بياناتك ومعلوماتك",
    gradient: "from-yellow-50 to-yellow-100",
    iconBg: "bg-yellow-500",
  },
  {
    icon: Search,
    title: "محسّن لمحركات البحث",
    description: "تطبيق أفضل ممارسات السيو لضمان ظهورك في النتائج الأولى",
    gradient: "from-green-50 to-green-100",
    iconBg: "bg-green-500",
  },
  {
    icon: Users,
    title: "سهولة الاستخدام",
    description: "واجهة بديهية وسهلة الاستخدام تناسب جميع الفئات العمرية",
    gradient: "from-red-50 to-red-100",
    iconBg: "bg-red-500",
  },
  {
    icon: Settings,
    title: "تقنيات حديثة",
    description: "استخدام أحدث التقنيات والمعايير في تطوير المواقع",
    gradient: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
  },
];

export default function Features() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            لماذا نحن الأفضل؟
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            نقدم حلول تقنية متطورة تجمع بين الجمال والأداء العالي
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl hover-lift`}
            >
              <div className={`w-16 h-16 ${feature.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

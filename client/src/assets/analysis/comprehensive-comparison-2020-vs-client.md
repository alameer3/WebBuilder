# مقارنة شاملة بين 2020 الأصلي والتصميم الحالي
## التاريخ: 31 يناير 2025

---

## 🚨 الاختلافات الحرجة المكتشفة

### 1. **خطأ في البناء (Body Structure)**
**الأصلي (2020):**
- `body class="header-fixed body-home"`
- خلفية: `linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url(https://ak.sv/style/assets/images/home-bg.webp)`
- بناء مباشر بدون React wrapper

**الحالي:**
- ❌ React wrapper يضيف divs إضافية
- ❌ خلفية مطبقة على body عبر JavaScript بدلاً من CSS
- ❌ تداخل في البنية الأساسية

### 2. **ترتيب العناصر خاطئ**
**الأصلي:**
```html
<body>
  <span class="site-overlay"></span>
  <div class="main-menu">...</div>
  <div class="search-box">...</div>
  <div class="site-container">
    <div class="page-home">
      <header class="main-header">...</header>
      <div class="container">
        <div class="home-site-btn-container">...</div>
        <div class="widget-2">...</div>
      </div>
    </div>
  </div>
</body>
```

**الحالي:**
- ❌ main-menu داخل React component بدلاً من body مباشرة
- ❌ search-box داخل component
- ❌ البنية الهرمية مختلفة تماماً

### 3. **مشكلة في الهيدر**
**الأصلي:**
- Header يحتوي على search bar في الوسط
- لا يوجد search-toggle في الهيدر العادي (فقط في main-menu)
- مربع البحث موجود في الهيدر بـ class="search-container"

**الحالي:**
- ❌ إضفت search-toggle في مكان خاطئ
- ❌ مربع البحث في الهيدر مفقود الوظائف

### 4. **تأثير Typed.js**
**الأصلي:**
```javascript
new Typed('.widget-2 .form label[for="widget2SearchInput"] span', {
  stringsElement: ".widget-2 .form .label-text",
  typeSpeed: 30
});
```

**الحالي:**
- ❌ Selector خاطئ
- ❌ تحميل خاطئ للـ scripts

### 5. **ملفات CSS**
**الأصلي:**
1. `/style/assets/css/plugins.css?v=1.2`
2. `/style/assets/css/style.css?v=1.3`
3. `/style/assets/css/akwam.css?v=1.3`
4. `/style/assets/css/home.css`

**الحالي:**
- ❌ يستخدم `home.css` بدلاً من `akwam.css`
- ❌ ترتيب التحميل مختلف
- ❌ ملفات إضافية غير ضرورية

---

## 🎯 الحلول المطلوبة

### 1. إعادة بناء البنية الأساسية
- نقل site-overlay و main-menu خارج React
- إعادة ترتيب العناصر ليطابق HTML الأصلي
- إزالة التداخلات غير الضرورية

### 2. إصلاح تحميل CSS
- إضافة akwam.css بدلاً من yemen-flix.css
- ترتيب التحميل: plugins → style → akwam → home
- إزالة الملفات الإضافية

### 3. إصلاح JavaScript
- تحميل صحيح لـ jQuery و Typed.js
- Selectors صحيحة
- Event handlers مطابقة للأصل

### 4. إصلاح مربع البحث في الهيدر
- إضافة search-container في الهيدر
- input و label صحيحين
- تفعيل الوظائف

---

## ❌ الأخطاء الحالية
1. React wrapper يكسر البنية الأصلية
2. CSS order خاطئ
3. JavaScript selectors خاطئة
4. Header structure مختلف
5. Body background مطبق خطأ
6. Typed.js لا يعمل
7. Search functionality معطل

---

## ✅ الخطة التصحيحية
1. إعادة كتابة HTML structure بالكامل
2. تصحيح CSS imports
3. إصلاح JavaScript loading
4. اختبار جميع الوظائف
5. التأكد من المطابقة الكاملة مع 2020
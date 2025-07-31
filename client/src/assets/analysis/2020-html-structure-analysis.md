# تحليل شامل لبنية HTML الأصلية (2020/home/index.html)

## التاريخ: 31 يناير 2025

---

## 🔍 الاختلافات الرئيسية المكتشفة

### 1. **بنية الصفحة الأساسية**
**الأصلي:**
```html
<body class="header-fixed body-home">
<span class="site-overlay"></span>
<div class="main-menu">...</div>
<div class="search-box">...</div>
<div class="site-container">
  <div class="page-home">...</div>
</div>
<footer>...</footer>
</body>
```

**الحالي:** ✅ مطابق تقريباً

### 2. **الهيدر والتنقل**
**الأصلي:**
- لا يوجد زر search-toggle في الهيدر
- زر menu-toggle فقط موجود
- القائمة الجانبية منفصلة تماماً

**الحالي:** ❌ أضفت زر البحث في الهيدر (غير موجود في الأصل)

### 3. **القائمة الجانبية (main-menu)**
**الأصلي:** ✅ مطابق - يحتوي على:
- قائمة الأقسام (أفلام، مسلسلات، تلفزيون، منوعات)
- روابط التواصل الاجتماعي

### 4. **صندوق البحث (search-box)**
**الأصلي:** ✅ مطابق - يظهر عند الضغط على search-toggle

### 5. **الدائرة المركزية (home-site-btn)**
**الأصلي:**
```html
<div class="home-site-btn" style="background-image: url('https://ak.sv/style/assets/images/site-new.webp');transition: background-position 5s;">
  <span class="logo">
    <svg>...</svg>
  </span>
  <span class="text font-size-20 font-weight-medium text-white">الصفحة الرئيسية</span>
</div>
```
**الحالي:** ✅ مطابق

### 6. **مربع البحث الرئيسي (widget-2)**
**الأصلي:**
```html
<div class="widget-2 widget mb-4">
  <form class="form d-flex no-gutters mb-20">
    <div class="col pl-12">
      <input type="text" class="form-control" id="widget2SearchInput" name="q">
      <label for="widget2SearchInput" class="m-0">
        <span class="label">ابحث عن فيلم او مسلس</span>
        <span class="typed-cursor">|</span>
      </label>
      <div class="label-text d-none">...</div>
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-orange">بحث</button>
    </div>
  </form>
</div>
```
**الحالي:** ✅ مطابق

### 7. **قائمة الأقسام الرئيسية**
**الأصلي:** ✅ مطابق - أفلام، مسلسلات، تلفزيون، منوعات

### 8. **Footer**
**الأصلي:**
```html
<footer class="main-footer py-5">
  <nav class="social">...</nav>
  <nav class="links">
    <a href="https://ak.sv">اكوام</a>
    <a href="https://ak.sv/old">الموقع القديم</a>
    <a href="https://ak.sv/dmca">DMCA</a>
    <a href="https://ak.sv/ad-policy">AD-P</a>
    <a href="https://ak-news.com">اكوام نيوز</a>
    <a href="https://akw.net.co">شبكة اكوام</a>
  </nav>
  <p class="copyright">جميع الحقوق محفوظة لـ شبكة اكوام © 2025</p>
</footer>
```

**الحالي:** ❌ مختلف - فقط روابط بسيطة

### 9. **JavaScript الأصلي**
**الأصلي:**
```javascript
$(document).ready(function(){
  // Typed.js initialization
  if($('.widget-2').length) {
    new Typed('.widget-2 .form label[for="widget2SearchInput"] span', {
      stringsElement: ".widget-2 .form .label-text",
      typeSpeed: 30
    });
  }
  
  // Menu toggles
  $(".menu-toggle").on("click", function(){
    $("body").removeClass("search-active").toggleClass("main-menu-active");
  });
  
  $(".search-toggle").on("click", function(){
    $("body").removeClass("main-menu-active").toggleClass("search-active");
    setTimeout(function(){
      $(".search-box form input").focus();
    }, 200);
  });
});
```

**الحالي:** ✅ مطابق تقريباً

---

## 🚨 المشاكل المكتشفة

### 1. **خطأ javascript:; في React**
- React يحذر من استخدام `href="javascript:;"`
- يجب استبداله بـ `href="#"` أو event handlers

### 2. **مسار الصور المكسور**
- الصور تستدعى من `/src/assets/` بدلاً من المسار الصحيح
- يجب تغييرها لتكون import statements

### 3. **Footer ناقص**
- لا يحتوي على جميع الروابط المطلوبة
- نص الحقوق مختلف

### 4. **زر البحث الإضافي**
- أضفت زر البحث في الهيدر وهو غير موجود في الأصل
- يجب إزالته

---

## 🎯 الإصلاحات المطلوبة

1. **إزالة زر البحث من الهيدر**
2. **إصلاح مسارات الصور**
3. **إصلاح روابط javascript:;**
4. **تحديث Footer ليطابق الأصل**
5. **التأكد من صحة Typed.js selector**

---

## 📋 الخلاصة

الصفحة مطابقة بنسبة **80%** للأصل، لكن تحتاج لإصلاحات في:
- الهيدر (إزالة زر البحث الإضافي)
- مسارات الأصول
- Footer
- بعض التفاصيل الصغيرة
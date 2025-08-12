# 🔍 التحليل الوظيفي العميق للموقع الأصلي AKWAM

## 🎯 الهدف من التحليل
فهم الوظائف والتفاعلات الحقيقية في الموقع الأصلي لتطبيقها بدقة في مشروع YEMEN_FLIX

---

## 📱 الوظائف الأساسية المكتشفة

### 1. نظام المفضلات (Favorites System)

#### الآلية:
- **تخزين محلي**: استخدام jQuery Cookies
- **أنواع المفضلات**: movies, series, shows, games, programs, mix
- **التفاعل**: زر إضافة/إزالة للمفضلة مع تغيير فوري للحالة

#### الكود المكتشف:
```javascript
// من site/movies/js/akwam.js
favorite_movies = $.cookie('favorite_movies') ? JSON.parse($.cookie('favorite_movies')) : [];
favorite_series = $.cookie('favorite_series') ? JSON.parse($.cookie('favorite_series')) : [];

// إضافة/إزالة المفضلة
$(document).on('click', '.add-to-fav', function (e) {
  e.preventDefault();
  $this = $(this);
  $this.toggleClass('added');
  $.ajax({
    type: "POST",
    url: site_url + '/favorite',
    data: {id: $this.data('id'), type: $this.data('type')},
    dataType: 'JSON'
  });
});
```

#### HTML Structure:
```html
<a href="javascript:;" class="icn add-to-fav mr-4 private hide" 
   data-type="series" data-id="4569">
```

### 2. نظام التقييم والإعجاب (Rating & Like System)

#### الآلية:
- **تقييم بالنجوم**: عرض تقييم IMDB/TMDB
- **إعجاب/عدم إعجاب**: نظام منفصل مع cookies
- **عداد**: عرض عدد الإعجابات في الوقت الفعلي

#### الكود المكتشف:
```javascript
$('.like').on('click', function ($e) {
  $e.preventDefault();
  if ($.cookie('dislikes_' + decodeURI(window.location.pathname)) == undefined && 
      ($.cookie('likes_' + decodeURI(window.location.pathname)) == undefined)) {
    $this = $(this),
    $number = parseInt($this.find('.number').text()) + 1;
    $this.addClass('active').find('.number').text($number);
    $.cookie('likes_' + decodeURI(window.location.pathname), $number);
  }
});
```

### 3. نظام المشاهدة والتحميل (Watch/Download System)

#### الآلية:
- **جودات متعددة**: 1080p, 720p, 480p
- **خوادم متعددة**: روابط بديلة لكل جودة
- **أحجام الملفات**: عرض حجم كل ملف
- **روابط مؤقتة**: استخدام go.ak.sv للحماية

#### HTML Structure المكتشف:
```html
<div class="tab-content quality" id="tab-5">
  <div class="qualities row flex-wrap align-items-center">
    <div class="col-lg-6 row" data-server="78" data-quality="5">
      <div class="col-lg-6 col">
        <a href="http://go.ak.sv/watch/50980" class="link-btn link-show">
          <span class="text">مشاهدة</span>
          <i class="icon-play2 mr-auto"></i>
        </a>
      </div>
      <div class="col-lg-6 col">
        <a href="http://go.ak.sv/link/50980" class="link-btn link-download">
          <span class="text">تحميل</span>
          <span class="font-size-14 mr-auto">2.6 GB</span>
          <i class="icon-download mr-2"></i>
        </a>
      </div>
    </div>
  </div>
</div>
```

### 4. نظام المشاركة الاجتماعية (Social Share)

#### الآلية:
- **منصات متعددة**: Facebook, Twitter, WhatsApp, Messenger
- **روابط مباشرة**: فتح نوافذ منفصلة للمشاركة

#### الكود:
```javascript
$('.share .facebook').on('click', function ($e) {
  $e.preventDefault();
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location, '_blank');
});

$('.share .whatsapp').on('click', function ($e) {
  $e.preventDefault();
  window.open('https://api.whatsapp.com/send?text=' + window.location, '_blank');
});
```

---

## 🔍 الوظائف المتقدمة المكتشفة

### 5. نظام العرض العشوائي (Random Display)

#### الآلية:
- **اختيار عشوائي**: عرض محتوى مخفي بشكل عشوائي
- **محدودية العرض**: عرض 6 عناصر كحد أقصى

```javascript
// عرض روابط تحميل عشوائية
$('.tab-content.quality').each(function () {
  var $rand = Math.floor(Math.random() * $(this).find('.duplicated.d-none').length) + 0;
  $(this).find('.duplicated.d-none:eq(' + $rand + ')').removeClass('d-none');
});

// عرض "شاهد المزيد" عشوائي
var view_more = 1;
while (view_more <= 6) {
  var $rand = Math.floor(Math.random() * $('.widget-4.more .widget-body .row > .d-none').length) + 0;
  $('.widget-4.more .widget-body .row > .d-none:eq(' + $rand + ')').removeClass('d-none');
  view_more++;
}
```

### 6. نظام المصادقة (Authentication System)

#### الآلية:
- **Cookies**: حفظ بيانات المستخدم
- **حالة الدخول**: إخفاء/إظهار العناصر حسب حالة المستخدم
- **بيانات المستخدم**: اسم، صورة، معرف

```javascript
if (($.cookie('authenticated') !== undefined) && ($.cookie('user') !== undefined)) {
  $('.private').removeClass('hide');
  $('.public').addClass('hide');
  $user = JSON.parse($.cookie('user'));
  $('.user-panel .login-panel .username').text($user.name);
  $('.user-panel .login-panel img').attr('src', img($user.img, '32x32'));
}
```

### 7. نظام الصور المتجاوبة (Responsive Images)

#### الآلية:
- **أحجام متعددة**: 32x32, 50x50, 54x54, 178x260, 400x300, 800x450
- **تحسين الأداء**: تحميل الصور حسب الحاجة
- **CDN**: استخدام img.downet.net

```javascript
function img($path, $d) {
  if ($d != undefined && $d != '') {
    return LibraryServerUrl + 'thumb/' + $d + '/' + $path;
  } else
    return LibraryServerUrl + 'thumb/' + $path;
}
```

---

## 📋 الخلاصة - الوظائف المطلوب تطبيقها

### الوظائف الأساسية:
1. ✅ **نظام المفضلات**: مع cookies وأنواع متعددة
2. ✅ **نظام التقييم**: نجوم + إعجاب/عدم إعجاب
3. ✅ **نظام المشاهدة/التحميل**: جودات وخوادم متعددة
4. ✅ **نظام المشاركة**: منصات اجتماعية متعددة
5. ✅ **نظام المصادقة**: cookies + حالات المستخدم

### الوظائف المتقدمة:
6. ✅ **العرض العشوائي**: محتوى ديناميكي
7. ✅ **الصور المتجاوبة**: أحجام متعددة
8. ✅ **التبويبات التفاعلية**: جودات الفيديو
9. ✅ **الروابط المحمية**: go.ak.sv system
10. ✅ **العدادات الديناميكية**: تحديث فوري للأرقام

---

*تم تحليل 75+ صفحة HTML والكود JavaScript الفعلي للموقع الأصلي*
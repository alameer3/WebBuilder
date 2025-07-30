
$(document).ready(function(){
  function updateHeader(){
    if($(".main-header").length){
      if($(window).scrollTop() <= 50){
        $("body").removeClass("header-bg");
      } else {
        $("body").addClass("header-bg");
      }
      
      if($(".main-categories-list-end").length){
        if($(window).scrollTop() <= $(".main-categories-list-end").offset().top){
          $("body").removeClass("header-menu");
        } else {
          $("body").addClass("header-menu");
        }
      }
    }
  }

  updateHeader();
  $(window).on("scroll", function(){
    updateHeader();
  });

  // Typed.js initialization
  if($(".widget-2").length){
    new Typed('.widget-2 .form label[for="widget2SearchInput"] span', {
      stringsElement: ".widget-2 .form .label-text",
      typeSpeed: 30
    });
  }

  // Escape key handler
  $(document).on("keydown", function(e){
    if(e.keyCode === 27){
      $("body").removeClass("search-active main-menu-active");
    }
  });

  // Input handling
  $("input, textarea").on("focusout change submit blur", function(){
    if($(this).val()){
      $(this).addClass("not-empty");
    } else {
      $(this).removeClass("not-empty");
    }
  });

  // Reset button
  $('button[type="reset"]').on("click", function(){
    $(this).parents("form").find("input, textarea").removeClass("not-empty");
  });

  // Overlay click handler
  $(".site-overlay").on("click", function(){
    $("body").removeClass("main-menu-active search-active");
  });

  // Menu toggle
  $(".menu-toggle").on("click", function(){
    $("body").removeClass("search-active").toggleClass("main-menu-active");
  });

  // Search toggle
  $(".search-toggle").on("click", function(){
    $("body").removeClass("main-menu-active").toggleClass("search-active");
    setTimeout(function(){
      $(".search-box form input").focus();
    }, 200);
  });
});

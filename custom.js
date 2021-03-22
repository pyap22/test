$(document).ready(function() {

  AOS.init({
    duration: 500
  });

  var accordionGrid = function() {

    var $accordionGrid = $('.accordion-grid');

    if($accordionGrid.length) {

      var $trigger = $('.accordion-grid__trigger');
      var $accordionContent = $('.accordion__col');
      var $triggerClose = $('.card-close');
      var activeClass = 'active';
      var urlHash = window.location.hash;

      var closePanel = function() {
        $accordionContent.hide();
        $trigger.removeClass(activeClass);
      }

      var scrollAnchor = function(el) {
        var element = $(el);
        $('html,body').animate({
          scrollTop: element.offset().top - 100
        }, 400);
      }

      // Check if url has # then load in content
      if (urlHash) {
        var requestedPanel = $(urlHash);
        if (requestedPanel.length) {
          closePanel();
          $(urlHash).fadeIn();
        }
      }

      $trigger.on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var currentEl = $this.attr('href');
        if(!$('.accordion__col'+currentEl).is(':visible')) {
          closePanel();
          $('.accordion__col'+currentEl).fadeIn();
          $this.addClass(activeClass);
          
          scrollAnchor(currentEl);
        }
      });

      $triggerClose.on('click', function(e) {
        e.preventDefault();
        
        
        $accordionContent.slideUp();
        $trigger.removeClass(activeClass);
      });

    }
  }

  accordionGrid();

  var menuNav = function() {

      var $header = $('.site-header');
      var $window = $(window);
      var fixedClass = 'fixed';
      var $popupTrigger = $('.popup-menu__trigger');
      var $popupMenu = $('.popup-menu');
      var $body = $('body');

      var removeSticky = function() {
        $header.removeClass(fixedClass);
      }

      var addSticky = function() {
        $header.addClass(fixedClass);
      }

      var checkScrollPosition = function() {
        if ($window.scrollTop() != 0) {
          addSticky();
        }

        $window.scroll(function(){
          if ($window.scrollTop() > 50) {
            addSticky();
          }
          else {
            removeSticky();
          }
        });
     }

     checkScrollPosition();

     $popupTrigger.click(function(e){
      e.preventDefault();
      var $this = $(this);
      if($popupMenu.is(':visible')) {
        $popupMenu.fadeOut();
        $body.css({'overflow':'auto'});
        $this.text('MENU');

       checkScrollPosition();

      }else {
        $popupMenu.fadeIn();
        $body.css({'overflow-y':'hidden'});
        $this.text('CLOSE');
        removeSticky();

        if ($window.scrollTop() != 0) {
          removeSticky();
        }

        $window.scroll(function(){
          if ($window.scrollTop() > 50) {
            removeSticky();
          }
          else {
            removeSticky();
          }
        });

      }
    });

  } // menuNav()

  menuNav();

  /* Slick Slider */

  if($('.slider').length) {
    $('.slider').slick({
      dots: true,
      adaptiveHeight: true
    });
  }

  var videoModule = function() {
    var $videoModule = $('.video_module');
    var $videoModuleLink = $videoModule.find("a");
    var $videoModuleWrapper = $videoModule.find(".video_module__wrapper");
    var $closeBtn = $videoModule.find(".close_btn");
    var videoId = $videoModule.data("id");
    var videoSettings = '?autoplay=1&loop=1&autopause=0';
    var videoSrc = 'https://player.vimeo.com/video/'+videoId+videoSettings;
    var $videoiFrame = $videoModule.find("iframe");

    $videoModuleLink.click(function(e){
      e.preventDefault();
      $videoModule.addClass("no-transform");
      $videoModuleWrapper.addClass('module_open');
      $videoiFrame.attr('src', videoSrc);
    });

    $closeBtn.click(function(e){
      e.preventDefault();
      $(this).parents().eq(2).removeClass("no-transform");
      $(this).parents().eq(1).removeClass('module_open');
      $videoiFrame.attr('src', '');
    });

  }; // videoModule()

  videoModule();

  var ContactMap = function (){

    var contactMap = $("#ContactMap");

    if(0 < contactMap.length ){
      var mapLat = $(".contact-map__inner").data("gmap-lat");
      var mapLong = $(".contact-map__inner").data("gmap-long");
      var latlng = {
        lat: parseFloat(mapLat),
        lng: parseFloat(mapLong)
      };

      var markerSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#231F20" d="M15.6666667,0 C10.0693333,0 5,4.53733333 5,10.136 C5,15.7333333 9.62533333,22.416 15.6666667,32 C21.708,22.416 26.3333333,15.7333333 26.3333333,10.136 C26.3333333,4.53733333 21.2653333,0 15.6666667,0 Z M15.6666667,14.6666667 C13.4573333,14.6666667 11.6666667,12.876 11.6666667,10.6666667 C11.6666667,8.45733333 13.4573333,6.66666667 15.6666667,6.66666667 C17.876,6.66666667 19.6666667,8.45733333 19.6666667,10.6666667 C19.6666667,12.876 17.876,14.6666667 15.6666667,14.6666667 Z"/></svg>';

      var map = new google.maps.Map(document.getElementById('ContactMap'), {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        mapTypeControl: false,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
        },
        styles: [
          {
            "featureType": "landscape",
            "stylers": [
              {
                "hue": "#FFBB00"
              },
              {
                "saturation": 43.400000000000006
              },
              {
                "lightness": 37.599999999999994
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.highway",
            "stylers": [
              {
                "hue": "#FFC200"
              },
              {
                "saturation": -61.8
              },
              {
                "lightness": 45.599999999999994
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "stylers": [
              {
                "hue": "#FF0300"
              },
              {
                "saturation": -100
              },
              {
                "lightness": 51.19999999999999
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.local",
            "stylers": [
              {
                "hue": "#FF0300"
              },
              {
                "saturation": -100
              },
              {
                "lightness": 52
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "water",
            "stylers": [
              {
                "hue": "#0078FF"
              },
              {
                "saturation": -13.200000000000003
              },
              {
                "lightness": 2.4000000000000057
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "hue": "#00FF6A"
              },
              {
                "saturation": -1.0989010989011234
              },
              {
                "lightness": 11.200000000000017
              },
              {
                "gamma": 1
              }
            ]
          }
        ]
      });

      var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerSvg),
          scaledSize: new google.maps.Size(60, 60),
        },
        optimized: false,
      });
    }
  };

  ContactMap();

  var Distributors = function () {

    // display 1st item
    $(window).load(function(){
      setTimeout(function(){
        $(".distributors-sidebar__link").eq(0).click();
      }, 500);
    })

    $(".distributors-sidebar__link").each(function(i){
      $(this).click(function(e){
        e.preventDefault();
        var $toggle = $(e.currentTarget);
        if ($toggle.hasClass('is-active')) {
          return;
        }

        $(".distributors-sidebar__link").removeClass('is-active');
        $toggle.addClass('is-active');

        $(".distributors-list__item ")
        .addClass('is-hidden')
        .filter('[data-distributor-item=' + $toggle.data('distributor-toggle') + ']')
        .removeClass('is-hidden');

      });

    });
  };

  Distributors();

  var AccordionContent = function(trigger, container) {
   
    $(trigger).on('click', function(e){
      e.preventDefault();
      //toggle transform class if clicked - py
      $('.product-single__photo-wrapper img').toggleClass('product-single__photos__transform');
      // add border on the side of desc
      $('.product-single__meta').toggleClass('product-single__meta__border');
  
      $(this).toggleClass('is-active');
      $(container).find('.rte').toggleClass('is-accordion');
      if($(container+' .rte').hasClass('is-accordion')) {
        $(this).find('span').text('Read more');
        //scroll up when clicked on collapse
        $("body,html").animate(
          {
            scrollTop: $('.page-border').offset().top - 150
          },
          800 //speed
        );
      } else {
        $(this).find('span').text('Read less');
         //scroll to product desc when clicked on expand
        $("body,html").animate(
          {
            scrollTop: $('.product-single__description').offset().top - 120
          },
          800 //speed
        );
      }
    });
  }

  AccordionContent('.accordion-trigger', '.product-single__description');


 var equaliseGroup = function () {
  var $group = $(this);
  $group.find('.js-equalise').matchHeight();
  };
  $('.js-equalise-group').each(equaliseGroup);

});
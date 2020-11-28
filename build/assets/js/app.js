function _instanceof2(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return _instanceof2(left, right);
  }
}
function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function ($) {
  var config = function config() {

    var _ua = Fourdigit.set()._ua,
        _browser = Fourdigit.set()._browser,
        _breakP = Fourdigit.set()._breakP,
        _winSize = Fourdigit.set()._winSize; // ブラウザを判別し、bodyにそのブラウザ名のクラスを付与

    for (var key in _browser) {
      if (_browser.hasOwnProperty(key)) {
        if (_browser[key] == true) {
          $('body').addClass(key);
        }
      }
    }
  }; //USER AGENT FOR TAB

  var agent = window.navigator.userAgent.toLowerCase();
  $(function () {
    /**
     * 共通系処理
     * @description
     * サイト共通で機能させる処理はここに書きます。
     */
    config();
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };

    /**
     * VIEWPORT 切り替え
     * @description
     * TBとSPの場合で、それぞれviewportの値を切り替えます。
     */

    function updateMetaViewport() {
      var viewportContent;

      if (_ua.TB) {
        viewportContent = "width=1200";
      } else {
        viewportContent = "width=device-width,initial-scale=1.0,maximum-scale=1.5,user-scalable=yes";
      }

      document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
    }

    if (_ua.SP || _ua.TB) {
      window.addEventListener("load", updateMetaViewport, false);
    } //android tel設定

    $('a[href^="#"]').click(function(){
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      return false;
    });

    $(function () {
      var w = $(window).width();
      var x = 760;

      if (w <= x) {
        window.onorientationchange = function () {
          switch (window.orientation) {
            case 0:
              break;

            case 90:
              alert('※当サイトを最適な状態でご覧いただくには、スマートフォンを縦にした状態でご覧ください。');
              break;

            case -90:
              alert('※当サイトを最適な状態でご覧いただくには、スマートフォンを縦にした状態でご覧ください。');
              break;
          }
        };
      }
    });

    var doWhenIntersect = function doWhenIntersect(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // 範囲内
        } else {
          // 範囲外
        }
      });
    };

    var timeoutId;
    var number = true;
    // 対象範囲
    var boxes = document.querySelectorAll(".dummy");
    var options = {
      root: null,
      rootMargin: '-100% 0px 0px 0px',
      threshold: 0
    };
    var observer = new IntersectionObserver(doWhenIntersect, options);

    Array.prototype.forEach.call(boxes, function (box) {
      observer.observe(box);
    });



  $(window).on('load',function(){
    console.log('hello');
    $('#logo').addClass('start');
  });
    /**
     * 各ページ固有の処理
     * 基本的にローカルにJSは置かずにcommon内で完結させる。
     */

    switch ($('.wrapper').attr('id')) {
      case 'template':
        break;

      case 'index':
        var swiperItem = document.querySelectorAll('.js-mainslide');
        var swiper = new Swiper(swiperItem, {
          loop: true,
          autoplay: true,
          effect: 'fade',
          speed: 1000,
          autoHeight: true,
        });

        break;

      default:
        break;
    }
  });
})(jQuery);

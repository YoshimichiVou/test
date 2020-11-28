function _instanceof2(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

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
    //ポップアップリンクに置換
    $(".commonPop").easyPop(); //アンカーリンクをスムージング
    // $('a[href^="#"]').smoothScroll();

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
  var ipad = agent.indexOf('ipad') > -1 || agent.indexOf('macintosh') > -1 && 'ontouchend' in document;
  $(function () {
    /**
     * 共通系処理
     * @description
     * サイト共通で機能させる処理はここに書きます。
     */
    config();
    setTimeout(function () {
      if (_ua.SP) {
        AOS.init({
          offset: 180,
          once: true,
          duration: 1200
        });
      } else {
        AOS.init({
          offset: 200,
          once: true,
          duration: 1200
        });
      }

      if (!($('.wrapper').attr('id') === "index")) {
        $('.js-lowMv').addClass('is-animeStart');
        $('.js-fadeAnime').removeClass('is-fadeout');
      }
    }, 1500);

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

      if (ipad == true) {
        viewportContent = "width=1200";
      } else {
        viewportContent = "width=device-width,initial-scale=1.0,maximum-scale=1.5,user-scalable=yes";
      }

      document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
    }

    if (_ua.SP || ipad == true) {
      window.addEventListener("load", updateMetaViewport, false);
    } //android tel設定


    $("a[href^=tel]").click(function () {
      location.href = $(this).attr("href");
      return false;
    });
    $('a[href^="#"]').click(function () {
      var speed = 500;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({
        scrollTop: position
      }, speed, "swing");
      return false;
    });
    /**
     * PAGE TOP
     * @description
     */

    var $topBtn = $('.pagetop');
    $topBtn.on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 500, "linear");
      return false;
    });
    /**
     * SP NAVI
     * @description
     */

    var $spMenu = $('#spMenu'),
        $gNav = $('#gNav'),
        spNavFlag = false;

    if (_breakP.SP) {
      $spMenu.on('click', function () {
        if (spNavFlag) {
          $spMenu.removeClass('spMenu-active');
          $gNav.fadeOut().removeClass('gNav-active');
          spNavFlag = false;
        } else {
          $spMenu.addClass('spMenu-active');
          $gNav.fadeIn().addClass('gNav-active');
          spNavFlag = true;
        }
      });
    }
    /**
     * login page(cookie version)
     * md5.jsを使って暗号化はしているものの簡易的なもののため、個人情報等重要な情報を扱うページには利用しないこと
     * @description
     * 現在loginページの処理をlogin page(localStorage version)の方を適用しています。
     * login page(localStorage version)を使用する時は(cookie version)を削除して使用してください
     */
    // アタリ用のコードです。login page(cookie version)を使用する時はlogin page(localStorage version)以下の範囲を削除してください


    var currentPage = $('.wrapper').attr('id'),
        currentPath = window.location.href.indexOf("limited");

    if (currentPath != -1 || currentPage == 'login') {
      var pw = {};
      var inputData;
      console.log(currentPage);

      pw.init = function () {
        // localStorageのキーの定義
        var limitedKey = window.localStorage.getItem('accessData');

        if (currentPage == 'login') {
          if (limitedKey != 'logined') {
            // 限定ログインページ初来訪時の処理
            $('#submit').bind('click touchstart', function () {
              inputData = $('#password').val();
              pw.auth(inputData); // パスワードが間違ってた時にリロードしてしまう処理を無効化

              return false;
            });
          } else {
            // 限定ログインページパスワード認証済みの処理
            window.localStorage.setItem('accessData', 'logined');
            location.href = '../limited/';
          }
        } else {
          // 限定ページに直接遷移した時にクッキーを認証するための処理
          loginCheck(limitedKey);
        }
      };

      pw.auth = function (value) {
        // md5の暗号を解読するための処理
        var str = CybozuLabs.MD5.calc(value); // アタリ用パスワード（本番用パスワードを追加するタイミングでコメントアウトを削除してください）
        // Password: atari

        console.log(str);

        if (str == 'eba66cb681f8c57eb8cab69ad93ac1ed') {
          window.localStorage.setItem('accessData', 'logined');
          location.href = '../limited/';
        } else {
          alert('パスワードが間違っています');
        }
      };

      loginCheck = function loginCheck(limitedKey) {
        if (limitedKey != 'logined') {
          var urlArray = location.href.split('limited'),
              innerPath = urlArray[1],
              pathCount = (innerPath.match(/\//g) || []).length,
              pathLayer = '';

          for (var i = 0; i < pathCount; i++) {
            pathLayer += '../';
          }

          location.href = pathLayer + 'login/';
        }
      }; // パスワード処理初期化


      pw.init();
    }

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
    }); //印刷設定

    var $btPrint = $(".js-btPrint"),
        $body = $("body");
    $btPrint.on('click', function () {
      $body.addClass("is-printOff");
      window.print();
      $body.removeClass("is-printOff");
      return false;
    }); //アコーディオン

    var accordion = $('.js-accordion');
    accordion.each(function () {
      var accordionInner = $(this).find('.js-accordionInner');
      var accordionCont = $(this).find('.js-accordionCont');
      var accordionBtn = $(this).find('.js-accordionBtn');
      var accordionBtnH = $(this).find('.js-accordionBtn').innerHeight();
      accordionInner.css('height', accordionBtnH); // $(window).on('load', function () {
      // });

      accordionBtn.find('.el-blackBtn').on('click', function () {
        var accordionContH = accordionCont.innerHeight();

        if (accordionInner.hasClass('is-accordionOpen')) {
          accordionInner.removeClass('is-accordionOpen');
          accordionInner.css('height', accordionBtnH);
          $(this).find('.text').text('続きを読む');
        } else {
          accordionInner.addClass('is-accordionOpen');
          accordionInner.css('height', accordionContH + accordionBtnH);
          $(this).find('.text').text('非表示にする');
        }
      });
    });
    var stylePanelBlock = $('.js-panelBlock');

    if (stylePanelBlock.length) {
      stylePanelBlock.each(function () {
        var stylePanel = $(this).find('.js-panel');
        stylePanel.on('click', function () {
          if (_ua.SP) {
            if ($(this).hasClass('is-active')) {
              $(this).removeClass('is-active');
            } else {
              $(this).addClass('is-active');
            }
          } else {
            var thisPanelCount = $(this).index();
            stylePanel.removeClass('is-active');
            stylePanel.removeClass('is-arrowRev');
            stylePanel.each(function () {
              panelCount = $(this).index();

              if (thisPanelCount > panelCount) {
                $(this).addClass('is-arrowRev');
              }
            });
            $(this).addClass('is-active');
          }
        });
      });
    }

    var mask = $('.js-mask');

    if (mask.length) {
      var toLowPageStart = function toLowPageStart() {
        var startScrollTop = $(window).scrollTop();

        if (!(first === true)) {
          if (startScrollTop > 1) {
            mask.addClass('is-maskActive');
            $('html, body').css({
              'overflow': 'visible',
              'position': 'static',
              'top': '0'
            }).scrollTop(0);
            $('body').addClass('is-animeStart');
            setTimeout(function () {
              pageOpen.addClass('is-hide');
            }, 2000);
            setTimeout(function () {
              $('body').addClass('is-pageStart').scrollTop(0);
            }, 3000);
          }
        } else {
          first = false;
        }
      };

      var pageOpen = $('.js-pageOpen');
      var first = true;
      setTimeout(function () {
        $('body').addClass('is-mainVisualAnimeStart');
      }, 0);
      setTimeout(function () {
        $(window).on('scroll', function () {
          if (!$('body').hasClass('is-pageStart')) {
            toLowPageStart();
          }
        });
      }, 0);
    }

    if (!_ua.SP) {
      var doWhenIntersect = function doWhenIntersect(entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            leaf.removeClass('is-leafHide');
            $(window).on("load scroll", function () {
              clearTimeout(timeoutId);

              if (!leaf.hasClass('is-leafHide')) {
                $('.leaf__block').removeClass('is-start');
                timeoutId = setTimeout(function () {
                  if (number === true) {
                    number = false;
                    $('.leaf__block--first').addClass('is-start');
                  } else {
                    number = true;
                    $('.leaf__block--second').addClass('is-start');
                  }
                }, 500);
              }
            });
          } else {
            leaf.addClass('is-leafHide');
          }
        });
      };

      var timeoutId;
      var number = true;
      var leaf = $('.js-leaf');
      var boxes = document.querySelectorAll(".js-leafAnimeZone");
      var options = {
        root: null,
        rootMargin: '-100% 0px 0px 0px',
        threshold: 0
      };
      var observer = new IntersectionObserver(doWhenIntersect, options);
      Array.prototype.forEach.call(boxes, function (box) {
        observer.observe(box);
      });
    }

    var $tab = $('.js-tabSelect');

    if ($tab.length) {
      var setH = function setH() {
        contHeight = $tabContent.find('.is-open').innerHeight();
        $tabContent.css({
          'height': '' + contHeight + 'px'
        });
      };

      var select = function select(index) {
        $tabContentItem.removeClass('is-open');
        $tabContentItem.eq(index).addClass('is-open');
        $tabSelect.removeClass('is-active');
        $tabSelect.eq(index).addClass('is-active');
        $specListItem.removeClass('is-active');
        $specListItem.eq(index).addClass('is-active');

        if (index == 0) {
          $guide.addClass('is-active');
        } else {
          $guide.removeClass('is-active');
        }
      };

      var $tabSelect = $('.js-tabSelect__item'),
          $tabContent = $('.js-tabContent'),
          $tabContentItem = $('.js-tabContent__item');
      $specList = $('.js-specList');
      $specListItem = $('.js-specList__item');
      $guide = $('.floorBlock__cap');
      ;
      ;
      var hash = window.location.hash;
      console.log(hash);

      switch (hash) {
        case '#basic':
          var index = 0;
          break;

        case '#style01':
          var index = 1;
          break;

        case '#style02':
          var index = 2;
          break;

        case '#style03':
          var index = 3;
          break;

        default:
          var index = 0;
          break;
      }

      select(index);
      setH();
      $(window).on("load resize", function () {
        setH();
      });
      $tabSelect.click(function () {
        var index = $tabSelect.index(this);
        select(index);
        setH();
      });
    }
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
          autoHeight: true
        });
        var delayScore = 0;
        $('.js-line').each(function () {
          $(this).css('transition-delay', '' + delayScore + 's');
          delayScore += 0.2;
        });
        break;

      case 'roomplan':
        break;

      case 'access':
        var lineDisk = $('.js-lineDisk');
        var lineCard = $('.lineCard');
        var modal = $('.js-modal');
        var modalOverLay = $('.js-modalOverLay');
        var modalCont = $('.js-modalCont');
        var modalCloseBtn = $('.js-modalCloseBtn');
        lineDisk.on('click', function () {
          var lineCardNum = $(this).attr('data-num');
          var lineCardActive = $('.lineCard--' + lineCardNum + '');
          modalCont.append(modalImg + modalTxt);

          if (!_ua.SP) {
            lineCard.removeClass('is-active');
            lineCardActive.addClass('is-active');
            console.log(lineCardActive);
          } else {
            modalCont.empty();
            modal.addClass('is-open');
            var modalImg = lineCardActive.find('.lineCard__img').html();
            var modalTxt = lineCardActive.find('.lineCard__station').html();
            modalCont.append('<div class="leisureModalCard"><div class="leisureModalCard__img">' + modalImg + '</div><div class="leisureModalCard__station">' + modalTxt + '</div></div>');
          }
        });
        modal.on('click', function (e) {
          if (!$(e.target).closest(modalCont).length) {
            console.log('false');

            if (modal.hasClass('is-open')) {
              modal.removeClass('is-open');
            }
          } else {
            console.log('true');
          }
        });

        if (_ua.SP) {
          var setLeft;
          $(".js-panorama").mCustomScrollbar({
            axis: "x",
            theme: "light-3",
            setLeft: "calc(50% + 40px)",
            advanced: {
              autoExpandHorizontalScroll: true
            }
          });
        }

        break;

      case 'lifestyle':
        break;

      case 'login':
        break;

      case 'limitedplan_detail':
        break;

      default:
        break;
    }
  });
})(jQuery);
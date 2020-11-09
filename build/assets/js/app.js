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
  };

  $(function () {

    let walkman = $('.js-walkman');
    let bodyObj = $('.js-body');
    let headObj = $('.js-head');
    let foot = $('.js-foot');
    let footDelay = $('.js-foot').eq(1);
    let footObj = $('.footObj');
    let footObjDelay = $('.js-foot').eq(1).find('.footObj');
    let footBg = $('.js-footBg');
    let footBgDelay = $('.js-foot').eq(1).find('.js-footBg');
    let kick = "../assets/audio/kick.mp3";
    let song = "../assets/audio/audio.mp3";
    var kickPlayer = new Audio(kick);
    var songPlayer = new Audio(song);
    var testTimer;

    kickPlayer.volume = 1;
    songPlayer.volume = 0.2;

    function metronome(tempo, beat) {

      let animeTime = Math.floor(60 / tempo * 1000);
      let longAnimeTime = animeTime * 2;



      var promise1 = new Promise(function(resolve, reject) {
        setTimeout(() => {

          bodyObj.css('animation-duration', '' + animeTime + 'ms');
        headObj.css('animation-duration', '' + animeTime + 'ms');

        footObj.css('animation-duration', '' + longAnimeTime + 'ms');
        footObjDelay.css('animation-delay', '' + animeTime + 'ms');

        footBg.css('animation-duration', '' + longAnimeTime + 'ms');
        footBgDelay.css('animation-delay', '' + animeTime + 'ms');

        walkman.addClass('is-active');
          foot.css('animation-duration', '' + longAnimeTime + 'ms');
          footDelay.css('animation-delay', '' + animeTime + 'ms');
        }, 0);
      });

      var promise2 = new Promise(function(resolve, reject) {
        setTimeout(() => {
          testTimer = setInterval(function () {
            kickPlayer.play();
          }, animeTime);
          songPlayer.play();
          songPlayer.loop = true;
        }, animeTime / 2);
});





      console.log(animeTime / 2)
    }

    $('.start').on('click', function () {
      var speed = prompt("BPM60~120くらいのテンポ感で歩きたいそうです。70~90くらいだと丁度良いそうです。");
      $('.replay').addClass('is-active');

      if (speed == "" || speed == null) {
        alert('あなたにテンポを決めてくれないと歩けないそうです。');
      } else if (speed <= 120 && speed >= 60) {
        metronome(speed, 4);
        $(this).addClass('is-hide');
      } else if (speed > 120) {
        alert('速すぎだそうです。');
      } else if (speed < 60) {
        alert('遅すぎて逆に疲れるそうです。');
      } else {
        alert('うまく入力できてないみたいです。（数値が全角になってるとか？）');
      }
    });
    $('.replay').on('click', function () {
      $('.start').removeClass('is-hide');
      $('.js-walkman').removeClass('is-active');
      $(this).removeClass('is-active');
      songPlayer.pause(0);
      kickPlayer.pause(0);
      songPlayer.currentTime = 0;
      clearInterval(testTimer);
    });

  });

  var agent = window.navigator.userAgent.toLowerCase();
  var ipad = agent.indexOf('ipad') > -1 || agent.indexOf('macintosh') > -1 && 'ontouchend' in document;
  $(function () {
    switch ($('.wrapper').attr('id')) {
      case 'template':

        break;

      case 'walkman':
        break;

      default:
        break;
    }
  });
})(jQuery);

  });
})(jQuery);
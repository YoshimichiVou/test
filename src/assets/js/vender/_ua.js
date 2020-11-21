import _MatchMedia from './_matchMedia';
export default class _UA {
  constructor() {
    this.CLASS_DESKTOP = 'device-desktop';
    this.CLASS_TOUCH = 'device-touch';
    this.$body = document.querySelector('html');
    this.SP = 736;
    this._touchDevice();

    const pc = () => {
      this.$body.classList.remove('is-sp');
      this.$body.classList.remove('is-tab');
      this.$body.classList.add('is-pc');
    };
    const tab = () => {
      this.$body.classList.remove('is-sp');
      this.$body.classList.remove('is-pc');
      this.$body.classList.add('is-tab');
    };
    const sp = () => {
      this.$body.classList.remove('is-pc');
      this.$body.classList.remove('is-tab');
      this.$body.classList.add('is-sp');
    };
    const breakpoint = new _MatchMedia(pc, tab, sp);
    const useragent = window.navigator.userAgent.toLowerCase();
    if (useragent.indexOf('msie') !== -1 || useragent.indexOf('trident') !== -1) {
      this.$body.classList.add('browser-msie');
    } else if (useragent.indexOf('edge') !== -1) {
      this.$body.classList.add('browser-edge');
    } else if (useragent.indexOf('chrome') !== -1) {
      this.$body.classList.add('browser-chrome');
    } else if (useragent.indexOf('safari') !== -1) {
      this.$body.classList.add('browser-safari');
    } else if (useragent.indexOf('firefox') !== -1) {
      this.$body.classList.add('browser-firefox');
    } else if (useragent.indexOf('opera') !== -1) {
      this.$body.classList.add('browser-opera');
    }
  }
  _touchDevice() {
    const flag = window.ontouchstart === null ? true : false;
    if (flag) {
      this.$body.classList.add(this.CLASS_TOUCH);
    } else {
      this.$body.classList.add(this.CLASS_DESKTOP);
    }
    return flag;
  }
  _PC() {
    const flag = this.$body.classList.contains('is-pc') ? true : false;
    return flag;
  }
  _TAB() {
    const flag = this.$body.classList.contains('is-tab') ? true : false;
    return flag;
  }
  _SP() {
    const flag = this.$body.classList.contains('is-sp') ? true : false;
    return flag;
  }
}

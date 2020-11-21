export default class _MatchMedia {
  constructor(_PC, _TAB, _SP) {
    this._PC = _PC;
    this._TAB = _TAB;
    this._SP = _SP;
    this.matchSP = window.matchMedia('(max-width: 478px)');
    this.matchTabMax = window.matchMedia('(max-width: 1200px)');
    this.matchTabMin = window.matchMedia('(min-width: 479px)');
    this.matchLandscape = window.matchMedia('(orientation: portrait)');
    const breakpoint = () => {
      if (this.matchSP.matches) {
        this._SP();
      } else if (this.matchTabMin.matches && this.matchTabMax.matches) {
        this._TAB();
      } else {
        this._PC();
      }
    };
    this.matchSP.addListener(breakpoint);
    this.matchTabMax.addListener(breakpoint);
    this.matchTabMin.addListener(breakpoint);
    this.matchLandscape.addListener(breakpoint);
    window.addEventListener('orientationchange', () => {
      location.reload();
    });
    breakpoint();
  }
}

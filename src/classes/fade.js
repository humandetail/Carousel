import { Carousel } from './carousel';

class Fade extends Carousel {
  constructor ($, options) {
    super($, options);

    this.init();
  }

  init () {
    this.autoPlay();
    this.bindEvent();
  }

  handleClick (ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          tagName = tar.tagName.toLowerCase();

    switch (tagName) {
      case 'button':
        const dir = tar.dataset.dir;
        this._setIndex(dir);
        this._slideChange(this.curIndex);
        break;
      case 'i':
        this.curIndex = $(tar).index();
        this._slideChange(this.curIndex);
        break;
      default:
        break;
    }
  }

  run () {
    this._setIndex('next');
    this._slideChange(this.curIndex);
  }

  _setIndex (dir) {
    switch (dir) {
      case 'prev':
        if (this.curIndex <= 0) {
          this.curIndex = this.$items.length - 1;
        } else {
          this.curIndex --;
        }
        break;
      case 'next':
        if (this.curIndex >= this.$items.length - 1) {
          this.curIndex = 0;
        } else {
          this.curIndex ++;
        }
        break;
      default:
        break;
    }
  }

  _slideChange (index) {
    this.$items.eq(index).addClass('active')
               .siblings('.carousel-item').removeClass('active');

    this._setIndicator(index);
  }
}


export { Fade };
import { Carousel } from './carousel';

class Slide extends Carousel {
  constructor ($, options) {
    super($, options);

    this.carItemWidth = this.$dom.width();

    this.init();
  }

  init () {
    this.cloneItem();
    this.autoPlay();
    this.bindEvent();
  }

  // 保证无缝轮播，需要在后面追加一项
  cloneItem () {
    const cloneItem = this.$items.eq(0).clone();
    this.$list.append(cloneItem);
    this.setListWidth();
  }

  // 计算list的宽度
  setListWidth () {
    this.$list.css({
      width: (this.$items.length + 1) * this.carItemWidth
    })
  }

  handleClick (ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          tagName = tar.tagName.toLowerCase();

    switch (tagName) {
      case 'button':
        const dir = tar.dataset.dir;
        this._slideAction(dir)
        break;
      case 'i':
        this.curIndex = $(tar).index();
        this._slideChange(this.curIndex, '', false);
        break;
      default:
        break;
    }
  }

  run () {
    this._slideAction('next');
  }

  // 设置slide切换的方式
  _slideAction (dir) {
    let t = null;
    switch (dir) {
      case 'next':
        // 注意 此时的items.length还是8
        if (this.curIndex === this.$items.length) {
          this.curIndex = 1;
          this._slideChange(this.curIndex, dir, true);

          t = setTimeout(() => {
            clearTimeout(t);
            // 当跑完最后一张的时候，让他立即切换回第一张
            this._slideChange(this.curIndex, dir, false);
          }, 100);
        } else {
          this.curIndex ++;
          this._slideChange(this.curIndex, dir, false);
        }
        break;
      case 'prev':
        if (this.curIndex === 0) {
          this.curIndex = this.$items.length - 1;
          this._slideChange(this.curIndex, dir, true);

          t = setTimeout(() => {
            clearTimeout(t);
            // 当跑完最后一张的时候，让他立即切换回第一张
            this._slideChange(this.curIndex, dir, false);
          }, 100);
        } else {
          this.curIndex --;
          this._slideChange(this.curIndex, dir, false);
        }
        break;
      default:
        break;
    }
  }

  // 切换图片
  _slideChange (index, dir, isInitial) {
    const itemWidth = this.carItemWidth,
          itemsLength = this.$items.length;
    this.$list.css({
      'transform': `translate3d(${isInitial ? (dir === 'next' ? 0 : -itemWidth * itemsLength) : (-index * itemWidth)}px, 0, 0)`,
      'transition-duration': isInitial ? 'initial' : '.5s'
    });

    this._setIndicator((index === itemsLength || index === 0) ? 0 : index);
  }
}

export { Slide };
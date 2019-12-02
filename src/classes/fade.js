class Fade {
  constructor ($, options) {
    this.$dom = $(options.dom);
    this.$list = this.$dom.children('.carousel-list');
    this.$items = this.$list.children('.carousel-item');
    this.$indicator = this.$dom.children('.carousel-indicator');
    this.$indicatorItems = this.$indicator.children('.carousel-indicator-item');

    this.speed = options.speed || 3000;
    this.curIndex = 0;
    this.timer = null;

    this.init();
  }

  init () {
    this.autoPlay();
    this.bindEvent();
  }

  bindEvent () {
    this.$dom.on('mouseover', { event: 'in' }, $.proxy(this.mouseInOut, this));
    this.$dom.on('mouseout', { event: 'out' }, $.proxy(this.mouseInOut, this));
    this.$dom.on('click', $.proxy(this.handleClick, this));
  }

  mouseInOut (e) {
    const event = e.data.event;

    switch (event) {
      case 'in':
        clearTimeout(this.timer);
        break;
      case 'out':
        this.autoPlay();
        break;
      default:
        break;
    }
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

  autoPlay () {
    this.timer = setInterval($.proxy(this.run, this), this.speed);
  }

  run () {
    this._setIndex('next');
    this._slideChange(this.curIndex);
  }

  _setIndex (control) {
    switch (control) {
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

  // 
  _slideChange (index) {
    this.$items.eq(index).addClass('active')
               .siblings('.carousel-item').removeClass('active');
    this.$indicatorItems.eq(index).addClass('active')
                          .siblings('.carousel-indicator-item').removeClass('active');
  }
}


export { Fade };
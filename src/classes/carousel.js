class Carousel {
  constructor ($, options) {
    this.$dom = $(options.dom);
    this.$list = this.$dom.children('.carousel-list');
    this.$items = this.$list.children('.carousel-item');
    this.$indicator = this.$dom.children('.carousel-indicator');
    this.$indicatorItems = this.$indicator.children('.carousel-indicator-item');

    this.speed = options.speed || 3000;
    this.curIndex = 0;
    this.timer = null;

  }

  /**
   * 事件绑定
   */
  bindEvent () {
    this.$dom.on('mouseover', { event: 'in' }, $.proxy(this.mouseInOut, this));
    this.$dom.on('mouseout', { event: 'out' }, $.proxy(this.mouseInOut, this));
    this.$dom.on('click', $.proxy(this.handleClick, this));
  }

  /**
   * 鼠标滑入滑出的事件处理函数
   * @param { Object } e 事件对象 
   */
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

  /**
   * 自动切换
   */
  autoPlay () {
    this.timer = setInterval($.proxy(this.run, this), this.speed);
  }

  _setIndicator (index) {
    this.$indicatorItems.eq(index).addClass('active')
                        .siblings('.carousel-indicator-item').removeClass('active');
  }
}

export { Carousel };
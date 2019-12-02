// import { Fade as Carousel } from './classes/fade';
// import './assets/styles/fade.scss';

import { Slide as Carousel } from './classes/slide';
import './assets/styles/slide.scss';

new Carousel(jQuery, {
  dom: '.J_carousel',
  speed: 2000
});
import { Fade } from './classes/fade';
import './assets/styles/fade.scss';

new Fade(jQuery, {
  dom: '.J_carousel',
  speed: 3000
});
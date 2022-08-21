//preload.js
//直接在app定义会直接给到main里边
import { net } from 'electron';
window['preLoad'] = () => {
  net;
};

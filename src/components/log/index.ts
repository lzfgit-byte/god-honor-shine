import { createVNode, render } from 'vue';
import { executeFunc } from '@ghs/share';
import GhsLog from './ghs-log.vue';

const waitTime = (during = 200): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, during);
  });
};
export interface GHSLogExpose {
  log: (info: string) => void;
  show: () => void;
  hide: () => void;
  showDialog: () => void;
  detail: (detail: string[]) => void;
}
type VoidFunc = () => void;
export class GHSClassLog {
  private static id = 'ghs-log-container';
  private static doLog: (info: string) => void;
  private static show: VoidFunc;
  private static hide: VoidFunc;
  private static detail: (detail: string[]) => void;
  private static onShowDialog: VoidFunc;
  private static showDialog: VoidFunc;
  private static onHideDialog: VoidFunc;
  private static timer: any;
  private static el: HTMLDivElement;
  private static clear() {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  }

  private static watch() {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.hide();
    }, 800);
  }

  private static hover() {
    this.el.addEventListener('mouseenter', () => {
      this.clear();
    });
    this.el.addEventListener('mouseleave', () => {
      this.watch();
    });
  }

  static registerEvent(show?: VoidFunc, hide?: VoidFunc) {
    this.onShowDialog = show;
    this.onHideDialog = hide;
  }

  static async log(info = '') {
    if (this.doLog) {
      if (info) {
        this.doLog(info);
        this.show();
        this.watch();
      }

      return { detail: this.detail, showDialog: this.showDialog };
    }
    if (document.getElementById(this.id)) {
      return;
    }
    const $app = document.getElementById('app');
    const vNode = createVNode(GhsLog, {
      log: info,
      onShowDialog: () => {
        executeFunc(this.onShowDialog);
      },
      onHideDialog: () => {
        executeFunc(this.onHideDialog);
      },
    });
    const el = document.createElement('div');
    render(vNode, el);
    const expose: GHSLogExpose =
      vNode?.component?.exposed || (vNode?.component?.exposeProxy as any);
    this.el = el.firstElementChild as HTMLDivElement;
    $app.appendChild(el);
    await waitTime(10);
    this.show = expose.show;
    this.hide = expose.hide;
    this.detail = expose.detail;
    this.showDialog = expose.showDialog;
    if (info) {
      expose.show();
      this.watch();
      this.hover();
    }
    this.doLog = expose.log;
    return { detail: this.detail, showDialog: this.showDialog };
  }
}

import { createVNode, render } from 'vue';
import type {
  MessageItemExpose,
  MessageItemProp,
  MessageType,
  NotifyExpose,
  NotifyItemProp,
} from './types';
import message from './components/message-item.vue';
import notify from './components/notification.vue';

const waitTime = (during = 200): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, during);
  });
};

export class Message {
  static key = 1;
  static wrapperClass = 'ghs-message-wrapper';
  static getKey() {
    return `${++this.key}`;
  }

  static async destroy(expose: MessageItemExpose, container: HTMLDivElement) {
    await waitTime(1500);
    const timer = setInterval(async () => {
      if (expose.check()) {
        expose.hide();
        await waitTime(200);
        container.remove();
        clearInterval(timer);
      }
    }, 10);
  }

  static getShowLength() {
    return document.querySelectorAll(`.${this.wrapperClass}`).length;
  }

  static async showMsg(msg: string, type: MessageType = 'info') {
    const $app = document.getElementById('app');
    const key = this.getKey();
    const props: MessageItemProp = {
      key,
      info: msg,
      type,
      index: this.getShowLength(),
    };
    const vNode = createVNode(message, props as any);
    let container = document.createElement('div');
    container.classList.add(this.wrapperClass);
    render(vNode, container);
    const expose: MessageItemExpose =
      vNode?.component?.exposed || (vNode?.component?.exposeProxy as any);
    $app.appendChild(container);
    await waitTime(1);
    expose.show();
    await this.destroy(expose, container);
  }

  static async info(msg: string) {
    await this.showMsg(msg, 'info');
  }

  static async success(msg: string) {
    await this.showMsg(msg, 'success');
  }

  static async error(msg: string) {
    await this.showMsg(msg, 'error');
  }
}

/**
 *侧边弹出栏
 */
export class Notify {
  static wrapperClass = 'ghs-notification';
  static getShowLength() {
    return document.querySelectorAll(`.${this.wrapperClass}`).length;
  }

  static async destroy(expose: NotifyExpose, container: HTMLDivElement) {
    expose.hide();
    await waitTime(200);
    container.remove();
  }

  static getCurrentTop() {
    const els = document.querySelectorAll(`.${this.wrapperClass}`);
    let top = 10;
    els.forEach((el: HTMLDivElement) => {
      top += el.offsetHeight + 10;
      console.log(el.offsetHeight);
    });
    return top;
  }

  static async show(percentage: number, title: string) {
    const $app = document.getElementById('app');
    const key = Message.getKey();
    const props: NotifyItemProp = {
      key,
      percentage,
      title,
      index: this.getShowLength(),
      top: this.getCurrentTop(),
      onClose: () => {
        this.destroy(expose, divEl);
      },
    };
    const vNode = createVNode(notify, props as any);
    let divEl: HTMLDivElement = document.createElement('div');
    render(vNode, divEl);
    const expose: NotifyExpose =
      vNode?.component?.exposed || (vNode?.component?.exposeProxy as any);
    $app.appendChild(divEl);
    await waitTime(1);
    expose.show();
  }
}

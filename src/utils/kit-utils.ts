import { notification } from 'ant-design-vue';
export const notify = (key: any, msg: string, title: string) => {
  return notification.info({
    key,
    message: title,
    description: msg,
  });
};

export type MessageType = 'info' | 'success' | 'error';
export interface MessageItemProp {
  info?: string;
  type?: MessageType;
  show?: boolean;
  index?: number;
  key?: string;
}
export interface MessageItemExpose {
  show: () => void;
  hide: () => void;
  update: (index?: number, info?: string) => void;
  check: () => boolean;
}
export const color: Record<MessageType, any> = {
  info: { back: '#f4f4f5', color: '#909399' },
  success: { back: '#f0f9eb', color: '#67c23a' },
  error: { back: '#fef0f0', color: '#f57171' },
};
/// /////////////通知
export interface NotifyItemProp {
  percentage?: number;
  title?: string;
  key?: string;
  index?: number;
  top?: number;
  onClose?: () => void;
}
export interface NotifyExpose {
  show: () => void;
  hide: () => void;
  update: (index?: number, percentage?: number, title?: string) => void;
  check: () => boolean;
}

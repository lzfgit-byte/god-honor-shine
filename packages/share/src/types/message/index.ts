export type MessageType = 'info' | 'waring' | 'error' | 'success';

export interface ProcessMsgType {
  title?: string;
  percentage?: number;
  key?: string;
  global?: boolean;
  info?: string;
  down?: boolean;
}

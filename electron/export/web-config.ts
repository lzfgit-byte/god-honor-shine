import { WebConfigEntity } from '@ghs/constant';
import { MessageUtil } from '../utils/message';

/**
 * 保存WebConfig
 * @param key
 * @param code
 */
export const saveWebConfigCode = async (key: string, code: string) => {
  const one = await WebConfigEntity.findOne({ where: { key } });
  if (one) {
    one.code = code;
    await WebConfigEntity.update(one.id, one);
    MessageUtil.success(`代码更新成功`);
    return;
  }
  const ent = new WebConfigEntity();
  ent.key = key;
  ent.code = code;
  ent.sort = 0;
  await ent.save();
  MessageUtil.success('代码保存成功');
};
/**
 * 获取webConfig
 */
export const getWebConfigCode = async (key: string) => {
  const one = await WebConfigEntity.findOne({ where: { key } });
  return one?.code;
};
/**
 * 列出webConfig
 */
export const listWebConfig = async () => {
  return await WebConfigEntity.find();
};

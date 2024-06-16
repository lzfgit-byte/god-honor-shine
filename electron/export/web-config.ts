import { WebConfigEntity } from '@ghs/constant';

export const saveWebConfigCode = async (key: string, code: string) => {
  const one = await WebConfigEntity.findOne({ where: { key } });
  if (one) {
    one.code = code;
    return await WebConfigEntity.update(key, one);
  }
  const ent = new WebConfigEntity();
  ent.key = key;
  ent.code = code;
  await ent.save();
};

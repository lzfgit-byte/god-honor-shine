import { getHtml } from '@/utils/functions';

const PORN_URL = 'https://bad.news/tag/porn';
export default () => {
  getHtml(PORN_URL).then((res) => {
    console.log(res);
  });
  return {};
};

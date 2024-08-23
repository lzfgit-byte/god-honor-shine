import type { AnalysisDetail, AnalysisVideoDetail } from '@ghs/types/src';
import { getCurrentBusiness } from '../business/business';
import { getCurrentKey } from '../business/use-init-web-config';

/**
 * 获取页面的解析数据
 */
export const getAnalysisDetail = async (url?: string): Promise<AnalysisDetail[]> => {
  return getCurrentBusiness(getCurrentKey())?.getAnalysisDetail(url);
};
/**
 * 获取 视频播放详细 AnalysisVideoDetail
 */
export const getAnalysisVideoDetail = async (url?: string): Promise<AnalysisVideoDetail[]> => {
  return getCurrentBusiness(getCurrentKey())?.getAnalysisVideoDetail(url);
};

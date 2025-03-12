import { asc, desc } from 'drizzle-orm';
import { TOrderType } from '../types/pagination';

export const orderBuilder = (orderType: TOrderType) => {
  return orderType === 'ASC' ? asc : desc;
};

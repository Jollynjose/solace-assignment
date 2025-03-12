export type TOrderType = 'ASC' | 'DESC';

export type TOrder<T> = {
  field: keyof T;
  type: TOrderType;
};

export interface IPagination<T> {
  offset: number;
  limit: number;
  order: TOrder<T>;
}

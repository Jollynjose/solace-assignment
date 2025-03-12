import { SQL } from 'drizzle-orm';
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core';

function withPagination<T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  offset = 1,
  limit = 3,
) {
  return qb.orderBy(orderByColumn).limit(limit).offset(offset);
}

export default withPagination;

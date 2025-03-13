import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import BaseRepository from './base';
import { asc, desc, eq, sql, SQL } from 'drizzle-orm';
import { db } from '@/lib';
import { advocates, advocatesToSpecialities, specialties } from '@/db/schema';
import { TAdvocates, TAdvocatesWithSpecialities } from '@/types';
import { IPagination } from '@/types/pagination';
import withPagination from '@/helpers/withPagination';
import { orderBuilder } from '@/helpers';

export class AdvocatesRepository extends BaseRepository<TAdvocates> {
  constructor(db: NodePgDatabase) {
    super(db);
  }

  async findAll(
    pagination?: IPagination<TAdvocates>,
    where?: SQL,
  ): Promise<TAdvocates[]> {
    try {
      let query = this.db.select().from(advocates).$dynamic();
      if (where) {
        query = query.where(where);
      }

      if (pagination) {
        const order = orderBuilder(pagination.order.type);

        query = withPagination(
          query,
          order(advocates[pagination.order.field]),
          pagination.offset,
          pagination.limit,
        );
      }

      return query;
    } catch (e) {
      throw e;
    }
  }

  async findAllWithSpecialities(
    pagination?: IPagination<TAdvocates>,
    where?: SQL,
  ): Promise<TAdvocatesWithSpecialities[]> {
    try {
      let query = this.db
        .select({
          id: advocates.id,
          firstName: advocates.firstName,
          lastName: advocates.lastName,
          city: advocates.city,
          degree: advocates.degree,
          yearsOfExperience: advocates.yearsOfExperience,
          phoneNumber: advocates.phoneNumber,
          createdAt: advocates.createdAt,
          specialities: sql`COALESCE(json_agg(json_build_object('id', ${specialties.id}, 'name', ${specialties.name})), '[]')`,
        })
        .from(advocates)
        .leftJoin(
          advocatesToSpecialities,
          eq(advocates.id, advocatesToSpecialities.advocatesId),
        )
        .leftJoin(
          specialties,
          eq(advocatesToSpecialities.specialtyId, specialties.id),
        )
        .groupBy(advocates.id)
        .$dynamic();

      if (where) {
        query.where(where);
      }

      if (pagination) {
        const order = orderBuilder(pagination.order.type);

        query = withPagination(
          query,
          order(advocates[pagination.order.field]),
          pagination.offset,
          pagination.limit,
        );
      }

      const count = this.db
        .select({
          count: sql`COUNT(*)`,
        })
        .from(advocates)
        .$dynamic();

      if (where) {
        count.where(where);
      }

      return (await query) as unknown as TAdvocatesWithSpecialities[];
    } catch (e) {
      throw e;
    }
  }

  async getCount(where?: SQL): Promise<number> {
    try {
      let query = this.db
        .select({
          count: sql`COALESCE(COUNT(*), 0)`,
        })
        .from(advocates)
        .$dynamic();
      if (where) {
        query = query.where(where);
      }

      const result = await query;

      return result[0].count as number;
    } catch (e) {
      throw e;
    }
  }
}

export const advocatesRepository = new AdvocatesRepository(db);

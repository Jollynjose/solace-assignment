import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import BaseRepository from './base';
import { eq, sql, SQL } from 'drizzle-orm';
import { db } from '@/lib';
import { advocates, advocatesToSpecialities, specialties } from '@/db/schema';
import { TAdvocates, TAdvocatesWithSpecialities } from '@/types';

class AdvocatesRepository extends BaseRepository<TAdvocates> {
  constructor(db: NodePgDatabase) {
    super(db);
  }

  async findAll(where?: SQL): Promise<TAdvocates[]> {
    try {
      const query = this.db.select().from(advocates).$dynamic();
      if (where) {
        query.where(where);
      }

      return query;
    } catch (e) {
      throw e;
    }
  }

  async findAllWithSpecialities(
    where?: SQL,
  ): Promise<TAdvocatesWithSpecialities[]> {
    try {
      const query = this.db
        .select({
          id: advocates.id,
          firstName: advocates.firstName,
          lastName: advocates.lastName,
          city: advocates.city,
          degree: advocates.degree,
          yearsOfExperience: advocates.yearsOfExperience,
          phoneNumber: advocates.phoneNumber,
          createdAt: advocates.createdAt,
          specialties: sql`COALESCE(json_agg(json_build_object('id', ${specialties.id}, 'name', ${specialties.name})), '[]')`,
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
        .$dynamic();

      if (where) {
        query.where(where);
      }

      return (await query) as unknown as TAdvocatesWithSpecialities[];
    } catch (e) {
      throw e;
    }
  }
}

export const advocatesRepository = new AdvocatesRepository(db);

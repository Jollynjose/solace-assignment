import { advocates } from '@/db/schema';
import { advocatesRepository, AdvocatesRepository } from '@/repositories';
import { TAdvocates, TAdvocatesResponse } from '@/types';
import { IPagination } from '@/types/pagination';
import { sql } from 'drizzle-orm';

export class AdvocatesService {
  private readonly advocateRepository: AdvocatesRepository;

  constructor(advocateRepository: AdvocatesRepository) {
    this.advocateRepository = advocateRepository;
  }

  async getAllAdvocates() {
    return this.advocateRepository.findAll();
  }

  async getAdvocatesWithSpecialities(
    pagination?: IPagination<TAdvocates>,
    searchParams?: string,
  ): Promise<TAdvocatesResponse> {
    let searchQuery = undefined;

    if (searchParams) {
      searchQuery = sql`CONCAT(${advocates.firstName}, ' ', ${
        advocates.lastName
      }) ILIKE ${`%${searchParams}%`}`;
    }

    const results = await Promise.all([
      this.advocateRepository.findAllWithSpecialities(pagination, searchQuery),
      this.advocateRepository.getCount(searchQuery),
    ]);

    return {
      data: results[0],
      total: results[1],
    };
  }
}

export const advocatesService = new AdvocatesService(advocatesRepository);

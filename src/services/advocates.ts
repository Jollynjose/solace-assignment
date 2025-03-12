import { advocates } from '@/db/schema';
import { advocatesRepository, AdvocatesRepository } from '@/repositories';
import { TAdvocates } from '@/types';
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
  ) {
    let searchQuery = undefined;

    if (searchParams) {
      searchQuery = sql`CONCAT(${advocates.firstName}, ' ', ${
        advocates.lastName
      }) ILIKE ${`%${searchParams}%`}`;
    }

    return this.advocateRepository.findAllWithSpecialities(
      pagination,
      searchQuery,
    );
  }
}

export const advocatesService = new AdvocatesService(advocatesRepository);

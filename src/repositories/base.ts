import { IPagination } from '@/types/pagination';
import { SQL } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

abstract class BaseRepository<T> {
  readonly db: NodePgDatabase;

  constructor(db: NodePgDatabase) {
    this.db = db;
  }

  findAll(pagination?: IPagination<T>, where?: SQL): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<T | null> {
    throw new Error('Method not implemented.');
  }

  create(data: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  update(id: number, data: Partial<T>) {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export default BaseRepository;

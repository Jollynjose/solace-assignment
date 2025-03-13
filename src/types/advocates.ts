import { advocates } from '@/db/schema';
import { TSpecialities } from './specialities';

export type TAdvocates = typeof advocates.$inferSelect;

export type TAdvocatesWithSpecialities = TAdvocates & {
  specialities: TSpecialities[];
};

export type TAdvocatesResponse = {
  data: TAdvocatesWithSpecialities[];
  total: number;
};

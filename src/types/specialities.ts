import { specialties } from '@/db/schema';

export type TSpecialities = typeof specialties.$inferSelect;

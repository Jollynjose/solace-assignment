import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  bigint,
  primaryKey,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

const specialties = pgTable(
  'specialties',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
  },
  (t) => [uniqueIndex('name_unique').on(t.name)],
);

const advocates = pgTable(
  'advocates',
  {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    city: text('city').notNull(),
    degree: text('degree').notNull(),
    yearsOfExperience: integer('years_of_experience').notNull(),
    phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (t) => [
    index('first_name_index').on(t.firstName),
    index('last_name_index').on(t.lastName),
  ],
);

const advocatesToSpecialities = pgTable(
  'advocates_to_specialities',
  {
    advocatesId: integer('advocates_id')
      .notNull()
      .references(() => advocates.id),
    specialtyId: integer('specialty_id')
      .notNull()
      .references(() => specialties.id),
  },
  (t) => [
    primaryKey({
      columns: [t.advocatesId, t.specialtyId],
    }),
  ],
);

const advocatesRelations = relations(advocates, ({ many }) => ({
  advocatesToSpecialities: many(advocatesToSpecialities),
}));

const specialtiesRelations = relations(specialties, ({ many }) => ({
  advocatesToSpecialities: many(advocatesToSpecialities),
}));

const advocatesToSpecialitiesRelations = relations(
  advocatesToSpecialities,
  ({ one }) => ({
    advocate: one(advocates, {
      fields: [advocatesToSpecialities.advocatesId],
      references: [advocates.id],
    }),
    specialty: one(specialties, {
      fields: [advocatesToSpecialities.specialtyId],
      references: [specialties.id],
    }),
  }),
);

export {
  advocates,
  specialties,
  advocatesToSpecialities,
  advocatesRelations,
  specialtiesRelations,
  advocatesToSpecialitiesRelations,
};

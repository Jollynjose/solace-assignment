CREATE TABLE "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" text NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" bigint NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "advocates_to_specialities" (
	"advocates_id" integer NOT NULL,
	"specialty_id" integer NOT NULL,
	CONSTRAINT "advocates_to_specialities_advocates_id_specialty_id_pk" PRIMARY KEY("advocates_id","specialty_id")
);
--> statement-breakpoint
CREATE TABLE "specialties" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "specialties_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "advocates_to_specialities" ADD CONSTRAINT "advocates_to_specialities_advocates_id_advocates_id_fk" FOREIGN KEY ("advocates_id") REFERENCES "public"."advocates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "advocates_to_specialities" ADD CONSTRAINT "advocates_to_specialities_specialty_id_specialties_id_fk" FOREIGN KEY ("specialty_id") REFERENCES "public"."specialties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "first_name_index" ON "advocates" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "last_name_index" ON "advocates" USING btree ("last_name");--> statement-breakpoint
CREATE UNIQUE INDEX "name_unique" ON "specialties" USING btree ("name");
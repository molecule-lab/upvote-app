CREATE TYPE "public"."category_enum" AS ENUM('idea', 'issue', 'feedback');--> statement-breakpoint
CREATE TYPE "public"."priority_enum" AS ENUM('low', 'medium', 'hight', 'urgent');--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('in-review', 'in-progress', 'completed', 'declined');--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "category" SET DATA TYPE "public"."category_enum" USING "category"::"public"."category_enum";--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "status" SET DATA TYPE "public"."status_enum" USING "status"::"public"."status_enum";--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "priority" SET DEFAULT 'medium'::"public"."priority_enum";--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "priority" SET DATA TYPE "public"."priority_enum" USING "priority"::"public"."priority_enum";--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_slug_unique" UNIQUE("slug");
ALTER TABLE "app_messages" DROP CONSTRAINT "app_messages_user_id_app_user_id_fk";
--> statement-breakpoint
ALTER TABLE "app_messages" DROP CONSTRAINT "app_messages_file_id_app_files_id_fk";
--> statement-breakpoint
ALTER TABLE "app_files" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "app_messages" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_messages" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "app_messages" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "app_messages" ALTER COLUMN "file_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_user" ADD COLUMN "user_type" text DEFAULT 'free' NOT NULL;
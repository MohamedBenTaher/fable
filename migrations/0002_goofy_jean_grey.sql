CREATE TABLE IF NOT EXISTS "app_conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app_messages" ADD COLUMN "conversation_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_conversations" ADD CONSTRAINT "app_conversations_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_messages" ADD CONSTRAINT "app_messages_conversation_id_app_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."app_conversations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

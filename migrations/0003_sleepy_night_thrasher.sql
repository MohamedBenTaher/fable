CREATE TABLE IF NOT EXISTS "app_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"paddle_subscription_id" text NOT NULL,
	"status" text NOT NULL,
	"plan_name" text NOT NULL,
	"price_id" text NOT NULL,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "app_subscriptions_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "app_subscriptions_paddle_subscription_id_unique" UNIQUE("paddle_subscription_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_subscriptions" ADD CONSTRAINT "app_subscriptions_user_id_app_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

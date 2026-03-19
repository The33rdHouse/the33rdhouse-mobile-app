ALTER TABLE `users` ADD `membershipTier` enum('free','seeker','sovereign','ascended') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripeSubscriptionId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStatus` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionEndsAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `affiliateCode` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `referredBy` int;--> statement-breakpoint
ALTER TABLE `users` ADD `xp` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `level` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `affiliateEarnings` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_affiliateCode_unique` UNIQUE(`affiliateCode`);
CREATE TABLE `affiliatePayouts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amount` int NOT NULL,
	`status` enum('pending','processing','paid','failed') NOT NULL DEFAULT 'pending',
	`paymentMethod` varchar(100),
	`paidAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `affiliatePayouts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professorContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`professorId` int NOT NULL,
	`type` enum('video','guide','qa','exercise') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`contentUrl` varchar(512),
	`duration` int,
	`requiredTier` enum('free','seeker','sovereign','ascended') NOT NULL DEFAULT 'free',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `professorContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`gateNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`bio` text NOT NULL,
	`expertise` text NOT NULL,
	`avatarUrl` varchar(512),
	`requiredTier` enum('free','seeker','sovereign','ascended') NOT NULL DEFAULT 'free',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `professors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`affiliateUserId` int NOT NULL,
	`referredUserId` int NOT NULL,
	`status` enum('pending','converted','cancelled') NOT NULL DEFAULT 'pending',
	`conversionDate` timestamp,
	`tier` enum('seeker','sovereign','ascended'),
	`commissionRate` int NOT NULL,
	`totalEarned` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`)
);

import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  // Membership tier: free, seeker ($33/mo), sovereign ($333/mo), ascended ($3333/mo)
  membershipTier: mysqlEnum("membershipTier", ["free", "seeker", "sovereign", "ascended"]).default("free").notNull(),
  // Stripe customer ID
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  // Stripe subscription ID
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  // Subscription status
  subscriptionStatus: varchar("subscriptionStatus", { length: 50 }),
  // Subscription end date
  subscriptionEndsAt: timestamp("subscriptionEndsAt"),
  // Affiliate code for referrals
  affiliateCode: varchar("affiliateCode", { length: 50 }).unique(),
  // Referred by user ID
  referredBy: int("referredBy"),
  // Total XP earned
  xp: int("xp").default(0).notNull(),
  // Current level
  level: int("level").default(1).notNull(),
  // Affiliate earnings in cents
  affiliateEarnings: int("affiliateEarnings").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Genesis Social Platform Tables

export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  mediaUrl: varchar("mediaUrl", { length: 512 }),
  mediaType: mysqlEnum("mediaType", ["image", "video", "none"]).default("none").notNull(),
  privacy: mysqlEnum("privacy", ["public", "private", "friends"]).default("public").notNull(),
  gateTag: int("gateTag"), // Optional Gate 0-12
  likesCount: int("likesCount").default(0).notNull(),
  commentsCount: int("commentsCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  parentId: int("parentId"), // For nested replies
  likesCount: int("likesCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const likes = mysqlTable("likes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  targetType: mysqlEnum("targetType", ["post", "comment"]).notNull(),
  targetId: int("targetId").notNull(),
  reactionType: varchar("reactionType", { length: 32 }).default("heart").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const follows = mysqlTable("follows", {
  id: int("id").autoincrement().primaryKey(),
  followerId: int("followerId").notNull(),
  followingId: int("followingId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull(),
  receiverId: int("receiverId").notNull(),
  content: text("content").notNull(),
  read: mysqlEnum("read", ["true", "false"]).default("false").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Professor/Mentor System Tables

export const professors = mysqlTable("professors", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  gateNumber: int("gateNumber").notNull(), // 0-12
  title: varchar("title", { length: 255 }).notNull(),
  bio: text("bio").notNull(),
  expertise: text("expertise").notNull(), // JSON array
  avatarUrl: varchar("avatarUrl", { length: 512 }),
  requiredTier: mysqlEnum("requiredTier", ["free", "seeker", "sovereign", "ascended"]).default("free").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const professorContent = mysqlTable("professorContent", {
  id: int("id").autoincrement().primaryKey(),
  professorId: int("professorId").notNull(),
  type: mysqlEnum("type", ["video", "guide", "qa", "exercise"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  contentUrl: varchar("contentUrl", { length: 512 }),
  duration: int("duration"), // in minutes
  requiredTier: mysqlEnum("requiredTier", ["free", "seeker", "sovereign", "ascended"]).default("free").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Affiliate Program Tables

export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  affiliateUserId: int("affiliateUserId").notNull(), // Who referred
  referredUserId: int("referredUserId").notNull(), // Who signed up
  status: mysqlEnum("status", ["pending", "converted", "cancelled"]).default("pending").notNull(),
  conversionDate: timestamp("conversionDate"),
  tier: mysqlEnum("tier", ["seeker", "sovereign", "ascended"]),
  commissionRate: int("commissionRate").notNull(), // Percentage (10, 15, 20)
  totalEarned: int("totalEarned").default(0).notNull(), // in cents
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const affiliatePayouts = mysqlTable("affiliatePayouts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  amount: int("amount").notNull(), // in cents
  status: mysqlEnum("status", ["pending", "processing", "paid", "failed"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 100 }),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["like", "comment", "follow", "message"]).notNull(),
  actorId: int("actorId").notNull(), // Who triggered the notification
  targetType: varchar("targetType", { length: 32 }),
  targetId: int("targetId"),
  content: text("content"),
  read: mysqlEnum("read", ["true", "false"]).default("false").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Type exports
export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;
export type Like = typeof likes.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;
export type Follow = typeof follows.$inferSelect;
export type InsertFollow = typeof follows.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

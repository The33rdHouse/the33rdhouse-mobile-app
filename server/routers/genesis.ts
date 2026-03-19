import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { posts, comments, likes, follows, messages, notifications } from "../../drizzle/schema";
import { eq, desc, and, or, sql } from "drizzle-orm";

export const genesisRouter = router({
  // Posts
  createPost: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(5000),
        mediaUrl: z.string().optional(),
        mediaType: z.enum(["image", "video", "none"]).default("none"),
        privacy: z.enum(["public", "private", "friends"]).default("public"),
        gateTag: z.number().min(0).max(12).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(posts).values({
        userId: ctx.user.id,
        content: input.content,
        mediaUrl: input.mediaUrl,
        mediaType: input.mediaType,
        privacy: input.privacy,
        gateTag: input.gateTag,
      });

      return { success: true };
    }),

  getFeed: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
        gateFilter: z.number().min(0).max(12).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      // Get posts from followed users + own posts + public posts
      const feedPosts = await db
        .select({
          id: posts.id,
          userId: posts.userId,
          content: posts.content,
          mediaUrl: posts.mediaUrl,
          mediaType: posts.mediaType,
          privacy: posts.privacy,
          gateTag: posts.gateTag,
          likesCount: posts.likesCount,
          commentsCount: posts.commentsCount,
          createdAt: posts.createdAt,
        })
        .from(posts)
        .where(
          input.gateFilter
            ? and(
                eq(posts.gateTag, input.gateFilter),
                or(eq(posts.privacy, "public"), eq(posts.userId, ctx.user.id))
              )
            : or(eq(posts.privacy, "public"), eq(posts.userId, ctx.user.id))
        )
        .orderBy(desc(posts.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return feedPosts;
    }),

  getPost: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const post = await db.select().from(posts).where(eq(posts.id, input.postId)).limit(1);
      return post[0] || null;
    }),

  deletePost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify ownership
      const post = await db.select().from(posts).where(eq(posts.id, input.postId)).limit(1);
      if (!post[0] || post[0].userId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }

      await db.delete(posts).where(eq(posts.id, input.postId));
      return { success: true };
    }),

  // Comments
  createComment: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        content: z.string().min(1).max(1000),
        parentId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(comments).values({
        postId: input.postId,
        userId: ctx.user.id,
        content: input.content,
        parentId: input.parentId,
      });

      // Increment comments count on post
      await db
        .update(posts)
        .set({ commentsCount: sql`${posts.commentsCount} + 1` })
        .where(eq(posts.id, input.postId));

      return { success: true };
    }),

  getComments: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const postComments = await db
        .select()
        .from(comments)
        .where(eq(comments.postId, input.postId))
        .orderBy(desc(comments.createdAt));

      return postComments;
    }),

  // Likes
  toggleLike: protectedProcedure
    .input(
      z.object({
        targetType: z.enum(["post", "comment"]),
        targetId: z.number(),
        reactionType: z.string().default("heart"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check if already liked
      const existing = await db
        .select()
        .from(likes)
        .where(
          and(
            eq(likes.userId, ctx.user.id),
            eq(likes.targetType, input.targetType),
            eq(likes.targetId, input.targetId)
          )
        )
        .limit(1);

      if (existing[0]) {
        // Unlike
        await db
          .delete(likes)
          .where(
            and(
              eq(likes.userId, ctx.user.id),
              eq(likes.targetType, input.targetType),
              eq(likes.targetId, input.targetId)
            )
          );

        // Decrement count
        if (input.targetType === "post") {
          await db
            .update(posts)
            .set({ likesCount: sql`${posts.likesCount} - 1` })
            .where(eq(posts.id, input.targetId));
        } else {
          await db
            .update(comments)
            .set({ likesCount: sql`${comments.likesCount} - 1` })
            .where(eq(comments.id, input.targetId));
        }

        return { liked: false };
      } else {
        // Like
        await db.insert(likes).values({
          userId: ctx.user.id,
          targetType: input.targetType,
          targetId: input.targetId,
          reactionType: input.reactionType,
        });

        // Increment count
        if (input.targetType === "post") {
          await db
            .update(posts)
            .set({ likesCount: sql`${posts.likesCount} + 1` })
            .where(eq(posts.id, input.targetId));
        } else {
          await db
            .update(comments)
            .set({ likesCount: sql`${comments.likesCount} + 1` })
            .where(eq(comments.id, input.targetId));
        }

        return { liked: true };
      }
    }),

  // Follows
  toggleFollow: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      if (ctx.user.id === input.userId) {
        throw new Error("Cannot follow yourself");
      }

      // Check if already following
      const existing = await db
        .select()
        .from(follows)
        .where(and(eq(follows.followerId, ctx.user.id), eq(follows.followingId, input.userId)))
        .limit(1);

      if (existing[0]) {
        // Unfollow
        await db
          .delete(follows)
          .where(and(eq(follows.followerId, ctx.user.id), eq(follows.followingId, input.userId)));
        return { following: false };
      } else {
        // Follow
        await db.insert(follows).values({
          followerId: ctx.user.id,
          followingId: input.userId,
        });
        return { following: true };
      }
    }),

  getFollowers: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const followers = await db
        .select()
        .from(follows)
        .where(eq(follows.followingId, input.userId));

      return followers;
    }),

  getFollowing: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const following = await db
        .select()
        .from(follows)
        .where(eq(follows.followerId, input.userId));

      return following;
    }),

  // Messages
  sendMessage: protectedProcedure
    .input(
      z.object({
        receiverId: z.number(),
        content: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(messages).values({
        senderId: ctx.user.id,
        receiverId: input.receiverId,
        content: input.content,
      });

      return { success: true };
    }),

  getConversation: protectedProcedure
    .input(z.object({ otherUserId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      const conversation = await db
        .select()
        .from(messages)
        .where(
          or(
            and(eq(messages.senderId, ctx.user.id), eq(messages.receiverId, input.otherUserId)),
            and(eq(messages.senderId, input.otherUserId), eq(messages.receiverId, ctx.user.id))
          )
        )
        .orderBy(desc(messages.createdAt));

      return conversation;
    }),

  // Notifications
  getNotifications: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const userNotifications = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, ctx.user.id))
      .orderBy(desc(notifications.createdAt))
      .limit(50);

    return userNotifications;
  }),

  markNotificationRead: protectedProcedure
    .input(z.object({ notificationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(notifications)
        .set({ read: "true" })
        .where(and(eq(notifications.id, input.notificationId), eq(notifications.userId, ctx.user.id)));

      return { success: true };
    }),
});

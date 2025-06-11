import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

// USERS
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image: varchar("image", { length: 512 }),
  role: varchar("role", { length: 50 }).default("user"),
  emailVerified: boolean("email_verified"),
  bio: text("bio"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// DISCUSSIONS
export const discussions = pgTable("discussions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  editedAt: timestamp("edited_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  pinned: boolean("pinned").default(false),
  featured: boolean("featured").default(false),
  category: varchar("category", { length: 100 }).notNull(),
  closed: boolean("closed").default(false),
});

// ANSWERS
export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  discussionId: integer("discussion_id")
    .notNull()
    .references(() => discussions.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  editedAt: timestamp("edited_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// DISCUSSION REACTIONS
export const discussionReactions = pgTable("discussion_reactions", {
  id: serial("id").primaryKey(),
  discussionId: integer("discussion_id")
    .notNull()
    .references(() => discussions.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  reaction: varchar("reaction", { length: 50 }).notNull(),
});

// ANSWER REACTIONS
export const answerReactions = pgTable("answer_reactions", {
  id: serial("id").primaryKey(),
  answerId: integer("answer_id")
    .notNull()
    .references(() => answers.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  reaction: varchar("reaction", { length: 50 }).notNull(),
});

// MESSAGES
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// RELATIONS

export const usersRelations = relations(users, ({ many }) => ({
  discussions: many(discussions),
  answers: many(answers),
  discussionReactions: many(discussionReactions),
  answerReactions: many(answerReactions),
  messages: many(messages),
}));

export const discussionsRelations = relations(discussions, ({ one, many }) => ({
  user: one(users, { fields: [discussions.userId], references: [users.id] }),
  answers: many(answers),
  reactions: many(discussionReactions),
}));

export const answersRelations = relations(answers, ({ one, many }) => ({
  user: one(users, { fields: [answers.userId], references: [users.id] }),
  discussion: one(discussions, {
    fields: [answers.discussionId],
    references: [discussions.id],
  }),
  reactions: many(answerReactions),
}));

export const discussionReactionsRelations = relations(
  discussionReactions,
  ({ one }) => ({
    user: one(users, {
      fields: [discussionReactions.userId],
      references: [users.id],
    }),
    discussion: one(discussions, {
      fields: [discussionReactions.discussionId],
      references: [discussions.id],
    }),
  }),
);

export const answerReactionsRelations = relations(
  answerReactions,
  ({ one }) => ({
    user: one(users, {
      fields: [answerReactions.userId],
      references: [users.id],
    }),
    answer: one(answers, {
      fields: [answerReactions.answerId],
      references: [answers.id],
    }),
  }),
);

export const messagesRelations = relations(messages, ({ one }) => ({
  user: one(users, { fields: [messages.userId], references: [users.id] }),
}));

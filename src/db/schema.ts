import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const pomodoroSessions = sqliteTable("pomodoro_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  startTime: integer("start_time").notNull(), // Unix timestamp (ms)
  endTime: integer("end_time").notNull(),   // Unix timestamp (ms)
  duration: integer("duration").notNull(),   // in minutes
  pomodoroCount: integer("pomodoro_count").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  date: text("date").notNull(),             // YYYY-MM-DD format
});

export type PomodoroSession = typeof pomodoroSessions.$inferSelect;
export type NewPomodoroSession = typeof pomodoroSessions.$inferInsert;

import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(72, "Password must be less than 72 characters");

export const fullNameSchema = z
  .string()
  .trim()
  .min(1, "Full name is required")
  .max(100, "Full name must be less than 100 characters");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: fullNameSchema,
});

export const taskTitleSchema = z
  .string()
  .trim()
  .min(1, "Title is required")
  .max(200, "Title must be less than 200 characters");

export const taskDescriptionSchema = z
  .string()
  .trim()
  .max(2000, "Description must be less than 2000 characters")
  .optional();

export const taskStatusSchema = z.enum(["pending", "in_progress", "completed"]);

export const taskPrioritySchema = z.enum(["low", "medium", "high"]);

export const taskSchema = z.object({
  title: taskTitleSchema,
  description: taskDescriptionSchema,
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  due_date: z.string().optional().nullable(),
});

export const profileSchema = z.object({
  full_name: fullNameSchema.optional(),
  avatar_url: z.string().url("Please enter a valid URL").optional().nullable().or(z.literal("")),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;

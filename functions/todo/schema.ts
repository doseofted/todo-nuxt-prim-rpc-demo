import { z } from "zod";

export const todoItemId = z.coerce.number();
export type TodoItemId = z.infer<typeof todoItemId>;

export const todoItem = z.object({
  id: todoItemId,
  name: z.string().trim().min(1),
  description: z.string().trim().optional(),
  photo: z.string().nullable().optional(),
});
export type TodoItem = z.infer<typeof todoItem>;

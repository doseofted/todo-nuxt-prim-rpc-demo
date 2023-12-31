import { z } from "zod";
import prisma from "../prisma";
import { todoItem, todoItemId, TodoItemId } from "./schema";
import { removeFile, uploadFile } from "../uploads";

export async function count() {
  return prisma.todo.count();
}
count.rpc = true;

export async function find(todoId: TodoItemId) {
  const id = todoItemId.parse(todoId);
  const found = await prisma.todo.findFirst({ where: { id } });
  return todoItem.parse(found);
}
find.rpc = true;

/** Check off todo list item */
export async function check(todoId: TodoItemId) {
  const id = todoItemId.parse(todoId);
  const given = await prisma.todo.delete({ where: { id } });
  await removeFile(given.photo);
  return true;
}
check.rpc = true;

/** List all todo items for a given page */
export async function list(
  page?: z.infer<typeof list.params>["0"],
  pageSize?: z.infer<typeof list.params>["1"]
) {
  const [pageGiven, take] = list.params.parse([page, pageSize]);
  const skip = (pageGiven - 1) * take;
  const listed = await prisma.todo.findMany({
    skip,
    take,
    orderBy: [{ id: "desc" }],
  });
  return todoItem.array().parse(listed);
}
list.params = z.tuple([
  z.number().min(1).default(1),
  z.number().min(1).max(100).default(5),
]);
list.rpc = true;

/** Create a new todo item (optionally, upload as HTML form for convenience) */
export async function create(
  todo: HTMLFormElement | z.infer<typeof create.todo>
) {
  const allData = create.todo.parse(todo);
  const { file, ...rest } = allData;
  const photo = await uploadFile(file);
  const data = { ...rest, photo };
  const created = await prisma.todo.create({ data });
  return todoItem.parse(created);
}
create.todo = todoItem.omit({ id: true, photo: true }).extend({
  file: z.instanceof(File).nullable().optional(),
});
create.rpc = true;

/** Update an existing todo item */
export async function update(
  todo: HTMLFormElement | z.infer<typeof update.todo>
) {
  const allData = update.todo.parse(todo);
  const { file, ...rest } = allData;
  const found = await find(allData.id);
  let photo = found.photo ?? null;
  if (file === "delete") {
    await removeFile(found.photo);
    photo = null;
  } else if (file instanceof File && file.size > 0) {
    photo = await uploadFile(file);
  }
  const data = { ...rest, photo };
  const created = await prisma.todo.update({ data, where: { id: data.id } });
  return todoItem.parse(created);
}
update.todo = todoItem
  .omit({ photo: true })
  .extend({
    file: z.instanceof(File).nullable().or(z.literal("delete")),
  })
  .partial()
  .required({ id: true });
update.rpc = true;

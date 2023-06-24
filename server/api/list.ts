import { todo } from "../rpc";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page = 1, pageSize = 10 } = query;
  return todo.list(Number(page), Number(pageSize));
});

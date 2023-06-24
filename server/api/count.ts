import { todo } from "../rpc";

export default defineEventHandler(async (event) => {
  const count = await todo.count();
  setHeader(event, "Content-Type", "text/plain");
  return count;
});

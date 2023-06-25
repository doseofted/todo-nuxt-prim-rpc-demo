export * as todo from "./todo";

export function hello() {
  console.log("Hello server!");
  return "Hello client!";
}
hello.rpc = true;

export type { TodoItem } from "./todo/schema";

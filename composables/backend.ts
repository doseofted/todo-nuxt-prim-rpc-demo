import { createPrimClient } from "@doseofted/prim-rpc";
import { createMethodPlugin } from "@doseofted/prim-rpc-plugins/browser";

export const backend = createPrimClient<typeof import("@/functions")>({
  module: process.server ? import("@/functions") : null,
  endpoint: "/api/prim",
  methodPlugin: createMethodPlugin(),
  clientBatchTime: 15,
});

export type { TodoItem } from "@/functions";

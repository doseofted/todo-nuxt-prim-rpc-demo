import { createPrimClient } from "@doseofted/prim-rpc";
import { createMethodPlugin } from "@doseofted/prim-rpc-plugins/browser";

export const backend = createPrimClient<typeof import("@/server/rpc")>({
  module: process.server ? import("@/server/rpc") : null,
  endpoint: "/api/prim",
  methodPlugin: createMethodPlugin(),
  clientBatchTime: 15,
});

export type { TodoItem } from "@/server/rpc";

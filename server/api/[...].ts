import { createPrimServer } from "@doseofted/prim-rpc";
import { defineH3PrimHandler } from "@doseofted/prim-rpc-plugins/h3";

const prim = createPrimServer({
  module: import("../../functions"),
  prefix: "/api/prim",
});

export default defineH3PrimHandler({ prim });

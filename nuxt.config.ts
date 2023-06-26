import preventImport, {
  BuildModifyMethod,
} from "@doseofted/prim-rpc-tooling/build";
import path from "node:path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-icon"],
  vite: {
    plugins: [
      preventImport.vite({
        name: path.join(__dirname, "functions"),
        method: BuildModifyMethod.RunTimeProcessCheck,
      }),
    ],
    build: {
      rollupOptions: {
        external: [
          "node:fs/promises",
          "node:path",
          "@faker-js/faker",
          "@prisma/client",
        ],
      },
    },
  },
});

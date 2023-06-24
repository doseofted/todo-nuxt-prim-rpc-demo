// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-icon"],
  vite: {
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

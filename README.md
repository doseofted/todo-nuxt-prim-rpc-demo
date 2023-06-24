# Todo List Demo with Prim+RPC / Nuxt

This is a sample app built with [Nuxt](https://github.com/nuxt/nuxt), [Prisma](https://github.com/prisma/prisma), [Zod](https://github.com/colinhacks/zod), and [Prim+RPC](https://github.com/doseofted/prim-rpc).

This example can be started in development like so:

```zsh
# Copy environment example and follow instructions in file
cp .env.example .env
# Install, prepare database, and start development
pnpm install
pnpm migrate:dev
pnpm dev
# Optionally, preview production-like build:
pnpm build && pnpm preview
```

This is a simple demo and is not intended to be run in a production environment as-is.

A simpler example that demonstrates usage of [Prim+RPC](https://prim.doseofted.me/) only can be found in the [fullstack example](https://github.com/doseofted/prim-rpc-examples/tree/main/fullstack-framework).

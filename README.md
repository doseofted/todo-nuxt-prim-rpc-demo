# Todo List Demo with Prim+RPC / Nuxt

<!-- NOTE: StackBlitz doesn't yet support Node 18, required for File usage -->
<!-- [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/doseofted/todo-nuxt-prim-rpc-demo/tree/main) -->

This is a sample app built with [Nuxt](https://github.com/nuxt/nuxt), [Prisma](https://github.com/prisma/prisma), [Zod](https://github.com/colinhacks/zod), and [Prim+RPC](https://github.com/doseofted/prim-rpc).

Prim+RPC functions can be found in [`./server/rpc/index.ts`](./server/rpc/index.ts) (they can be placed wherever you like). It is accessed over Nuxt's Nitro server in the route defined at [`./server/api/[...].ts`](./server/api/[...].ts). The client is configured in a composable defined at [`./composables/backend.ts`](./composables/backend.ts). This client is used throughout the app.

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

## Structure

## Explore Prim+RPC

A simple, bare minimum example that demonstrates [Prim+RPC](https://prim.doseofted.me/) usage with Nuxt can be found in the [fullstack example](https://github.com/doseofted/prim-rpc-examples/tree/main/fullstack-framework).

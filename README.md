![Screenshot of todo app](./screenshot.png)

# Todo List Demo with Prim+RPC / Nuxt

<!-- NOTE: StackBlitz doesn't yet support Node 18, required for File usage -->
<!-- [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/doseofted/todo-nuxt-prim-rpc-demo/tree/main) -->

This is a simple todo app built with [Nuxt](https://github.com/nuxt/nuxt), [Prisma](https://github.com/prisma/prisma), [Zod](https://github.com/colinhacks/zod), and [Prim+RPC](https://github.com/doseofted/prim-rpc).

## Get Started

This example can be started in development like so:

```zsh
# Copy environment example and set values
cp .env.example .env
# Install deps, prepare database, and start development
pnpm install && pnpm migrate:dev && pnpm dev
# Optionally, preview production-like build:
pnpm build && pnpm preview
```

> **Note**: While Prim+RPC can work in all JavaScript environments, this demo makes use of Node 18+ APIs. You may set your Node version using tools like [`nvm`](https://github.com/nvm-sh/nvm).

This is a simple demo and is not intended to be run in a production environment as-is.

## Structure

- Prim+RPC functions can be found in [`./server/rpc/index.ts`](./server/rpc/index.ts).
- Functions are accessed over Nuxt's [Nitro](https://github.com/unjs/nitro) server in the route defined at [`./server/api/[...].ts`](./server/api/[...].ts).
- The client is configured in a composable defined at [`./composables/backend.ts`](./composables/backend.ts).
- This client is named `backend` and is used [throughout the app](./pages/index.vue).

## Explore Prim+RPC

A simple, bare minimum example that demonstrates [Prim+RPC](https://prim.doseofted.me/) usage with Nuxt can be found in the [fullstack example](https://github.com/doseofted/prim-rpc-examples/tree/main/fullstack-framework).

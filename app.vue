<template>
  <div data-theme="bumblebee" class="bg-primary/50 min-h-screen w-full grid p-8">
    <NuxtPage />
  </div>
</template>

<style>
html {
  font-size: 16px;
}

/* theme("screens.lg") */
@media (min-width: 1024px) {
  html {
    font-size: 20px;
  }
}
</style>

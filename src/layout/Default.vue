<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-white from-70% to-blue-200">
    <header>
      <Navigation />
    </header>

    <main class="flex-1 container m-auto p-8">
      <router-view />
    </main>

    <footer class="flex items-center justify-center p-4">
      <p class="font-italic">
        &copy; 2025 Rick Bairstow
      </p>
    </footer>
  </div>
</template>

<script setup>
import Navigation from "@Components/Navigation.vue";
</script>

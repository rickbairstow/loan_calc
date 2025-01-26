<template>
  <div class="flex flex-col gap-8 justify-center items-center min-h-[70vh]">
    <h1 class="font-bold text-7xl">
      Loan Interest Calculator
    </h1>
    <p class="text-xl font-medium">
      Effortlessly calculate loan interest with accuracy and track your history—all in one place.
    </p>
    <Button
        button-type="primary"
        href="/calculator"
    >
      Get Started
    </Button>
  </div>
</template>

<script setup>
import Button from "@Components/Button.vue";
</script>

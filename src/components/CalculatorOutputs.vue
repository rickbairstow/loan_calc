<template>
  <div class="flex flex-col items-center gap-8 p-8 bg-slate-100">
    <Chart
        :interest="100"
        :principle="80"
    />

    <div class="flex-1">
      Summary Items
      TODO
    </div>
  </div>
</template>

<script setup>
import Button from "@Components/Button.vue";
import Chart from "@Components/Chart.vue";
</script>

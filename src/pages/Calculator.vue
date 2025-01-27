<template>
  <div class="flex flex-wrap overflow-hidden rounded-lg shadow-lg border border-zinc-300 divide-y-1 lg:divide-y-0 lg:divide-x-1 divide-zinc-300">
    <CalculatorInputs
        class="basis-full lg:basis-[50%]"
        :uuid="uuid"
    />
    <CalculatorOutputs
        class="basis-full lg:basis-[50%]"
        :uuid="uuid"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import CalculatorInputs from "@Components/CalculatorInputs.vue";
import CalculatorOutputs from "@Components/CalculatorOutputs.vue";

const route = useRoute();
const uuid = route.params?.id || `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`

</script>

<template>
  <div
      :key="routeKey"
      class="flex flex-wrap overflow-hidden rounded-lg shadow-lg border border-zinc-300 divide-y-1 lg:divide-y-0 lg:divide-x-1 divide-zinc-300"
  >
    <CalculatorInputs
        class="basis-full lg:basis-[50%]"
        v-bind="{ uuid, ...(existingData ? { formData: existingData } : {}) }"
    />
    <CalculatorOutputs
        class="basis-full lg:basis-[50%]"
        :uuid="uuid.value"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CalculatorInputs from "@Components/CalculatorInputs.vue";
import CalculatorOutputs from "@Components/CalculatorOutputs.vue";
import { calculatorHistory } from "@Composables/useCalculator.js";

const generateUuid = (id) => id || `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
const route = useRoute();
const uuid = ref(generateUuid(route.params?.id));
const existingData = computed(() =>
  calculatorHistory.value.find((item) => item.id === uuid.value)?.formData
);

// Uses the key to force component rebuild when route changes
const routeKey = computed(() => route.fullPath);

// Update uuid whenever the route changes
watch(
  () => route.params?.id,
  (newId) => {
    uuid.value = generateUuid(newId);
  }
);
</script>

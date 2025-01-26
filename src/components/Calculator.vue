<template>
  <div class="flex rounded-lg shadow-lg">
    <CalculatorInputs class="w-1/2 p-8"/>
    <CalculatorOutputs
        class="w-1/2 bg-slate-100 p-8"
        @save="saveLoan"
        @share="shareLoan"
    />
  </div>
</template>

<script setup>
import CalculatorInputs from "@Components/CalculatorInputs.vue";
import CalculatorOutputs from "@Components/CalculatorOutputs.vue";

const saveLoan = () => {
  // validate inputs
  // collect inputs
  // save to state
  // Trigger save feedback
}

const shareLoan = () => {
  // save loan and generate link
  // Trigger email template with the link in if its possible?
}

</script>

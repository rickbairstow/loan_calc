<template>
  <div class="flex flex-col items-center gap-8">
    <Chart :interest="100" :principle="80"/>
    <div class="flex-1">
      Summary Items
    </div>
    <div class="flex gap-4">
      <Button
          type="button"
          @click="save"
      >
        Save Loan
      </Button>
      <Button
          button-type="secondary"
          type="button"
          @click="share"
      >
        Save and Share
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from "@Components/Button.vue";
import Chart from "@Components/Chart.vue";

const emit = defineEmits(['share', 'save'])

/**
 * Emits save event to the parent, so that it can collect data and trigger saving.
 */
const save = () => {
  emit('save')
}

/**
 * Emits share event to the parent, so that it can collect data and trigger sharing.
 */
const share = () => {
  emit('share')
}
</script>

<template>
  <input
      class="border p-2 rounded"
      type="number"
      :value="modelValue"
      @input="onInput"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    default: 0,
    type: Number
  }
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value === '' ? null : parseFloat(value));
};
</script>

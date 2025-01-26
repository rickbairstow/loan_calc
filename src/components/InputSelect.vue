<template>
  <select
      class="border p-2 rounded"
      :value="modelValue"
      @input="onInput"
  >
    <option disabled value="">
      Please select...
    </option>
    <option value="1">
      Option 1
    </option>
  </select>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    default: '',
    type: String
  }
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

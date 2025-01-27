<template>
  <select
      class="border p-2 rounded"
      :value="modelValue"
      @input="onInput"
  >
    <option
        disabled
        value=""
    >
      Please select...
    </option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    default: '',
    type: String
  },

  options: {
    default: () => {},
    type: Object
  }
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
    <input
        class="border p-2 rounded w-3xs"
        type="date"
        :value="modelValue"
        @input="onInput"
    />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    modelValue: {
        default: '',
        type: String
    }
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>

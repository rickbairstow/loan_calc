<template>
    <component
        :is="iconName"
        v-if="iconName"
        :height="iconSize.height"
        :width="iconSize.width"
    />
</template>

<script setup>
import { computed } from 'vue'

// Import used icons
import {
    IconCalculator as Calculator,
    IconLoader as Loader
} from '@tabler/icons-vue'

// Define icons for use
const icons = {
    Calculator,
    Loader
}

// Define sizes, handy for matching Tailwind values, and useful for enhanced prop validation.
const sizes = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 120
}

const props = defineProps({
    icon: {
        required: true,
        type: String
    },
    size: {
        default: '2xl',
        type: String
    }
})

/**
 * Check that the icon component is imported for use.
 */
const iconName = computed(() => {
    const { icon } = props
    if (icon in icons) return icons[icon]

    console.error(`${icon} not found`)
    return ''
})

/**
 * Set icon sizes based on the size prop.
 */
const iconSize = computed(() => {
    const { size } = props
    const calcSize = sizes?.[size] || 24
    return {
        height: calcSize,
        width: calcSize
    }
})
</script>

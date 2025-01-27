<template>
    <component
        :is="element"
        :aria-disabled="disabled"
        :class="componentStyle"
        :to="href"
    >
        <slot name="default" />
    </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    buttonType: {
        type: String,
        default: 'primary',
        validator: (value) => {
            return ['primary', 'secondary', 'text'].includes(value)
        }
    },

    disabled: {
        default: false,
        type: Boolean
    },

    href: {
        default: null,
        type: String
    },

    routerLink: {
        default: null,
        type: String
    },

    size: {
        default: 'base',
        type: String,
        validator: (value) => {
            return ['small', 'base', 'large'].includes(value)
        }
    }
})

const styles = {
    padding: {
        small: 'py-1 px-2',
        base: 'py-2 px-3',
        large: 'py-3 px-4'
    },
    common: 'inline-flex items-center justify-center border rounded-lg transition-colors cursor-pointer',
    primary: {
        base: 'text-white bg-blue-600 border-blue-400 hover:bg-blue-700',
        disabled: 'text-white bg-gray-400 border-gray-400 pointer-events-none'
    },
    secondary: {
        base: 'text-black bg-white border-gray-200 hover:bg-gray-200',
        disabled: 'text-black bg-gray-100 border-gray-100 pointer-events-none'
    },
    text: {
        base: 'text-blue-600 bg-transparent border-transparent hover:text-blue-700 hover:underline',
        disabled:
            'text-blue-900 bg-transparent border-transparent pointer-events-none'
    }
}

const componentStyle = computed(() => {
    const { buttonType, disabled, size } = props

    return `${styles?.common} ${styles?.padding?.[size]} ${styles?.[buttonType]?.[disabled ? 'disabled' : 'base']}`
})

const element = computed(() => {
    const { href } = props
    return href ? 'router-link' : 'button'
})
</script>

<template>
    <nav class="flex items-center gap-8 min-h-20 px-8">
        <Icon
            class="text-black"
            icon="Calculator"
            size="3xl"
        />

        <NavLinks :links="navLinks" />
    </nav>
</template>

<script setup>
import NavLinks from '@Components/NavLinks.vue'
import Icon from '@Components/Icon.vue'
const navLinks = [
    {
        name: 'Home',
        to: '/home'
    },
    {
        name: 'Calculator',
        to: '/calculator'
    },
    {
        name: 'History',
        to: '/history'
    }
]
</script>

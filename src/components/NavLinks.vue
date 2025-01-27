<template>
  <ul class="flex gap-4">
    <li
        v-for="link in links"
        :key="link.to"
        class="flex"
    >
      <router-link
          :to="link.to"
          class="ring-0 font-medium px-3 py-2 bg-white hover:bg-gray-200 focus:bg-gray-200 rounded-lg border-2 border-transparent"
          :class="{
            'border-b-2 border-b-blue-600 rounded-bl-none rounded-br-none': isActive(link.to)
          }"
      >
        {{ link.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from 'vue-router';

defineProps({
  links: {
    type: Array,
    required: true
  }
});

const route = useRoute();
const isActive = (to) => route.path.startsWith(to)
</script>

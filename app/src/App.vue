<script setup lang="ts">
import { inject } from 'vue'
import WorldMap from './components/WorldMap.vue'

// Inject Pixi app
const app = inject('pixiApp')
</script>

<template>
  <WorldMap />
</template>

<!-- AdminTesting.vue -->

<template>
  <div class="controls-wrapper">    
    <div class="controls">
      <div>
        Lat: <input v-model="lat" type="number" />
        Lng: <input v-model="lng" type="number" />
        <button @click="handleDraw">Draw Sprite</button>
      </div>
      <div>
        <button @click="handleRemoveSprite">Remove Last Sprite</button>
      </div>
      <div>
        Clicked Location: {{ lat }}, {{ lng }}
      </div>
      <div>
        <button @click="handleSetupClick">Setup Click Listener</button>
        <button @click="handleRemoveClick">Remove Click Listener</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { store } from '../store'
import { 
    drawCircle,
    removeSprite,
    setupClickListener,
    removeClickListener
} from '../mapUtils'
import * as PIXI from 'pixi.js'

const app = computed(() => store.pixiApp)
const map = computed(() => store.map)
const utils = computed(() => store.utils)
const lat = ref(51.505)
const lng = ref(-0.09)

watchEffect(() => {
    if (store.targetLatLng) {
        lat.value = store.targetLatLng.lat
        lng.value = store.targetLatLng.lng
    }
})

const clickedLatLng = ref<null | { lat: number, lng: number }>(null)
let lastSprite: PIXI.Sprite | null = null

const handleDraw = async () => {
    const markerTexture = await PIXI.Assets.load('/images/marker.png');
    const marker = PIXI.Sprite.from(markerTexture); 
    drawCircle(store.utils, [lat.value, lng.value], 10)
};

const handleRemoveSprite = () => {
    if (lastSprite) {
        app.value.stage.removeChild(lastSprite); // <-- Updated removal of sprite from stage
        lastSprite = null
    }
}

const handleClick = (latlng: { lat: number, lng: number }) => {
    clickedLatLng.value = latlng
    lat.value = latlng.lat
    lng.value = latlng.lng
}

const handleSetupClick = () => {
    map.value.on('click', (e: any) => {  // <-- Added direct setup and handling of click events
        handleClick(e.latlng);
    });
}

const handleRemoveClick = () => {
    map.value.off('click');  // <-- Remove click listener
}

</script>

<style>
.controls-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10000;
    background-color: #242424;
}
.controls {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>

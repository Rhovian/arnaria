<!-- WorldMap.vue -->

<template>
  <div id="map" :style="{ width: '100%', height: '500px' }"></div>
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { Application } from 'pixi.js'
import 'leaflet-pixi-overlay'
import 'leaflet/dist/leaflet.css';

// Create a new Pixi application
const pixiApp = new Application({
    antialias: true,
});

// Provide the Pixi app globally
provide('pixiApp', pixiApp);

onMounted(() => {
    // Init the Leaflet map
    const mapContainer = document.getElementById('map');
    const map = L.map(mapContainer).setView([51.505, -0.09], 13);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Use leaflet-pixi-overlay to add the Pixi app as an overlay
    const overlay = L.pixiOverlay(() => {
        // Drawing sprites or other Pixi objects can be done here
    }, pixiApp.stage);

    overlay.addTo(map);
});

</script>

<style>
#app {
    width: 100vw;
    height: 100vh;
}
/* Add any necessary CSS here */
</style>

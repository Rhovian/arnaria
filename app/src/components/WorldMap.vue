<!-- WorldMap.vue -->

<template>
  <div id="map" :style="{ width: '100%', height: '100%' }"></div>
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
    
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
        subdomains: 'abcd',
        minZoom: 3,
        maxZoom: 9,
        ext: 'jpg'
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

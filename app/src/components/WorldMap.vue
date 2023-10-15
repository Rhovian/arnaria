<!-- WorldMap.vue -->

<template>
  <div id="map" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Container } from 'pixi.js'
import { store } from '../store'
import {drawCircle} from '../mapUtils'
import 'leaflet-pixi-overlay'
import 'leaflet/dist/leaflet.css';

onMounted(() => {
    // Init the Leaflet map
    const prevZoom = ref(13); // <-- Added state to track previous zoom level
    const mapContainer = document.getElementById('map');
    const map = L.map(mapContainer).setView([51.505, -0.09], 14);
    
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
        subdomains: 'abcd',
        minZoom: 2,
        maxZoom: 16,
        ext: 'jpg'
    }).addTo(map);

    const container = new Container();
    
    // Use leaflet-pixi-overlay to add the Pixi app as an overlay
    const overlay = L.pixiOverlay((utils) => {
        store.actions.setUtils(utils);

        // Update sprites on the map based on map interactions (zoom/pan)
        const scale = utils.getScale();
        const container = utils.getContainer();
        const renderer = utils.getRenderer();
        const zoom = utils.getMap().getZoom();
        const project = utils.layerPointToLatLng;

        prevZoom.value = zoom;
        renderer.render(container);
    }, container);

    overlay.addTo(map);
    store.actions.setOverlay(overlay);
    store.actions.setMap(map);
});

</script>

<style>
    #app {
        width: 100vw;
        height: 100vh;
    }
</style>

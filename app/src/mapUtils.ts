import { LatLngLiteral } from 'leaflet';
import * as PIXI from 'pixi.js';
import * as L from 'leaflet';

// Utility to draw a specific sprite on the map
export function drawSprite(
    utils: any,
    latLng: [number, number], 
    marker: PIXI.Sprite,
) {
    try {
        marker.anchor.set(0.5, 1);
        const container = utils.getContainer();
        const project = utils.latLngToLayerPoint;
        const scale = utils.getScale();
        const renderer = utils.getRenderer();
    
        const markerCoords = project(latLng);
        marker.x = markerCoords.x;
        marker.y = markerCoords.y;
        marker.scale.set(1 / scale);
    
        container.addChild(marker);
        renderer.render(container);
    } catch (e) {
        console.error('drawSprite error: ', e);
    }
}

// Utility to remove a sprite from the map
export function removeSprite(app: PIXI.Application, sprite: PIXI.Sprite): void {
    app.stage.removeChild(sprite);
 }

export function extractGeoJSONFromClickEvent(e: L.LeafletMouseEvent): LatLngLiteral {
    return {
        lat: e.latlng.lat,
        lng: e.latlng.lng
    };
}

export function redrawOverlay(overlay: any): void {
    overlay.redraw();
}

export function setupClickListener(map: L.Map, callback: (latlng: LatLngLiteral) => void): void {
    map.on('click', function(e) {
        callback(extractGeoJSONFromClickEvent(e));
    });
}

export function removeClickListener(map: L.Map, callback: (latlng: LatLngLiteral) => void): void {
    map.off('click', function(e) {
        callback(extractGeoJSONFromClickEvent(e));
    });
}

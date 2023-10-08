import { LatLngLiteral } from 'leaflet';
import * as PIXI from 'pixi.js';
import * as L from 'leaflet';

const texture = await PIXI.Assets.load('/images/marker.png');


// Utility to draw a specific sprite on the map
export function drawSprite(
    utils: any,
    lat: number, 
    lng: number, 
    markerTexture: PIXI.Texture
) {
    const container = utils.getContainer();
    const markerLatLng = [lat, lng];
    const marker = new PIXI.Sprite(markerTexture);
    const project = utils.latLngToLayerPoint;
    const markerCoords = project(markerLatLng);
    marker.x = markerCoords.x;
    marker.y = markerCoords.y;
    marker.anchor.set(0.5, 1);
    container.addChild(marker);
    const renderer = utils.getRenderer();
    renderer.render(container);

    /*
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5, 1);

    // Initial positioning
    const coords = utils.latLngToLayerPoint([lat, lng]);
    // Adjust for anchor
    sprite.x = coords.x - (sprite.width * sprite.anchor.x); 
    sprite.y = coords.y - (sprite.height * sprite.anchor.y);
    
    // Adjust scale based on current zoom
    const scale = utils.getScale();
    // Adjust for scale
    sprite.x /= scale;
    sprite.y /= scale;
    // Add the sprite to the PIXI container
    const container = utils.getContainer();

    container.addChild(sprite);

    // Return the sprite for further reference or removal
    return sprite;
    */
}


// Utility to remove a sprite from the map
export function removeSprite(app: PIXI.Application, sprite: PIXI.Sprite): void {
    app.stage.removeChild(sprite);
    
    // As with the draw function, you might want to redraw the overlay in the calling code
}

// Utility to get geoJSON latitude and longitude from a click event
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
        console.log(callback)
        callback(extractGeoJSONFromClickEvent(e));
    });
}

export function removeClickListener(map: L.Map, callback: (latlng: LatLngLiteral) => void): void {
    map.off('click');
}

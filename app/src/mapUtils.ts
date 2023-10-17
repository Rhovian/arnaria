import { LatLngLiteral } from 'leaflet';
import * as PIXI from 'pixi.js';
import * as L from 'leaflet';

export function drawCircle(
    utils: any,
    latLng: [number, number],
    radius: number,
    child?: PIXI.Graphics,
) {
    try {
        const circle = child || new PIXI.Graphics();
        const container = utils.getContainer();
        const project = utils.latLngToLayerPoint;
        const renderer = utils.getRenderer();
        const projectedCircle = project(latLng);

        if (!child) container.addChild(circle);
        circle.clear();
        circle.name = 'circle';
        circle.lineStyle(0.25, '#2edaff');
        circle.beginFill('#ADD8E6', 0.5);
        console.log('projected info:', projectedCircle.x, projectedCircle.y, radius)
        circle.drawCircle(projectedCircle.x, projectedCircle.y, radius);
        circle.endFill();

        renderer.render(container);

    } catch (e) {
        console.error('drawCircle error: ', e);
    }
}

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

export const findMarker = (utils: any, ll: [number, number]) => {
    console.log('findMarker utils:', utils, 'll:', ll)
    const project = utils.latLngToLayerPoint;
    const zoom = utils.getMap().getZoom();
    const quadTrees = utils.getQuadTrees();
    const layerPoint = project(ll);
    const quadTree = quadTrees[zoom];
    let marker;
    const rMax = quadTree.rMax;
    let found = false;
    // @ts-ignore
    quadTree.visit((quad, x1, y1, x2, y2) => {
        if (!quad.length) {
            var dx = quad.data.x - layerPoint.x;
            var dy = quad.data.y - layerPoint.y;
            var r = quad.data.scale.x * 16;
            if (dx * dx + dy * dy <= r * r) {
                marker = quad.data;
                found = true;
            }
        }
        return found || x1 > layerPoint.x + rMax || x2 + rMax < layerPoint.x || y1 > layerPoint.y + rMax || y2 + rMax < layerPoint.y;
    });
    return marker;
}

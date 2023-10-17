import * as PIXI from 'pixi.js';
import { drawCircle } from '../mapUtils';

interface CastleData {
    name: string;
    latLng: [number, number];
    level: number;
    sprite: PIXI.Sprite;
}

// TODO: utils type
export const castleInstance = (utils: any, castleData: CastleData) => {
    try {
        const container = utils.getContainer();
        const project = utils.latLngToLayerPoint;
        const renderer = utils.getRenderer();
        const scale = utils.getScale();
        const projectedCircle = project(castleData.latLng);
    
        castleData.sprite.anchor.set(0.5, 0.5);
    
        castleData.sprite.x = projectedCircle.x;
        castleData.sprite.y = projectedCircle.y;
        // works good at 13 zoom: 0.5 / scale
        castleData.sprite.scale.set(0.0625);
    
        // TODO: level to radius conversions
        drawCircle(utils, castleData.latLng, castleData.level * 5);
    
        container.addChild(castleData.sprite);
        renderer.render(container);
    } catch (e) {
        console.error('castleInstance error: ', e);
    }
};

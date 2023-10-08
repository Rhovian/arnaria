import { reactive, markRaw } from 'vue';
import { ApplicationInst } from 'vue3-pixi';
import 'leaflet-pixi-overlay'

interface Store {
    pixiApp: ApplicationInst | null;
    overlay: any | null;    // cant find type for this
    map: L.Map | null;
    targetLatLng: L.LatLng | null;
    utils: any | null;
    actions: {
        setPixiApp: (app: ApplicationInst) => void;
        setOverlay: (overlay: any) => void;
        setMap: (map: L.Map) => void;
        setTargetLatLng: (latlng: L.LatLng) => void;
        setUtils: (utils: any) => void;
    };
}

export const store: Store = reactive(
    {
        pixiApp: null,
        overlay: null,
        map: null,
        targetLatLng: null,
        utils: null,
        actions: {
            setPixiApp: (app) => {
                store.pixiApp = markRaw(app);
            },
            setOverlay: (overlay) => {
                store.overlay = markRaw(overlay);
            },
            setMap: (map) => {
                store.map = markRaw(map);
            },
            setTargetLatLng: (latlng) => {
                store.targetLatLng = latlng;
            },
            setUtils: (utils) => {
                store.utils = markRaw(utils);    
            }
        }
    }
);

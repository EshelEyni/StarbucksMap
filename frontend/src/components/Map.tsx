import { FC, useEffect } from "react";
import { Map as OpenLayersMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import "ol/ol.css";

const { VITE_MAP_BOX_ACCESS_TOKEN } = import.meta.env;

export const Map: FC = () => {
  useEffect(() => {
    const urbanLayer = new TileLayer({
      source: new XYZ({
        url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${VITE_MAP_BOX_ACCESS_TOKEN}`,
        tileSize: 300,
      }),
    });

    const map = new OpenLayersMap({
      target: "map",
      layers: [urbanLayer],
      view: new View({
        center: [0, 0],
        zoom: 6,
      }),
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return <div id="map" className="w-10/12 h-96 rounded-2xl" />;
};

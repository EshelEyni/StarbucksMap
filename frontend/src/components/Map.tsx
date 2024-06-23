import { FC, useEffect } from "react";
import { Feature, Map as OpenLayersMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { StoreData } from "../../../shared/types/system";

const { VITE_MAP_BOX_ACCESS_TOKEN } = import.meta.env;

type MapProps = {
  locations: StoreData[];
};

export const Map: FC<MapProps> = ({ locations }) => {
  useEffect(() => {
    const urbanLayer = new TileLayer({
      source: new XYZ({
        url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${VITE_MAP_BOX_ACCESS_TOKEN}`,
        tileSize: 250,
      }),
    });

    const map = new OpenLayersMap({
      target: "map",
      layers: [urbanLayer],
      view: new View({
        center: fromLonLat([34.794758, 32.07576]),
        zoom: 6,
      }),
    });

    const iconStyleFunction = () => {
      const zoom = map.getView().getZoom() || 0;
      const scale = Math.min(1, 0.005 * zoom);

      return new Style({
        image: new Icon({
          src: "/images/marker.png",
          scale: scale,
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
        }),
      });
    };

    if (locations && locations.length > 0) {
      const features = locations.map((location) => {
        const feature = new Feature({
          geometry: new Point(
            fromLonLat([location.longitude, location.latitude])
          ),
          name: location.name,
        });
        return feature;
      });

      const vectorSource = new VectorSource({
        features: features,
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: iconStyleFunction,
      });

      map.addLayer(vectorLayer);
    }

    return () => {
      map.setTarget(undefined);
    };
  }, [locations]);

  return <div id="map" className="w-7/12 h-[500px] rounded-2xl" />;
};

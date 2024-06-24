import { Position } from "geojson";

export type OSMCountryData = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
  geojson: GeoJson;
} | null;

export type GeoJson = {
  type: string;
  coordinates: Position[][][] | Position[][];
};
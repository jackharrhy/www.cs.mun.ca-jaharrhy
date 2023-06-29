import { Component, onMount } from "solid-js";
import "maplibre-gl/dist/maplibre-gl.css";

import maplibregl, { Map } from "maplibre-gl";

export const Hikes: Component = () => {
  let maplibreContainer: HTMLElement;
  let map: Map;

  onMount(async () => {
    map = new maplibregl.Map({
      container: maplibreContainer,
      center: [-52.6626711, 47.6248345],
      zoom: 10,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19,
          },
        },
        layers: [{ id: "sat", type: "raster", source: "osm" }],
      },
    });

    map.on("load", async () => {
      // TODO
    });
  });

  return (
    <div
      ref={(r) => {
        maplibreContainer = r;
      }}
      class="maplibre-container"
    />
  );
};

export default Hikes;

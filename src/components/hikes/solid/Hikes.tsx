/** @jsxImportSource solid-js */
import { onCleanup, onMount, type Component } from "solid-js";
import "maplibre-gl/dist/maplibre-gl.css";

import { Map, setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(workerUrl);

export const Hikes: Component = () => {
  let maplibreContainer!: HTMLDivElement;
  let map: Map | undefined;

  onMount(async () => {
    map = new Map({
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

  onCleanup(() => map?.remove());

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

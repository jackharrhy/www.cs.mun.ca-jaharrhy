import maplibregl from "maplibre-gl";

const map = new maplibregl.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  // https://demotiles.maplibre.org/styles/osm-bright-gl-style/style.json
  center: [-52.6626711, 47.6248345],
  zoom: 10,
});

console.log({ map });

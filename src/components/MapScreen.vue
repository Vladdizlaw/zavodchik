<template>
  <div>
    <div class="formap">
      <div id="map"></div>
    </div>
  </div>
</template>
<script>

import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
//import {toStringHDMS} from 'ol/coordinate';
import 'ol/ol.css'
import {fromLonLat} from 'ol/proj'
export default {
  name: "MapScreen",
  props: {
    location: Object,
  },
  data() {
    return {};
  },
  mounted() {
    let projection=fromLonLat([this.location.coords.longitude, this.location.coords.latitude], 'EPSG:3857')
    const map = new Map({ target: "map" });
    const view = new View({
      center: projection,
      zoom: 12,
      constrainResolution: true
    });
    //view.setCenter(this.location.coords.latitude, this.location.coords.longitude)
    map.setView(view);
    const osmSource = new OSM();
    const osmLayer = new TileLayer({ source: osmSource });
    map.addLayer(osmLayer);
    console.log(this.location);
  },
};
</script>
<style scoped>
.formap {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 2em;
}
#map {
  width: 90%;
  height: 90vh;
  border: 1px solid;
}
</style>

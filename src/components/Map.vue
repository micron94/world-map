<template>
  <div style="height: 75vh; width: 50vw;">
    <l-map
        v-model="zoom"
        v-model:zoom="zoom"
        :center="[0, 0]"
    :min-zoom="2"
    :max-zoom="18"
    @move="handleMove"
    >
      <l-geo-json :geojson="statesData" />

      <l-tile-layer url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"></l-tile-layer>

      <l-control-layers />
      <l-marker :lat-lng="[0, 0]" draggable @moveend="log('moveend')">
        <l-tooltip>
          lolzzz
        </l-tooltip>
      </l-marker>

      <l-marker :lat-lng="[47.41322, -1.219482]">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>

      <l-marker :lat-lng="[50, 50]" draggable @moveend="log('moveend')">
        <l-popup>
          lol
        </l-popup>
      </l-marker>

      <l-polyline
          :lat-lngs="[
          [47.334852, -1.509485],
          [47.342596, -1.328731],
          [47.241487, -1.190568],
          [47.234787, -1.358337],
        ]"
          color="green"
      ></l-polyline>
      <l-polygon
          :lat-lngs="[
          [46.334852, -1.509485],
          [46.342596, -1.328731],
          [46.241487, -1.190568],
          [46.234787, -1.358337],
        ]"
          color="#41b782"
          :fill="true"
          :fillOpacity="0.5"
          fillColor="#41b782"
      />
      <l-rectangle
          :lat-lngs="[
          [46.334852, -1.509485],
          [46.342596, -1.328731],
          [46.241487, -1.190568],
          [46.234787, -1.358337],
        ]"
          :fill="true"
          color="#35495d"
      />
      <l-rectangle
          :bounds="[
          [46.334852, -1.190568],
          [46.241487, -1.090357],
        ]"
      >
        <l-popup>
          lol
        </l-popup>
      </l-rectangle>
    </l-map>
    <button @click="changeIcon">New kitten icon</button>
  </div>
</template>
<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle, LGeoJson,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {statesData} from "../assets/us-states.js";


export default {
  components: {
    LGeoJson,
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },
  data() {
    return {
      zoom: 2,
      iconWidth: 25,
      iconHeight: 40,
    };
  },
  computed: {
    statesData() {
      return statesData
    },
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  methods: {
    log(a) {
      console.log(a);
    },
    handleMove(event) {
      // Adjust coordinates when zooming out beyond a certain threshold
      if (event.zoom < 2) {
        this.$set(this, 'zoom', 18);
      } else if (event.zoom > 18) {
        this.$set(this, 'zoom', 2);
      }
    },
    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },
  },
};
</script>
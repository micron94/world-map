<template>
  <div style="height: 100vh; width: 100vw">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[0, 0]"
      :min-zoom="3"
      :max-zoom="18"
      @move="handleMove"
      @drag="onMapDrag"
    >
      <l-geo-json :geojson="statesData" :options="geojsonOptions" />

      <l-tile-layer
        url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      ></l-tile-layer>

      <l-control-layers />

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
        :bounds="[
          [46.334852, -1.190568],
          [46.241487, -1.090357],
        ]"
      >
        <l-popup> lol </l-popup>
      </l-rectangle>
    </l-map>
    <CountryModal :showModal="showModal" :countryData="selectedCountryData" @modalClosed="toggleModal" v-if="showModal"/>   
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
  LRectangle,
  LGeoJson
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { statesData } from "../assets/us-states.js";
import  CountryModal  from "./CountryModal.vue";  
import {getCountryByName } from "../api/countryApi.js";

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
    CountryModal
  },

  data() {
    return {
      zoom: 2, 
      iconWidth: 25,
      iconHeight: 40,
      highlightedLayer: null,
      showModal: false,
      selectedCountry: null,
      selectedCountryData: null,
      selectedStyle: {
        weight: 2,
        color: "#666",
        fillOpacity: 0.7,
      },
      unselectedStyle: {
        weight: 1,
        color: "blue",
        fillOpacity: 0.2,
      },
    }; 
  },
  computed: {
    statesData() {
      return statesData;
    },
    geojsonOptions() {
      return {
        onEachFeature: this.onEachFeature,
      };
    },
  },
  methods: {
    onEachFeature(feature, layer) {
      layer.on({
        mousemove: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.handleClick,
      });
      layer.setStyle(this.unselectedStyle);
    },
    async fetchCountry(name){
        const data =  await getCountryByName(name);
        this.selectedCountryData = data; 
        console.log(this.selectedCountryData);
    }, 
    toggleModal(){
      this.showModal = !this.showModal;  
    },
    highlightFeature(e) {
      const layer = e.target;
      layer.setStyle(this.selectedStyle);

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      this.highlightedLayer = layer;
    },
    unselectCountry() {
      layer.setStyle(this.unselectedStyle);
      this.selectedCountry = null;
    },
    handleClick(e) {
      this.toggleModal();
      const layer = e.target;
      const defaultStyle = this.selectedStyle; 

      if (this.selectedCountry) {
        if (layer._leaflet_id === this.selectedCountry._leaflet_id) {
          this.unselectCountry();
          return;
        } else {
          if (this.selectedCountry) {
            this.selectedCountry.setStyle(this.unselectedStyle);
          }
          this.selectedCountry = null;
        }
      } 
      this.selectedCountry = layer;
      layer.setStyle(defaultStyle);
      this.fetchCountry(e.target.feature.properties.sovereignt);
    },

    resetHighlight() {
      const layer = this.highlightedLayer;
      if (layer !== this.selectedCountry) {
        if (layer) {
          layer.setStyle(this.unselectedStyle);
        }
        this.highlightedLayer = null;
      }
    },

    handleMove(event) {
      // Adjust coordinates when zooming out beyond a certain threshold
    },
    onMapDrag() {
      if (this.$refs.mapObject) {
        const bounds = this.$refs.mapObject.getBounds();
        this.maxBounds = bounds;
      }
    },
  },
};
</script>

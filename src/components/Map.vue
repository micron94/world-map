<template>
  <div style="height: 100vh; width: 100vw">
    <l-map
      v-model:zoom="zoom"
      :center="[0, 0]" 
      :min-zoom="3"
      :max-zoom="18"
      @move="handleMove"
      @drag="onMapDrag"
      ref="map" 
    >
      <l-geo-json :geojson="statesData" :options="geojsonOptions" />
      <l-tile-layer
        url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      ></l-tile-layer>
    </l-map>
    <Transition>
      <CountryModal
        :showModal="showModal"
        :countryData="selectedCountryData"
        @modalClosed="toggleModal"
        v-if="showModal"
      />
    </Transition>
  </div>
</template>
<script>
import {
  LMap,
  LIcon, 
  LTileLayer,
  LControlLayers,
  LTooltip,
  LPopup,
  LGeoJson,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { statesData } from "../assets/us-states.js";
import CountryModal from "./CountryModal.vue";
import { getCountryByName } from "../api/countryApi.js";
import { getCountryPlaceInfo } from "../api/placesApi.ts";
import { searchImages } from "../api/imageApi.js";

export default {
  components: {
    LGeoJson,
    LMap,
    LIcon,
    LTileLayer,
    LControlLayers,
    LTooltip,
    LPopup,
    CountryModal,
  },

  data() {
    return {
      zoom: 2,
      iconWidth: 25,
      iconHeight: 40,
      highlightedLayer: null,
      mapRef: null,
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
  mounted() {
    /*
  setTimeout(() => {
    console.log(this.$refs.map);
    console.log(this.$refs.map.leafletObject);

    this.$refs.map.leafletObject.setView(new L.LatLng(40.737, -73.923), 1);  
  }, 100);  // Adjust this delay if needed
*/}, 
  methods: {
    onEachFeature(feature, layer) {
      layer.on({
        mousemove: this.highlightFeature,
        mouseout: this.resetHighlight,
        click: this.handleClick,
      });
      layer.setStyle(this.unselectedStyle);
    },
    async fetchCountry(name) {
      const data = await getCountryByName(name);
      const detailsData = await getCountryPlaceInfo(name);
      const imageData = await searchImages(name);
      console.log(imageData);
      this.selectedCountryData = {data: data, images: imageData, detailsData: detailsData};
    },
    toggleModal() {
      this.showModal = false;
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
      if (this.selectedCountry) {
        this.showModal = true;
      }
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
    onMapDrag(e) {
      if (this.$refs.mapObject) {
        const bounds = this.$refs.mapObject.getBounds();
        this.maxBounds = bounds;
      }
    },
  },
};
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: 2s ease;
}

.v-enter-from,
.v-leave-to {
  transition: 2s ease;
  transform: translate(100%, 0);
}
</style>

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createVfm } from "vue-final-modal";

createApp(App).use(createVfm()).mount("#app");

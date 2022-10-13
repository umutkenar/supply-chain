/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";

import "./assets/css/main.css";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
const app = createApp(App);
app.use(PrimeVue);
app.use(router);

app.component("Button", Button);
app.component("InputText", InputText);

app.mount("#app");

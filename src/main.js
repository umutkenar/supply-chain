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
import Card from 'primevue/card';
import Timeline from 'primevue/timeline';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

app.component("Button", Button);
app.component("InputText", InputText);
app.component("Card", Card);
app.component("Timeline", Timeline);
app.component("Dropdown", Dropdown);
app.component("InputNumber", InputNumber);
app.component("InputMask", InputMask);

app.mount("#app");

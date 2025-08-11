import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import { router } from "./router";

import "@/assets/scss/app.fonts.scss";

import "@/assets/scss/app.global.styles.scss";
import "@/assets/scss/app.fonts.scss";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");

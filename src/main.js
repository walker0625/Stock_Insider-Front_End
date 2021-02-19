import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { store } from "./store";
import "@babel/polyfill";

new Vue({
  router,
  vuetify,
  store: store,
  render: (h) => h(App),
}).$mount("#app");

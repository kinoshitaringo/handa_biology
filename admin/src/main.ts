import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import CoreuiVue from "@coreui/vue";
import icons from "./assets/icons";
import router from "./router";
import store from "./store";
import Vue from "vue";

Vue.config.productionTip = false;
Vue.config.performance = true;

Vue.use(CoreuiVue);
Vue.use(BootstrapVue);

new Vue({
  icons,
  router,
  store,
  render: (h: any) => h(App)
} as any).$mount("#root");

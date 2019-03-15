import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css"; // This line here

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueMaterial);

export const bus = new Vue();

new Vue({
  render: h => h(App)
}).$mount("#app");

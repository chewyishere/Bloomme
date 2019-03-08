import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { MdButton, MdContent, MdTabs } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css"; // This line here

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);

export const bus = new Vue();

new Vue({
  render: h => h(App)
}).$mount("#app");

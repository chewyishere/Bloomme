<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <component v-if="doneLoading" :is="view" :contents="contents"></component>
    </transition>
  </div>
</template>

<script>
//components
import bmHome from "@/containers/bm-home.vue";
import bmName from "@/containers/bm-name.vue";
import bmPhoto from "@/containers/bm-photo.vue";
import bmQuestions from "@/containers/bm-questions.vue";
import bmResult from "@/containers/bm-result.vue";

import { bus } from "./main.js";

export default {
  name: "app",
  data() {
    return {
      contents: {},
      view: bmHome,
      doneLoading: false,
      currentView: 0
    };
  },
  components: {
    bmHome,
    bmName,
    bmPhoto,
    bmQuestions,
    bmResult
  },
  methods: {
    changeView: function(step) {
      switch (step) {
        case 0:
          this.view = "bm-home";
          break;
        case 1:
          this.view = "bm-name";
          break;
        case 2:
          this.view = "bm-photo";
          break;
        case 3:
          this.view = "bm-questions";
          break;
        default:
      }
    }
  },

  created() {
    var vm = this;
    this.$http
      .get("./content/content.json")
      .then(function(response) {
        vm.contents = response.data;
        vm.doneLoading = true;
      })
      .catch(function(error) {
        console.log("Error! Could not reach the API. " + error);
      });
  },

  mounted() {
    bus.$on("switchComp", step => {
      console.log("updated page to" + step);
      this.changeView(step);
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: absolute;
}
.bm-page {
  width: 80%;
  display: block;
  height: 80%;
  position: relative;
  margin: 0 auto;
  border: solid;
  background: blueviolet;
  text-align: center;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */

.slide-fade-enter-active {
  transition: all 0.8s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.8s ease-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>

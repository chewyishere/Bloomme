<template>
  <div id="app">
    <bm-header :userName="userName"></bm-header>
    <p v-if="(error !== '')">{{error}}</p>
    <transition name="slide-fade" mode="out-in">
      <component
        v-if="doneLoading"
        :is="view"
        :contents="contents"
        :score="score"
        :userName="userName"
      ></component>
    </transition>
  </div>
</template>

<script>
//components'
import bmHeader from "@/components/bmHeader.vue";
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
      userName: null,
      score: [],
      error: ""
    };
  },
  components: {
    bmHome,
    bmName,
    bmPhoto,
    bmQuestions,
    bmResult,
    bmHeader
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
        case 4:
          this.view = "bm-result";
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
        vm.error = "Error! Could not reach the API. " + error;
      });
  },

  mounted() {
    bus.$on("switchComp", step => {
      this.changeView(step);
    });

    bus.$on("setFinalScore", score => {
      this.score = score;
    });

    bus.$on("setName", userName => {
      this.userName = userName;
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
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: absolute;
}

.bm-page {
  display: block;
  width: 80%;
  position: relative;
  margin: 0 auto;
  text-align: center;
  height: 100%;
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

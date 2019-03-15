<template>
  <div class="bm-page" id="bm-home">
    <p class="md-display-2">{{title}}</p>
    <p class="md-display-1">{{description}}</p>
    <md-button class="md-raised" @click="switchComponent()">{{btnStart}}</md-button>
  </div>
</template>

<script>
import { bus } from "../main.js";

export default {
  name: "bm-home",
  props: ["contents", "home"],
  data() {
    return {
      step: 1
    };
  },

  methods: {
    switchComponent() {
      bus.$emit("switchComp", this.step);
    }
  },
  created() {
    this.title = this.contents.home.title;
    this.description = this.contents.home.description;
    this.btnStart = this.contents.home.btnStart;
  }
};
</script>

<style>
</style>
<template>
  <div class="bm-page" id="bm-home">
    <p class="md-headline">{{title}}</p>
    <p class="md-subheading">{{subtitle}}</p>
    <!-- <Button @click="switchComponent()">{{home.btnStart}}</Button> -->
    <button @click="switchComponent()">{{btnStart}}</button>
  </div>
</template>

<script>
import Button from "@/components/buttons/Button";
import { bus } from "../main.js";

export default {
  name: "bm-home",
  props: ["contents", "home"],
  data() {
    return {
      step: 1
      // title: null,
      // subtitle: null,
      // btnStart: null
    };
  },
  components: {
    Button
  },

  methods: {
    switchComponent() {
      console.log("click btn");
      bus.$emit("switchComp", this.step);
    }
  },

  created() {
    console.log(this.contents);
    this.title = this.contents.home.title;
    this.subtitle = this.contents.home.subtitle;
    this.btnStart = this.contents.home.btnStart;
  }
};
</script>

<style>
/* #home{
  width: 100%;
  height: 100%;
} */
</style>
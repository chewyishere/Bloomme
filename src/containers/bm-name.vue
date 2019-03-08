<template>
  <div class="bm-page" id="bm-name">
    <p class="md-headline">{{title}}</p>
    <input v-model="nameForm">
    <button @click="switchComponent()">submit {{userName}}</button>
  </div>
</template>

<script>
import { bus } from "../main.js";

export default {
  name: "bm-name",
  props: ["contents"],
  data() {
    return {
      step: 2,
      nameForm: "",
      userName: null
    };
  },

  created() {
    this.title = this.contents.name.title;
  },

  methods: {
    switchComponent() {
      bus.$emit("switchComp", this.step);
    }
  },

  watch: {
    nameForm: function(v) {
      this.userName = v;
    }
  }
};
</script>

<style>
#bm-name {
  /* width: 90%;
  height: 90%; */
  background: aqua;
}
</style>
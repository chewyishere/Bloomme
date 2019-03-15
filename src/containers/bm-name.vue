<template>
  <div class="bm-page" id="bm-name">
    <p class="md-headline">{{title}}</p>
    <md-field id="bm-name--input">
      <label>Dream Chaser</label>
      <md-input v-model="nameForm"></md-input>
    </md-field>
    <md-button class="md-raised" @click="switchComponent()">submit</md-button>
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
      nameForm: ""
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
    nameForm: function(name) {
      bus.$emit("setName", name);
    }
  }
};
</script>

<style lang="scss">
#bm-name--input {
  margin: 24px auto;
  width: 30%;

  input {
    text-align: center;
  }
}
</style>
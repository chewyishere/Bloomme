<template>
  <div class="bm-page" id="bm-photo">
    <p class="md-headline">Hi {{userName}}!</p>
    <p class="md-headline">{{title}}</p>
    <camera v-show="!photoConfirmed"></camera>
  </div>
</template>

<script>
import { bus } from "../main.js";
import Camera from "@/components/Camera";

export default {
  name: "bm-photo",
  props: ["contents", "userName"],
  data() {
    return {
      step: 3,
      photoConfirmed: false,
      photo: null
    };
  },
  components: {
    Camera
  },
  created() {
    this.title = this.contents.photo.title;
    this.btnPhoto = this.contents.photo.btnPhoto;
  },

  mounted() {
    bus.$on("confirmPhoto", snap => {
      this.photoConfirmed = true;
      this.switchComponent();
    });
  },

  methods: {
    switchComponent() {
      bus.$emit("switchComp", this.step);
    }
  }
};
</script>

<style>
</style>
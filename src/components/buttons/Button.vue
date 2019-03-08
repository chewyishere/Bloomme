<template>
  <button class="bm__button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["href"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.bm__button {
  width: 200px;
  height: 100px;
}
</style>
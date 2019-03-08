<template>
  <div class="bm-page" id="bm-questions">
    <p class="md-headline">{{title}}</p>
    <div v-for="question in questions">{{question.q}}</div>
  </div>
</template>

<script>
export default {
  name: "bm-questions",
  props: ["contents"],
  data() {
    return {
      step: 4
    };
  },
  created() {
    this.title = this.contents.questions.title;
    this.questions = this.contents.questions.checklists;
  }
};
</script>

<style>
#bm-questions {
  /* width: 90%;
  height: 90%; */
  background: bisque;
}
</style->

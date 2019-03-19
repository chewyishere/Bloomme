<template>
  <div class="bm-page" id="bm-questions">
    <p class="md-headline">{{title}}</p>
    <quest-card-stack
      :list="list"
      @taskDone="handleTaskDone"
      @taskFail="handleTaskFail"
      @allDone="handleAllDone"
    />
  </div>
</template>

<script>
import QuestCardStack from "@/components/questions/QuestCardStack";
import { bus } from "../main.js";

export default {
  name: "bm-questions",
  props: ["contents"],
  components: {
    QuestCardStack
  },
  data() {
    return {
      step: 4,
      tokenScore: [0, 0, 0, 0, 0, 0],
      allDone: false
    };
  },
  created() {
    this.title = this.contents.questions.title;
    this.list = this.contents.questions.checklists;
  },

  methods: {
    handleTaskDone(tokenArray) {
      console.log("add data array:" + tokenArray);
      tokenArray.forEach((score, idx) => {
        this.tokenScore[idx] = this.tokenScore[idx] + score;
      });
    },
    handleTaskFail(tokenArray) {
      tokenArray.forEach((score, idx) => {
        this.tokenScore[idx] = this.tokenScore[idx] - score;
      });
    },
    handleAllDone() {
      this.allDone = true;
      bus.$emit("setFinalScore", this.tokenScore);
      bus.$emit("switchComp", this.step);
    }
  }
};
</script>

<template>
  <div id="bm-questions--interface">
    <quest-card
      v-for="(el, index) in questionLists"
      :key="el"
      :question="el"
      :id="index"
      :currentID="currentID"
      :isChosen="isChosen"
      @taskDone="$emit('taskDone');"
      @taskFail="$emit('taskFail');"
      @updateToken="handleUpdateToken"
    ></quest-card>
    <div
      ref="donezone"
      class="donezone dropzone"
      :class="{active: isChosen && (this.dropTarget === this.doneZone)}"
    >
      <span class="md-display-1">I DID IT!</span>
    </div>
    <div
      ref="rejectzone"
      class="rejectzone dropzone"
      :class="{active: isChosen && (this.dropTarget === this.failZone)}"
    >
      <span class="md-display-1">ughh..</span>
    </div>
  </div>
</template>

<script>
import QuestCard from "@/components/question/QuestCard";
import interact from "interactjs";

export default {
  name: "questCardStack",
  components: {
    QuestCard
  },

  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      doneZone: null,
      failZone: null,
      dropTarget: null,
      questionLists: [],
      tokenLists: [],
      tokenArray: [],
      isChosen: false,
      currentID: 0
    };
  },

  mounted() {
    this.doneZone = this.$refs.donezone;
    this.failZone = this.$refs.rejectzone;
    this.list.forEach(el => {
      this.questionLists.push(Object.values(el)[0]);
      this.tokenLists.push(Object.values(el)[1]);
    });

    var vm = this;
    interact(".dropzone").dropzone({
      accept: ".card",
      overlap: 0.8,

      ondropactivate: () => {
        vm.isChosen = false;
      },
      ondragenter: evt => {
        vm.dropTarget = evt.target;
        vm.isChosen = true;
      },

      ondragleave: evt => {
        vm.dropTarget = evt.target;
        vm.isChosen = false;
      },

      ondrop: () => {
        if (vm.dropTarget === vm.doneZone) {
          vm.$emit("taskDone", vm.tokenArray);
        } else if (vm.dropTarget === vm.failZone) {
          vm.$emit("taskDone", [0, 0, 0, 0, 0, 0]);
        }
        vm.nextQuestion();
      },
      ondropdeactivate: () => {
        vm.dropTarget = " ";
      }
    });
  },
  methods: {
    handleUpdateToken(id) {
      this.tokenArray = Object.values(this.tokenLists[id]);
    },
    nextQuestion() {
      this.currentID++;
      if (this.currentID >= this.questionLists.length) {
        this.$emit("allDone");
      }
    }
  }
};
</script>

<style lang="scss">
#bm-questions--interface {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropzone {
  margin: 20px auto;
  z-index: 0;
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  top: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.donezone {
  left: 20px;
  background-color: coral;
}

.rejectzone {
  right: 20px;
  background-color: grey;
}

.active {
  border: 10px solid white;
}
</style>

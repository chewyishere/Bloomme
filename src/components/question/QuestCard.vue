<template>
  <transition name="fade" mode="in-out">
    <div v-show="isShowing" ref="interactElement" class="card" :class="{'can-drop':canDrop}">
      <md-card class="innerCard">
        <md-card-header>
          <h3 class="md-title cardTitle">{{ question }}</h3>
        </md-card-header>
      </md-card>
    </div>
  </transition>
</template>

<script>
import interact from "interactjs";

export default {
  name: "QuestCard",
  props: ["question", "currentID", "isChosen", "id"], //isChosen for dropin animation
  data() {
    return {
      isShowing: true,
      canDrop: false
    };
  },

  watch: {
    currentID: function(v) {
      this.isShowing = v === this.id ? true : false;
    },
    isChosen: function(v) {
      this.canDrop = v && this.isShowing ? true : false;
    }
  },

  mounted() {
    this.isShowing = this.currentID === this.id ? true : false;

    const element = this.$refs.interactElement;
    var vm = this;
    interact(element).draggable({
      inertia: true,
      autoScroll: true,

      onmove: this.dragMoveListener,

      onend: function() {
        if (vm.isChosen) {
          vm.$emit("updateToken", vm.id);
        }
      }
    });
  },

  methods: {
    dragMoveListener(event) {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
        y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  top: 10%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  color: black;
  z-index: 1;
  cursor: grab;
  transition: width 0.5s, height 0.5s, border-radius 0.5s, opacity 0.5s;
  .innerCard {
    background: white;
    color: black;
  }
}

.card.can-drop {
  .innerCard {
    background-color: #fc6e5e;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    h3 {
      opacity: 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

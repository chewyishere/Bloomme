<template>
    <div id="home">
      <p>{{title}}</p>
      <p>{{subtitle}}</p>
    </div>
</template>

<script>

export default {
  name: 'home',
  props:{
    content: {type: Object}
  },
  data () {
    return{
      title: this.content.title,
      subtitle: this.content.subtitle
    }
  },
  create(){
    console.log(this.content);
  }

}

</script>

<style>
#home{
  width: 100%;
  height: 100%;
}
</style>
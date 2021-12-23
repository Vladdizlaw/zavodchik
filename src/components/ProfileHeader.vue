<template>
    <div class="header">
      <back-button :func="back" class="backbutton" />
      <div class="header__text">
        <p>Профиль</p>
      </div>

      <div class="header__search" @click="search">
        <img src="../assets/search.svg" alt="" />
        <p>Поиск</p>
      </div>
    </div>
</template>
<script>
import BackButton  from './BackButton.vue'

export default {
  name:'ProfileHeader',
  components:{BackButton} ,
  data(){
      return{

      }
  },
  methods:{
      search() {
      this.$emit("back", { state: "animalProperty" });
    },
  }
}
</script>
<style scoped>
.header {
  width: 100%;
  height: 2em;
  display: flex;
  justify-content: start;
  align-items: center;
}
.backbutton {
  font-size: 1.25em;
  max-width: 20%;
 
}
.header__text {
  min-width: 78%;
  justify-self: center;
  font-size: 2.5em;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
}
.header__search {
  font-size: 1.4em;
  display: flex;
  max-width: 25%;
  flex-wrap: nowrap;
  gap: 0.15em;
  align-items: center;
  transition:0.3s;
  cursor: pointer;
}
.header__search > img {
  height: 0.7em;
}
.header__search:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>

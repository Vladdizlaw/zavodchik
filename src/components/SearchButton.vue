<template>
    <div class="search" @click="search">
        <img src="../assets/search.svg" alt="" />
        <p>Поиск</p>
      </div>
</template>
<script>
export default {
   
   name:'SearchButton',
  
   data() {
        return{

        }
        
    },
    methods:{
    search() {
      this.$emit("search",null);
    },
    }
}
</script>
<style scoped>
.search {
  font-size: 3rem;
  display: flex;
  /* width: 5rem; */
  flex-wrap: nowrap;
  gap: 0.15em;
  align-items: center;
  transition:0.3s;
  cursor: pointer;
}
.search > img {
  height: 0.7em;
}
.search:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>
<template>
<div>
  <div class="savebutton" @click="save">
    <img src="../assets/save.svg"/>
    <p>Сохранить изменения</p>
  </div>
</div>
</template>
<script>
export default {
  name: "SaveChangesButton",
  props: {},
  data() {
    return {};
  },
  methods: {
    save() {
     
      this.$emit("saveProfile", null);
    },
  },
};
</script>
<style lang="scss" scoped>
.savebutton {
  display: flex;
  flex-wrap: nowrap;
  gap:0.3rem;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3s;
  cursor: pointer;
  p{
     font-size: max(2.7vw, 1.4rem);
  @media screen and (max-width:450px) {
     display: none;
     
  }
   }
  img {
    padding-top: 0.25rem;
    max-height: max(2.7vw, 1.8rem);
     @media screen and (max-width:600px) {
       height:2.5rem;
        
      
    }
  }

&:hover img{
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
&:hover {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
& :active {
  filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
    drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
}
}
</style>

<template>
    <div class="header">
      <div class="header__left">
        <slot name="left">
     
        </slot>
      </div>
      <div class="header__center">
        <slot name="center">
      
        </slot>
      </div>
      <div class="header__right">
        <slot name="right">
      
        </slot>
      </div>  
      
    </div>
</template>
<script>

export default {
  name:'Header',
  
  data(){
      return{

      }
  },
  methods:{
    
  }
}
</script>
<style scoped>
.header {
  width: 100%;
  /* max-height: 3rem; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__left {
  /* font-size: 1.4em; */
  display: flex;
  width: 20%;
  /* justify-self:flex-start; */
  justify-content: start;
  align-items: center;
  transition:0.3s;
  cursor: pointer;
  margin-left: 1rem;

}
.header__center {
  width: 60%;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
 
}
.header__right {
  /* font-size: 1.4em; */
   justify-self: flex-end;
  display: flex;
  width: 20%;
 justify-content: end;
  align-items: end;
  transition:0.3s;
  cursor: pointer;
  margin-right: 1rem;
}

</style>

<template>
  <div class="screen">
   <div class="text"> 
     <h4> Выберите какое у вас животное </h4>
   </div>
   <div class="but">
     <button class="dog" value="dog" @click="chooseTypeAnimal('dog')">DOG</button>
     <button class="cat" value="cat" @click="chooseTypeAnimal('cat')">CAT</button>
   </div>  
   
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  props: {
    msg: String
  },

data(){
  return {
    animalType:null ,


  }
},
methods:{
  chooseTypeAnimal(value){
    console.log(value)
    this.$emit('animalType',{animalType:value})

  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.screen{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
}
.text{
  display: flex;
  justify-content: center;
  font-size: 2.5em;
  text-shadow: 5px 5px 10px rgb(49, 42, 42) ;
}
h4{
 text-shadow: 2px 5px  blur rgb(49, 42, 42); 
}
.but{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: space-around;
}
button{
  border: 2px  solid;
  border-radius: 5px;
  width:10em;
  height:3em;
  box-shadow: 5px 10px;
  position: relative;
  
  
}
button:active{
  box-shadow: 3px 6px;
  transition: all 0.3s ;  
  
}

</style>

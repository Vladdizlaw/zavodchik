<template>
  <div class="backbutton" @click="$emit('back', null)">
    <img src="../assets/back.svg" />
    <p>Назад</p>
  </div>
</template>
<script>
export default {
  name: "BackButton",
};
</script>
<style scoped lang="scss">
.backbutton {
   user-select: none;      
  font-family: "Amatic SC";
   font-size: max(2.7vw, 1.4rem);
  font-style: normal;
  font-weight: 900;
 
  letter-spacing: 0em;
  text-align: left;
  cursor: pointer;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s;
   p{
     box-sizing: border-box;
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

&:hover {
 filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}

& :active {
  filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
    drop-shadow(10px 10px 4px rgba(10, 73, 10, 0.75));
}
}
</style>

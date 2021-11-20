<template>
     <div class="registration-title__back" @click="func">
          <img src="../assets/back.svg" />
          <p>Назад</p>
        </div>
</template>
<script>
export default {
    name:'BackButton',
    props:{
        func:Function
    },
   
    
}
</script>
<style scoped>
.registration-title__back {
  font-family: "Amatic SC";
  font-size: 2.5em;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 2em;
}
.registration-title__back:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
.registration-title__back > img {
  padding-top: 0.25em;
  height-max: 2.5em;
}
</style>
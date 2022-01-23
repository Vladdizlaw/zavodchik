<template>
     <div class="backbutton" @click="$emit('back',null)">
          <img src="../assets/back.svg" />
          <p>Назад</p>
        </div>
</template>
<script>
export default {
    name:'BackButton',
    
    
}
</script>
<style scoped>
.backbutton {
  font-family: "Amatic SC";
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
  cursor:pointer;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 10%; */
  /* height: 2rem; */
  transition: 0.3s;
}
.backbutton:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
.backbutton > img {
  padding-top: 0.25rem;
  max-height: 2.5rem;
}
.backbutton :active {
  filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
    drop-shadow(10px 10px 4px rgba(10, 73, 10, 0.75));
}
</style>
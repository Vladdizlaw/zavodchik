<template>
  <div class="supportbutton" @click="callSupport">
    <img src="../assets/support.svg" alt="" />
    <p>Поддержка</p>
  </div>
</template>
<script>
export default {
  name: "SupportButton",

  data() {
    return {};
  },
  methods: {
    callSupport() {
      this.$emit("support", null);
    },
  },
};
</script>
<style lang="scss" scoped>
.supportbutton {
  display: flex;
  justify-content: center;
   font-size: max(2.7vw, 1.4rem);
  // min-width: 10rem;
  margin-left: 0.3rem;
  align-items: center;
  transition: 0.3s;
   p{
     @media screen and (max-width:600px) {
     display: none;
     
  }
}
img{
   height: max(2.6vw,2.3rem);
   @media screen and (max-width:600px) {
       height:2.4rem;
         margin-bottom:1rem;
      
    }
}
}
.supportbutton:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>

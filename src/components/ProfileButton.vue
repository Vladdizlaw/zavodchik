<template>
  <div class="profile" @click="myProfile">
    <p>Мой профиль</p>
    <img src="../assets/profile.svg" alt="" />
  </div>
</template>
<script>
export default {
  name: "ProfileButton",

  data() {
    return {};
  },
  methods: {
    myProfile() {
      this.$emit("myProfile", null);
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
 
  display: flex;
  /* width: 5rem; */
  flex-wrap: nowrap;
  gap: 0.15rem;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  
   p{
      font-size: max(2.7vw, 1.4rem);
  @media screen and (max-width:450px) {
     display: none;
     
  }
   }
  img {
    padding-top: 0.25rem;
    height: max(2.7vw, 1.8rem);
     @media screen and (max-width:600px) {
       height:2.5rem;
        
      
    }
  }
}
.profile > img {
  height: 0.7em;
}
.profile:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
.profile:active {
  filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
    drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
}
</style>

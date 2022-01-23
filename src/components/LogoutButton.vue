<template>
     <div class="logout__button" @click="logout">
      <p>Выйти из аккаунта</p>
      <img src="../assets/exit.svg" alt="" />
    </div>
</template>
<script>
export default {
    name:'LogoutButton',
    data() {
        return {

        }
        
    },
    methods:{
      logout() {
      this.$emit("logout",null);
    },   
    }
}
</script>
<style scoped>
.logout__button {
  flex-wrap: nowrap;
  font-size: 2.7rem;
  /* width: 20%; */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
   transition: 0.3s;
}
.logout__button > img {
  height: 2rem;
  /* margin-top: 0.1rem; */
  margin-left: 0.3rem;
}

.logout__button:hover{
   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>
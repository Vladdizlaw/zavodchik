<template>
  <div class="logout__button" @click="logout">
      <img src="../assets/exit.svg" alt="" />
    <p>Выйти из аккаунта</p>
    </div>
</template>
<script>
export default {
  //Кнопка выхода из аккаунта
  name: "LogoutButton",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$emit("logout", null);
    },
  },
};
</script>
<style lang="scss" scoped>
.logout__button {
  flex-wrap: nowrap;
  font-size: max(2.7vw, 1.4rem);
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  
  p {
     line-height: 1.4rem;
    
    @media screen and (max-width: 600px) {
      display: none;
      }
  }

  img {
    height: max(2.6vw, 1.3rem);
    /* margin-top: 0.1rem; */
    margin-left: 0.3rem;
    @media screen and (max-width: 600px) and (min-height: 580px) {
      height: 1.7rem;
      margin-bottom: 1rem;
    }
  }
}

.logout__button:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>

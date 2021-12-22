<template>
  <div class="footer">
    <div class="footer-setings" @click="settings">
      <img class="roll" src="../assets/setings.svg" alt="" />
      <p>Настройка</p>
    </div>
    <div class="footer-time">
      <p>До конца пробного периода осталось: {{ lastTrialTime }} дней</p>
      <button @click="pay">Оплатить</button>
    </div>
    <div class="footer-exit" @click="logout">
      <p>Выйти из аккаунта</p>
      <img src="../assets/exit.svg" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfileFooter",
  props: {
    startTrial: Object,
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$emit("logout", null);
    },
    pay() {

    },

    settings() {
      this.$emit("back", { state: "settings" });
    },
  },
  computed: {
    lastTrialTime() {
      const timestampNow = Date.now();
      let result = Math.round(
        (this.startTrial.dateEnd - timestampNow) / 5184000
      );
      return result;
    },
  },
};
</script>
<style scoped>
.footer {
  margin-top: 1em;
  margin-bottom: 0.5em;
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.footer-setings {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
}
.roll{
  transition: 0.3s;
}
.footer-time {
  display: flex;
  min-width: 68%;
  justify-content: center;
  align-items: center;
  gap: 1em;
  font-size: 0.7em;
}
.footer-time > button {
  border: 1px solid #000000;
  box-sizing: border-box;
   transition: 0.3s;
  border-radius: 15px 0px;
  padding: 0 1em 0 1em;
  background: transparent;
}
.footer-exit {
  flex-wrap: nowrap;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
   transition: 0.3s;
}
.footer-exit > img {
  height: 0.9em;
  margin-top: 0.1em;
  margin-left: 0.2em;
}

.footer-exit:hover{
   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
.footer-setings:hover .roll {
  transform: rotate(1080deg);
  
}
.footer-setings:hover {
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
button{
  font-size: 1rem;
  min-height: 2rem;
   transition: 0.3s;
}
.footer-time > button:hover  {
 filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>

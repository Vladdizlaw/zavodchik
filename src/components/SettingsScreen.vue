<template>
  <div
    class="wrapper"
    :class="{ dog: user.animal.type == 'dog', cat: user.animal.type == 'cat' }"
  >
    <div class="header">
      <back-button :func="back" class="backbutton" />
      <div class="header__text">
        <img src="../assets/setting.svg" alt="" v-if="state == 'start'" />
        <p v-if="state == 'start'">Настройка</p>
        <p v-if="state == 'contacts'">Контактные данные</p>
      </div>
      <div class="header__save" v-show="state !== 'start'">
        <img src="../assets/save.svg" alt="" />
        <p>Сохранить изменения</p>
      </div>
    </div>
    <div class="main">
      <div class="main-menu" v-if="state == 'start'">
        <p @click="contacts">Контактные данные</p>
        <p>Данные животного</p>
        <p>Редактировать фото</p>
        <p>Настроить уведомления</p>
        <p>Оплата</p>
      </div>
      <div class="contacts" v-if="state == 'contacts'">
        <div class="wrapper-left">
          <p>Ваше имя</p>
          <p>Телефон</p>
          <p>E-mail</p>
          <p>Пароль</p>
          <p>Город</p>
          <p>Адрес (Район/Улица)</p>
        </div>
        <div class="wrapper-right">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-support">
        <img src="../assets/support.svg" alt="" />
        <p>Поддержка</p>
      </div>
      <div class="footer-time"></div>
      <div class="footer-exit" @click="exit">
        <p>Выйти из аккаунта</p>
        <img src="../assets/exit.svg" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import BackButton from "./BackButton.vue";
export default {
  name: "SettingsScreen",
  components: { BackButton },
  props: { user: Object },
  data() {
    return {
      state: "start",
    };
  },
  methods: {
    back() {
      if (this.state == "start") {
        this.$emit("back", { state: "profile" });
      } else {
        this.state = "start";
      }
    },
    exit() {
      this.$emit("back", { state: "registration" });
    },
    contacts() {
      this.state = "contacts";
      console.log(this.state);
    },
  },
};
</script>
<style scoped>
.dog {
  background: url("../assets/cover_dog_acc.svg"), url("../assets/cover_dog.png");
  background-position: center, center;
  background-size: 70vh, cover;
  background-repeat: no-repeat, no-repeat;
}
.cat {
  background: url("../assets/cover_cat_acc.svg"), url("../assets/cover_cat.png");
  background-position: center, center;
  background-size: 100vh, cover;
  background-repeat: no-repeat, no-repeat;
}
.wrapper {
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

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}
.header {
  width: 100vw;
  height: 2em;
  display: flex;
  align-items: center;
  margin-top: 1em;
  position: relative;
}
.header__text {
  width: 79%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
}
.header__save {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 19%;
  position: absolute;
  right: 0;
}
.header__text > img {
  height: 1em;
  margin-right: 0.2em;
}
.backbutton {
  font-size: 1.25em;
  max-width: 20%;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70vh;
}
.main-menu {
  min-height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  line-height: 81px;
  font-size: 1.5em;
}
.main-menu > p:hover {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5),
    10px 10px 4px rgba(9, 112, 7, 0.75);
}
.footer {
  margin-top: 1em;
  margin-bottom: 0.5em;
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.footer-support {
  display: flex;
  justify-content: center;
  margin-left: 0.3em;
}
.footer-time {
  display: flex;
  min-width: 68%;
  justify-content: center;
  gap: 1em;
  font-size: 0.7em;
}
.footer-exit {
  flex-wrap: nowrap;
  width: 20%;
  display: flex;
  justify-content: center;
}
.footer-exit > img {
  height: 0.9em;
  margin-top: 0.1em;
  margin-left: 0.2em;
}
.footer-exit:hover,
.header__save:hover,
.footer-support:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
.contacts {
  display: flex;
  height: 90%;
  justify-content: flex-start;
  align-items: center;
  width:100vw;
}
.wrapper-left {
  padding-left: 1em;
  display: flex;
  width: 35%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
}
.wrapper-right{
  display: flex;
  width: 70%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
}
.wrapper-right>input{
background: rgba(255, 255, 255, 0.5);
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 10px;
height: 1em;
width:13em;
}
</style>

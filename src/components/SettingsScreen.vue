<template>
  <div
    class="wrapper"
    :class="{ dog: user.animal.type == 'dog', cat: user.animal.type == 'cat' }"
  >
    <div class="header">
      <back-button :func="back" class="backbutton" />
      <kinesis-container :duration="300">
        <div class="header__text">
          <kinesis-element :strength="500" type="rotate">
            <img src="../assets/setting.svg" alt="" v-if="state == 'start'" />
          </kinesis-element>

          <p v-if="state == 'start'">Настройка</p>
          <div v-if="state == 'contacts'">
            <p>Контактные данные</p>
          </div>
        </div></kinesis-container
      >
      <div class="header__save" @click="save" v-show="state !== 'start'">
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
          <input type="text" v-model="user.profile.name" />
          <div class="input__seen">
            <input
              ref="tel"
              type="tel"
              v-phone
              v-model="user.profile.tel"
              :class="{ unseen: !seenTelFlag }"
            />
            <img
              src="../assets/seen.svg"
              @click="seenTel"
              alt=""
              v-if="seenTelFlag"
            /><img
              src="../assets/unseen.svg"
              v-if="!seenTelFlag"
              @click="seenTel"
              alt=""
            />
          </div>

          <input type="text" v-model="user.profile.mail" />
          <input type="text" v-model="user.profile.pass" />
          <select v-model="user.profile.city">
            <option
              :value="city"
              v-for="(city, ind) in selectedCity"
              :key="ind"
              >{{ city }}</option
            >
          </select>
          <div class="input__seen">
            <input
              ref="hood"
              type="text"
              v-model="user.profile.hood"
              :class="{ unseen: !seenHoodFlag }"
            />
            <img
              src="../assets/seen.svg"
              v-if="seenHoodFlag"
              @click="seenHood"
              alt=""
            />
            <img
              src="../assets/unseen.svg"
              v-if="!seenHoodFlag"
              @click="seenHood"
              alt=""
            />
          </div>
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
//  import { nextTick } from 'vue/types/umd';
// import {KinesisContainer, KinesisElement} from 'vue-kinesis'
import BackButton from "./BackButton.vue";
export default {
  name: "SettingsScreen",
  components: { BackButton },
  props: { user: Object, selectedCity: Array },
  data() {
    return {
      state: "start",
      seenTelFlag: true,
      seenHoodFlag: true,
    };
  },
  methods: {
    back() {
      console.log(this.user)
      if (this.state == "start") {
        this.$emit("back", { state: "profile" });
      } else {
        this.state = "start";
      }
    },
    exit() {
      this.$emit("back", { state: "registration", substate: "start" });
    },
    contacts() {
      this.state = "contacts";
      // console.log(this.state);
    },
    save() {
      this.user.profile.seenFlags = {
        seenTelFlag: this.seenTelFlag,
        seenHoodFlag: this.seenHoodFlag,
      };
      // console.log(this.user);
      this.$emit("save", this.user);
    },
    seenTel() {
      if (this.seenTelFlag) {
        // this.$refs.tel.style.opacity = "0.5";
        this.seenTelFlag = false;
      } else {
        // this.$refs.tel.style.backgroundColor='rgba(255, 255, 255, 0.5)'
        // this.$refs.tel.style.opacity = "1";
        this.seenTelFlag = true;
      }
    },
    seenHood() {
      if (this.seenHoodFlag) {
        // this.$refs.hood.style.opacity = "0.5";
        // this.$refs.hood.style.backDropFilter='blur(2px);'
        // console.log(this.$refs.hood.style);
        this.seenHoodFlag = false;
      } else {
        // this.$refs.hood.style.filter='none'
        // this.$refs.hood.style.opacity = "1";
        this.seenHoodFlag = true;
      }
    },
  },
  computed: {},
  mounted() {
   this.seenHoodFlag=this.user.profile.seenFlags?.seenHoodFlag
   this.seenTelFlag=this.user.profile.seenFlags?.seenTelFlag
  },
};
</script>
<style scoped>
.unseen {
  opacity: 0.5;
}
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
  position: relative;
  left: 27vw;
  width: 26vw;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8em;
  flex-wrap: nowrap;
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
  transition: all 0.3s;
}
.main-menu > p:hover {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5),
    10px 10px 4px rgba(9, 112, 7, 0.75);
  font-size: 1.1em;
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
  min-width: 10rem;
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
  width: 100vw;
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
.wrapper-right {
  display: flex;
  width: 70%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
}
.input__seen > img {
  /* display: flex; */
  padding-left: 0.2em;
  width: 1.1em;
  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75)); */
}

.input__seen > input,
.wrapper-right > input,
.wrapper-right > select {
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  height: 1em;
  width: 13em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
}
input:hover,
select:hover {
  font-size: 1.01em;
  /* height: 2em; */
}
option {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>

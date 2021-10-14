<template>
  <div class="main">
    <div class="registration" v-if="registration">
       
      <div class="mail">
        <p>Введите email:</p>
        <input type="email" v-model="regForm.male" />
      </div>
      <div class="phone">
        <p>Введите телефон:</p>
        <input type="tel" required v-model="regForm.tel" v-phone/>
      </div>
     
       <div class="name">
        <p>Введите ваше имя:</p>
      <input type="text" v-model="regForm.name" maxlength="12" />
       </div>
       <div class="city">
        <p>Придумайте пароль </p>
        <p>не меньше 8 символов:</p>
      <input type="text" minlength="8" v-model="regForm.pass"/>
      </div>
      <button>Зарегистрировать</button>
    </div>
    <div class="regwindow" v-if="start">
      <div class="forinput">
        <p>ЛОГИН (E-MAIL):</p>
        <input type="text" v-model="login" />
        <p>ПАРОЛЬ:</p>
        <input type="password" v-model="password" />
      </div>
      <div class="forbutton">
        <button class="registr" @click="regist">РЕГИСТРАЦИЯ</button>
        <button class="signin" @click="sign">ВОЙТИ</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegistrationScreen",
  props: {
      place:String,
  },
  data() {
    return {
      start: true,
      registration: false,
      signin: false,
      login: null,
      password: null,
      regForm: {
        mail: null,
        tel: null,
        name:null,
        pass:null,
      },
    };
  },
  methods: {
    regist() {
      this.start = false;
      this.registration = true;
    },
    sign() {},
  },
};
</script>
<style scoped>
.main {
  background: url("../assets/catreg.svg"), url("../assets/dogreg.svg"),
    url("../assets/cover.svg");
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 40%, 36%, 110%;
  background-position: -12% 3em, 110%, center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
}
.registration {
  font-size: 2em;
  font: bold oblique large fantasy;
  text-shadow: 5px 5px 10px rgb(49, 42, 42);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 2px solid;
  width: 40%;
  height: 80%;
  box-shadow: 5px 7px rgb(100, 100, 22);
  border-radius: 3em 8em 3em 8em;
  background: url("../assets/cover1.svg");
  background-position: center;
  background-size: 200%;
  background-repeat: no-repeat;
  text-align: center;
  overflow-y: auto;
}
.regwindow {
  background: url("../assets/cover1.svg");
  background-position: center;
  background-size: 110%;
  overflow: hidden;
  width: 35%;
  height: 40%;
  border: 2px solid;
  border-radius: 3em 8em 3em 8em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 5px 7px rgb(100, 100, 22);
  opacity: 0.9;
  transition: all 0.3s;
  /* padding: 2em 2em; */
}
.forbutton {
  display: flex;
  flex-direction: row;
  width: 70%;
  justify-content: space-between;
  align-items: center;
}
.forinput {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  height: 50%;
  font-size: 2em;
  font: bold oblique large fantasy;
  text-shadow: 5px 5px 10px rgb(49, 42, 42);
}
input {
  border: 1px solid;
  height: 2em;
  text-align: center;
  border-radius: 1em;
}
button {
  border: 1px solid;
  /* border-radius: 1em; */
  width: 10em;
  height: 4em;
  /* box-shadow: 3px 5px rgb(100, 100, 22); */
  font-size: 2em;
  font: bold oblique large fantasy;
  box-shadow: 5px 7px rgb(100, 100, 22);
  border-radius: 3em 8em 3em 8em;
  /* text-shadow: 5px 5px 10px rgb(49, 42, 42); */
}
.regwindow:hover {
  opacity: 1;
  box-shadow: 7px 9px rgb(100, 100, 22);
}
button:hover {
  box-shadow: 4px 6px rgb(100, 100, 22);
}
button:active {
  box-shadow: 4px 8px rgb(100, 100, 22);
}
</style>

<template>
  <section class="login_form">
    <div class="login_form_forinput">
      <p>ЛОГИН (E-MAIL):</p>
      <input type="text" v-model="login" />
      <div class="errmsg" :v-show="errs.login">{{ errs.login }}</div>
      <p>ПАРОЛЬ:</p>
      <input type="password" v-model="password" />
      <div class="errmsg" :v-show="errs.pswd">{{ errs.pswd }}</div>
    </div>
    <div class="login_form_forbutton">
      <button class="login_form_forbutton_btn" @click="registration">
        <p>РЕГИСТРАЦИЯ</p>
      </button>
      <button class="login_form_forbutton_btn" @click="signIn">
        <p>ВОЙТИ</p>
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      login: null,
      password: null,
      errs: {
        login: "",
        pswd: "",
      },
    };
  },
  methods: {
    registration() {
      this.$emit("signUp", null);
    },
    async signIn() {
      let valid = true;

      if (!this.login || !this.login.split("@")[1]?.split(".")[1]) {
        valid = false;
        this.errs.login = "Введите корректный логин";
        setTimeout(() => {
          this.errs.login = "";
        }, 3000);
      }
      if (!this.password) {
        valid = false;
        this.errs.pswd = "Введите пароль";
        setTimeout(() => {
          this.errs.pswd = "";
        }, 3000);
      }
      if (!valid) {
        return;
      } else {
        // this.regForm.id = uuidv4();
        const loginForm = { mail: this.login, pass: this.password };
        try {
          var user = await axios.post(
            "http://localhost:5000/api/login",
            loginForm
          );
          this.$store.commit("SAVE_PROFILE", user.data);
          this.$emit("signIn");
          // console.log("user", this.$store.user);
        } catch (user) {
          console.log("user", user.status);

          this.errs.login = "пользователь  не найден";
          setTimeout(() => {
            this.errs.login = "";
          }, 3000);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";
.login_form {
  position: relative;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  @media screen and (min-height: 469px) {
    justify-content: center;
  }
  gap: 1rem;
  align-items: center;
  overflow: auto;
  height: 100%;
  width: 100%;
  font-family: $font-family;
  text-shadow: $textshadow;
  font-size: max(1.8vw, 1.2rem);
  //   gap: 2vh;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar {
    background: transparent;
  }
  .login_form_forinput {
    position: relative;
    .errmsg {
      color: #ff0000;
      display: flex;
      font-family: inherit;
      font-size: max(1.4vw, 0.9rem);
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      transform: matrix(1, 0, 0, 1, 0, 0);
      // top: 50%;
      left: 30%;
      position: absolute;
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
      @media screen and(orientation:portrait){
        left:center;
      }
    }

    input {
      width: max(12rem, 25vw);
      height: max(1.4rem, 3.5vh);
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid #000000;
      box-sizing: border-box;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      padding: 0.1rem;
      text-align: center;
      text-justify: center;
      font-family: $font-family;
      text-shadow: $textshadow;
      font-size: max(1.8vw, 1.2rem);
      transition: 0.3s;
      opacity: 0.8;

      &:focus {
        transform: scale(110%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      }
      &:hover {
        transform: scale(110%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      }
    }
  }
  .login_form_forbutton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: max(5vw, 2rem);
    .login_form_forbutton_btn {
      margin-top: max(2rem, 5vh);
      margin-bottom: max(2rem, 5vh);
      height: max(2rem, 6vh);
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(108.6deg, #95c671 13.72%, #698852 89.83%);
      border: 1px solid #000000;
      box-sizing: border-box;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
      border-radius: 30px 0px;
      padding: 0 1rem 0 1rem;
      font-family: Amatic SC;
      font-style: normal;
      font-weight: bold;
      font-size: max(1.9vw, 1.4rem);
      cursor: pointer;
      color: #000000;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      transition: 0.3s;
      @media screen and (orientation: portrait) {
        border-radius: 20px 0px;
      }
      &:hover {
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
        border: 1px solid #000000;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      }
    }
    @keyframes shake {
      10%,
      90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }

      30%,
      50%,
      70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%,
      60% {
        transform: translate3d(4px, 0, 0);
      }
    }
  }
}
</style>

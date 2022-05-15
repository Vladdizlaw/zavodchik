<template>
  <section class="profile-form">
    <div class="profile-form_block">
      <p>Введите email</p>
      <input type="email" v-model="regForm.mail" :class="{ wrong: usedMail }" />
      <div class="errmsg" :v-show="errs.mail">
        {{ errs.mail }}
      </div>
    </div>
    <div class="profile-form_block">
      <p>Введите телефон</p>
      <input type="tel" required v-model="regForm.tel" maxlength="16" v-phone />
      <div class="errmsg" :v-show="errs.tel">{{ errs.tel }}</div>
    </div>

    <div class="profile-form_block">
      <p>Введите ваше имя</p>
      <input type="text" v-model="regForm.name" maxlength="12" />
      <div class="errmsg" :v-show="errs.name">{{ errs.name }}</div>
    </div>
    <div class="profile-form_block">
      <p>Город</p>
      <select v-model="regForm.city" placeholder="город">
        <option :value="city" v-for="(city, ind) in selectedCity" :key="ind">{{
          city
        }}</option>
      </select>
      <div class="errmsg" :v-show="errs.city">{{ errs.city }}</div>
    </div>
    <div class="profile-form_block">
      <p>Пароль (не меньше 6 символов):</p>
      <input
        type="text"
        minlength="6"
        maxlength="11"
        required
        v-model="regForm.pass"
      />
      <div class="errmsg" :v-show="errs.pswd">{{ errs.pswd }}</div>
    </div>
    <button class="profile-form_btn" @click.stop="emitProfileForm">
      <p>Далее</p>
    </button>
  </section>
</template>
<script>
export default {
  name: "ProfileRegistration",
  props: {
    usedMails: { type: Array },
    selectedCity: { type: Array },
    city: { type: String },
  },
  data() {
    return {
      usedMail: false,
      regForm: {
        mail: null,
        tel: null,
        name: null,
        pass: null,
        city: null,
      },
      errs: {
        mail: "",
        tel: "",
        name: "",
        pswd: "",
        city: "",
      },
    };
  },
  watch: {
    "regForm.mail": function(val) {
      if (this.usedMails.includes(val)) {
        this.usedMail = true;
      } else {
        this.usedMail = false;
      }
    },
  },
  mounted() {
    console.log("prp profile regist", this.$props);
    this.regForm.city = this.city;
  },
  methods: {
    emitProfileForm() {
      let valid = true;
      if (!this.regForm.mail?.split("@")[1]?.split(".")[1] || this.usedMail) {
        valid = false;
        this.errs.mail = "Введите корректную почту";
        setTimeout(() => {
          this.errs.mail = "";
        }, 3000);
      }

      if (
        this.regForm.tel?.length < 11 ||
        !this.regForm.tel ||
        this.regForm.tel?.length > 15
      ) {
        valid = false;
        this.errs.tel = "Введите корректный номер";
        setTimeout(() => {
          this.errs.tel = "";
        }, 3000);
      }
      if (!this.regForm.city) {
        valid = false;
        this.errs.city = "Введите город";
        setTimeout(() => {
          this.errs.city = "";
        }, 3000);
      }
      if (!this.regForm.name) {
        valid = false;
        this.errs.name = "Введите имя";
        setTimeout(() => {
          this.errs.name = "";
        }, 3000);
      }
      if (!this.regForm.pass || this.regForm.pass?.length < 6) {
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
        this.$emit("regForm", { regForm: this.regForm });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/main.scss";
* {
  box-sizing: border-box;
}
.wrong {
  color: red;
}
.profile-form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  @media screen and (min-height: 469px) {
    justify-content: center;
  }
  gap: 1rem;
  align-items: center;
  overflow: auto;
  height: 100%;
  width: 100%;
  //   gap: 2vh;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar {
    background: transparent;
  }
  &_block {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: $font-family;
    text-shadow: $textshadow;
    .errmsg {
      color: #ff0000;
      display: flex;
      font-family: inherit;
      font-size: max(1.4vw, 0.9rem);
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      transform: matrix(1, 0, 0, 1, 0, 0);
      top: max(1.6vw, 1.4rem);
      position: absolute;
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    }
    p {
      font-size: max(1.9vw, 1.4rem);
      box-sizing: border-box;
      margin: 0 0 1rem 0;
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
      font-size: max(1rem, 1.4vw);
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
    select {
      display: flex;
      justify-content: center;
      align-items: center;
      width: max(12rem, 25vw);
      height: max(1.4rem, 3.5vh);
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid #000000;
      box-sizing: border-box;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      transform: matrix(1, 0, 0, 1, 0, 0);

      text-align: center;
      text-justify: center;
      font-family: $font-family;
      text-shadow: $textshadow;
      font-size: max(1rem, 1.4vw);
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
      option {
        text-align: center;
        text-justify: center;
      }
    }
  }
  .profile-form_btn {
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
</style>

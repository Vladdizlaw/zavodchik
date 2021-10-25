<template>
  <div class="main">
    <div class="registration" v-if="registration">
      <div class="mail">
        <p>Введите email:</p>
        <input type="email" v-model="regForm.mail" />
        <div ref="errmail" class="errmsg" :v-show="errs.mail">
          {{ errs.mail }}
        </div>
      </div>
      <div class="phone">
        <p>Введите телефон:</p>
        <input type="tel" required v-model="regForm.tel" maxlength="16" v-phone />
        <div class="errmsg" :v-show="errs.tel">{{ errs.tel }}</div>
      </div>

      <div class="name">
        <p>Введите ваше имя:</p>
        <input type="text" v-model="regForm.name" maxlength="12" />
        <div class="errmsg" :v-show="errs.name">{{ errs.name }}</div>
      </div>
      <div class="psw">
        <p>Придумайте пароль</p>
        <p>не меньше 6 символов:</p>
        <input type="text" minlength="6" maxlength="11" required v-model="regForm.pass" />
        <div class="errmsg" :v-show="errs.pswd">{{ errs.pswd }}</div>
      </div>
      <button @click.stop="getRegistration">Зарегистрировать</button>
    </div>
    <div class="regwindow" v-if="start">
      <div class="forinput">
        <p>ЛОГИН (E-MAIL):</p>
        <input type="text" v-model="login" />
        <p>ПАРОЛЬ:</p>
        <input type="password" v-model="password" />
      </div>
      <div class="forbutton">
        <button class="registr" @click="changeStateRegist">РЕГИСТРАЦИЯ</button>
        <button class="signin" @click="sign">ВОЙТИ</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegistrationScreen",
  props: {
    place: String,
  },
  data() {
    return {
      start: true,
      registration: false,
      signin: false,
      login: null,
      password: null,
      errs: {
        mail: "",
        tel: '',
        name: '',
        pswd: '',
      },
      regForm: {
        mail: null,
        tel: null,
        name: null,
        pass: null,
      },
    };
  },
  methods: {
    changeStateRegist() {
      this.start = false;
      this.registration = true;
    },
    getRegistration() {
      let valid=true
      if (!this.regForm.mail?.split("@")[1]?.split(".")[1]) {
        valid=false
        this.errs.mail = "Введите корректную почту";
        setTimeout(() => {
          this.errs.mail = "";
        }, 3000);
        
      }
        // const p=document.createElement('p')
        if (this.regForm.tel?.length<14||!this.regForm.tel||this.regForm.tel?.length>15){
           valid=false
          this.errs.tel = "Введите корректный номер";
        setTimeout(() => {
          this.errs.tel = "";
        }, 3000);
        
        }
        if (!this.regForm.name){
           valid=false
          this.errs.name = "Введите имя";
        setTimeout(() => {
          this.errs.name = "";
        }, 3000);
        
        }
         if (!this.regForm.pass||this.regForm.pass?.length<6) {
            valid=false
         this.errs.pswd = "Введите пароль";
        setTimeout(() => {
          this.errs.pswd = "";
        }, 3000);
        
        }
        if (!valid){
          return
        }else{
          this.$emit('regForm',{regForm:this.regForm})
           this.start = true;
      this.registration = false;
          console.log('correct')
        }
      
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
.active {
  display: flex;
}
.errmsg {
  display: flex;
  color: red;
  position: absolute;
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

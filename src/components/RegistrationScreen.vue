<template>
  <div class="main">
    <div
      class="registration"
      v-if="
        states.registrationUser ||
          states.registrationAnimal1 ||
          states.registrationAnimal2 ||
          states.registrationAnimal3
      "
    >
      <div class="registration-title"><p>Регистрация</p></div>
      <div class="registration-user" v-if="states.registrationUser">
        <div class="user mail">
          <p>Введите email:</p>
          <input type="email" v-model="regForm.mail" />
          <div ref="errmail" class="errmsg" :v-show="errs.mail">
            {{ errs.mail }}
          </div>
        </div>
        <div class="user phone">
          <p>Введите телефон:</p>
          <input
            type="tel"
            required
            v-model="regForm.tel"
            maxlength="16"
            v-phone
          />
          <div class="errmsg" :v-show="errs.tel">{{ errs.tel }}</div>
        </div>

        <div class="user name">
          <p>Введите ваше имя:</p>
          <input type="text" v-model="regForm.name" maxlength="12" />
          <div class="errmsg" :v-show="errs.name">{{ errs.name }}</div>
        </div>
        <div class="user city">
          <p>Город</p>
          <select v-model="regForm.city" placeholder="город">
            <option
              :value="city"
              v-for="(city, ind) in selectedCity"
              :key="ind"
              >{{ city }}</option
            >
          </select>
        </div>
        <div class="user psw">
          <p>Придумайте пароль (не меньше 6 символов):</p>
          <input
            type="text"
            minlength="6"
            maxlength="11"
            required
            v-model="regForm.pass"
          />
          <div class="errmsg" :v-show="errs.pswd">{{ errs.pswd }}</div>
        </div>
        <button class="next-btn" @click.stop="getRegistration">
          <p>Далее</p>
        </button>
      </div>
      <div class="registration-animal1" v-if="states.registrationAnimal1">
        <div class="animal type">
          <p>Вид животного</p>
          <select v-model="animalType">
            <option value="cat">Кошка </option>
            <option value="dog">Собака</option>
          </select>
        </div>
        <div class="animal male">
          <p>Пол</p>
          <select v-model="animalForm.male">
            <option value="мужской">мужской </option>
            <option value="Женский">Женский</option>
          </select>
        </div>

        <div class="animal age">
          <p>Возраст</p>
          <input type="number" v-model="animalForm.age" />
        </div>
        <div class="animal breed">
          <p>Порода</p>
          <select v-model="animalForm.breed" placeholder="порода">
            <option :value="bred" v-for="(bred, ind) in breedList" :key="ind">{{
              bred
            }}</option>
          </select>
        </div>
        <div class="animal name">
          <p>Имя животного</p>
          <input type="text" v-model="animalForm.name" />
        </div>
        <button class="next-btn" @click.stop="getRegistrationAnimal1">
          <p>Далее</p>
        </button>
      </div>
      <div class="registration-animal2" v-if="states.registrationAnimal2">
        <div class="animal mating">
          <p>Предположительная дата вязки</p>
          <input type="date" v-model="animalForm.dateMating" />
        </div>
        <div class="animal awards">
          <p>Награды, титулы, медали</p>
          <input type="text" v-model="animalForm.awards" />
        </div>
        <div class="animal vaccine">
          <p>Прививки</p>
          <input type="text" v-model="animalForm.vaccination" />
        </div>
        <div class="animal color">
          <p>Окрас</p>
          <input type="text" v-model="animalForm.color" />
        </div>
        <div class="animal circumstances">
          <p>Условия вязки</p>
          <input type="text" v-model="animalForm.matingConditions" />
        </div>
        <button class="next-btn" @click.stop="getRegistrationAnimal2">
          <p>Далее</p>
        </button>
      </div>
    </div>
    <div class="regwindow" v-if="states.start">
      <div class="forinput">
        <p>ЛОГИН (E-MAIL):</p>
        <input type="text" v-model="login" />
        <p>ПАРОЛЬ:</p>
        <input type="password" v-model="password" />
      </div>
      <div class="forbutton">
        <button class="registr" @click="changeStateRegist">
          <p>РЕГИСТРАЦИЯ</p>
        </button>
        <button class="signin" @click="sign"><p>ВОЙТИ</p></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegistrationScreen",
  props: {
    place: String,
    substate: String,
  },
  data() {
    return {
      states: {
        start: true,
        registrationUser: false,
        registrationAnimal1: false,
        registrationAnimal2: false,
        registrationAnimal3: false,
      },
      signin: false,
      login: null,
      password: null,
      breedList: [],
      errs: {
        mail: "",
        tel: "",
        name: "",
        pswd: "",
      },
      regForm: {
        mail: null,
        tel: null,
        name: null,
        pass: null,
        city: null,
      },
      animalType: null,
      animalForm: {
        type: null,
        male: null,
        age: 1,
        breed: null,
        name: null,
        dateMating: null,
        awards: null,
        vaccination: null,
        color: null,
        matingConditions: null,
      },
    };
  },
  mounted() {
    this.regForm.city = this.place;
    if (this.substate == "registrationUser") {
      this.states.start = false;
      this.states.registrationUser = true;
    }
  },
  watch: {
    animalType: function() {
      this.animalForm.type = this.animalType;
      if (this.animalType == "dog") {
        //В зависимости от типа животного подгружаем список пород
        const breed_string = require("!raw-loader!../dog_breed.txt");

        this.breedList = breed_string.default
          .split("\r\n")
          .filter((el) => el != "");
      }
      if (this.animalType == "cat") {
        const breed_string = require("!raw-loader!../cat_breed.txt");

        this.breedList = breed_string.default.split("\r\n");
      }
    },
  },
  computed: {
    selectedCity() {
      const cityList = require("../cities.json");
      let citySelected = [];
      cityList.forEach((city) => {
        citySelected.push(city["Город"]);
      });

      return citySelected.sort().filter((el) => el != "");
    },
  },
  methods: {
    changeStateRegist() {
      this.states.start = false;
      this.states.registrationUser = true;
    },
    getRegistration() {
      let valid = true;
      if (!this.regForm.mail?.split("@")[1]?.split(".")[1]) {
        valid = false;
        this.errs.mail = "Введите корректную почту";
        setTimeout(() => {
          this.errs.mail = "";
        }, 3000);
      }
      // const p=document.createElement('p')
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
        this.$emit("regForm", { regForm: this.regForm });
        //  this.start = true;
        this.states.registrationUser = false;
        this.states.registrationAnimal1 = true;
        console.log("correct", this.states);
      }
    },
    getRegistrationAnimal1() {
      this.states.registrationAnimal1 = false;
      this.states.registrationAnimal2 = true;
    },
    getRegistrationAnimal2() {
      this.states.registrationAnimal2 = false;
      this.states.registrationAnimal3 = true;
    },

    sign() {},
  },
};
</script>
<style scoped>
.main {
  background: url("../assets/catreg.svg"), url("../assets/dogreg.svg"),
    url("../assets/cover.png");
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 26.5%, 29%, cover;
  background-position: 2% 1.1em, 100% 0.8em, center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
}
.main p {
  font-family: "Amatic SC";
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
}
.user,
.animal {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  align-items: center;
}
.user >p , .animal>p{
  margin-bottom: 0.5em;
}
.type-animal {
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  width: 100%;
  height: 10%;
}
.age-animal {
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: column;
  max-width: 20%;
  height: 10%;
}
.active {
  display: flex;
}
.errmsg {
  display: flex;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;

  color: #ff0000;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
  top: 35px;
  position: absolute;
}
.registration {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* border: 2px solid; */
  width: 100%;
  height: 100%;

  text-align: center;
  overflow: hidden;
  position: relative;
}

.registration-user,
.registration-animal1,
.registration-animal2,
.registration-animal3 {
  font-size: 2em;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* border: 2px solid; */
  width: 100%;
  height: 100%;

  text-align: center;
  overflow: hidden;
}

.regwindow {
  background: url("../assets/cover1.png");
  background-position: center;
  background-size: cover;
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
.user,
.animal {
  min-width: 30%;
}
.registration-title > p {
  font-size: 3em;
  height: 1fr;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */

  /* flex: auto 0 50%; */
}
input,
select,
textarea {
  width: 100%;
  height: 27px;
  background: #ffffff;
  opacity: 0.7;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: 900;
  font-size: 23px;
  line-height: 28px;
  /* identical to box height */

  color: rgba(0, 0, 0, 1);
}
option {
  display: flex;
  justify-content: center;
  text-align: center;
}
button {
  display: flex;
  justify-content: center;
  width: 180px;
  height: 58px;
  border: 1px solid #000000;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 25px 0px;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 61px;

  color: #000000;
}

.regwindow:hover {
  opacity: 1;
  box-shadow: 7px 9px rgb(100, 100, 22);
}
button:hover {
  border: 1px solid #000000;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px #00e04c) drop-shadow(0px 4px 4px #09461a)
    drop-shadow(0px 4px 4px #074110);
  border-radius: 25px 0px;
}
button:active {
  box-shadow: 4px 8px rgb(100, 100, 22);
}
</style>

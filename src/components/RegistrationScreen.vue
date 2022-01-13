<template>
  <div class="main">
    <div
      class="registration"
      v-if="
        states.registrationUser.value ||
          states.registrationAnimal1.value ||
          states.registrationAnimal2.value ||
          states.registrationAnimal3.value
      "
    >
      <div class="registration-title">
        <back-button :func="back" />
        <div class="registration-title__text"><p>Регистрация</p></div>
      </div>
      <section class="registration-user" v-if="states.registrationUser.value">
        <div class="user mail">
          <p>Введите email:</p>
          <input type="email" v-model="regForm.mail" />
          <div class="errmsg" :v-show="errs.mail">
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
          <div class="errmsg" :v-show="errs.city">{{ errs.city }}</div>
        </div>
        <div class="user psw">
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
        <button class="next-btn" @click.stop="getRegistration">
          <p>Далее</p>
        </button>
      </section>
      <section class="registration-animal1" v-if="states.registrationAnimal1.value">
        <div class="animal type">
          <p>Вид животного</p>
          <select v-model="animalType">
            <option value="cat">Кошка </option>
            <option value="dog">Собака</option>
          </select>
          <div class="errmsg" :v-show="errs.type">{{ errs.type }}</div>
        </div>
        <div class="animal male">
          <p>Пол</p>
          <select v-model="animalForm.male">
            <option value="мужской">мужской </option>
            <option value="Женский">Женский</option>
          </select>
          <div class="errmsg" :v-show="errs.male">{{ errs.male }}</div>
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
          <div class="errmsg" :v-show="errs.breed">{{ errs.breed }}</div>
        </div>
        <div class="animal name">
          <p>Имя животного</p>
          <input type="text" v-model="animalForm.name" />
           <div class="errmsg" :v-show="errs.nameAnimal">{{ errs.nameAnimal }}</div>
        </div>
        <button class="next-btn" @click.stop="getRegistrationAnimal1">
          <p>Далее</p>
        </button>
      </section>
      <section class="registration-animal2" v-if="states.registrationAnimal2.value">
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
        <div class="animal circumstances-mating">
          <p>Условия вязки</p>
          <input type="text" v-model="animalForm.matingConditions" />
        </div>
        <button class="next-btn" @click.stop="getRegistrationAnimal2">
          <p>Далее</p>
        </button>
      </section>
      <section class="registration-animal3" v-if="states.registrationAnimal3.value">
        <PhotoAdd :message="'Фото животных'" @photo="getPhotoAnimal" />
       
        <div class="animal personal_data">
          <div
            class="personal_data_checkbox"
            @click="licenseAgreement"
            :class="{ checked: animalForm['licenseAgreement'] }"
          ></div>
          <div class="personal_data_text">
            <div><p>Я принимаю Соглашение на обработку персональных данных</p></div>
            <div class="errmsg personal-text_err" :v-show="errs.licenseAgreement">
              {{ errs.licenseAgreement }}
            </div>
          </div>
        </div>
        <div class="animal personal_data">
          <div
            class="personal_data_checkbox"
            @click="startTrial"
            :class="{ checked: animalForm['startTrial']['value'] }"
          ></div>
          <div class="personal_data_text">
            <p>Попробовать бесплатно</p>
            <div class="errmsg" :v-show="errs.startTrial">
              {{ errs.startTrial }}
            </div>
          </div>
        </div>
        <button class="next-btn" @click.stop="getRegistrationAnimal3">
          <p>Зарегестрировать</p>
        </button>
      </section>
    </div>
    <section class="regwindow" v-if="states.start.value">
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
    </section>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import PhotoAdd from "../components/PhotoAdd.vue";
import BackButton from './BackButton.vue';
export default {
  name: "RegistrationScreen",
  props: {
    city: String,
    substate: String,
    selectedCity:Array,
  },
  components: {
    PhotoAdd,
    BackButton,
  },
  data() {
    return {
      states: {
        // previosState:null,
        start: { value: true, previosState: "start" },
        registrationUser: { value: false, previosState: "start" },
        registrationAnimal1: { value: false, previosState: "registrationUser" },
        registrationAnimal2: {
          value: false,
          previosState: "registrationAnimal1",
        },
        registrationAnimal3: {
          value: false,
          previosState: "registrationAnimal2",
        },
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
        city: "",
        breed: "",
        type: "",
        male: "",
        licenseAgreement: "",
        startTrial: "",
        nameAnimal:""
      },
      regForm: {
        mail: null,
        tel: null,
        name: null,
        pass: null,
        city: null,
        id:null,
         hood: "",
          seenFlags:{seenHoodFlag:true,seenTelFlag:true},
      },
      animalType: null,
      
       photoAnimal: [],
       photoUrl: [],
      animalForm: {
        typeAnimal: null,
        male: null,
        age: 1,
        breed: null,
        name: null,
        dateMating: null,
        awards: null,
        vaccination: null,
        color: null,
        matingConditions: null,
       
        licenseAgreement: false,
        startTrial: { value: false, date: null },
      },
    };
  },
  mounted() {
    this.regForm.city = this.city;
    if (this.substate == "registrationUser") {
      this.states.start.value = false;
      // this.states.previosState='start'
      this.states.registrationUser.value = true;
    }
    //  console.log(this.getSelfState());
  },
  watch: {
    animalType: function() {
      this.animalForm.typeAnimal = this.animalType;
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
    
  },
  methods: {
    getPhotoAnimal(value) {
      this.photoAnimal = value.photo;
      // console.log(this.animalForm.photoAnimal);
    },
   
    licenseAgreement() {
      this.animalForm.licenseAgreement = !this.animalForm.licenseAgreement;
    },
    startTrial() {
      this.animalForm.startTrial.value = !this.animalForm.startTrial.value;
      if (this.animalForm.startTrial.value) {
        this.animalForm.startTrial.dateStart = Date.now();
        this.animalForm.startTrial.dateEnd = this.animalForm.startTrial.dateStart + 77760000
      }
    },
    getSelfState() {
      let result = "";
      Object.keys(this.states).forEach((key) => {
        if (this.states[key].value == true) {
          // console.log('getselfstate:',key);
          result = key;
        }
      });
      return result;
    },
    changeStateRegist() {
      this.states.start.value = false;
      this.states.registrationUser.value = true;
      // this.states.previosState='start'
    },
    sendRegisteredData(){
      this.$emit('registeredData',{profile:this.regForm,id:this.regForm.id,photoAnimal:this.photoAnimal,animal:this.animalForm})
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
        this.$emit("regForm", { regForm: this.regForm });
        //  this.start = true;
        this.states.registrationUser.value = false;
        // this.states.previosState='registrationUser'
        this.states.registrationAnimal1.value = true;
        // console.log("correct", this.states);
      }
    },
    getRegistrationAnimal1() {
      let valid = true;
      if (!this.animalForm.typeAnimal) {
        valid = false;
        this.errs.type = "Выберите тип животного";
        setTimeout(() => {
          this.errs.type = "";
        }, 3000);
      }
      if (!this.animalForm.name) {
        valid = false;
        this.errs.nameAnimal = "Введите имя животного";
        setTimeout(() => {
          this.errs.nameAnimal = "";
        }, 3000);
      }
      if (!this.animalForm.male) {
        valid = false;
        this.errs.male = "Выберите пол";
        setTimeout(() => {
          this.errs.male = "";
        }, 3000);
      }
      if (!this.animalForm.breed) {
        valid = false;
        this.errs.breed = "Выберите породу";
        setTimeout(() => {
          this.errs.breed = "";
        }, 3000);
      }
      if (!valid) {
        return;
      }
      this.states.registrationAnimal1.value = false;
      this.states.registrationAnimal2.value = true;
      //  this.states.previosState='registrationAnimal1'
    },
    getRegistrationAnimal2() {
      this.states.registrationAnimal2.value = false;
      this.states.registrationAnimal3.value = true;
    },
    getRegistrationAnimal3() {
      let valid = true;

      if (!this.animalForm.licenseAgreement) {
        valid = false;
        this.errs.licenseAgreement = "Требуется подписать соглашение";
        setTimeout(() => {
          this.errs.licenseAgreement = "";
        }, 3000);
      }
      if (!this.animalForm.startTrial.value) {
        valid = false;
        this.errs.startTrial = "Требуется активировать пробный период";
        setTimeout(() => {
          this.errs.startTrial = "";
        }, 3000);
      }
      if (!valid){
        return
      }
      this.regForm.id=uuidv4()
      this.sendRegisteredData()
    },
    back() {
      let stateKey = this.getSelfState();
      if (stateKey == "start") {
        return;
      }
      this.states[stateKey].value = false;
      // console.log('state now:',stateKey)
      this.states[this.states[stateKey].previosState].value = true;
      this.getSelfState();
      //  console.log('state to:', this.states[this.states[stateKey].previosState])
    },

    sign() {
      this.$emit('sign',{mail:this.login,pass:this.password})
    },
  },
};
</script>
<style scoped>
.main {
  background: url("../assets/catreg.svg"), url("../assets/dogreg.svg"),
    url("../assets/cover.png");
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 49vh, 50vh, cover;
  background-position: 2% 2em, 100% 2em, center;
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
  justify-content: space-around;

  align-items: center;
}
.user > p,
.animal > p {
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
  top: 4.7rem;
  position: absolute;
   animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
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
.registration-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
}

.registration-title__text {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  font-size: 2.5em;
  /* flex: 4 1 4; */
  /* justify-self: stretch; */
  width: 57.5vw;
  max-height: 2em;
  display: flex;
  align-items: center;
}
.registration-title__text > p {
  /* padding-top: 0.2em; */
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  font-size: 1.7em;
}

.registration-user,
.registration-animal1,
.registration-animal2,
.registration-animal3 {
  font-size: 2em;
  /* margin-top:-2em; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 2px solid; */
  width: 100%;
  min-height: 90%;
  /* gap:-0.1rem; */
  text-align: center;
  overflow: hidden;
}
.user,
.animal {
  margin-top:-2rem;
  height:9rem;
  min-width: 30%;
}
.personal_data {
  margin-top:2rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
.personal_data_checkbox {
  margin-top: 0.2em;
  width: 1em;
  height: 1em;
  background: #ffffff;
  opacity: 0.5;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  transition: all 0.2s;
  cursor:pointer;
}
.personal_data_checkbox:hover{
  width:1.1em;
  height: 1.1em;
}
.personal_data_text {
  width: 9em;
  display: flex;
  position: relative;
}
.personal-text_err {
  margin-top: 4em;
  position:absolute;
}
.checked {
  background: url("../assets/checked.svg");
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
}
.regwindow {
  background: url("../assets/cover1.png");
  background-position: center;
  background-size: cover;
  overflow: hidden;
  min-width: 40vw;
  min-height: 50vh;
  border: 2px solid;
  border-radius: 8em 0em 8em 0em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 5px 7px rgb(100, 100, 22);
  opacity: 0.9;
  transition: all 0.3s;
  font-size: 1.2em;
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

.registration-title > p {
  font-size: 3em;
  height: 1fr;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */

  /* flex: auto 0 50%; */
}
input,
select
{
  width: 12em;
  height: 1em;
  background: #ffffff;
  opacity: 0.7;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center!important;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: 900;
  font-size: 1em;
  line-height: 28px;
  align-content:center;
  /* identical to box height */
z-index: 100;
  color: rgba(0, 0, 0, 1);
   transition: all 0.5s;
}
input:hover,
select:hover{
font-size:1.1em;
height:1em;
}
option {
 background: #FFFFFF;
border: 1px solid #000000;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
border-radius: 20px;
font-size: 0.7em;
}
.forinput input{
 width:13em;
 height: 2rem;
 transition: all 0.6s;
}
.forinput input:hover{
  width:14em;
 height:2.1rem;
}
button {
  display: flex;
  justify-content: center;
  width: 11rem;
  height:3rem;
  border: 1px solid #000000;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 25px 0px;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  line-height: 61px;
  align-items: center;
  text-align: center;
  background: transparent;
  margin-top:1.5rem;
  cursor:pointer;
  color: #000000;
}
.registration-user .next-btn{
  margin-top:1rem;
}

.regwindow:hover {
  opacity: 1;
  box-shadow: 7px 9px rgb(100, 100, 22);
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
button:hover {
   /* box-shadow: 7px 12px; */
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  border: 1px solid #000000;
  /* box-sizing: border-box; */
  filter: drop-shadow(0px 4px 4px #00e04c) drop-shadow(0px 4px 4px #09461a)
    drop-shadow(0px 4px 4px #074110);
    

  border-radius: 25px 0px;
}
button:active {
  box-shadow: 4px 8px rgb(100, 100, 22);
}
</style>

<template>
  <div class="main">
    <div
      class="registration"
      v-if="
        states.registrationUser.value ||
          states.registrationAnimal1.value ||
          states.registrationAnimal2.value ||
          states.registrationAnimal3.value ||
          states.start.value
      "
    >
      <div class="registration-title">
        <Header>
          <template #left>
            <back-button @back="back" />
          </template>
          <template #center>
            <p class="registration_title" v-show="!states.start.value">Регистрация</p>
            
          </template>
        </Header>
      </div>
      <profile-registration
        :usedMails="usedMails"
        :selectedCity="selectedCity"
        @regForm="getRegistration"
        v-if="states.registrationUser.value"
      />
      <animal-registration
        v-if="states.registrationAnimal1.value"
        @animalForm1="getRegistrationAnimal1"
      />

      <login-form v-if="states.start.value" @signUp="changeStateRegist" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import PhotoAdd from "../components/PhotoAdd.vue";
import BackButton from "./BackButton.vue";
import Header from "./Header.vue";
import ProfileRegistration from "./ProfileRegistration.vue";
import AnimalRegistration from "./AnimalRegistration.vue";
import LoginForm from "./LoginForm.vue";
export default {
  name: "RegistrationScreen",
  props: {
    city: String,
    substate: String,
    selectedCity: Array,
  },
  components: {
    // PhotoAdd,
    BackButton,
    ProfileRegistration,
    Header,
    AnimalRegistration,
    LoginForm,
  },
  data() {
    return {
      usedMails: null,
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
        nameAnimal: "",
      },
      regForm: {
        mail: null,
        tel: null,
        name: null,
        pass: null,
        city: null,
        id: null,
        licenseAgreement: false,
        startTrial: { value: false, date: null },
        hood: "",
        seenFlags: { seenHoodFlag: true, seenTelFlag: true },
      },
      animalType: null,

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
        photoAnimal: [],
        photoUrl: [],
        id: null,
        owner: null,
      },
      animals: [],
    };
  },
  async mounted() {
    const headers = {
      "Content-Type": "application/json",
    };
    let { data } = await axios.get(
      `http://localhost:5000/api/get_mails`,

      {
        headers: headers,
      }
    );

    this.usedMails = data.map((el) => {
      return el["mail"];
    });
    console.log(this.usedMails);

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
  computed: {},
  methods: {
    addNewAnimal() {
      this.animalForm.id = uuidv4();
      const pushedAnimal = { ...this.animalForm };
      this.animals.push(pushedAnimal);
      this.animalForm.typeAnimal = null;
      this.animalForm.male = null;
      this.animalForm.age = 1;
      this.animalForm.breed = null;
      this.animalForm.name = null;
      this.animalForm.dateMating = null;
      this.animalForm.awards = null;
      this.animalForm.vaccination = null;
      this.animalForm.color = null;
      this.animalForm.matingConditions = null;
      this.animalForm.photoAnimal = [];
      this.animalForm.photoUrl = [];
      this.states.registrationAnimal3.value = false;
      this.states.registrationAnimal1.value = true;
    },
    // getPhotoAnimal(value) {
    //   this.animalForm.photoAnimal = value.photo;
    //   // console.log(this.animalForm.photoAnimal);
    // },

    // licenseAgreement() {
    //   this.regForm.licenseAgreement = !this.regForm.licenseAgreement;
    // },
    // startTrial() {
    //   this.regForm.startTrial.value = !this.regForm.startTrial.value;
    //   if (this.regForm.startTrial.value) {
    //     this.regForm.startTrial.dateStart = Date.now();
    //     this.regForm.startTrial.dateEnd =
    //       this.regForm.startTrial.dateStart + 86400000 * 15;
    //   }
    // },
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
    sendRegisteredData() {
      if (this.animalForm.name !== null) {
        const pushedAnimal = { ...this.animalForm };
        this.animals.push(pushedAnimal);
      }
      // console.log(this.animals)
      this.$emit("registeredData", {
        profile: this.regForm,
        id: this.regForm.id,
        animals: this.animals,
      });
    },
    getRegistration(e) {
      console.log("correct", e);
      this.states.registrationUser.value = false;
      // this.states.previosState='registrationUser'
      this.states.registrationAnimal1.value = true;
      //
    },
    getRegistrationAnimal1(val) {
      // let valid = true;
      // if (!this.animalForm.typeAnimal) {
      //   valid = false;
      //   this.errs.type = "Выберите тип животного";
      //   setTimeout(() => {
      //     this.errs.type = "";
      //   }, 3000);
      // }
      // if (!this.animalForm.name) {
      //   valid = false;
      //   this.errs.nameAnimal = "Введите имя животного";
      //   setTimeout(() => {
      //     this.errs.nameAnimal = "";
      //   }, 3000);
      // }
      // if (!this.animalForm.male) {
      //   valid = false;
      //   this.errs.male = "Выберите пол";
      //   setTimeout(() => {
      //     this.errs.male = "";
      //   }, 3000);
      // }
      // if (!this.animalForm.breed) {
      //   valid = false;
      //   this.errs.breed = "Выберите породу";
      //   setTimeout(() => {
      //     this.errs.breed = "";
      //   }, 3000);
      // }
      // if (!valid) {
      //   return;
      // }
      console.log(val);
      // this.animalForm.owner = this.regForm.id;
      this.states.registrationAnimal1.value = false;
      // this.states.registrationAnimal2.value = true;
      //  this.states.previosState='registrationAnimal1'
    },
    getRegistrationAnimal2() {
      this.states.registrationAnimal2.value = false;
      this.states.registrationAnimal3.value = true;
    },
    getRegistrationAnimal3() {
      let valid = true;

      if (!this.regForm.licenseAgreement) {
        valid = false;
        this.errs.licenseAgreement = "Требуется подписать соглашение";
        setTimeout(() => {
          this.errs.licenseAgreement = "";
        }, 3000);
      }
      if (!this.regForm.startTrial.value) {
        valid = false;
        this.errs.startTrial = "Требуется активировать пробный период";
        setTimeout(() => {
          this.errs.startTrial = "";
        }, 3000);
      }
      if (!valid) {
        return;
      }
      this.animalForm.owner = this.regForm.id;
      this.animalForm.id = uuidv4();
      this.sendRegisteredData();
    },
    back() {
      let stateKey = this.getSelfState();
      console.log(stateKey);
      if (stateKey == "registrationUser") {
        this.$emit("back", null);
        return;
      }
      this.states[stateKey].value = false;
      // console.log('state now:',stateKey)
      this.states[this.states[stateKey].previosState].value = true;
      this.getSelfState();
      //  console.log('state to:', this.states[this.states[stateKey].previosState])
    },

    sign() {
      this.$emit("signUp", { mail: this.login, pass: this.password });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  background: url("../assets/cover.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
}
.registration_title {
  text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
}
.registration {
  background: url("../assets/catreg.svg"), url("../assets/dogreg.svg");
  background-repeat: no-repeat, no-repeat;
  background-position: left bottom, right bottom;
  background-size: 49vh, 50vh;
  @media screen and (max-width: 820px) {
    background: url("../assets/cat_transp.png"), url("../assets/dog_transp.png");
    background-size: max(30vw, 15rem), max(27vw, 13rem);
    background-repeat: no-repeat, no-repeat;
    background-position: top left -5vh, bottom right;
  }
  @media screen and (max-width: 440px) {
    background-size: max(29vh, 10rem), max(29vh, 10rem);
  }
  @media screen and (orientation: portrait) {
    background: url("../assets/cat_transp.png"), url("../assets/dog_transp.png"),
      url("../assets/catreg.svg"), url("../assets/dogreg.svg");
    background-size: max(30vh, 15rem), max(27vh, 13rem), max(15vh, 5rem),
      max(16vh, 6rem);
    background-repeat: no-repeat, no-repeat;
    background-position: top left -5vh, bottom right, top right -0.5rem,
      bottom left -1rem;
  }
}
.main p {
  font-family: "Amatic SC";
  font-size: max(2rem, 3vw);
  font-style: normal;
  font-weight: 900;
  // line-height: 45px;
  letter-spacing: 0em;
  text-align: left;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
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
  width: 100vw;
  display: flex;
  height: auto;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  @media screen and (max-height: 600px) {
    max-height: 4rem;
  }
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
select {
  width: 12em;
  height: 1em;
  background: #ffffff;
  opacity: 0.7;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center !important;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: 900;
  font-size: 1em;
  line-height: 28px;
  align-content: center;
  /* identical to box height */
  z-index: 100;
  color: rgba(0, 0, 0, 1);
  transition: all 0.5s;
}
input:hover,
select:hover {
  font-size: 1.1em;
  height: 1em;
}
option {
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  font-size: 0.7em;
}
.forinput input {
  width: 13em;
  height: 2rem;
  transition: all 0.6s;
}
.forinput input:hover {
  width: 14em;
  height: 2.1rem;
}
button {
  display: flex;
  justify-content: center;
  width: 11rem;
  height: 3rem;
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
  margin-top: 1.5rem;
  cursor: pointer;
  color: #000000;
}
.registration-user .next-btn {
  margin-top: 1rem;
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

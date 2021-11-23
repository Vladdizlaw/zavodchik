<template>
  <div  class="app">
    <transition name="no-mode-translate-fade" mode="in-out">
      <start-screen
        v-if="state == 'start'"
        :selectedCity="selectedCity"
        @animalType="getAnimalType"
        @sign="getSign"
        @registration="getRegistration"
      />
      <animal-property
        @animalProperty="getAnimalProperty"
        :animalType="this.user.animal.animalType || user.animal.type"
        :city="user.city"
        :selectedCity="selectedCity"
        v-if="state == 'animalProperty'"
      >
      </animal-property>
      <map-screen
        
        :location="user.location"
        :searchParams="this.searchParams"
        @viewDetails="getId"
        v-if="state == 'mapScreen'"
      />
      <registration-screen
         :selectedCity="selectedCity"
        :city="user.city"
        :substate="substate"
        v-if="state == 'registration'"
        @registeredData="getRegForms"
      />
      <profile-screen
        :user="user"
        @search="state = 'animalProperty'"
        @back="back"
        v-if="state == 'profile'"
      />
      <settings-screen :selectedCity="selectedCity" @back="back" :user="user" v-if="state=='settings'"/>
    </transition>
  </div>
</template>

<script>
import translate from "translate";
import axios from "axios";
import StartScreen from "./components/StartScreen.vue";
import AnimalProperty from "./components/AnimalProperty.vue";
import MapScreen from "./components/MapScreen.vue";
import RegistrationScreen from "./components/RegistrationScreen.vue";
import ProfileScreen from "./components/ProfileScreen.vue";
import SettingsScreen from './components/SettingsScreen.vue';
export default {
  name: "App",

  components: {
    StartScreen,
    AnimalProperty,
    MapScreen,
    RegistrationScreen,
    ProfileScreen,
    SettingsScreen,
  },

  data() {
    return {
      user: { animal: {type:'cat'}, location: null, city: null, id: null }, //Данные о пользователе и животном
      state: "start", //CСостояние
      searchParams: {},
      autohorized: false,
      idSelected: false,
      lastEnterTime: null,
      substate: null,
      errorStr: null,
    };
  },
  computed:{
    selectedCity() {
      const cityList = require("./cities.json");
      let citySelected = [];
      cityList.forEach((city) => {
        citySelected.push(city["Город"]);
      });

      return citySelected.sort().filter((el) => el != "");
    },
  },
  methods: {
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Геолокация недоступна"));
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      //Получаем геолокацию устройства
      try {
        this.user.location = await this.getLocation();
      } catch (e) {
        console.log(e.message);
      }
    },
    async getAdress(long, lat) {
      //Получаем город из геопозиции
      const data = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          long +
          "&key=AIzaSyBR_KhfKe3u_31BhVXgGPApthBjcg2Va90"
      );
      // console.log(data.data.results);
      let result = data.data.results[0]["address_components"][2]["long_name"];

      return result.split(" ")[0] == "Gorod" ? result.split(" ")[1] : result;
    },
    async getCity() {
      // const cityList = require("../cities.json");
      const city = await this.getAdress(
        this.user.location.coords.longitude,
        this.user.location.coords.latitude
      );
      translate.engine = "google"; //переводим город  с латиницы на русский

      translate.key = process.env.GOOGLE_KEY;
      return await translate(city, "ru");
    },
    getAnimalType(value) {
      this.user.animal.animalType = value.animalType;
      this.state = "animalProperty";
    },
    getAnimalProperty(value) {
      this.searchParams.animalType = this.user.animal.animalType;
      this.searchParams.age = value.animalProperty.age;
      this.searchParams.male = value.animalProperty.male;
      this.searchParams.breed = value.animalProperty.breed;
      this.searchParams.awards = value.animalProperty.awards;
      this.searchParams.place = value.animalProperty.place;
      this.searchParams.dateMating = value.animalProperty.dateMating;
      this.searchParams.id = value.animalProperty.id;
      // console.log(this.user);
      this.state = "mapScreen";
    },
    getSign() {
      this.substate = "start";
      this.state = "registration";
    },
    getRegistration() {
      this.substate = "registrationUser";
      this.state = "registration";
    },

    getId(value) {
      this.idSeleced = value;
      this.state = "registration";
    },
    getRegForms(value) {
      this.user.profile = value.userForm;
      this.user.animal = value.animalForm;
      this.state = "profile";
      // console.log(this.user)
    },
    back(e){
      console.log('e')
      this.state=e.state
    }
  },
  async mounted() {
    let htmlEl = document.querySelector("html");
    htmlEl.style.overflow = "hidden";
    this.lastEnterTime = new Date();
    await this.locateMe();
    this.user.city = await this.getCity();
    // this.state='settings'
    //  console.log(this.user.location);
    //  console.log(this.$refs['app'])
        
  },
  created(){
   
   
  },
  beforeDestroy(){
   
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap");

html {
  overflow-y: hidden !important;
}

body {
  max-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.app {
  max-height: 100vh;
  overflow: hidden;
  max-width: 100vw;
}
.no-mode-translate-fade-enter-active,
.no-mode-translate-fade-leave-active {
  transition: all 0.4s;
}
.no-mode-translate-fade-enter,
.no-mode-translate-fade-leave-active {
  opacity: 0;
}
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
html {
  overflow-y: hidden !important;
}
</style>

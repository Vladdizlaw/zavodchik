<template>
  <div class="app">
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
        :animalType="user.animal.type"
        :city="user.profile.city"
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
        :city="user.profile.city"
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
      <settings-screen
        :selectedCity="selectedCity"
        @saveProfile="updateProfile"
        @back="back"
        :user="user"
        v-if="state == 'settings'"
      />
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
import SettingsScreen from "./components/SettingsScreen.vue";
// import store from './store/index.js'
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
    
      state: "start", //CСостояние
      searchParams: {},
      autohorized: false,
      idSelected: false,
      lastEnterTime: null,
      substate: null,
      errorStr: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.USER;
    },
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
    async senpPhoto(){
      // let index
      //  const headers={
        // 'Content-Type': 'multipart/form-data'}
        const PhotoArray=[...this.user.photoAnimal,... this.user.photoLitter]
        console.log(PhotoArray)
         let formData= new FormData()
      PhotoArray.forEach(  (photo,ind)=>{
        
         formData.append(`file[${ind}]`,photo)
        
      })


      // this.user.photoLitter?.forEach( (photo,ind)=>{
        
      //    formData.append(`file[${index+ind}]`,photo)
        
      // })
      formData.append('id',this.user.profile.id)
     const answer= await axios.post('http://localhost:5000/api/create_photo',formData,{headers:{
        'Content-Type': 'multipart/form-data'}})
     console.log(answer,'formData:',formData)
    },

    async sendUser(){
     

      const headers={
        'Content-Type': 'application/json'}
      await axios.post('http://localhost:5000/api/create_user'
    ,this.user,{headers:headers})
      console.log('send to server -',this.user)
    },
    async updateUser(){
      const headers={
        'Content-Type': 'application/json'}
       await axios.put('http://localhost:5000/api/update_user'
    ,this.user,{headers:headers})
    },
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
        const location = await this.getLocation();

        this.$store.commit('SAVE_USER',{'location':{latitude:location.coords.latitude,longitude:location.coords.longitude} })
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
      console.log(data.data.results);
      let result = data.data.results[0]["address_components"][2]["long_name"];

      return result.split(" ")[0] == "Gorod" ? result.split(" ")[1] : result;
    },
    async getCity() {
      // const cityList = require("../cities.json");
      const city = await this.getAdress(
        this.user.location.longitude,
        this.user.location.latitude
      );
      translate.engine = "google"; //переводим город  с латиницы на русский

      translate.key = process.env.GOOGLE_KEY;
      return await translate(city, "ru");
    },
    getAnimalType(value) {
      // this.user.animal.animalType = value.animalType;
      this.$store.commit("SAVE_USER_ANIMAL", value);
      this.state = "animalProperty";
    },
    getAnimalProperty(value) {
      this.searchParams.animalType = this.user.animal.type;
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

    async getId(value) {
     
      // console.log(value)
      const {data}= await axios.get(`http://localhost:5000/api/get_user/${value.id}`)
      console.log('data',data) 
      this.idSelected = data;
      console.log(this.idSelected)
      this.state = "registration";
    },
    async getRegForms(value) {
      // this.$store.commit("SAVE_USER_PROFILE", value.profile);
      // this.$store.commit("SAVE_USER_ANIMAL", value.animal);
      // this.$store.commit('SAVE_USER',value.animalForm);
      this.$store.commit("SAVE_USER", value);
      
      await this.sendUser()
      await this.senpPhoto()
      // this.state = "profile";
      console.log('get reg form this.user',this.user);
    },
    saveProfile(e) {  
      const data = JSON.stringify(e);
      window.localStorage.setItem("user", data);
      console.log("save from saveProfile:", this.user);
      this.$store.commit("SAVE_USER_PROFILE", e.profile);
        this.sendUser()
    },
    updateProfile(e) {  
      const data = JSON.stringify(e);
      window.localStorage.setItem("user", data);
      console.log("save from updateProfile:", this.user);
      this.$store.commit("SAVE_USER_PROFILE", e.profile);
        this.updateUser()
    },
    back(e) {
      // console.log('e')

      this.state = e.state;
      if (e.substate) {
        this.substate = e.substate;
      }
    },
  },
  async mounted() {
    console.log('start:',this.user);
    // this.user=window.localStorage.getItem('user')
    let htmlEl = document.querySelector("html");
    htmlEl.style.overflow = "hidden";
    this.lastEnterTime = new Date();
    await this.locateMe();
    const city = await this.getCity();
    this.$store.commit('SAVE_USER_PROFILE',{'city':city})
    // console.log('start after locate:',this.user);
    // this.state='settings'
    //  console.log(this.user.location);
    //  console.log(this.$refs['app'])
  },
  created() {},
  beforeDestroy() {},
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

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
        @back="back"
        :animalType="user.animal.typeAnimal"
        :city="user.profile.city"
        :selectedCity="selectedCity"
        :isAutentificate="isAutentificate"
        v-if="state == 'animalProperty'"
      >
      </animal-property>
      <map-screen
        :location="user.location"
        :searchParams="searchParams"
        :users="searchUsers"
        @viewDetails="getId"
        v-if="state == 'mapScreen'"
      />
      <registration-screen
        :selectedCity="selectedCity"
        :city="user.profile.city"
        :substate="substate"
        v-if="state == 'registration'"
        @registeredData="getRegForms"
        @sign="Sign"
      />
      <profile-screen
        :user="user"
       
        v-if="state == 'profile'"
      >
        <template #header>
          <Header>
            <template #left>
              <back-button :func="back" />
            </template>
            <template #center>
              <p>Профиль</p>
            </template>
            <template #right>
              <search-button @back="back" />
            </template>
          </Header>
        </template>
        <template #footer>
          <Header>
            <template #left>
              <settings-button @back="back" />
            </template>
            <template #center>
              <trial-block :startTrial="user.animal.startTrial" @pay="pay" />
            </template>
            <template #right>
              <logout-button @back="logout" />
            </template>
          </Header>
        </template>
      </profile-screen>
      <profile-screen
        :user="idSelected"
       
        v-if="state == 'searchResult'"
      > 
         <template #header> 
            <Header>
            <template #left>
              <back-button :func="backSearchResult" />
            </template>
            
            <template #right>
              <profile-button @back="back" />
            </template>
          </Header>
         </template>
        <template #footer> footer</template>
      </profile-screen>
      <settings-screen
        :selectedCity="selectedCity"
        @saveProfile="updateProfile"
        @back="back"
        @logout="logout"
        :user="user"
        v-if="state == 'settings'"
      />
    </transition>
  </div>
</template>

<script>
// import translate from "translate";
import axios from "axios";
import StartScreen from "./components/StartScreen.vue";
import AnimalProperty from "./components/AnimalProperty.vue";
import MapScreen from "./components/MapScreen.vue";
import RegistrationScreen from "./components/RegistrationScreen.vue";
import ProfileScreen from "./components/ProfileScreen.vue";
import SettingsScreen from "./components/SettingsScreen.vue";
// import ProfileFooter from "./components/ProfileFooter.vue";
import Header from "./components/Header.vue";
import BackButton from "./components/BackButton.vue";
import SearchButton from "./components/SearchButton.vue";
import ProfileButton from "./components/ProfileButton.vue";
import SettingsButton from "./components/SettingsButton.vue";
import TrialBlock from "./components/TrialBlock.vue";
import LogoutButton from "./components/LogoutButton.vue";
// import cookie from "cookie"
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
    SettingsButton,
    ProfileButton,
    Header,
    BackButton,
    SearchButton,
    TrialBlock,
    LogoutButton,
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
      searchUsers:null
    };
  },
  computed: {
    isAutentificate() {
      const token = document.cookie
        ?.split(";")
        .filter((el) => el.includes("access_token"));
      // console.log(token[0].split('=')[1])
      if (!token || token.length <= 0 || token[0].split("=")[1] === "null") {
        return false;
      }
      return true;
    },
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
    async logout() {
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.get(
        `http://localhost:5000/api/logout`,
        { withCredentials: true },
        {
          headers: headers,
        }
      );
      this.$store.commit("DELETE_USER");
      this.state = "start";
      // console.log(this.user)
    },
    
    async getAuthUser() {
      this.$store.dispatch("GET_AUTH_USER");
    },
    async senpPhoto() {
      // let index
      //  const headers={
      // 'Content-Type': 'multipart/form-data'}
      const PhotoArray = [...this.user.photoAnimal];
      console.log(PhotoArray);
      let formData = new FormData();
      PhotoArray.forEach((photo, ind) => {
        formData.append(`file[${ind}]`, photo);
      });

      // this.user.photoLitter?.forEach( (photo,ind)=>{

      //    formData.append(`file[${index+ind}]`,photo)

      // })
      formData.append("id", this.user.profile.id);
      const answer = await axios.post(
        "http://localhost:5000/api/create_photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(answer, "formData:", formData);
    },
    async getUser() {
      this.$store.dispatch("GET_USER", this.user.profile.id);
    },
    async sendUser() {
      this.$store.dispatch("POST_USER", this.user);
    },
    async updateUser() {
      this.$store.dispatch("UPDATE_USER", this.user);
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

        this.$store.commit("SAVE_USER", {
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    },

    async getCity() {
      const { data } = await axios.get(
        `http://localhost:5000/api/get_city/${this.user.location.longitude}/${this.user.location.latitude}`
      );

      return data;
    },
    getAnimalType(value) {
      // this.user.animal.animalType = value.animalType;
      this.$store.commit("SAVE_USER_ANIMAL", value);
      this.state = "animalProperty";
    },
    async getAnimalProperty(value) {
      this.searchParams.animalType = this.user.animal.typeAnimal;
      this.searchParams.startAge = value.animalProperty.startAge;
      this.searchParams.stopAge = value.animalProperty.stopAge;
      this.searchParams.male = value.animalProperty.male;
      this.searchParams.breed = value.animalProperty.breed;
      this.searchParams.awards = value.animalProperty.awards;
      this.searchParams.place = value.animalProperty.place;
      this.searchParams.dateMating = value.animalProperty.dateMating;
      this.searchParams.id = value.animalProperty.id;
      const {data} = await axios.get(
        `http://localhost:5000/api/get_custom_users/${this.searchParams.animalType}/${this.searchParams.startAge}/${this.searchParams.stopAge}/${this.searchParams.male}/${this.searchParams.breed}/${this.searchParams.awards}/${this.searchParams.place}/${this.searchParams.dateMating}/${this.searchParams.id}`
      );
      console.log(data);
      this.searchUsers=data
      this.idSelected=null
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
      if (!this.isAutentificate) {
        // console.log(this.isAutentificate());
        this.state = "registration";
        return;
      }
      const { data } = await axios.get(
        `http://localhost:5000/api/get_user${value.id}`
      );

      this.idSelected = data;
      this.state = "searchResult";
    },
    backSearchResult() {
      this.state = "mapScreen";
    },
    async getRegForms(value) {
      // this.$store.commit("SAVE_USER_PROFILE", value.profile);
      // this.$store.commit("SAVE_USER_ANIMAL", value.animal);
      // this.$store.commit('SAVE_USER',value.animalForm);
      this.$store.commit("SAVE_USER", value);

      await this.sendUser();
      setTimeout(async () => {
        await this.senpPhoto();
      }, 1000);
      setTimeout(async () => {
        await this.getUser();
        setTimeout(() => {
          document.cookie = `access_token=${this.user.token}`;
          this.state = "profile";
        }, 1000);
      }, 1000);

      console.log("get reg form this.user", this.user);
    },

    async updateProfile(e) {
      this.$store.commit("SAVE_USER_PROFILE", e.profile);
      await this.updateUser();
    },
    back(e) {
      // console.log('e')

      this.state = e.state;
      if (e.substate) {
        this.substate = e.substate;
      }
    },
    async Sign(e) {
      const user = await axios.post("http://localhost:5000/api/login", e);
      this.$store.commit("SAVE_USER", user.data);
      document.cookie = `access_token=${this.user.token}`;
      console.log("from Sign", document.cookie);
      this.state = "profile";
      console.log("SIGN-----", user);
    },
    pay() {
      console.log("pay");
    },
  },
  async mounted() {
    if (this.isAutentificate) {
      try {
        console.log("cookie:", document.cookie);
        await this.getAuthUser();
        setTimeout(() => {
          this.state = "profile";
        }, 1000);
      } catch (e) {
        console.log("errorrre", e);
      }
    }

    console.log("start:", this.user);
    // this.user=window.localStorage.getItem('user')
    let htmlEl = document.querySelector("html");
    htmlEl.style.overflow = "hidden";
    const body = document.querySelector("body");
    body.style.margin = 0;
    this.lastEnterTime = new Date();
    await this.locateMe();

    // console.log("city", city);
    // const city ='Краснодар'
    if (!this.isAutentificate) {
      const city = await this.getCity();
      this.$store.commit("SAVE_USER_PROFILE", { city: city });
    }
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
* {
  padding: 0px;
  margin: 0px;
}
html {
  overflow-y: hidden !important;
}

body {
  max-height: 100vh;
  margin: 0 !important;
  padding: 0;
  overflow: hidden;
}
.app {
  height: 100vh;
  overflow: hidden;
  width: 100vw;
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

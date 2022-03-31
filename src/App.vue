<template>
  <div class="app">
    <transition name="no-mode-translate-fade" mode="in-out">
      <router-view
        :authentification="isAutentificate||autohorized"
        :nameStart="user.profile.name"
        :mobileUserAgent="mobileUserAgent"
        @animalType="getAnimalType"
        @enterProfile="getMyProfile"
        @animalProperty="getSearchResult"
        @back="back"
        @logout="logout"
        @sign="getSign"
        @registration="getRegistration"
        @registeredData="getRegForms"
        @signUp="Sign"
        @saveProfile="updateProfile"
        @viewDetails="viewDetails"
        @myProfile="getMyProfile"
        @updateUser="updateUser"
      >
      </router-view>
    </transition>
  </div>
</template>

<script>
//import Pusher from  'pusher'
import axios from "axios";
import {
  requestPermissionNotification,
  // sendPush,
  getPushSubscription,
} from "./api.js";
export default {
  name: "App",

  data() {
    return {
      pusher: null,//Объект 
      searchParams: {},
      autohorized: false,
      idSelected: false,
      lastEnterTime: null,
      substate: null,
      errorStr: null,
      searchUsers: null,
      permissionNotify: null,
      subscriptionPush: null,
      pusherMessage: null,
      mobileUserAgent:null,
      entered:false
    };
  },
  computed: {
    isAutentificate() {
      const token = document.cookie
        ?.split(";")
        .filter((el) => el.includes("access_token"));

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
    startPusher() {
      this.pusher = this.$pusher.subscribe(`${this.user.profile.id}`);
    },
    back(e) {
      console.log(this.$route.name);
      if (
        ((this.isAutentificate || this.autohorized) && this.entered) &&
        (this.$route.name == "search" || this.$route.name == "settings")
      ) {
        this.$router.push({
          name: "profile",
          params: {
            user: this.user,
            selectedCity: this.selectedCity,
            pusher: this.pusher,
          },
        });
      }
       else if (
        (this.isAutentificate || this.autohorized ) &&
        (this.$route.name == "search" ) &&(!this.entered)
      ) {
        this.$router.push({
          name: "start",
          params: {
            user: this.user,
            selectedCity: this.selectedCity,
            pusher: this.pusher,
          },
        });
      }
      else  if(e=="map"){
       
        this.$router.push({
        name: "search",
        params: {
          animalType: this.user.animal.typeAnimal,
          city: this.user.profile.city,
          selectedCity: this.selectedCity,
          // isAutentificate: this.isAutentificate,
        },
      });
      } 
      
      else if (
        (this.isAutentificate || this.autohorized) &&
        this.$route.name == "searchResult"
      ) {
        this.$router.push({
          name: "map",
          params: {
            location: this.user.location,
            searchParams: this.searchParams,
            users: this.searchUsers,
          },
        });
      } else {
        this.$router.go(-1);
      }
    },
    getMyProfile() {
      console.log('entered',this.entered)
      if(!this.entered){
        this.entered=true
         console.log('entered',this.entered)
      }
      this.$router.push({
        name: "profile",
        params: {
          pusher: this.pusher,
          user: this.user,
          selectedCity: this.selectedCity,
        },
      });
    },
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
      this.$router.push({ name: "start" });
      this.entered=false
      window.location.reload(true);
      // console.log(this.user)
    },

    async getAuthUser() {
      this.$store.dispatch("GET_AUTH_USER");
    },
    async senpPhoto() {
      const PhotoArray = [...this.user.photoAnimal];
      let formData = new FormData();
      PhotoArray.forEach((photo, ind) => {
        formData.append(`file[${ind}]`, photo);
      });

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
      console.log("userupdated", this.user);
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
     if (!(this.isAutentificate||this.autohorized))
     console.log('not autentificate')
     { this.$store.commit("SAVE_USER_ANIMAL", value);}
      this.$router.push({
        name: "search",
        params: {
          animalType: this.user.animal.typeAnimal,
          city: this.user.profile.city,
          selectedCity: this.selectedCity,
          // isAutentificate: this.isAutentificate,
        },
      });
    },
    async getSearchResult(value) {
      this.searchParams.animalType = this.user.animal.typeAnimal;
      this.searchParams.startAge = value.animalProperty.startAge;
      this.searchParams.stopAge = value.animalProperty.stopAge;
      this.searchParams.male = value.animalProperty.male;
      this.searchParams.breed = value.animalProperty.breed;
      this.searchParams.awards = value.animalProperty.awards;
      this.searchParams.place = value.animalProperty.place;
      this.searchParams.dateMating = value.animalProperty.dateMating;
      this.searchParams.id = this.user.profile.id;
      const { data } = await axios.get(
        `http://localhost:5000/api/get_custom_users/${this.searchParams.animalType}/${this.searchParams.startAge}/${this.searchParams.stopAge}/${this.searchParams.male}/${this.searchParams.breed}/${this.searchParams.awards}/${this.searchParams.place}/${this.searchParams.dateMating}/${this.searchParams.id}`
      );
      console.log("searchparams id", this.searchParams.id);
      console.log(data);
      this.searchUsers = data; //?
      this.idSelected = null;
      this.$router.push({
        name: "map",
        params: {
          location: this.user.location,
          searchParams: this.searchParams,
          users: this.searchUsers,
        },
      });
    },
    getSign() {
      this.$router.push({
        name: "registration",
        params: {
          selectedCity: this.selectedCity,
          city: this.user.profile.city,
          substate: "start",
        },
      });
    },
    getRegistration() {
      this.$router.push({
        name: "registration",
        params: {
          selectedCity: this.selectedCity,
          city: this.user.profile.city,
          substate: "registrationUser",
        },
      });
    },

    async viewDetails(value) {
      if (this.isAutentificate || this.autohorized) {
        const { data } = await axios.get(
          `http://localhost:5000/api/get_user${value.id}`
        );

        this.idSelected = data;
        this.$router.push({
          name: "searchResult",
          params: {
            pusher: this.pusher,
            user: this.idSelected,
            users: this.searchUsers,
            userSelf: this.user,
          },
        });
      } else {
        this.getSign();
        return;
      }
    },

    async getRegForms(value) {
      this.$store.commit("SAVE_USER", value);
      await this.sendUser();
      setTimeout(async () => {
        await this.senpPhoto();
      }, 1000);
      setTimeout(async () => {
        await this.getUser();
        setTimeout(() => {
          document.cookie = `access_token=${this.user.token}`;
          this.autohorized = true;
          if (!this.pusher) {
            this.startPusher();
          }
          this.$router.push({
            name: "profile",
            params: {
              pusher: this.pusher,
              user: this.user,
              selectedCity: this.selectedCity,
            },
          });
        }, 1000);
      }, 1000);

      console.log("get reg form this.user", this.user);
    },

    async updateProfile(e) {
      this.$store.commit("SAVE_USER_PROFILE", e.profile);
      await this.updateUser();
    },

    async Sign(e) {
      const user = await axios.post("http://localhost:5000/api/login", e);
      this.$store.commit("SAVE_USER", user.data);
      document.cookie = `access_token=${this.user.token}`;
      console.log("from Sign", document.cookie);
      // window.location.reload(true);
      if (!this.pusher) {
        this.startPusher();
      }
      this.autohorized = true;
      this.$router.push({
        name: "profile",
        params: {
          pusher: this.pusher,
          user: this.user,
          selectedCity: this.selectedCity,
        },
      });
      // window.location.reload(true)
      console.log("SIGN-----", user);
    },
    pay() {
      console.log("pay");
    },
    // requestPermission() {},
    async postMessageToChat(msg) {
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await axios.post(
        `http://localhost:5000/api/message`,
        { from: this.user.profile.id, to: "someone", msg: msg },
        {
          headers: headers,
        }
      );
      console.log(data);
    },
  },

  async mounted() {
    this.permissionNotify = await requestPermissionNotification();
    this.mobileUserAgent=navigator.userAgentData.mobile||screen.orientation.type=='portrait-primary'
    console.log(navigator)
   

    if (this.isAutentificate || this.autohorized) {
      try {
        // await sendPush()

        console.log("cookie:", document.cookie);
        await this.getAuthUser();
        console.log("user get from server");
        this.subscriptionPush = await getPushSubscription();
        setTimeout(async () => {
          this.startPusher();

          // this.$router.push({
          //   name: "profile",
          //   params: { pusher: this.pusher, user: this.user, selectedCity: this.selectedCity },
          // });
        }, 500);
      } catch (e) {
        console.log("error", e);
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

    if (!this.isAutentificate) {
      try {
        const city = await this.getCity();
        this.$store.commit("SAVE_USER_PROFILE", { city: city });
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    if (this.$route.name !== "start") {
      console.log("params auth", this.isAutentificate);
      this.$router.push({
        name: "start",
      
      });
    }
    // this.$router.push({ name: "start", params:{ authentification: this.isAutentificate|| this.autohorized}})
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap");
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
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
</style>

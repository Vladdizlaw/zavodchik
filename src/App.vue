<template>
  <div class="app">
    <transition name="no-mode-translate-fade" mode="in-out">
      <router-view
        :authentification="isAutentificate || autohorized"
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
        @signIn="SignIn"
        @saveProfile="updateProfile"
        @viewDetails="viewDetails"
        @myProfile="getMyProfile"
        @updateUser="updateUser"
        @sendAnimalFormToVuex="sendAnimalFormToVuex"
      >
      </router-view>
    </transition>
  </div>
</template>

<script>
import AnimalModule from "./store/modules/animal.js";
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
      pusher: null, //Объект
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
      mobileUserAgent: null,
      entered: false,
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
        (this.isAutentificate || this.autohorized) &&
        this.entered &&
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
      } else if (
        (this.isAutentificate || this.autohorized) &&
        this.$route.name == "search" &&
        !this.entered
      ) {
        this.$router.push({
          name: "start",
          params: {
            user: this.user,
            selectedCity: this.selectedCity,
            pusher: this.pusher,
          },
        });
      } else if (e == "map") {
        this.$router.push({
          name: "search",
          params: {
            animalType: this.user.animals[0].typeAnimal,
            city: this.user.profile.city,
            selectedCity: this.selectedCity,
            // isAutentificate: this.isAutentificate,
          },
        });
      } else if (
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
      console.log("entered", this.entered);
      if (!this.entered) {
        this.entered = true;
        console.log("entered", this.entered);
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
      this.entered = false;
      window.location.reload(true);
      // console.log(this.user)
    },

    async getAuthUser() {
     await this.$store.dispatch("GET_AUTH_PROFILE");
     const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await axios.get(
        `http://localhost:5000/api/get_animals${this.user.profile.id}`,
        {
          headers: headers,
        }
      );
      data.forEach(animal=>{
        this.sendAnimalFormToVuex(animal)
      })
     
    },
    async senpPhoto(photoArray, animalId) {
     
      let formData = new FormData();
      photoArray.forEach((photo, ind) => {
        formData.append(`file[${ind}]`, photo);
      });

      // formData.append("id", this.user.profile.id);
      formData.append("animalId", animalId);
      // console.log("formData:", formData);
      try {
        await axios.post("http://localhost:5000/api/create_photo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (e) {
        console.log("sendPhoto", e);
      }
    },
    async getUser(userId) {
      this.$store.dispatch("GET_PROFILE",userId);
      this.$store.dispatch("GET_ANIMALS",userId);
    },
    async sendUser() {
      this.$store.dispatch("POST_PROFILE", this.user.profile);
      for (let key in this.user.animals) {
        console.log("key", this.user.animals[key]);
        this.$store.dispatch("POST_ANIMAL", this.user.animals[key]);
      }
    },
    async updateUser() {
      console.log("userupdated", this.user);
      this.$store.dispatch("UPDATE_PROFILE", this.user);
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

        this.$store.commit("SAVE_PROFILE", {
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
      if (!(this.isAutentificate || this.autohorized))
        console.log("not autentificate");
      {
        this.$store.commit("SAVE_USER_ANIMAL", value, 0);
      }
      this.$router.push({
        name: "search",
        params: {
          animalType: this.users.animals[0].typeAnimal,
          city: this.user.profile.city,
          selectedCity: this.selectedCity,
          // isAutentificate: this.isAutentificate,
        },
      });
    },
    async getSearchResult(value) {
      console.log("value", value);
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
    getSign(componentName) {
      this.$router.push({
        name: "registration",
        params: {
          selectedCity: this.selectedCity,
          city: this.user.profile.city,
          // substate: "start",
          startComponentName: componentName,
        },
      });
    },
    getRegistration(componentName) {
      this.$router.push({
        name: "registration",
        params: {
          selectedCity: this.selectedCity,
          city: this.user.profile.city,
          startComponentName: componentName,
          // substate: "registrationUser",
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
    addModuleAnimalToVuex() {
      const size = Array.from(Object.values(this.user.animals)).length;
      console.log("animals", size);
      this.$store.registerModule(["animals", size], AnimalModule);
      return size
    },
    sendAnimalFormToVuex(el) {
      console.log("🚀 ~ file: App.vue ~ line 346 ~ sendAnimalFormToVuex ~ el", el)
      const ind=this.addModuleAnimalToVuex();
      el.ind=ind
      this.$store.commit("SAVE_ANIMAL", el);
      console.log('this.user',this.user)
    },
    async getRegForms(value) {
      console.log("value", value);
      this.$store.commit("SAVE_PROFILE", value.profile);
    //
      console.log("this.user", this.user);
      this.$store.commit("ADD_ANIMALS_TO_PROFILE");
      await this.sendUser();

      setTimeout(() => {
        Array.from(Object.keys(this.user.animals)).forEach(async (ind) => {
       
          await this.senpPhoto(
            this.user.animals[ind].photoAnimal,
            this.user.animals[ind]["id"]
          );
        
        });

        setTimeout(async () => {
          await this.getUser(this.user.profile.id);
        }, 1000);
      }, 1000);

      // setTimeout( () => {

        setTimeout(() => {
         
         
          this.autohorized = true;
          // console.log()
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
          document.cookie = `access_token=${this.user?.profile?.token}`;
        console.log("🚀 ~ file: App.vue ~ line 389 ~ setTimeout ~ this.user.profile.token", this.user.profile.token)
        }, 2200);
      // }, 1000);
       
      console.log("get reg form this.user", this.user);
    },

    async updateProfile(e) {
      this.$store.commit("SAVE_USER_PROFILE", e.profile);
      await this.updateUser();
    },

    async SignIn() {
      
      // var user = await axios.post("http://localhost:5000/api/login", loginForm);
      // 
      document.cookie = `access_token=${this.user.profile.token}`;
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await axios.get(
        `http://localhost:5000/api/get_animals${this.user.profile.id}`,
        {
          headers: headers,
        }
      );
      data.forEach(animal=>{
        this.sendAnimalFormToVuex(animal)
      })
     
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
      // console.log("SIGNIN-----", user);
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
    //  document.onclick=async ()=>{
    //    try{
    //       console.log("FULSCR",document.documentElement)
    //     await document.documentElement.requestFullscreen()
    //   }catch (e){
    //     console.log(e)
    //   }
    //  }

    this.permissionNotify = await requestPermissionNotification();
    this.mobileUserAgent =
      navigator.userAgentData.mobile ||
      screen.orientation.type == "portrait-primary";
    console.log("start:", this.user);
    // this.addAnimalToVuex()
    // ;
    console.log("start:", this.user);

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
        this.$store.commit("SAVE_PROFILE", { city: city });
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

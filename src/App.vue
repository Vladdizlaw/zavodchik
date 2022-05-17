<template>
  <div class="app">
    <transition name="no-mode-translate-fade" mode="in-out">
      <router-view
        v-bind="{ ...startProps }"
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
import { URI_SERVER } from "./api.js";
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
      searchUsers: null, //Список юзеров найденых по запросу
      permissionNotify: null,
      subscriptionPush: null,
      pusherMessage: null,
      mobileUserAgent: null,
      entered: false,
      startProps: null,
    };
  },
  computed: {
    isAutentificate() {
      const token = document.cookie
        ?.split(";")
        .filter((el) => el.includes("access_token"));

      if (!token || token.length <= 0 || token[0].split("=")[1] === "null") {
        console.log("token", token);
        return false;
      }
      console.log("token", token);
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
    async toggleFullscreen() {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullscreenElement ||
        document.msFullscreenElement
      ) {
        document.exitFullscreen();
      } else {
        console.log;
        try {
          await document.documentElement.requestFullscreen();
        } catch (e) {
          console.log(e);
        }
      }
    },
    getScreenOrientation() {
      console.log( navigator)
      const orient =
        screen.msOrientation ||
        (screen.orientation || screen.mozOrientation).type;

      if (
        orient.split("-")[0] == "portrait" ||
        navigator?.userAgentData?.mobile
      ) {
        //
        this.mobileUserAgent = true;
      } else {
        this.mobileUserAgent = false;
      }
      console.log("this.mobileUserAgent", this.mobileUserAgent);
    },
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
        return;
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
        return;
      } else if (
        !(this.isAutentificate || this.autohorized) &&
        this.$route.name == "search"
      ) {
        this.$router.push({
          name: "start",
          params: {
            user: this.user,
            selectedCity: this.selectedCity,
            pusher: this.pusher,
          },
        });
        return;
      } else if (e == "map") {
        this.$router.push({
          name: "search",
          params: {
            animalType:
              (this.user &&
                this.user.animals[0] &&
                this.user.animals[0].typeAnimal) ||
              "dog",
            city: this.user.profile.city,
            selectedCity: this.selectedCity,
            animals: this.user.animals,
            // authentification: this.isAutentificate|| this.autohorized,
          },
        });
        return;
      } else if (
        (this.isAutentificate || this.autohorized) &&
        this.$route.name == "searchResult"
      ) {
        this.$router.push({
          name: "map",
          params: {
            location: this.user.profile.location,
            searchParams: this.searchParams,
            users: this.searchUsers,
          },
        });
        return;
      } else {
        this.$router.go(-1);
        return;
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
      console.log("cooookie", document.cookie);
      const headers = {
        "Content-Type": "application/json",
      };
      await axios.get(
        `${URI_SERVER}/api/logout`,
        { withCredentials: true },
        {
          headers: headers,
        }
      );
      this.$store.commit("DELETE_PROFILE");
      this.$router.push({ name: "start" });
      this.entered = false;
      this.autohorized = false;
      window.location.reload(true);
      // console.log(this.user)
    },

    async getAuthUser() {
      await this.$store.dispatch("GET_AUTH_PROFILE");
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await axios.get(
        `${URI_SERVER}/api/get_animals${this.user.profile.id}`,
        { withCredentials: true },
        {
          headers: headers,
        }
      );
      data.forEach((animal) => {
        this.sendAnimalFormToVuex(animal);
      });
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
        await axios.post(`${URI_SERVER}/api/create_photo`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (e) {
        console.log("sendPhoto", e);
      }
    },
    async getUser(userId) {
      this.$store.dispatch("GET_PROFILE", userId);
      this.$store.dispatch("GET_ANIMALS", userId);
    },
    async sendUser() {
      this.$store.dispatch("POST_PROFILE", this.user.profile);
      for (let key in this.user.animals) {
        console.log("key", this.user.animals[key]);
        this.$store.dispatch("POST_ANIMAL", this.user.animals[key]);
      }
    },
    async updateUser() {
      this.$store.dispatch("UPDATE_PROFILE", this.user.profile);
      console.log("userupdated", this.user);
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
        `${URI_SERVER}/api/get_city/${this.user.profile.location.longitude}/${this.user.profile.location.latitude}`
      );

      return data;
    },
    getAnimalType(value) {
      console.log(value);
      // this.user.animal.animalType = value.animalType;
      // if (!(this.isAutentificate || this.autohorized))
      //   console.log("not autentificate");
      // {
      //   this.$store.commit("SAVE_USER_ANIMAL", value, 0);
      // }
      this.$router.push({
        name: "search",
        params: {
          animalType: value.typeAnimal,
          city: this.user.profile.city,
          selectedCity: this.selectedCity,
          animals: this.user.animals,
          // isAutentificate: this.isAutentificate,
        },
      });
    },
    async getSearchResult(value) {
      console.log("value", navigator.userAgentData);
      this.searchParams.animalType = value.animalProperty.typeAnimal;
      this.searchParams.startAge = value.animalProperty.startAge;
      this.searchParams.stopAge = value.animalProperty.stopAge;
      this.searchParams.male = value.animalProperty.male;
      this.searchParams.breed = value.animalProperty.breed;
      this.searchParams.awards = value.animalProperty.awards;
      this.searchParams.place = value.animalProperty.place;
      this.searchParams.dateMating = value.animalProperty.dateMating;
      this.searchParams.id = this.user.profile.id;
      const { data } = await axios.get(
        `${URI_SERVER}/api/get_custom_users/${this.searchParams.animalType}/${this.searchParams.startAge}/${this.searchParams.stopAge}/${this.searchParams.male}/${this.searchParams.breed}/${this.searchParams.awards}/${this.searchParams.place}/${this.searchParams.dateMating}/${this.searchParams.id}`
      );
      console.log("searchparams id", this.searchParams.id);
      console.log("searchUsers", data);
      this.searchUsers = data; //?
      this.idSelected = null;
      this.$router.push({
        name: "map",
        params: {
          location: this.user.profile.location,
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
          `${URI_SERVER}/api/get_user${value.id}`
        );
        let animals = await axios.get(
          `${URI_SERVER}/api/get_animals${value.id}`
        );
        console.log(this.searchParams, animals.data);
        animals = animals.data.filter(
          (animal) => animal.typeAnimal == this.searchParams.animalType
        );
        // this.searchParams.breed!='null'?animals.filter((animal)=> animal.breed == this.searchParams.breed):null;
        //  console.log(this.searchParams, animals);
        this.idSelected = { profile: data, animals: { ...animals } };

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
      return size;
    },
    sendAnimalFormToVuex(el) {
      console.log(
        "🚀 ~ file: App.vue ~ line 346 ~ sendAnimalFormToVuex ~ el",
        el
      );
      const ind = this.addModuleAnimalToVuex();
      el.ind = ind;
      this.$store.commit("SAVE_ANIMAL", el);
      console.log("this.user", this.user);
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
        `${URI_SERVER}/api/get_animals${this.user.profile.id}`,
        {
          headers: headers,
        }
      );
      console.log("data data", data.headers);
      data.forEach((animal) => {
        this.sendAnimalFormToVuex(animal);
      });

      // window.location.reload(true);
      if (!this.pusher) {
        this.startPusher();
      }
      this.autohorized = true;
      this.entered = true;
      this.startProps = {
        authentification: this.isAutentificate || this.autohorized,
        nameStart: this.user.profile.name,
        mobileUserAgent: this.mobileUserAgent,
      };
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
        `${URI_SERVER}/api/message`,
        { from: this.user.profile.id, to: "someone", msg: msg },
        {
          headers: headers,
        }
      );
      console.log(data);
    },
  },

  async mounted() {
    console.log("cookie_SERVER", document.cookie);

    this.getScreenOrientation();
    // this.mobileUserAgent=true
    window.addEventListener("orientationchange", this.getScreenOrientation);
    window.addEventListener("dblclick", this.toggleFullscreen);
    this.permissionNotify = await requestPermissionNotification();

    console.log("start:", this.user);

    if (this.isAutentificate || this.autohorized) {
      try {
        // await sendPush()

        console.log("cookie:", document.cookie);
        await this.getAuthUser();
        this.startProps = {
          authentification: this.isAutentificate || this.autohorized,
          nameStart: this.user.profile.name,
          mobileUserAgent: this.mobileUserAgent,
        };
        // console.log("user get from server");
        this.subscriptionPush = await getPushSubscription();
        setTimeout(async () => {
          this.startPusher();

          // this.$router.push({
          //   name: "profile",
          //   params: { pusher: this.pusher, user: this.user, selectedCity: this.selectedCity },
          // });
        }, 500);
      } catch (e) {
        console.log("error pusher start", e);
      }
    }

    let htmlEl = document.querySelector("html");
    htmlEl.style.overflow = "hidden";
    const body = document.querySelector("body");
    body.style.margin = 0;
    this.lastEnterTime = new Date();
    await this.locateMe();

    if (!this.isAutentificate || !this.autohorized) {
      try {
        const city = await this.getCity();
        console.log("city", city);
        this.$store.commit("SAVE_PROFILE", { city: city || "Краснодар" });
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
  beforeDestroy() {
    window.removeEventListener("orientationchange", this.getScreenOrientation);
    window.removeEventListener("dblclick", this.toggleFullscreen);
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

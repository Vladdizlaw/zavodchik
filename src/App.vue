<template>
  <div class="app">
     <transition name="no-mode-translate-fade" mode="in-out" >
    <start-screen v-if="state == 'start'" @animalType="getAnimalType" />
    <animal-property
      @animalProperty="getAnimalProperty"
      :animalType="this.user.animal.animalType"
      :location="user.location"
     
      v-if="state == 'animalProperty'"
    >
    </animal-property>
    <map-screen :location="user.location" :animalType="this.user.animal.animalType" @viewDetails="getId" v-if="state == 'mapScreen'" />
    <registration-screen :place="user.place" v-if="state == 'registration'" />
    </transition>
  </div>
</template>

<script>
import StartScreen from "./components/StartScreen.vue";
import AnimalProperty from "./components/AnimalProperty.vue";
import MapScreen from "./components/MapScreen.vue";
import RegistrationScreen from "./components/RegistrationScreen.vue"
export default {
  name: "App",

  components: {
    StartScreen,
    AnimalProperty,
    MapScreen,
    RegistrationScreen,
  },

  data() {
    return {
      user: { animal: {}, location: null,id:null },//Данные о пользователе и животном
      state: "start",//CСостояние
     
     
      autohorized:false,
      idSelected:false,
      lastEnterTime:null,

      errorStr: null,
    };
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
      try {
        this.user.location = await this.getLocation();
      } catch (e) {
        
        console.log(e.message)
      }
    },
    getAnimalType(value) {
      this.user.animal.animalType = value.animalType;
      this.state = "animalProperty";
    },
    getAnimalProperty(value) {
      this.user.animal.age = value.animalProperty.age;
      this.user.animal.male = value.animalProperty.male;
      this.user.animal.breed = value.animalProperty.breed;
      this.user.animal.awards = value.animalProperty.awards;
      this.user.place = value.animalProperty.place;
      this.user.animal.dateMating= value.animalProperty.dateMating
      this.user.id=value.animalProperty.id
      // console.log(this.user);
       this.state = "mapScreen";
     
    },
    getId(value){
      this.idSeleced=value
      this.state="registration"
    }
  },
  async mounted() {
    this.lastEnterTime=new Date()
    await this.locateMe();
    // console.log(this.user.location);
  },
};
</script>
<style scoped>
body{
  margin:0;
  padding:0;
}
.app {
  height: 100vh;
  overflow:hidden;
}
.no-mode-translate-fade-enter-active, .no-mode-translate-fade-leave-active {
    transition: all 0.4s;
  }
  .no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
    opacity: 0;
  }
</style>

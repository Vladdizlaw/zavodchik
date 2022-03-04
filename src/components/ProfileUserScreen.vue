<template>
   <profile-screen :user="user" >
     <template #modalAnother>
       <chat-full :pusher="pusher" :userSelf="user" />
     </template>
        <template #header>
          <Header>
            
            <template #center>
              <p>Профиль</p>
            </template>
            <template #right>
              <search-button @search="toSearchScreen"/>
            </template>
          </Header>
        </template>
        <template #footer>
          <Header>
            <template #left>
              <settings-button @settings="settings"/>
            </template>
            <template #center>
              <trial-block :startTrial="user?user.animal.startTrial:null" />
            </template>
            <template #right>
              <logout-button  @logout="logout"/>
            </template>
          </Header>
        </template>
      </profile-screen>
 
</template>
<script>
import ProfileScreen from "./ProfileScreen.vue";
import Header from "./Header.vue"
import SettingsButton from "./SettingsButton.vue";
import SearchButton from "./SearchButton.vue";
import LogoutButton from "./LogoutButton.vue";
import TrialBlock from "./TrialBlock.vue";
import { requestPermissionNotification } from "../api.js";
import ChatFull from './ChatFull.vue';
export default {
  name: "ProfileUserScreen",
  components:{ProfileScreen,SettingsButton,SearchButton,TrialBlock,LogoutButton,Header, ChatFull},
  props: {
    user:Object,
    selectedCity:Array, 
    pusher:Object
  },
  data() {
    return {
     
    };
  },
 
  methods: {
   logout(){
     this.$emit('logout',null)
   },
   
   settings() {
      this.$router.push({name:'settings', params:{user:this.user,selectedCity:this.selectedCity}})
    },
    toSearchScreen(){
      this.$router.push({name:'search',params:{
        animalType:this.user.animal.typeAnimal,
        city:this.user.profile.city,
        selectedCity:this.selectedCity,
        isAutentificate:true,
      }})
    }
  },
  computed: {
   
  },  
  async mounted(){
     await requestPermissionNotification()
       

  }
};
</script>
<style scoped>
.dog {
  background: url("../assets/cover_dog_acc.svg"), url("../assets/cover_dog.png");
  background-position: center, center;
  background-size: 100vh, cover;
  background-repeat: no-repeat, no-repeat;
}
.cat {
  background: url("../assets/cover_cat_acc.svg"), url("../assets/cover_cat.png");
  background-position: center, center;
  background-size: 100vh, cover;
  background-repeat: no-repeat, no-repeat;
}
.wrapper {
  font-family: "Amatic SC";
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);

  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  position: relative;
}

.header {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 2em;
  display: flex;
  justify-content: start;
  align-items: center;
}

.main {
  display: flex;
  width: 90vw;
  max-height: 65vh;
  justify-content: start;
  align-items: center;
}
.main-left {
  margin-left: 2em;
  width: 50%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: space-around;
}
.main-left__name {
  max-height: 10%;
  font-size: 3.5rem;
 
}
.main-left__data {
  flex: 1 1 35vh;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 2rem;
  font-size: 2rem;
}
.main-left__data > p {
  margin-top: -2rem;
}
.main-right {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: end;
  margin-left: 2em;
  margin-top: 2rem;
}

.main-right__photos {
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
 
  position: relative;
  justify-content: center;
  align-items: start;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.photo__LU {
  width: 50%;
  height: 100%;
 
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.LU__UP {
  width: 100%;
  height: 45%;
}
.LU__DOWN {
  width: 100%;
  height: 55%;
  
  display: flex;
}
.LU__DOWN_left {
  height: 100%;
  width: 45%;
 
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.LU__DOWN_right {
  height: 100%;
  width: 55%;
 
  display: flex;
  flex-direction: column;
}
.LU__DOWN_left_1,
.LU__DOWN_left_2,
.LU__DOWN_left_3,
.RU__UP_right_1,
.RU__UP_right_2,
.RU__UP_right_3 {
  height: 33%;
  width: 100%;
}
.LU__DOWN_right_1,
.LU__DOWN_right_2,
.RU__UP_left_1,
.RU__UP_left_2 {
  height: 50%;
  width: 100%;
}
.photo__RU {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.RU__UP {
  height: 55%;
  width: 100%;
 
  display: flex;
}
.RU__UP_left {
  height: 100%;
  width: 55%;
  
  display: flex;
  flex-direction: column;
}
.RU__UP_right {
  height: 100%;
  width: 45%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.RU__DOWN {
  height: 55%;
  width: 100%;
}
.photo {
  position: relative;

}
.photo > img {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  border: 0.5px solid green;
  border-radius: 10px;
  transition: all 0.4s;
}
.photo > img:hover {
  width: 110%;
  height: 120%;
  z-index: 100;
 
}
.footer {
 
  position: absolute;
  bottom:0.5rem;
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: space-around;
  flex-wrap: nowrap;
}
</style>

<template>
   <profile-screen :user="user" >
     <template #modalAnother>
       <chat-full :pusher="pusher" :userSelf="user" @updateUser="updateUser" />
     </template>
        <template #header>
          <Header>
            
            <template #center>
              <p>Мой профиль</p>
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
              <trial-block :startTrial="user?user.profile.startTrial:null" />
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
   updateUser(){
     this.$emit("updateUser",null)
   },
   
   settings() {
      this.$router.push({name:'settings', params:{user:this.user,selectedCity:this.selectedCity,pusher:this.pusher}})
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
     if (this.pusher==null){
        this.$emit('nopusher',null)
     }
       

  }
};
</script>
<style scoped>

</style>

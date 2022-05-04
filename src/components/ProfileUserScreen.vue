<template>
  <profile-screen :user="user">
    <template #modalAnother>
      <chat-full :pusher="pusher" :userSelf="user" @updateUser="updateUser" />
    </template>
    <template #header>
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>
        <template #center>
          <p>Мой профиль</p>
        </template>
        <template #right> </template>
      </Header>
    </template>
    <template #main_right_top>
      <button @click="toSearchScreen" class="search-button">
        <p>Поиск пары</p>
      </button>
    </template>
    <template #main_right_center>
      <button @click="toChatScreen" class="search-button">
        <p>Мои чаты</p>
      </button>
    </template>
    <template #main_right_bottom>
      <button
        v-if="!Object.keys(user.animals).length"
        @click="addNewAnimal"
        class="search-button"
      >
        <p>Добавить животное</p>
      </button>
    </template>
    <template #footer>
      <Header>
        <template #left>
          <settings-button @settings="settings" />
        </template>
        <template #center>
          <trial-block :startTrial="user ? user.profile.startTrial : null" />
        </template>
        <template #right>
          <logout-button @logout="logout" />
        </template>
      </Header>
    </template>
  </profile-screen>
</template>
<script>
import ProfileScreen from "./ProfileScreen.vue";
import Header from "./Header.vue";
import SettingsButton from "./SettingsButton.vue";
import LogoutButton from "./LogoutButton.vue";
import BackButton from "./BackButton.vue";
import TrialBlock from "./TrialBlock.vue";
import { requestPermissionNotification } from "../api.js";
import ChatFull from "./ChatFull.vue";
export default {
  //Component to show your profile(this.user)
  name: "ProfileUserScreen",
  components: {
    ProfileScreen,
    SettingsButton,
    BackButton,
    TrialBlock,
    LogoutButton,
    Header,
    ChatFull,
  },
  props: {
    user: Object,
    selectedCity: Array,
    pusher: Object,
    mobileUserAgent: Boolean,
  },
  data() {
    return {};
  },
  watch: {},

  methods: {
    back() {
      this.$emit('back','profile')
    },

    logout() {
      this.$emit("logout", null);
    },
    updateUser() {
      this.$emit("updateUser", null);
    },

    settings() {
      this.$router.push({
        name: "settings",
        params: {
          user: this.user,
          selectedCity: this.selectedCity,
          pusher: this.pusher,
        },
      });
    },
    toChatScreen() {},
    toSearchScreen() {
      console.log("click");
      this.$router.push({
        name: "search",
        params: {
          animalType: this.user.animals&&this.user.animals[0]?this.user?.animals[0].typeAnimal:'dog',
          city: this.user.profile.city,
          selectedCity: this.selectedCity,
          isAutentificate: true,
          animals:this.user.animals
        },
      });
    },
    addNewAnimal() {},
  },
  computed: {},
  async mounted() {
    await requestPermissionNotification();
    if (this.pusher == null) {
      this.$emit("nopusher", null);
    }
  },
};
</script>
<style lang="scss" scoped>
.search-button {
  position: absolute;
  left: clamp(0.5rem, 1vw, 2vw);
  height: max(3rem, 7vh);
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(108.6deg, #95c671 13.72%, #698852 89.83%);
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 30px 0px;
  padding: 1rem 1rem 1rem 1rem;
  font-family: Amatic SC;
  font-style: normal;
  line-height: 1.7rem;
  font-weight: bold;
  font-size: max(1.7vw, 1.3rem);
  cursor: pointer;
  color: #000000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  transition: 0.3s;
  @media screen and (max-width: 395px) {
    font-size: 1rem;
  }
  @media screen and (orientation: portrait) {
    border-radius: 20px 0px;
  }
  &:hover {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
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
}
</style>

<template>
  <profile-screen :user="showedUser">
    <template #modalAnother>
      <Modal ref="modalChat">
        <template #content>
          <chat-modal
            ref="chat"
            :name="opponentUser.name"
            :idOpponent="opponentUser.id"
            :chat="chatCurrent"
            :idSelf="userSelf.profile.id"
            :incommingMessage="incommingMessageToChat"
            @sendMessage="sendToShowedUser"
          />
        </template>
      </Modal>
    </template>
    <template #header>
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>
        <template #center>
          <div class="notice_block" v-show="newMessage" @click="startChat">
            <img src="../assets/message.svg" alt="" />
            <p>
              Новое сообщение
            </p>
          </div>
        </template>
        <template #right>
          <profile-button @myProfile="myProfile" />
        </template>
      </Header>
    </template>

    <template #footer>
      <profiles-switcher
        @previous="previousProfile"
        @next="nextProfile"
        @clickCenter="openChat"
        :typeAnimal="showedUser.animal.typeAnimal"
      >
      </profiles-switcher>
    </template>
  </profile-screen>
</template>
<script>
import ProfileScreen from "./ProfileScreen.vue";
import Header from "./Header.vue";
import ProfileButton from "./ProfileButton.vue";
// import SettingsButton from "./SettingsButton.vue";
import BackButton from "./BackButton.vue";
import ProfilesSwitcher from "./ProfilesSwitcher.vue";
import Modal from "./Modal.vue";
import ChatModal from "./ChatModal.vue";
import Axios from "axios";
// import  sendPush from "../api.js"
// import TrialBlock from "./TrialBlock.vue";
export default {
  name: "ProfileUserScreen",
  components: {
    ProfileScreen,
    Header,
    ProfileButton,
    BackButton,
    ProfilesSwitcher,
    Modal,
    ChatModal,
  },
  props: {
    pusher: { type: Object },
    user: { type: Object, require: true },
    users: { type: Array },
    userSelf: { type: Object },
  },
  data() {
    return {
      incommingMessage: null,
      incommingMessageToChat: null,
      showedUser: null,
      indexInUsers: null,
      newMessage: false,
      chatCurrent: null,
      idCurrentChat: null,
      opponentUser: { name: null, id: null },
    };
  },

  methods: {
    async openChat(idChat) {
      // this.chatCurrent=null
      // console.log("idChat", idChat);
      if (!idChat) {
        console.log("not IdChat");
        idChat = `${this.userSelf.profile.id}#${this.showedUser.profile.id}`;
        this.opponentUser.name = this.showedUser.profile.name;
        this.opponentUser.id = this.showedUser.profile.id;
      }

      const headers = {
        "Content-Type": "application/json",
      };

      // if (this.userSelf.chats.includes(idChat)) {
      //   console.log("cht found", idChat);
      //   const { data } = await Axios.post(
      //     `http://localhost:5000/api/chat/get_chat/`,
      //     { chatId: idChat },
      //     {
      //       headers: headers,
      //     }
      //   );
      //   this.idCurrentChat = idChat;
      //   this.chatCurrent = data;

      //   console.log("userchat in self", this.chatCurrent);
      // } else {
      //   console.log(
      //     `cht not found ${idChat}`
      //   );
      const idChatPart = idChat.split("#");
      const { data } = await Axios.get(
        `http://localhost:5000/api/chat/create_chat/${idChatPart[0]}/${idChatPart[1]}`,
        {
          headers: headers,
        }
      );
      this.idCurrentChat = data.chatId;
      this.chatCurrent = data;
      // }
      console.log("chatCurrent", this.chatCurrent);
      this.$refs.chat.clearScreen();
      this.$refs.modalChat.openModal();
    },
    async sendToShowedUser(value) {
      /////////
      {
        const headers = {
          "Content-Type": "application/json",
        };
        let { data } = await Axios.post(
          `http://localhost:5000/api/message`,
          {
            from: this.userSelf.profile.id,
            to: value.to,
            name: this.userSelf.profile.name,
            msg: value.msg,
          },
          {
            headers: headers,
          }
        );

        console.log(data);
        //////////////
      }

      const headers = {
        "Content-Type": "application/json",
      };
      const messageData = {
        chatId: this.idCurrentChat,
        author: this.userSelf.profile.id,
        msg: value.msg,
      };
      await Axios.post(
        `http://localhost:5000/api/chat/post_message`,
        messageData,
        {
          headers: headers,
        }
      );
      // await sendPush( messageData)
      let payload = this.userSelf.chats;
      payload.push(this.idCurrentChat);
      payload = [...new Set(payload)];
      console.log("adding to user", payload);

      this.$store.commit("SAVE_USER", { chats: payload });
      this.$emit("updateUser", payload);
    },
    back() {
      this.$emit("back", null);
    },
    myProfile() {
      this.$emit("myProfile", null);
    },
    nextProfile() {
      this.getUserIndex();
      this.showedUser = this.users[
        this.indexInUsers >= this.users.length - 1 ? 0 : this.indexInUsers + 1
      ];
      console.log("next");
    },
    previousProfile() {
      this.getUserIndex();
      this.showedUser = this.users[
        this.indexInUsers <= 0 ? this.users.length - 1 : this.indexInUsers - 1
      ];
      console.log("previous");
    },
    getUserIndex() {
      this.users.forEach((el, ind) => {
        if (el.id == this.showedUser.id) {
          console.log(ind);
          this.indexInUsers = ind;
        }
      });
    },
    async startChat() {
      const val = this.incommingMessage;
      this.opponentUser.name = val.name;
      this.opponentUser.id = val.from;
      this.incommingMessageToChat = this.incommingMessage;
      await this.openChat(`${this.userSelf.profile.id}#${val.from}`);

      console.log("start Chat", this.chatCurrent);
      this.newMessage = false;
    },
  },
  watch: {},
  computed: {},
  async beforeMount() {
    this.showedUser = this.user;
    this.opponentUser.name = this.showedUser.profile.name;
    this.opponentUser.id = this.showedUser.profile.id;

    this.pusher.bind("message", async (data) => {
      console.log("data incomming", data);
      if (
        this.$refs?.modalChat?.isOpen === false ||
        (this.$refs?.modalChat?.isOpen === true &&
          this.opponentUser.id != data.from)
      ) {
        this.newMessage = true;
        this.incommingMessage = data;
      }
      if (
        this.$refs?.modalChat?.isOpen === true &&
        this.opponentUser.id == data.from
      ) {
        this.incommingMessageToChat = data;
      }
      // await sendPush(this.subscriptionPush, data.message);
    });
  },
};
</script>
<style lang="scss" scoped>
%flex-type {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
}

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
  letter-spacing: 0rem;
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
  bottom: 0.5rem;
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: space-around;
  flex-wrap: nowrap;
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
.notice_block {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  cursor: pointer;
  // position: absolute;
  
  transition: 0.3s;
  margin-left: 1rem;

  &:hover {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
      drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
  }
  img {
    margin-top: 0.3rem;
  }
}
</style>

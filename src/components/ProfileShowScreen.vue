<template>
  <profile-screen :user="showedUser" ref="profile">
    <template #modalAnother>
      <Modal ref="modalChat">
        <template #content>
          <chat-modal
            ref="chat"
            :name="opponentUser.profile.name"
            :idOpponent="opponentUser.profile.id"
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
        :typeAnimal="showedUser.animals['0'].typeAnimal"
        class="profiles-switcher"
      >
        <template #helper>
          Нажмите что бы начать чат с {{ showedUser.profile.name }}
        </template>
      </profiles-switcher>
    </template>
  </profile-screen>
</template>
<script>
import ProfileScreen from "./ProfileScreen.vue";
import Header from "./Header.vue";
import ProfileButton from "./ProfileButton.vue";
import BackButton from "./BackButton.vue";
import ProfilesSwitcher from "./ProfilesSwitcher.vue";
import Modal from "./Modal.vue";
import ChatModal from "./ChatModal.vue";
import Axios from "axios";
import {URI_SERVER} from "../api.js"
export default {
  //Компонент отображения найденных юзеров
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
    users: { type: Object },
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
      opponentUser: { profile: { name: null, id: null } },
    };
  },

  methods: {
    async openChat(idChat) {
      // this.chatCurrent=null
      // console.log("idChat", idChat);
      if (!idChat) {
        console.log("not IdChat");
        idChat = `${this.userSelf.profile.id}#${this.showedUser.profile.id}`;
        this.opponentUser.profile.name = this.showedUser.profile.name;
        this.opponentUser.profile.id = this.showedUser.profile.id;
      }

      const headers = {
        "Content-Type": "application/json",
      };

      const idChatPart = idChat.split("#");
      const { data } = await Axios.get(
        `${URI_SERVER}/api/chat/create_chat/${idChatPart[0]}/${idChatPart[1]}`,
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

      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.post(
        `${URI_SERVER}/api/message`,
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

      const messageData = {
        chatId: this.idCurrentChat,
        author: this.userSelf.profile.id,
        msg: value.msg,
      };
      await Axios.post(
        `${URI_SERVER}/api/chat/post_message`,
        messageData,
        {
          headers: headers,
        }
      );
      // await sendPush( messageData)
      let payload = this.userSelf.profile.chats;
      payload.push(this.idCurrentChat);
      payload = [...new Set(payload)];
      console.log("adding to user", payload);

      this.$store.commit("SAVE_PROFILE", { chats: payload });
      this.$emit("updateUser", payload);
    },
    back() {
      this.$emit("back", null);
    },
    myProfile() {
      this.$emit("myProfile", null);
    },
    nextProfile() {
      console.log("next", this.showedUser);
      this.getUserIndex();
      this.$refs.profile.resetPhoto();
      this.$refs.profile.currentAnimal = 0;
      this.showedUser = this.agregatedUsers[
        this.indexInUsers >= this.agregatedUsers.length - 1
          ? 0
          : this.indexInUsers + 1
      ];
    },
    previousProfile() {
      console.log("previous", this.showedUser);
      this.getUserIndex();
      this.$refs.profile.resetPhoto();
      this.$refs.profile.currentAnimal = 0;
      this.showedUser = this.agregatedUsers[
        this.indexInUsers <= 0
          ? this.agregatedUsers.length - 1
          : this.indexInUsers - 1
      ];
    },
    getUserIndex() {
      this.agregatedUsers.forEach((el, ind) => {
        if (el.profile.id == this.showedUser.profile.id) {
          console.log(ind);
          this.indexInUsers = ind;
        }
      });
    },
    async startChat() {
      const val = this.incommingMessage;
      this.opponentUser.profile.name = val.name;
      this.opponentUser.profile.id = val.from;
      this.incommingMessageToChat = this.incommingMessage;
      await this.openChat(`${this.userSelf.profile.id}#${val.from}`);

      console.log("start Chat", this.chatCurrent);
      this.newMessage = false;
    },
  },
  watch: {},
  computed: {
    agregatedUsers() {
      let result = [];
      if (this.users?.owners?.length == 0) {
        return null;
      }
      this.users?.owners?.forEach((owner) => {
        let animals = {
          ...this.users.animals.filter((el) => {
            if (el.owner == owner.id) {
              return true;
            }
          }),
        };

        const aggUser = { profile: owner, animals };

        result.push(aggUser);
      });
      return result;
    },
  },
  async beforeMount() {
    this.showedUser = this.user;
    this.opponentUser.profile.name = this.showedUser.profile.name;
    this.opponentUser.profile.id = this.showedUser.profile.id;

    this.pusher.bind("message", async (data) => {
      console.log("data incomming", data);
      if (
        this.$refs?.modalChat?.isOpen === false ||
        (this.$refs?.modalChat?.isOpen === true &&
          this.opponentUser.profile.id != data.from)
      ) {
        this.newMessage = true;
        this.incommingMessage = data;
      }
      if (
        this.$refs?.modalChat?.isOpen === true &&
        this.opponentUser.profile.id == data.from
      ) {
        this.incommingMessageToChat = data;
      }
      // await sendPush(this.subscriptionPush, data.message);
    });
  },
  mounted() {
    console.log(this.agregatedUsers);
  },
};
</script>
<style lang="scss" scoped>
.profiles-switcher {
  height: 5vh;
}
.notice_block{
  user-select: none;
  display:inline-flex;
  font-size: max(1.7vw, 1.3rem);
  cursor: pointer;
  transition: 0.3s;
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
   img {
    margin-top: 0.3rem;
    width: max(1.7vw, 1.3rem);
  }
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
</style>

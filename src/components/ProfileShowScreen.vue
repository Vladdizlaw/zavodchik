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
        class="profiles-switcher"
      >
      
         
            <template #helper>
            Нажмите что бы начать чат с {{showedUser.profile.name}}
            </template>

          
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
</style>
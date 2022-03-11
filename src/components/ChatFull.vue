<template>
  <div>
    <div class="notice_block" v-show="newMessage || messageBuffer.length > 0" @click="startChat">
      <img src="../assets/message.svg" alt="" />
      <p>{{messageBuffer.length}}
        Новое сообщение
      </p>
    </div>
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
        >
          <template #title>
            Чат c {{ opponentUser.profile.name }} хозяином
            {{ opponentUser.animal.name }}
            <img
              v-if="opponentUser.photoUrl.length > 0"
              width="50"
              height="50"
              :src="url"
              name="0"
            />
          </template>
        </chat-modal>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import ChatModal from "./ChatModal.vue";
import Axios from "axios";
export default {
  name: "ChatFull",
  components: { Modal, ChatModal },
  props: {
    userSelf: { type: Object, require: true },
    // opponentUser: { type: Object },
    pusher: { type: Object },
  },
  data() {
    return {
      newMessage: false,
      chatCurrent: null,
      idCurrentChat: null,
      opponentUser: {
        profile: { name: null },
        id: null,
        animal: { name: null },
        photoUrl: [],
      },
      incommingMessage: null,
      incommingMessageToChat: null,
      messageBuffer: [],
    };
  },
  computed: {
    url() {
      return `http://localhost:5000/${this.opponentUser?.photoUrl[0]}`;
    },
  },
  methods: {
    async openChat(idChat) {
      if (!idChat) {
        console.log("not IdChat");
        idChat = `${this.userSelf.profile.id}#${this.opponentUser.profile.id}`;
       
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
    async startChat() {
      const val =  this.messageBuffer.shift();
      this.opponentUser.name = val.name;
      this.opponentUser.id = val.from;
      this.incommingMessageToChat = val;
      await this.openChat(`${this.userSelf.profile.id}#${val.from}`);

      console.log("start Chat", this.chatCurrent);
      this.newMessage = false;
    },
  },
  async beforeMount() {
    // this.showedUser = this.user;
    // this.opponentUser.name = this.showedUser.profile.name;
    // this.opponentUser.id = this.showedUser.profile.id;

    this.pusher.bind("message", async (msg) => {
     
      if (msg.from!=this.opponentUser.id){
      const { data } = await Axios.get(
        `http://localhost:5000/api/get_user${msg.from}`
      );
      this.opponentUser = data;
      }
      console.log("data incomming", msg);
      if (
        this.$refs?.modalChat?.isOpen === false ||
        (this.$refs?.modalChat?.isOpen === true &&
          this.opponentUser?.id != msg.from)
      ) {
        this.newMessage = true;
       
         this.messageBuffer.push(msg) 
         this.incommingMessage = msg;
      }
      if (
        this.$refs?.modalChat?.isOpen === true &&
        this.opponentUser.id == msg.from
      ) {
        this.incommingMessageToChat = msg;
      }
      // await sendPush(this.subscriptionPush, data.message);
    });
  },
  beforeUnMount() {},
};
</script>
<style lang="scss" scoped>
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
  position: absolute;
  
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

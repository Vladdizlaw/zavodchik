<template>
  <div>
    <div
      class="notice_block"
      v-show="newMessage || messageBuffer.length > 0"
      @click="startChat"
    >
      <img src="../assets/message.svg" alt="" />
      <p>
        {{ messageBuffer.length }}
        Новое сообщение
      </p>
    </div>
    <Modal ref="modalChat" class="modal">
      <template #content>
        <chat-modal
          ref="chat"
          :name="opponentUser.profile.name"
          :idOpponent="opponentUser.profile.id"
          :chat="chatCurrent"
          :idSelf="userSelf.profile.id"
          :incommingMessage="incommingMessageToChat"
          @sendMessage="sendToShowedUser"
        >
          <template #title>
            <p>
              Чат c {{ opponentUser.profile.name }}
              <span
                v-if="
                  opponentUser.profile.animals &&
                    opponentUser.profile.animals.length > 0
                "
              >
                , хозяином {{ opponentUser.animals[0].name }}</span
              >
            </p>
            <img
              v-if="
                opponentUser.animals[0] &&
                  opponentUser.animals[0].photoUrl.length > 0
              "
              width="50"
              height="50"
              :src="url"
              name="0"
            />
            <p
              v-if="
                opponentUser.profile.animals &&
                  opponentUser.profile.animals.length > 1
              "
            >
              и еще {{ opponentUser.profile.animals.length - 1 }}
            </p>
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
import { URI_SERVER } from "../api";
export default {
  name: "ChatFull",
  components: { Modal, ChatModal },
  props: {
    userSelf: { type: Object, require: true },
    // opponentUserProps: { type: Object },
    pusher: { type: Object, require: true },
  },
  data() {
    return {
      newMessage: false,
      chatCurrent: null,
      idCurrentChat: null,
      opponentUser: {
        profile: { name: null, id: null, animals: [] },
        animals: {},
      },
      incommingMessage: null,
      incommingMessageToChat: null,
      messageBuffer: [],
    };
  },
  computed: {
    url() {
      return `${URI_SERVER}/${this.opponentUser?.animals[0].photoUrl[0]}`;
    },
  },
  methods: {
    async openChat(
      idChat = `${this.userSelf.profile.id}#${this.opponentUser?.profile?.id}`
    ) {
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
      await Axios.post(
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

      // console.log(data);
      //////////////

      const messageData = {
        chatId: this.idCurrentChat,
        author: this.userSelf.profile.id,
        msg: value.msg,
      };
      await Axios.post(`${URI_SERVER}/api/chat/post_message`, messageData, {
        headers: headers,
      });
      // await sendPush( messageData)
      console.log("userSelf and props",this.userSelf,this.$props);
      let payload = this.userSelf.chats;
      payload.push(this.idCurrentChat);
      payload = [...new Set(payload)];

      if (payload != this.userSelf.chats) {
        console.log("adding to user", payload);
        this.$store.commit("SAVE_PROFILE", { chats: payload });
        this.$emit("updateUser", null);
        console.log("user new", payload);
      }
    },
    async startChat() {
      const val = this.messageBuffer.shift();
      console.log("start Chat", this.opponentUser);
      this.opponentUser.profile.name = val.name;
      this.opponentUser.profile.id = val.from;
      this.incommingMessageToChat = val;
      await this.openChat(`${this.userSelf.profile.id}#${val.from}`);

      this.newMessage = false;
      let payload = this.userSelf.profile.chats;
      payload.push(`${this.userSelf.profile.id}#${val.from}`);
      payload = [...new Set(payload)];
      console.log("payload", payload, this.userSelf.chats);
    },
  },
  async beforeMount() {
    this.pusher.bind("message", async (msg) => {
      if (msg.from != this.opponentUser.profile.id) {
        try {
          const { data } = await Axios.get(
            `${URI_SERVER}/api/get_full_user${msg.from}`
          );
          this.opponentUser = data;
        } catch (e) {
          console.log("error of loading", e);
        }
      }
      console.log("data incomming", msg, this.opponentUser);
      if (
        this.$refs?.modalChat?.isOpen === false ||
        (this.$refs?.modalChat?.isOpen === true &&
          this.opponentUser?.profile.id != msg.from)
      ) {
        this.newMessage = true;

        this.messageBuffer.push(msg);
        this.incommingMessage = msg;
      }
      if (
        this.$refs?.modalChat?.isOpen === true &&
        this.opponentUser.profile.id == msg.from
      ) {
        this.incommingMessageToChat = msg;
      }
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
.modal {
  left: 0;
}
.notice_block {
  user-select: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s;
  margin-left: 1rem;
  font-size: max(1.7vw, 1.3rem);

  &:hover {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
      drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
  }
  img {
    margin-top: 0.3rem;
    width: max(1.7vw, 1.3rem);
  }
}
</style>

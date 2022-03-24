<template>
  <div class="chats_block">
    <Modal ref="modalChat">
      <template #content>
        <chat-modal
          ref="chat"
          :name="opponentUser.profile.name"
          :idOpponent="opponentUser.profile.id"
          :chat="chatData"
          :idSelf="selfUser.profile.id"
          :incommingMessage="incommingMessageToChat"
          @sendMessage="sendToShowedUser"
        />
      </template>
    </Modal>

    <div
      class="chats_block_chat"
      v-for="chat in realAllChats"
      :key="chat._id"
      @click="openChat(chat.chatId)"
      v-show="chat.messages.length" @mouseleave="deleteConfirmation=false"
    >
      <img
        class="chats_block_chat__photo"
        v-if="showUser(chat.chatId) && showUser(chat.chatId).photo"
        width="50"
        height="50"
        :src="showUser(chat.chatId) && showUser(chat.chatId).photo"
        name="0"
      />
      <div class="chats_block_chat__title">
        {{ showUser(chat.chatId) && showUser(chat.chatId).name }} хозяин
        {{ showUser(chat.chatId) && showUser(chat.chatId).animal }}
      </div>
      <div
        class="chats_block_chat__new"
        v-show="newMessage(chat.chatId) || newestChat(chat)"
      >
        {{ newMessage(chat.chatId) || newestChat(chat)
        }}<img src="../assets/message.svg" alt="" />Новое сообщение
      </div>
     
      <div class="chats_block__delete"  @click.stop="deleteConfirmation=!deleteConfirmation"> 
        <div class="chats_block__notice">
        <div v-if="!deleteConfirmation"> Удалить чат с {{ showUser(chat.chatId) && showUser(chat.chatId).name }}</div>
          <div class="notice__alarm" v-if="deleteConfirmation"> Вы уверены? <div class="notice__buttons"><button @click.stop="deleteChat(chat.chatId)">Да</button><button>Нет</button></div></div>
      </div>
        <img src="../assets/trash.svg" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import ChatModal from "./ChatModal.vue";

// import ChatFull from "../ChatFull.vue";
export default {
  components: { Modal, ChatModal },
  name: "ChatsScreen",
  // components:{ChatFull},
  props: { selfUser: { type: Object }, pusher: { type: Object } },
  data() {
    return {
      allChats: [],
      realAllChats: [],
      oldChatsIds: [],
      chatData: null,
      opponentUser: { profile: { name: null, id: null } },
      deleteConfirmation:false,
      opponentUsers: [],
      incommingMessages: [],
      countIncommingMessages: null,
      incommingMessageToChat: null,
    };
  },
  methods: {
    async deleteChat(chatId){
      await fetch("http://localhost:5000/api/chat/delete_chat", {
        method: "POST",
        body: JSON.stringify({ chatId: chatId }),
        headers: {
          "content-type": "application/json",
        },
      });
      let payload = this.selfUser.chats.filter(c=>c.chatId!=chatId);
    
      payload = [...new Set(payload)];

      if (payload != this.selfUser.chats) {
      
        this.$store.commit("SAVE_USER", { chats: payload });
        this.$emit("updateUser", null);
        console.log("user new", this.selfUser);
      }
      this.realAllChats=this.realAllChats.filter(c=>c.chatId!=chatId);
       this.allChats=this.allChats.filter(c=>c.chatId!=chatId);
        this.oldChatsIds=this.oldChatsIds.filter(c=>c.chatId!=chatId);
          console.log("opponentUsers1",chatId,this.opponentUsers);
         this.opponentUsers=this.opponentUsers.filter(c=>!chatId.split('#').includes(c.profile.id));
           console.log("opponentUsers2",chatId.split('#'),this.opponentUsers);
           this.deleteConfirmation=false
    },
    showUser(chatId) {
      if (this.opponentUsers.length == 0) {
        return;
      }
      const id = chatId
        .split("#")
        .filter((i) => i !== this.selfUser?.profile?.id)[0];
      // console.log('id',id)
      let result = this.opponentUsers.filter((el) => el.profile?.id == id);
      result = result[0];
      // console.log("res", result);
      return {
        photo: `http://localhost:5000/${result?.photoUrl[0]}`,
        name: result?.profile?.name,
        animal: result?.animal?.name,
      };
    },
    newMessage(chatId) {
      let countMess = 0;
      if (this.incommingMessages.length == 0) {
        return false;
      }
      if (!this.oldChatsIds.includes(chatId)) {
        countMess++;
      }
      const id = chatId
        .split("#")
        .filter((i) => i !== this.selfUser?.profile?.id)[0];
      for (let i of this.incommingMessages) {
        if (i.from == id) {
          countMess++;
        }
      }

      return countMess;
    },
    newestChat(chat) {
      if (!this.oldChatsIds.includes(chat.chatId) && chat.messages.length > 0) {
        return 1;
      }
    },
    async openChat(chatId) {
      this.$refs.chat.clearScreen();
      const response = await fetch("http://localhost:5000/api/chat/get_chat", {
        method: "POST",
        body: JSON.stringify({ chatId: chatId }),
        headers: {
          "content-type": "application/json",
        },
      });
      this.chatData = await response.json();
      // console.log("chatData", this.chatData);
      const id = chatId
        .split("#")
        .filter((i) => i !== this.selfUser?.profile?.id)[0];
      let result = this.opponentUsers.filter((el) => el.profile.id == id);
      this.opponentUser = result[0];
      // console.log("chatOpponent", this.opponentUser);
      //   this.$refs.chat.clearScreen();
      this.incommingMessages = this.incommingMessages.filter(
        (el) => el.from != id
      );
      // this.incommingMessage=null

      this.$refs.modalChat.openModal();
      ////get this into  function
      let payload = this.selfUser.chats;
      payload.push(this.chatData.chatId);
      payload = [...new Set(payload)];
      if (!this.oldChatsIds.includes(chatId)) {
        this.oldChatsIds.push(chatId);
      }
      if (payload != this.selfUser.chats) {
        console.log("adding to user in new chat", payload);
        this.$store.commit("SAVE_USER", { chats: payload });
        this.$emit("updateUser", null);
        console.log("user new", this.selfUser);
      }
      /////
    },
    async sendToShowedUser(value) {
      const headers = {
        "Content-Type": "application/json",
      };
      await fetch(`http://localhost:5000/api/message`, {
        method: "POST",
        body: JSON.stringify({
          from: this.selfUser.profile.id,
          to: value.to,
          name: this.selfUser.profile.name,
          msg: value.msg,
        }),
        headers: headers,
      });

      // console.log('data',data);
      //////////////

      const messageData = {
        chatId: this.chatData.chatId,
        author: this.selfUser.profile.id,
        msg: value.msg,
      };
      await fetch(
        `http://localhost:5000/api/chat/post_message`,

        { method: "POST", body: JSON.stringify(messageData), headers: headers }
      );
      // await sendPush( messageData)
      let payload = this.selfUser.chats;
      payload.push(this.chatData.chatId);
      payload = [...new Set(payload)];

      if (payload != this.selfUser.chats) {
        console.log("adding to user in new chat", payload);
        this.$store.commit("SAVE_USER", { chats: payload });
        this.$emit("updateUser", null);
        console.log("user new", this.selfUser);
      }
    },
    async makeNewChat(msg) {
      let chat = await fetch("http://localhost:5000/api/chat/get_chat", {
        method: "POST",
        body: JSON.stringify({
          chatId: `${this.selfUser.profile.id}#${msg.from}`,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      let user = await fetch(`http://localhost:5000/api/get_user${msg.from}`, {
        method: "GET",

        headers: {
          "content-type": "application/json",
        },
      });
      chat = await chat.json();
      user = await user.json();
      this.allChats.push(chat);
       this.realAllChats.push(chat);
      this.opponentUsers.push(user);
    },
  },
  async mounted() {
    let usersIds = [];
    let response = await fetch("http://localhost:5000/api/chat/get_chats", {
      method: "POST",
      body: JSON.stringify({
        chats: this.selfUser.chats,
        id: this.selfUser.profile.id,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
    this.allChats = response.chats;
    this.realAllChats = response.allChats;
    this.oldChatsIds = this.allChats.map((c) => c.chatId);
    console.log("oldchats", this.oldChatsIds);
    const arrIdsChats = this.realAllChats.map((c) => c.chatId);
    arrIdsChats.forEach((el) => {
      let res = el
        .split("#")
        .filter((i) => i !== this.selfUser?.profile?.id)[0];
      usersIds.push(res);
    });

    const data = await fetch("http://localhost:5000/api/get_users", {
      method: "POST",
      body: JSON.stringify({ users: usersIds }),
      headers: {
        "content-type": "application/json",
      },
    });

    // ???????

    // this.allChats=this.realAllChats
    console.log("length chats:", this.allChats, this.realAllChats);
    this.opponentUsers = await data.json();
    this.pusher.bind("message", async (msg) => {
      const usersIds = this.opponentUsers.map((el) => el.profile.id);
      this.incommingMessages.push(msg);
      if (
        this.$refs?.modalChat?.isOpen === true &&
        this.opponentUser.id == msg.from
      ) {
        this.incommingMessageToChat = msg;
        this.incommingMessages.splice(
          this.incommingMessages.findIndex((el) => el == msg),
          1
        );
        console.log("allChats from chats-screen", this.incommingMessageToChat);
      }
      if (!usersIds.includes(msg.from)) {
        console.log("users", usersIds, "msg,from", msg.from);
        this.makeNewChat(msg);
      }
    });
    // console.log('allChats from chats-screen',await data.json())
  },
};
</script>
<style lang="scss" scoped>
.chats_block {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  &_chat {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    min-width: 80%;
    min-height: 15%;
    padding-left: 2rem;
    padding-right: 2rem;
    background: #97c776;
    opacity: 0.7;
    gap: 1rem;
    cursor: pointer;
    position: relative;

    box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s;
    &__photo {
      transition: all 0.3s;
      border-radius: 5px 5px;
    }
    &__photo:hover {
      width: 5%;
      height: 80%;
      box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.25);
    }
    &:hover {
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5),
        10px 10px 4px rgba(9, 112, 7, 0.75);
      opacity: 0.9;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
        drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
    }
  }
  &_chat__title {
    display: flex;
    flex-direction: column;
  }
  &_chat__new {
    display: flex;
    flex-direction: row;
    justify-self: flex-end;
    align-self: center;
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    transition: all 0.4s;
    opacity: 0.9;
    margin-left: auto;
    margin-right: 40%;
    img {
      margin-top: 0.5rem;
    }
    img:hover {
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5),
        10px 10px 4px rgba(9, 112, 7, 0.75);
    }
    &:hover {
      animation: shake 0.72s cubic-bezier(0.46, 0.27, 0.49, 0.97) infinite;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5),
        10px 10px 4px rgba(9, 112, 7, 0.75);
    }
  }
}
.chats_block__notice {
  border-radius: 5px 5px 5px 5px;
  display: flex;
  position: absolute;
  left: -17rem;
 
  z-index: 0;
  background-color: #f6f2ac;
  font-size: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: 0.7s;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
 
}
.notice__alarm{
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
   gap:0.5rem;
 
  // position: absolute;
  // width:3rem;
  
}
.notice__buttons{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button{
    border-radius: 5px;
    width:3.5rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  
    font:inherit;  
    font-size: 1.5rem;
    &:hover{ animation: shake 0.72s cubic-bezier(0.06, 0.02, 0.08, 0.07) infinite;}
  }
}
.chats_block__delete {
  background-color: rgba(9, 112, 7, 0.55);
  width: 2.5rem;
  height: 3rem;
  border-radius: 5px 5px 5px 5px;
  display: flex;
  position: absolute;
  right: 5%;
  opacity: 0.6;
  transition: all 0.3s;
  border: 0.3px solid black;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5),
      10px 10px 4px rgba(9, 112, 7, 0.75);
    opacity: 0.9;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
      drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
      
   
   
   
  }
  &:hover .chats_block__notice{
    opacity: 1;
    z-index: 10;
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

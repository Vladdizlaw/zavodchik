<template>
  <div class="modal-chat">
    <p class="modal-chat_title">Чат с {{ name }}</p>
    <div ref="chatScreen" class="modal-chat_screen"></div>
    <div class="modal-chat__manage">
      <input
        class="modal-chat__manage_input"
        type="text"
        v-model="message"
        @keyup.enter="sendToShowedUser"
      />
      <button class="modal-chat__manage_button" @click="sendToShowedUser">
        отправить
      </button>
    </div>
  </div>
</template>
<script>
// import axios from "axios"
export default {
  name: "ChatModal",
  props: {
    name: String,
    idOpponent: String,
    chat: Object,
    idSelf: String,
    incommingMessage:Object,
  },
  data() {
    return {
      message: "",
    };
  },
  watch: {
    chat(val) {
      console.log("chat modified", val.messages);
      if (val.messages?.length > 0) {
        if (val.messages?.length>100){
          val.messages=val.messages.slice(-100)
          console.log("chat more than 100", val.messages)
        }
        val.messages.forEach((msg) => {
          if (msg.author == this.idSelf) {
            this.createSelfMessage(msg.value);
          }
          if (msg.author == this.idOpponent) {
            this.createOpponentMessage(msg.value);
          }
        });
      }
    },
    incommingMessage(val){
      console.log('incomming messs chat modal',val)
      // if (val.from==this.idOpponent){
        if (this.chat?.messages[this.chat.messages.length-1]!=val.message){
          this.createOpponentMessage(val.message);
        }
       
      // }
    }
   
  },
  methods: {
   
    clearScreen() {
      const oldMessages = this.$refs.chatScreen.querySelectorAll("div");
      // console.log("nodeList", oldMessages);
      if (oldMessages.length > 0) {
        oldMessages.forEach((msg) => {
          this.$refs.chatScreen.removeChild(msg);
        });
      }
    },
    createOpponentMessage(messData) {
      const div = document.createElement("div");
      const p = document.createElement("p");
      p.append(messData);
      div.append(p);
      div.classList.add("message");
      div.style.cssText = ` box-sizing:content-box;
      padding: 0.2rem 1.5rem 0.2rem 1.5rem;
      border-radius:10px 10px 0px 10px;
      font:inherit;
      font-size: 3rem;
      border: 1px solid #000000;
      width:fit-content;
      height:auto;
      max-width:30%;
      overflow:hidden;
      overflow-wrap: break-word;
      background: radial-gradient(154.26% 154.26% at 53% 152%, #FEFEFE 0%, #F5F0A2 32.94%, #CEEBFF 65.1%, #95C671 100%);
      flex-shrink:0;
      align-self: end;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));`;

      this.$refs.chatScreen.insertAdjacentElement("beforeend", div);
      this.$refs.chatScreen.scrollTo(
        0,
        this.$refs.chatScreen.offsetHeight * 100
      );
    },
    createSelfMessage(messData) {
      const div = document.createElement("div");
      const p = document.createElement("p");
      p.append(messData);
      div.append(p);
      div.classList.add("message");
      div.style.cssText = ` 
      box-sizing:content-box;
      padding: 0.2rem 0.5rem 0.2rem 0.5rem;
      border-radius:10px 10px 10px 0px;
      font-size: 3rem;
      font:inherit;
      border: 1px solid #000000;
      width:fit-content;
      height:auto;
      max-width:30%;
      overflow:hidden;
      overflow-wrap: break-word;
      flex-shrink:0;
      align-self: start;
      background: radial-gradient(769.35% 1360.9% at 49% 151%, #F5F0A2 0%, rgba(245, 240, 162, 0.447059) 32.94%, rgba(149, 198, 113, 0.517647) 65.1%, #95C671 100%);
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));`;

      this.$refs.chatScreen.insertAdjacentElement("beforeend", div);
      this.$refs.chatScreen.scrollTo(
        0,
        this.$refs.chatScreen.offsetHeight * 100
      );
    },
    async sendToShowedUser() {
      if (!this.message) {
        return;
      }
      this.createSelfMessage(this.message);
      
      // await this.postMessageToChat(this.message)
      this.$emit("sendMessage", { to: this.idOpponent, msg: this.message });
      this.message = "";
    },
  },
  mounted() {
    
   
   
    this.$refs.chatScreen.scrollTo(0, this.$refs.chatScreen.offsetHeight * 100);
  },
  beforeUnMount() {
  
    this.clearScreen();
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
.modal-chat {
  width: 70vw;
  height: 100%;
  border: 1px solid black;
  @extend %flex-type;
  align-items: center;
  background: url("../assets/cover1.png");
  background-position: center;
  background-size: cover;
  overflow: hidden;
  filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));

  &_screen {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 90%;
    height: 75%;
    border-radius: 10px;
    background-color: white;

    overflow: auto;
    padding: 0.5rem 1rem 0.5rem 1rem;

    gap: 0.5rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  &__manage {
    @extend %flex-type;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    min-height: 30%;
    &_input {
      width: 70%;
      padding: 0.5rem 0.5rem 0.5rem 0.5rem;
      height: min(4rem, 5vh);
      border-radius: 10px;
      font: inherit;
      font-size: 3rem;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
    &_button {
      max-width: 10rem;
      background-image: url("../assets/cover_dog.png");
      min-height: 3rem;
      border: 1px solid #000000;
      box-sizing: border-box;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      border-radius: 25px 0px;
      transform: matrix(1, 0, 0, 1, 0, 0);
      font-family: Amatic SC;
      font-style: normal;
      font-weight: bold;
      font-size: 2rem;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
          drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
        font-size: 2.5rem;
      }
      &:active {
        filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
          drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
      }
    }
  }
}
.message:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
  font-size: 3rem;
}
</style>

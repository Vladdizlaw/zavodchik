<template>
  <div class="modal-chat">
    <div class="modal-chat_title">
      <slot name="title">
        <p>Чат с {{ name }}</p>
      </slot>
    </div>
    <div ref="chatScreen" class="modal-chat_screen"></div>
    <div class="modal-chat__manage">
      <input
        tabindex="0"
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
    incommingMessage: Object,
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
        if (val.messages?.length > 100) {
          val.messages = val.messages.slice(-100);
          console.log("chat more than 100", val.messages);
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
    incommingMessage(val) {
      console.log("incomming messs chat modal", val);
      // if (val.from==this.idOpponent){
      if (this.chat?.messages[this.chat.messages.length - 1] != val.message) {
        this.createOpponentMessage(val.message);
      }

      // }
    },
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
      display:flex;
      justify-content:center;
      align-items:center;
     padding: 0px 0.5rem 0px 0.5rem;
      border-radius:20px 20px 0px 20px;
     
      font:inherit;
      border: 1px solid #000000;
      
     height:auto;
      max-width:45%;
      overflow:hidden;
      overflow-wrap: break-word;
      background: radial-gradient(154.26% 154.26% at 53% 152%, #FEFEFE 0%, #F5F0A2 32.94%, #CEEBFF 65.1%, #95C671 100%);
      flex-shrink:0;
      align-self: end;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      
     `;

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
      // div.innerText(messData)
      div.classList.add("message");
      div.style.cssText = ` 
      box-sizing:content-box;
      display:flex;
      justify-content:center;
      align-items:center;
      padding: 0px 1rem 0px 1rem;
      border-radius:20px 20px 20px 0px;
      font:inherit;
      border: 1px solid #000000;
      height:fit-content;
    
      max-width:40%;
      overflow:hidden;
      overflow-wrap: break-word;
      flex-shrink:0;
      align-self: start;
      background: radial-gradient(769.35% 1360.9% at 49% 151%, #F5F0A2 0%, rgba(245, 240, 162, 0.447059) 32.94%, rgba(149, 198, 113, 0.517647) 65.1%, #95C671 100%);
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      `;

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
  width: 60vw;
  height: 90vh;
  border: 1px solid black;
  @extend %flex-type;
  align-items: center;
  background: #f8f49d;
  box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  @media screen and (orientation: portrait) {
    height: 70vh;
    width: 90vw;
  }
  &_title {
    display: inline-flex;
    gap: 1rem;
    padding: 0.2rem 0 0.2rem 0;
    p {
      display: inline;
      margin-block-start: 0.5rem;
      margin-block-end: 0.5rem;
    }
    img {
      box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
    }
  }
  &_screen {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 90%;
    height: 95%;
    border-radius: 10px;
    background-color: white;
    transition: 0.3s;
    font-size: max(1.5vw, 1rem);

    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 30px; // manage scrollbar width here
    }
    &::-webkit-scrollbar {
      background: transparent; // manage scrollbar background color here
    }
    @media screen and (orientation: portrait) {
      height: 70%;
      width: 80%;
    }

    &:hover {
      filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.55))
        drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25));
    }
    padding: 0.5rem 0rem 0.5rem 2rem;

    gap: 0.5rem;
    filter: drop-shadow(1px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  &__manage {
    @extend %flex-type;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    min-height: 20%;
    @media screen and (orientation: portrait) {
      gap:1rem;
      padding-top:1rem;
      flex-direction: column;
      height:fit-content;
      justify-content: space-between;
      
    }
    &_input {
        border: 0.1px solid #000000;
      width: 60%;
      padding: 0.5rem 0.5rem 0.5rem 0.5rem;
      height: min(3rem, 4vh);
      border-radius: 10px;
      font: inherit;
      font-size: max(3vw, 1.7rem);
      transition: 0.3s;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
        drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      @media screen and (orientation: portrait) {
        width: 50%;
        height: 3vh;
      }
      &:hover {
        filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.55))
          drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25));
      }
    }
    &_button {
      height: fit-content;
      width: fit-content;
      background: linear-gradient(108.6deg, #95c671 13.72%, #698852 89.83%);
      border: 1px solid #000000;
      box-sizing: border-box;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
      border-radius: 20px 0px;
      font-family: Amatic SC;
      font-style: normal;
      font-weight: bold;
      font-size: max(3vw, 1.7rem);
      transition: 0.3s;
      cursor: pointer;
      @media screen and (orientation: portrait) {
        margin-bottom: 2rem;
      }

      &:hover {
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
          drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
        transform: scale(1.1);
      }
      &:active {
        filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
          drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
      }
    }
  }
}
</style>

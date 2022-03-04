<template>

  <Modal ref="modalChat">
        <template #content>
          <chat-modal
            ref="chat"
            :name="OpponentUser.profile.name"
            :idOpponent="OpponentUser.profile.id"
            :chat="chatCurrent"
            :idSelf="userSelf.profile.id"
            @sendMessage="sendToShowedUser"
           
          />
        </template>
      </Modal>
</template>
<script>
import Modal from "./Modal.vue";
import ChatModal from "./ChatModal.vue";
import Axios from "axios";
export default {
  name: "ChatFull",
  components:{Modal,ChatModal},
  props: { userSelf: { type: Object, require: true },
        OpponentUser: { type: Object }, },
  data() {
    return {
      chatCurrent: null,
    };
  },
  watch: {
   
  },
  methods: {
    async sendToShowedUser(value) {

     
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.post(
        `http://localhost:5000/api/message`,
        { from: this.userSelf.id, to:this.showedUser.profile.id,name:this.userSelf.profile.name, msg: value.msg },
        {
          headers: headers,
        }
      );
      
      console.log(data);
    }

     
 
  },
  mounted() {
 
  },
  beforeUnMount() {
  
  },
};
</script>
<style lang="scss" scoped>

</style>

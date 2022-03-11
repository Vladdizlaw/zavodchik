<template>
  <div class="chats_block">
    <div class="chats_block_chat" v-for="chat in allChats" :key="chat._id">
        <img class="chats_block_chat__photo"
              v-if="showUser(chat.chatId).photo"
              width="50"
              height="50"
              :src="showUser(chat.chatId).photo"
              name="0"
            />
            <div class="chats_block_chat__title">
                {{showUser(chat.chatId).name }} хозяин {{showUser(chat.chatId).animal }}
            </div>
            <div class="chats_block_chat__new" v-show="newMessage(incommingMessage,chat.chatId)"> <img src="../assets/message.svg" alt="" />Новое сообщение</div>
       
    </div>
  </div>
</template>
<script>

// import ChatFull from "../ChatFull.vue";
export default {
    name:'ChatsScreen',
    // components:{ChatFull},
    props:{selfUser:{type:Object},pusher:{type:Object}},
    data(){
        return{
            allChats:[],
            opponentUsers:[],
            incommingMessage:null
        }

    },
    methods:{
        showUser(chatId){
            if(this.opponentUsers.length<1){
                return 
            }
            const id=chatId.split('#')[1]
            let result=this.opponentUsers.filter((el)=> el.profile.id==id)
            result=result[0]
            console.log('res',result)
            return {photo:`http://localhost:5000/${result?.photoUrl[0]}`, name: result.profile.name, animal:result.animal.name}
        },
        newMessage(msg,chatId){
            if (!msg){
                return false
            }
            const id=chatId.split('#')[1]
            if (msg?.from==id){
                return true
            }else{
                return false
            }

        }

    },
    async mounted(){
        let usersIds=[]
       const  response =await fetch("http://localhost:5000/api/chat/get_chats", {
      method: "POST",
      body: JSON.stringify({chats:this.selfUser.chats}),
      headers: {
        "content-type": "application/json"
      }
    });
    this.selfUser.chats.forEach(el=>{let res=el.split('#');usersIds.push(res[1])})
    console.log('users',usersIds)
    const data=await fetch("http://localhost:5000/api/get_users", {
      method: "POST",
      body: JSON.stringify({users:usersIds}),
      headers: {
        "content-type": "application/json"
      }
    });
   this.allChats=await response.json()
   this.opponentUsers=await data.json()
   this.pusher.bind("message", async (msg) => {
       this.incommingMessage=msg

   })
    // console.log('allChats from chats-screen',await data.json())



    }


    }
</script>
<style lang="scss" scoped>
.chats_block {
  display: flex;
  flex-direction: column;
  width:100%;
  height: 100%;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  &_chat {
    display: flex;
    flex-direction: row;
    justify-content:start;
    align-items: center;
    min-width: 80%;
    min-height: 15%;
    padding-left: 2rem;
     padding-right: 2rem;
    background: #97c776;
    opacity: 0.7;
    gap: 1rem;
    cursor: pointer;

    box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s;
    &__photo{
        transition: all 0.3s;
        border-radius: 5px 5px;
    }
    &__photo:hover {
        width:5%;
        height: 90%;
        box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.25);
    }
   &:hover{
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5), 10px 10px 4px rgba(9, 112, 7, 0.75);
        opacity: 0.9;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
      drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
  }
   }
   &_chat__title{
       display: flex;
       flex-direction: column;

   }
   &_chat__new{
       display: flex;
       flex-direction: row;
       justify-self: flex-end;
       align-self: center;
       animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
       transition: all 0.4s;
        opacity: 0.9;
       margin-left:auto;
       img{
           margin-top:0.5rem;
       }
       img:hover{
           text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5), 10px 10px 4px rgba(9, 112, 7, 0.75);
       }
       &:hover{
           animation: shake 0.72s cubic-bezier(0.46, 0.27, 0.49, 0.97) infinite;
           text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5), 10px 10px 4px rgba(9, 112, 7, 0.75);
       }

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

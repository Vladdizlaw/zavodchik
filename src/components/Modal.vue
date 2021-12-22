<template>
 <transition name="bounce">
     <div
        ref="modal"
        class="modal"
        @click="cancelModal"
        @keydown.esc="cancelModal"
        v-show="modalPhoto"
        :class="{ active: modalPhoto }"
      > 
      <img :src="imageUrl"  class="image" alt="">
      </div>
 </transition>
</template>
<script>
export default {
    name:'Modal',
    props:{imageUrl:String},
    data(){
        return{
            modalPhoto:false
        }
    },
    methods:{
        checkPhoto(e) {
      if (!e.target.name){
        return
      }
      const modal = this.$refs.modal;

      const img = document.createElement("img");
      img.style.height = "90vh";
      img.style.maxWidth = "80vw"
      img.style.border = "1px solid black";
      img.style.borderRadius = "5px";
      // console.log(e.target.name)
      img.src = this.imageUrl;
      modal.style.zIndex = "1000";
      modal.prepend(img);
      this.modalPhoto = true;
      // console.log(img.style);
    },

    cancelModal() {
      const modal = this.$refs.modal;
      const img = modal.getElementsByTagName("img");
      
      //  console.log(img)

     
      this.modalPhoto = false;
      Array.from(img).forEach((el) => {
        el.remove();
      });
    },
    }
}
</script>
<style scoped>
.modal {
  position: absolute;
  background: rgba(235, 222, 42, 0.863), linear-gradient(to bottom, rgba(245, 246, 252, 0.52));
  backdrop-filter: blur(2px);
  /* backdrop-filter: drop-shadow(4px 4px 10px blue); */
  /* backdrop-filter: grayscale(30%); */
  /* opacity: 0.7; */
  left: 50;
  width: 100vw;
  height: 100vh;
  transition: all 1s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image{
  max-height : 90vh;
  max-width :80vw;
  border :1px solid black;
  border-radius : 5px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

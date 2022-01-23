<template>
  <transition name="bounce">
    <div 
      class="modal"
     
      @click="cancelModal"
      v-show="flag"
    >
      <div ref="content" class="content"  >
        <slot name="content"> </slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  props: { flag: Boolean },
  data() {
    return {
      // modalPhoto:false
    };
  },
  methods: {
    cancelModal() {
      this.$emit("cancelModal", null);
      // this.flag=false
    },
    cancelEsc(e){
       e.key=='Escape'?this.cancelModal():null
    }
  },
  mounted(){
    document.addEventListener('keydown',this.cancelEsc)
  },
  beforeDestroy(){
    document.removeEventListener('keydown',this.cancelEsc)
  }
  
};
</script>
<style scoped>
.modal {
  position: absolute;
  background: rgba(235, 222, 42, 0.863),
    linear-gradient(to bottom, rgba(245, 246, 252, 0.52));
  backdrop-filter: blur(2px);
  width: 100vw;
  height: 100vh;
  transition: all 1s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.content {
  transition: all 1s;
  /* padding: 10px 10px 10px 10px; */
  height: 80%;
  max-width: 80%;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  /* box-shadow: 8px 8px rgba(64, 65, 63, 0.55); */
  transition: all 0.4s;
  box-shadow: 5px 6px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
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

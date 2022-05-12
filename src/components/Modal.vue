<template>
  <transition name="bounce">
    <div class="modal" @click="cancelModal($event)" v-show="isOpen">
      <div ref="content" class="content">
        <slot name="content"> </slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  // props: { flag: Boolean },
  data() {
    return {
      isOpen: false,
    };
  },
  modalController: null,
  methods: {
    openModal() {
      let resolve;
      let reject;

      const promiseModal = new Promise((ok, cancel) => {
        resolve = ok;
        reject = cancel;
      });
      this.$options.modalController = { resolve, reject };
      this.isOpen = true;
      // console.log(this.$options.modalController)
      return promiseModal;
    },
    cancelModal(e) {
      let res=e.composedPath().filter(el=>el.classList=="content")

      // console.log(res)
      if (res.length!==0) {
        
        return
      } else {
        // console.log(e.path)
        this.$options.modalController.resolve(false);
        this.isOpen = false;
      }
    },
    /**
     * function used when hit 'esc'
     *
     * @param {any} e - 'event'
     * @returns {any} nothing,just close modal
     */
    
    cancelEsc(e) {
      if (e.key == "Escape") {
        this.$options.modalController?.resolve(false);
        this.isOpen = false;
      }
    },
    confirm() {
      // console.log('modal confirm')
      this.$options.modalController.resolve(true);
      this.isOpen = false;
    },
  },
  mounted() {
    document.addEventListener("keydown", this.cancelEsc);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.cancelEsc);
  },
};
</script>
<style lang="scss" scoped>
.modal {
  position: absolute;
  background: rgba(235, 222, 42, 0.863),
    linear-gradient(to bottom, rgba(245, 246, 252, 0.52));
  backdrop-filter: blur(2px);
  width: 100vw;
  height: 100vh;
  transition: all 1s;
  top:0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.content {
  transition: all 1s;
  padding: 10px 10px 10px 10px; 
  max-height: 100%;
  max-width: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  
  /* box-shadow: 8px 8px rgba(64, 65, 63, 0.55); */
  // transition: all 0.4s;
  // box-shadow: 5px 6px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
  //   0px 4px 4px rgba(0, 0, 0, 0.25);
    @media screen and (orientation: portrait){
      max-height:70%;
      max-width:90%;
    }
     @media screen and (max-height: 800px) and (orientation: landscape) {
       display:flex;
    max-height:90%;
  
     width:auto;
    justify-content: center;
  }
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

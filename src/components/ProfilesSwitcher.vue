<template>
  <div class="switcher">
    <div class="left" @click="getPreviousProfile">
      <img src="../assets/backsw.svg" />
      <p>Предыдущая анкета</p>
    </div>
    <kinesis-container :duration="300" :perspective="10000">
      <kinesis-element :strength="5" type="depth">
        <slot></slot>
           
        <div
          class="center"
          :class="{ dog: typeAnimal == 'dog', cat: typeAnimal == 'cat' }"
          @click="clickCenter"
        >
        <div class="switcher__help"> <slot name="helper"> </slot></div>
        </div>
      </kinesis-element>
    </kinesis-container>
    <div class="right" @click="getNextProfile">
      <p>Следующая анкета</p>
      <img src="../assets/forwardsw.svg" />
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfilesSwitcher",
  props: {
    typeAnimal: String,
    usersList: Array,
  },
  data() {
    return {};
  },
  methods: {
    getPreviousProfile() {
      this.$emit("previous", null);
    },
    getNextProfile() {
      this.$emit("next", null);
    },
    clickCenter(){
      this.$emit('clickCenter',null) 
    }
  },
  mounted() {
    // console.log("switcher:", this.typeAnimal);
  },
};
</script>
<style lang="scss" scoped>
%flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
}

.switcher {
  @extend %flex;
  max-width: 100%;
  gap:1rem;


  img {
    margin: 0.1rem 0.3rem 0 0.3rem;
  }
  .switcher__help{
  position:absolute;
  top:0;
  left:-2rem;
  display: flex;
  width:190%;  
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px 5px;
  border:  1px solid #000;
  background-color: #F6F2AC;
  font-size: max(1vw, 0.9rem);
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  opacity: 0;
  transition: 0.7s;
  @media screen and (orientation: portrait){

  }
}
  .left {
    @extend %flex;
    max-width: 45%;
    user-select: none;
    font-size: max(2.5vw, 1rem);
    img{
      width:max(1vw, 0.9rem);
      height: max(1vw, 0.9rem);
    }
    &:hover {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
        drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
    }
    &:active {
      filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
        drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
    }
  }
  .center {
     position :relative;
    width: max(8vw,4rem);
    height: max(8vw,4rem);
    border-radius: 50%;
    img{
      object-fit: cover;
    }
    
    &:hover {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
    }
     &:hover .switcher__help{
    opacity: 0.7;
     }
    &:active {
      filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
        drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
    }
  }
  .right {
    @extend %flex;
    max-width: 45%;
    font-size: max(2.5vw, 1rem);
    img{
      width:max(1vw, 0.9rem);
      height: max(1vw, 0.9rem);
    }
    &:hover {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
        drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
    }
    &:active {
      filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
        drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
    }
  }
}
.dog {
  background: url("../assets/dogSwitcher.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.cat {
  // height:15rem;
  background: url("../assets/catSwitcher.png");
  background-repeat: no-repeat;
  background-position: center;
   background-size: cover;
}
</style>

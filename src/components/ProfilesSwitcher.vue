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
        ></div>
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

  img {
    margin: 0.1rem 0.3rem 0 0.3rem;
  }

  .left {
    @extend %flex;
    max-width: 35%;
    user-select: none;
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
    width: 15rem;
    height: 8.8rem;
    &:hover {
      filter: drop-shadow(5px 5px 5px rgba(1, 32, 0, 0.75))
        drop-shadow(7px 7px 7px rgba(9, 112, 7, 0.75));
    }
    &:active {
      filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
        drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
    }
  }
  .right {
    @extend %flex;
    max-width: 35%;
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
}
.cat {
  // height:15rem;
  background: url("../assets/catSwitcher.png");
  background-repeat: no-repeat;
  background-position: center;
}
</style>

<template>
  <div class="screen">
    <div class="screen-text">
      <h4>ВЫБЕРИТЕ КАКОЕ У ВАС ЖИВОТНОЕ</h4>
    </div>
    <div class="screen-image">
      <div class="screen-image__dog" @click="chooseTypeAnimal('dog')"></div>
      <div class="screen-image__cat" @click="chooseTypeAnimal('cat')"></div>
    </div>
    <div class="screen-r"></div>
  </div>
</template>

<script>
export default {
  name: "StartScreen",
  props: {},

  data() {
    return {
      animalType: null,
    };
  },
  methods: {
    chooseTypeAnimal(value) {
      // console.log(value);
      this.$emit("animalType", { animalType: value });
    },
  },
};
</script>

<style scoped>
.screen {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100vh;
  background: center url("../assets/cover.svg");
  background-repeat: no-repeat;
  background-size: 110%;
  overflow: hidden;
}
.screen-text {
  display: flex;
  width: 100vw;
  justify-content: center;
  font-size: 2.3em;
  text-align: center;
  /* text-shadow: 5px 5px 10px rgb(219, 241, 92);  */
}
h4:hover {
  font-size: 2.01em;
  background: -webkit-linear-gradient(rgb(89, 129, 15), rgb(54, 59, 26));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
h4 {
  text-align: center;
  background: -webkit-linear-gradient(rgb(14, 160, 29), rgb(94, 102, 46));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: 0.5s;
  font: bold oblique large;
  font-size: 1.9em;
}
.screen-image {
  display: flex;
  min-height: 30%;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0;
}
.screen-image__dog {
  position: relative;
  width: 19em;
  height: 20.5em;
  background: no-repeat url("../assets/dog.svg");
  background-size: cover;
  opacity: 0.8;
  transition: 1.2s;
}
.screen-image__cat {
  position: relative;
  width: 18em;
  height: 19.5em;
  background: no-repeat url("../assets/cat.svg");
  background-size: cover;
  opacity: 0.8;
  transition: 1.2s;
}
.screen-image__cat:hover:after {
  content: "";
  border-radius: 50%;
  height: 88%;
  border: 2px solid green;
  box-shadow: 5px 5px rgb(2, 95, 2);
  position: absolute;
  top: 10.5%;
  left: 1%;
  width: 92%;
}
.screen-image__cat:active:after {
  content: "";
  border-radius: 50%;
  height: 88%;
  border: 2px solid green;
  box-shadow: 7px 7px black;
  position: absolute;
  top: 10.5%;
  left: 1%;
  width: 92%;
}

.screen-image__dog:hover:after {
  content: "";
  border-radius: 50%;
  height: 78%;
  border: 2px solid green;
  box-shadow: 5px 5px rgb(2, 95, 2);
  position: absolute;
  top: 9.5%;
  left: 7%;
  width: 84%;
}
.screen-image__dog:active:after {
  content: "";
  border-radius: 50%;
  height: 78%;
  border: 2px solid green;
  box-shadow: 7px 7px black;
  position: absolute;
  top: 9.5%;
  left: 7%;
  width: 84%;
}
.screen-image__cat:hover {
  opacity: 1.2;
  width: 22em;
  height: 23.5em;
}
.screen-image__dog:hover {
  opacity: 1.2;
  width: 22em;
  height: 23.5em;
}
</style>

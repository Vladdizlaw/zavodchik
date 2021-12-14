<template>
  <div class="screen">
    <kinesis-container :duration="300" :perspective="10000">
      <kinesis-element :strength="29" type="depth">
        <div class="screen-text">
          <p>Выбор животного</p>
        </div></kinesis-element
      >
      <div class="screen-image">
        <kinesis-element :strength="25" type="depth">
          <div class="screen-image__dog" @click="chooseTypeAnimal('dog')"></div>
        </kinesis-element>
        <kinesis-element :strength="25" type="depth">
          <div class="screen-image__cat" @click="chooseTypeAnimal('cat')"></div>
        </kinesis-element>
      </div>
      <div class="screen-r">
        <kinesis-element :strength="19" type="depth">
          <a class="reg" @click="registration">Регистрация</a>
        </kinesis-element>
        <p>|</p>
        <kinesis-element :strength="21" type="depth">
          <a class="sign" @click="sign">Вход</a>
        </kinesis-element>
      </div>
    </kinesis-container>
  </div>
</template>

<script>
// import VueKinesis from "vue-kinesis";
// import {KinesisContainer, KinesisElement} from 'vue-kinesis'
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
      this.$emit("animalType", { type: value });
    },
    registration() {
      this.$emit("registration", null);
    },
    sign() {
      this.$emit("sign", null);
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
  width: 100vw;
  height: 100vh;
  background: url("../assets/cover.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  /* background-color: rgb(102, 60, 60); */
}
.screen-text {
  position: absolute;

  top: 0;

  display: flex;
  width: 100vw;
  height: 20%;
  justify-content: center;
  align-items: start;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 363px;

  color: #000000;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
@media only screen and (max-width: 1300px){
  .screen-text {
  
   margin-top:-2em;;
  }
}
  

.screen-image {
  position: relative;
  top: 20%;
  left: 10%;
  display: flex;
  min-height: 30%;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}
.screen-image__dog {
  position: relative;
  width: 24em;
  height: 23.5em;
  background: no-repeat url("../assets/dog.svg");
  background-size: cover;
  opacity: 0.8;
  transition: 1.2s;
}
.screen-image__cat {
  position: relative;
  width: 22em;
  height: 23.5em;
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
  height: 85%;
  border: 2px solid green;
  box-shadow: 5px 5px rgb(2, 95, 2);
  position: absolute;
  top: 10.5%;
  left: 8%;
  width: 84%;
}
.screen-image__dog:active:after {
  content: "";
  border-radius: 50%;
  height: 85%;
  border: 2px solid green;
  box-shadow: 7px 7px black;
  position: absolute;
  top: 10.5%;
  left: 8%;
  width: 84%;
}
.screen-image__cat:hover {
  opacity: 1.2;
  width: 25em;
  height: 26.5em;
}
.screen-image__dog:hover {
  opacity: 1.2;
  width: 27em;
  height: 26.5em;
}
.screen-r {
  position: relative;
  margin-top: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 2em;
  line-height: 91px;

  color: #000000;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}
.hr1 {
  position: relative;
  left: 0%;
  width: 78%;
  border: 2px solid #000000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hr2 {
  position: relative;
  left: 0%;
  width: 5%;
  border: 2px solid #000000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}
.reg,
.sign {
  margin-left: 0.2em;
  margin-right: 0.2em;
  transition: all 0.5s;
}
.reg:hover {
  text-shadow: 5px 5px 4px #003902;
  margin-right: 0.3em;
  font-size: 1.3em;
}
.sign:hover {
  text-shadow: 5px 5px 4px #003902;
  margin-left: 0.3em;
  font-size: 1.3em;
}
</style>

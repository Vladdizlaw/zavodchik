<template>
  <div class="screen">
    <div class="text">
      <h4>Выберите какое у вас животное</h4>
    </div>
    <div class="forimage">
      <div class="image-dog" @click="chooseTypeAnimal('dog')"></div>
      <div class="image-cat" @click="chooseTypeAnimal('cat')"></div>
    </div>

    <div class="but">
      <!-- <button class="dog" value="dog" @click="chooseTypeAnimal('dog')">
        DOG
      </button>
      <button class="cat" value="cat" @click="chooseTypeAnimal('cat')">
        CAT
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "StartScreen",
  props: {
    msg: String,
  },

  data() {
    return {
      animalType: null,
    };
  },
  methods: {
    chooseTypeAnimal(value) {
      console.log(value);
      this.$emit("animalType", { animalType: value });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.screen {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* width: 100vw; */
  height: 100vh;
  background: center url("../assets/cover.svg");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
.text {
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
  font: bold oblique large fantasy;
  font-size: 1.9em;
}
.forimage {
  display: flex;
  min-height: 30%;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0;
}
.image-dog {
  position: relative;
  width: 19em;
  height: 20.5em;
  background: no-repeat url("../assets/dog.svg");
  background-size: cover;
  opacity: 0.7;
  transition: 1.2s;
}
.image-cat {
  position: relative;
  width: 20em;
  height: 21.5em;
  background: no-repeat url("../assets/cat.svg");
  background-size: cover;
  opacity: 0.7;
  transition: 1.2s;
}
.image-cat:hover:after {
  content: "";
  border-radius: 50%;
  height: 76%;
  border: 2px solid yellow;
  box-shadow: 5px 5px gold;
  position: absolute;
  margin-top: 20.5%;
  margin-left: 12.5%;
  width: 81%;
}
.image-cat:active:after {
  content: "";
  border-radius: 50%;
  height: 76%;
  border: 2px solid yellow;
  box-shadow: 7px 7px black;
  position: absolute;
  margin-top: 20.5%;
  margin-left: 12.5%;
  width: 81%;
}

.image-dog:hover:after {
  content: "";
  border-radius: 100%;
  height: 84.5%;
  border: 2px solid green;
  box-shadow: 5px 5px rgb(2, 95, 2);
  position: absolute;
  margin-top: 17%;
  margin-left: 5%;
  width: 89%;
}
.image-dog:active:after {
  content: "";
  border-radius: 100%;
  height: 84.5%;
  border: 2px solid green;
  box-shadow: 7px 7px black;
  position: absolute;
  margin-top: 17%;
  margin-left: 5%;
  width: 89%;
}
.image-cat:hover {
  opacity: 1.2;
  width: 22em;
  height: 23.5em;
}
.image-dog:hover {
  opacity: 1.2;
  width: 21em;
  height: 22.5em;
}
.but {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: space-around;
}
button {
  border: 2px solid;
  border-radius: 5px;
  width: 10em;
  height: 3em;
  box-shadow: 5px 10px;
  position: relative;
  /* background: url('../assets/dog.svg') ;
  background-size: cover; */
}
button:active {
  box-shadow: 3px 6px;
  transition: all 0.3s;
}
</style>

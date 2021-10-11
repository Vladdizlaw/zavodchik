<template>
  <div
    class="animal-property"
    ref="masterdiv"
    :class="{ dog: animalType == 'dog', cat: animalType == 'cat' }"
  >
    <div class="fortext">
      <h4>Выберите свойства животного</h4>
    </div>
    <div class="forinput">
      <div class="formale">
        <p>Выберите пол животного</p>
        <select name="male" v-model="animalProperty.male">
          <option value="man"
            >мужской
            <div class="image-dog-man"></div
          ></option>
          <option value="women">женский</option>
        </select>
      </div>
      <div class="formale">
        <p>Выберите породу животного</p>
        <select v-model="animalProperty.breed" placeholder="порода">
          <option :value="bred" v-for="(bred, ind) in breedList" :key="ind">{{
            bred
          }}</option>
        </select>
      </div>
      <div class="formale">
        <p>Выберите возраст животного</p>
        <input
          type="range"
          v-model="animalProperty.age"
          placeholder="в годах"
          name="n"
          min="0.5"
          max="35"
          step="0.5"
        />{{ animalProperty.age }} лет
      </div>
      <div class="formale">
        <p>Введите награды животного</p>
        <input
          type="text"
          v-model="animalProperty.awards"
          placeholder="награды"
        />
      </div>
      <div class="formale" v-show="!geoAviable">
        <select v-model="animalProperty.place" placeholder="район">
          <p>Введите город</p>
          <option
            :value="city"
            v-for="(city, ind) in selectedCity"
            :key="ind"
            >{{ city }}</option
          >
        </select>
      </div>
      <div class="formale">
        <p>Выберите примерную дату вязки</p>
        <input type="date" v-model="animalProperty.dateMating" />
      </div>
      <button class="btn" @click="submit">Искать пару</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AnimalProperty",
  //Компонент выбора свойств животного, принимает тип животного (cat,dog),
  //отдает событие "animalProperty" с обектом собранных данных animalProperty
  props: {
    animalType: String,
    geoAviable: Boolean,
  },
  data() {
    return {
      animalProperty: {
        male: "",
        breed: "",
        age: "1",
        awards: "",
        place: "",
        dateMating: null,
      },
      breedList: [],
      cityList: [],
    };
  },
  mounted() {
    const cities = require("../cities.json");

    this.cityList = cities;

    if (this.animalType == "dog") {
      const breed_string = require("!raw-loader!../dog_breed.txt");

      this.breedList = breed_string.default
        .split("\r\n")
        .filter((el) => el != "");
    }
    if (this.animalType == "cat") {
      const breed_string = require("!raw-loader!../cat_breed.txt");

      this.breedList = breed_string.default.split("\r\n");
    }
  },
  computed: {
    selectedCity() {
      let citySelected = [];
      this.cityList.forEach((city) => {
        citySelected.push(city["Город"]);
      });

      return citySelected.sort().filter((el) => el != "");
    },
  },

  methods: {
    submit() {
      if (
        !this.animalProperty.breed ||
        !this.animalProperty.male ||
        !this.animalProperty.dateMating
      ) {
        return;
      } else {
        this.$emit("animalProperty", { animalProperty: this.animalProperty });
      }
    },
  },
};
</script>
<style scoped>
.dog {
  background-image: url("../assets/dog1w.svg") , url("../assets/dog1w.svg"),
    -webkit-linear-gradient(rgba(86, 194, 14, 0.5), rgba(238, 241, 15, 0.904));
    background-position:-65% 45%, 160% 45%;
 
  opacity: 0.9;
  background-size: 75% ,75% ,cover ;
  background-repeat: no-repeat, no-repeat;
  overflow: hidden;
  text-shadow: 1px 1px 10px rgb(209, 247, 192);
}
.cat {
  background:  url("../assets/cat1w.svg"),url("../assets/cat1w.svg"),
    -webkit-linear-gradient(rgba(86, 194, 14, 0.5), rgba(238, 241, 15, 0.904));
  background-position:-23% 5%, 140% 10%;
  background-size: 65% ,65% ,cover ;
  background-repeat: no-repeat,no-repeat;
  overflow: hidden;
  opacity: 0.9;
  text-shadow: 1px 1px 10px rgb(236, 218, 218);
}
.animal-property {
  /* background:  transparent linear-gradient(yellow,green); */
  /* opacity: 0.7; */
  width: 100vw;
  height: 100vh;
  /* background: no-repeat url("../assets/cover.svg");
  background-size: cover;
  overflow: hidden; */
}
.image-dog-man {
  width: 1em;
  height: 1em;
}
.fortext {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-overflow: clip;
  font-size: 2em;
  font: bold oblique large fantasy;
  text-shadow: 5px 5px 10px rgb(49, 42, 42);
  opacity: 1;
}
.forinput {
  display: flex;
  flex-direction: column;
  height: 85vh;
  justify-content: space-around;
  align-items: center;
  font: bold italic large sans-serif;
  opacity: 1;
  
  /* text-shadow: 5px 5px 10px rgb(241, 227, 227); */
}
.formale {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
}
input,
select {
  width: 20vw;
  height: 2em;
  border: 2px solid;
  border-radius: 8px;
  text-align: center;
  text-shadow: 1px 1px 15px rgb(236, 218, 218);
  color: rgb(2, 19, 4);
}
option {
  text-align: center;
  /* text-shadow: 5px 5px 10px rgb(49, 42, 42); */
  border: 1px solid blue;
}
button {
  border: 2px solid;
  border-radius: 5px;
  width: 10em;
  height: 3em;
  box-shadow: 5px 10px;
  position: relative;
}
button:active {
  box-shadow: 3px 6px;

  animation: 0.3s infinite rot_name;
}
@keyframes rot_name {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(10deg);
  }
}
</style>

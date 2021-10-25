<template>
  <div
    class="animalproperty"
    ref="masterdiv"
    :class="{ dog: animalType == 'dog', cat: animalType == 'cat' }"
  > 
    <div class="animalproperty-fortext">
      <h4>Выберите свойства животного</h4>
    </div>
    <div class="animalproperty-forinput">
      <div class="formale">
        <p>Выберите пол животного</p>
        <select name="male" v-model="animalProperty.male">
          <option value="man">мужской </option>
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
      <div class="formale">
        <p>Введите город</p>
        <select v-model="animalProperty.place" placeholder="город">
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
import axios from "axios";
import translate from "translate";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "AnimalProperty",
  //Компонент выбора свойств животного, принимает тип животного (cat,dog) и геопозицию,
  //отдает событие "animalProperty" с обектом собранных данных animalProperty
  props: {
    animalType: String,

    location: Object,
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
        id: null,
      },
      breedList: [],
      cityList: [],
    };
  },
  async mounted() {
    const cities = require("../cities.json");

    this.cityList = cities;
    const city = await this.getAdress(
      this.location.coords.longitude,
      this.location.coords.latitude
    );
    translate.engine = "google"; //переводим город  с латиницы на русский

    translate.key = process.env.GOOGLE_KEY;
    const city_translated = await translate(city, "ru");
    console.log(city_translated)
    this.animalProperty.place = city_translated;

    if (this.animalType == "dog") {
      //В зависимости от типа животного подгружаем список пород
      const breed_string = require("!raw-loader!../dog_breed.txt");

      this.breedList = breed_string.default
        .split("\r\n")
        .filter((el) => el != "");
    }
    if (this.animalType == "cat") {
      const breed_string = require("!raw-loader!../cat_breed.txt");

      this.breedList = breed_string.default.split("\r\n");
    }
    // console.log(this.breedList)
  },
  computed: {
    selectedCity() {
      //Сортируем города по алфавиту
      let citySelected = [];
      this.cityList.forEach((city) => {
        citySelected.push(city["Город"]);
      });

      return citySelected.sort().filter((el) => el != "");
    },
  },

  methods: {
    submit() {
      //Отправляем в App
      if (
        !this.animalProperty.breed ||
        !this.animalProperty.male ||
        !this.animalProperty.dateMating ||
        !this.animalProperty.place ||
        new Date(this.animalProperty.dateMating) < new Date()
      ) {
        return;
      } else {
        // console.log(new Date(this.animalProperty.dateMating),new Date())
        this.animalProperty.id = uuidv4();
        this.$emit("animalProperty", { animalProperty: this.animalProperty });
      }
    },
    async getAdress(long, lat) {
      //Получаем город из геопозиции
      const data = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          long +
          "&key=AIzaSyBR_KhfKe3u_31BhVXgGPApthBjcg2Va90"
      );
      // console.log(data);
      let result = data.data['plus_code']['compound_code'].split(",")[0].split(' ');
      // console.log(data.data['plus_code']['compound_code'])
      return result[1];
    },
  },
};
</script>
<style scoped>
.dog {
  background-image: url("../assets/dog1w.svg"), url("../assets/dog1w.svg"),
    url("../assets/cover_dog.svg");
  background-position: -10% 0%, 115% 0%, center;

  opacity: 0.9;
  background-size: 45%, 45%, 110%;
  background-repeat: no-repeat, no-repeat, repeat;
  overflow: hidden;
  opacity: 0.9;
  text-shadow: 1px 1px 10px rgb(209, 247, 192);
}
.cat {
  background-image: url("../assets/cat1w.svg"), url("../assets/cat1w.svg"),
    url("../assets/cover_cat.svg");
  background-position: -10% 5%, 105% 5%, center;
  background-size: 45%, 45%, 110%;
  background-repeat: no-repeat, no-repeat, repeat;
  overflow: hidden;
  opacity: 0.9;
  text-shadow: 1px 1px 10px rgb(236, 218, 218);
}
.animalproperty {
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
.animalproperty-fortext {
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
.animalproperty-forinput {
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
button:hover {
  box-shadow: 7px 12px;
}
button:active {
  box-shadow: 3px 6px;

  animation: 0.3s infinite rot_name;
}
.male {
  width: 5em;
  height: 5em;
  background: url("../assets/male.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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

<template>
  <div
    class="animalproperty"
    :class="{ dog: animalType == 'dog', cat: animalType == 'cat' }"
  >
    <div class="animalproperty-fortext">
      <Header>
        <template #left>
          <back-button :func="back" />
        </template>
        <template #center>
          <p>Поиск пары</p>
        </template>
      </Header>
    </div>

    <div class="animalproperty-forinput">
      <div class="input male">
        <p>Пол искомого животного</p>
        <select v-model="animalProperty.male">
          <option value="мужской">мужской </option>
          <option value="Женский">женский</option>
        </select>
      </div>

      <div class="input breed">
        <p>Порода</p>

        <select v-model="animalProperty.breed" placeholder="порода">
          <option :value="bred" v-for="(bred, ind) in breedList" :key="ind">{{
            bred
          }}</option>
        </select>
      </div>

      <div class="input age">
        <p>Возраст</p>

        <div class="ageinput">
          <div class="range">
            <p>OT</p>
            <input type="number" v-model="animalProperty.startAge" />
          </div>
          <div class="range">
            <p>ДО</p>
            <input type="number" v-model="animalProperty.stopAge" />
          </div>
        </div>
      </div>

      <div class="input awards">
        <p>Награды</p>
        <input type="text" v-model="animalProperty.awards" />
      </div>

      <div class="input city">
        <p>Город</p>
        <select v-model="animalProperty.place" placeholder="город">
          <option
            :value="city"
            v-for="(city, ind) in selectedCity"
            :key="ind"
            >{{ city }}</option
          >
        </select>
      </div>

      <div class="input mating">
        <p>Предположительная дата вязки</p>
        <input type="date" v-model="animalProperty.dateMating" />
      </div>

      <button class="btn" @click="submit">Поиск</button>
    </div>
  </div>
</template>
<script>
import BackButton from "./BackButton.vue";
import Header from "./Header.vue";
export default {
  name: "AnimalProperty",
  components: { Header, BackButton },
  //Компонент выбора свойств животного, принимает тип животного (cat,dog) и геопозицию,
  //отдает событие "animalProperty" с обектом собранных данных animalProperty
  props: {
    isAutentificate: Boolean,
    animalType: String,
    selectedCity: Array,
    city: String,
  },
  data() {
    return {
      animalProperty: {
        male: null,
        breed: null,
        startAge: null,
        stopAge: null,
        awards: null,
        place: null,
        dateMating: null,
      },
      breedList: [],
      cityList: [],
    };
  },
  async mounted() {
    this.cityList = require("../cities.json");

    this.animalProperty.place = this.city;

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
  computed: {},

  methods: {
    submit() {
      //Отправляем в App
      if (
        Number(this.animalProperty.startAge) >
        Number(this.animalProperty.stopAge)&& Number(this.animalProperty.stopAge)!==0
      ) {
        console.log( Number(this.animalProperty.startAge)>Number(this.animalProperty.stopAge));
        return;
      } else {
        // console.log(new Date(this.animalProperty.dateMating),new Date())

        this.$emit("animalProperty", { animalProperty: this.animalProperty });
      }
    },
    back() {
      if (this.isAutentificate) {
        this.$emit("back", { state: "profile" });
      } else {
        this.$emit("back", { state: "start" });
      }
    },
  },
};
</script>
<style scoped>
.dog {
  background-image: url("../assets/dog1w.svg"), url("../assets/dog1w.svg"),
    url("../assets/cover_dog.png");
  background-position: -10% 0%, 115% 0%, center;

  opacity: 0.9;
  background-size: 45%, 45%, cover;
  background-repeat: no-repeat, no-repeat, no-repeat;
  overflow: hidden;
}
.cat {
  background-image: url("../assets/cat1w.svg"), url("../assets/cat1w.svg"),
    url("../assets/cover_cat.png");
  background-position: -85px -15px, 105% -15px, center;
  background-size: 40%, 40%, cover;
  background-repeat: no-repeat, no-repeat, no-repeat;
  overflow: hidden;
}
.animalproperty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.animalproperty-fortext {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 3.2rem;
  line-height: 182px;
  top: 1rem;
  width: 100%;
  /* left: 50vh; */
  /* bottom: 1em; */
  /* padding-bottom: 1.5em; */
  margin-bottom: -0.5em;
  color: #000000;
  max-height: 3rem;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}

.animalproperty-forinput {
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  width: auto;
  justify-content: center;
  align-items: center;
  /* margin-top: -3rem; */
}
.input {
  /* flex:1 1 6rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 2em;
  line-height: 100px;
  color: #000000;
  margin-top: 5px;
  height: 6rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  /* margin-bottom:0.5rem; */
}
.input > p {
  margin-top: -1.4rem;
  margin-bottom: 1.4rem;
}
.age {
  /* margin-top: 1rem; */
  /* margin-bottom: 0.5rem; */
  /* padding-top: 1rem; */
  max-height: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.age > p {
  margin-top: 1rem;
  /* padding-bottom: 10px; */
  height: 3rem;
}
.ageinput {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 100%;
}
select,
input {
  margin-top: -3rem;
  appearance: auto;
  background: #ffffff;
  opacity: 0.5;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 17em;
  height: 1.3em;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 91px;
  color: #000000;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.4s;
  z-index: 100;
}
select:hover,
input:hover {
  /* transform: rotate3d(20); */
  width: 17.1em;
  height: 1.4em;
  font-size: 1.7rem;
}
.range {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -70px;
  margin-bottom: -40px;
  text-align: center;
}
.range > input {
  margin-top: 0;
  margin-left: 10px;
  background: #ffffff;
  opacity: 0.5;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 6rem;
  height: 1.8rem;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 91px;
  color: #000000;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}
.range > input:hover {
  width: 6.5rem;
  height: 1.85rem;
  font-size: 1.7rem;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
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
option {
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 91px;

  color: #000000;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}

button {
  position: relative;
  /* bottom: 2rem; */
  margin-top: 1rem;
  width: 8rem;
  height: 4rem;
  border: 1px solid #000000;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 25px 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  line-height: 61px;
  background: transparent;
  color: #000000;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
button:hover {
  box-shadow: 7px 12px;
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}
</style>

<template>
  <div
    class="animalproperty"
    
    :class="{ dog: animalType == 'dog', cat: animalType == 'cat' }"
  ><kinesis-container :duration="300" perspective="10000"><kinesis-element :strength="19" type="depth"> 
    <div class="animalproperty-fortext">
      <p>Поиск</p>
    </div>
    </kinesis-element>
    <div class="animalproperty-forinput">
      <kinesis-element :strength="9" type="depth"> 
      <div class="input male">
        <p>Пол искомого животного</p>
        <select v-model="animalProperty.male">
          <option value="man">мужской </option>
          <option value="women">женский</option>
        </select>
      </div>
      </kinesis-element>
       <kinesis-element :strength="9" type="depth">
      <div class="input breed"> 
        <p>Порода</p>
       
        <select v-model="animalProperty.breed" placeholder="порода">
          <option :value="bred" v-for="(bred, ind) in breedList" :key="ind">{{
            bred
          }}</option>
        </select>
         
      </div></kinesis-element>
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
      <kinesis-element :strength="8" type="depth">
      <div class="input awards">
        <p>Награды</p>
        <input type="text" v-model="animalProperty.awards" />
      </div>
      </kinesis-element>
      <kinesis-element :strength="7" type="depth">
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
      </kinesis-element>
      <kinesis-element :strength="6" type="depth">
      <div class="input mating">
        <p>Предположительная дата вязки</p>
        <input type="date" v-model="animalProperty.dateMating" />
      </div>
      </kinesis-element>
      <kinesis-element :strength="10" type="depth">
       
      <button class="btn" @click="submit">Поиск</button>
        
      </kinesis-element>
    </div></kinesis-container>
  </div>
</template>
<script>
export default {
  name: "AnimalProperty",
  //Компонент выбора свойств животного, принимает тип животного (cat,dog) и геопозицию,
  //отдает событие "animalProperty" с обектом собранных данных animalProperty
  props: {
    animalType: String,
    selectedCity: Array,
    city: String,
  },
  data() {
    return {
      animalProperty: {
        male: "",
        breed: "",
        startAge: null,
        stopAge: null,
        awards: "",
        place: "",
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
        !this.animalProperty.breed ||
        !this.animalProperty.male ||
        !this.animalProperty.dateMating ||
        !this.animalProperty.place ||
        new Date(this.animalProperty.dateMating) < new Date() ||
        Number(this.animalProperty.startAge) >
          Number(this.animalProperty.stopAge)
      ) {
        console.log(this.animalProperty);
        return;
      } else {
        // console.log(new Date(this.animalProperty.dateMating),new Date())

        this.$emit("animalProperty", { animalProperty: this.animalProperty });
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
  justify-content: space-around;
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
  font-size: 57px;
  line-height: 182px;
   top: 0.4em; 
  /* padding-bottom: 1.5em; */
  /* margin-bottom: 0.9em; */
  color: #000000;
  height:10%;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}

.animalproperty-forinput {
  display: flex;
  flex-direction: column;
  width: auto;
  justify-content: space-around;
  align-items: center;
  margin-top: -55px;
}
.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 2em;
  line-height: 121px;
  color: #000000;
  margin-top: -10px;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}

.age {
  margin-top: 0px;
  margin-bottom: 10px;
  padding-top: 0px;
  height: 82px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.age > p {
  padding-bottom: 10px;
  height: 97px;
}
.ageinput {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
select,
input {
  margin-top: -25px;
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
  font-size: 24px;
  line-height: 91px;
  color: #000000;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: all 0.4s;
    z-index: 100;
}
select:hover, input:hover{
  /* transform: rotate3d(20); */
  width: 17.1em;
  height:1.4em;
    font-size: 26px;
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
  width: 96px;
  height: 28px;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 91px;
  color: #000000;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
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
  margin-top: 30px;
  margin-bottom: 2em;
  width: 131px;
  height: 68px;
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
  font-size: 48px;
  line-height: 61px;

  color: #000000;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
button:hover {
  box-shadow: 7px 12px;
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

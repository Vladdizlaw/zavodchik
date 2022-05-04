<template>
  <div
    class="animalproperty "
    :class="{ dog: animalProperty.typeAnimal == 'dog', cat: animalProperty.typeAnimal == 'cat'}"
  >
    <div class="animalproperty-fortext">
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>
        <template #center>
          <p>Поиск пары</p>
        </template>
      </Header>
    </div>
    
       

    <div class="animalproperty-forinput">
      <div class="input male" v-if="authentification && animals[0]">
        <p>Подобрать автоматически для животного</p>
        <select v-model="chosenAnimal" >
          <option v-for="animal,ind in animals" :key="ind" :value="animal.ind">{{animal.name}}</option>
         </select>
      </div>
       <div class="input male">
        <p>Тип искомого животного</p>
        <select v-model="animalProperty.typeAnimal">
          <option value="cat">кошка</option>
          <option value="dog">собака</option>
        </select>
      </div>
      <div class="input male">
        <p>Пол искомого животного</p>
        <select v-model="animalProperty.male">
          <option value="male">мужской </option>
          <option value="female">женский</option>
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
  //Компонент выбора свойств животного для поиска пары, принимает тип животного (cat,dog) и геопозицию,
  //отдает событие "animalProperty" с обектом собранных данных animalProperty
  props: {
    authentification: Boolean,
    animalType: String,
    selectedCity: Array,
    city: String,
    animals: Object,
  },
  data() {
    return {
      chosenAnimal:null,
      animalProperty: {
        typeAnimal:null,
        male: null,
        breed: null,
        startAge: null,
        stopAge: null,
        awards: null,
        place: null,
        dateMating: null,
      },
      // breedList: [],
      cityList: [],
    };
  },
  async mounted() {
    console.log("auth", this.authentification, this.animals);
    this.cityList = require("../cities.json");

    // this.animalProperty.place = this.city;
    this.animalProperty.typeAnimal=this.animalType


    
  },
  computed: {
    breedList() {
        if (this.animalProperty.typeAnimal == "dog") {
      //В зависимости от типа животного подгружаем список пород
      const breed_string = require("!raw-loader!../dog_breed.txt");

     return breed_string.default
        .split("\r\n")
        .filter((el) => el != "");
    }
    if (this.animalProperty.typeAnimal == "cat") {
      const breed_string = require("!raw-loader!../cat_breed.txt");

      return  breed_string.default.split("\r\n");
    } else{
      return null
    }
    }
  },
  watch: {
    chosenAnimal: function(ind){
      console.log(ind)
     this.animalProperty.breed=this.animals[ind].breed
     this.animalProperty.typeAnimal=this.animals[ind].typeAnimal
     this.animalProperty.male=this.animals[ind].male=='male'?'female':this.animals[ind].male
    //  this.animalProperty.breed=this.animals[ind].breed

    }
  },
  methods: {
    submit() {
      //Отправляем в App
      if (
        Number(this.animalProperty.startAge) >
          Number(this.animalProperty.stopAge) &&
        Number(this.animalProperty.stopAge) !== 0
      ) {
        console.log(
          Number(this.animalProperty.startAge) >
            Number(this.animalProperty.stopAge)
        );
        return;
      } else {
        // console.log(new Date(this.animalProperty.dateMating),new Date())
        this.$emit("animalProperty", { animalProperty: this.animalProperty });
      }
    },
    back() {
      this.$emit("back", null);
    },
  },
};
</script>
<style lang="scss" scoped>
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
  line-height: 100px;
  color: #000000;
  margin-top: 5px;
  height: 6rem;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}
.input > p {
  margin-top: -1.4rem;
  margin-bottom: 1.4rem;
}
.age {
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

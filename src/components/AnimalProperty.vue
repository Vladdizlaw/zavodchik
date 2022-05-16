<template>
  <div
    class="animalproperty "
    :class="{
      dog: animalProperty.typeAnimal == 'dog',
      cat: animalProperty.typeAnimal == 'cat',
    }"
  >
    <div class="animalproperty-fortext">
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>
        <template #center>
          <p>Поиск пары</p>
        </template>
        <template #right>
          <profile-button @myProfile="getMyProfile"/>
        </template>
      </Header>
    </div>

    <div class="animalproperty-forinput">
      <div class="input male" v-if="authentification && Object.keys(animals).length>0">
        <p>Подобрать автоматически пару для животного</p>
        <select v-model="chosenAnimal">
          <option
            v-for="(animal, ind) in animals"
            :key="ind"
            :value="animal.ind"
            >{{ animal.name }}</option
          >
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
    </div >
    <div class="animalproperty-fortext">
       <Header>
        <template #left>
          <support-button class="support" @back="getSupportWindow" />
        </template>
       
      </Header>
    </div>
   
  </div>
</template>
<script>
import BackButton from "./BackButton.vue";
import Header from "./Header.vue";
import ProfileButton from "./ProfileButton.vue";
import SupportButton from "./SupportButton.vue";
export default {
  name: "AnimalProperty",
  components: { Header, BackButton ,ProfileButton,SupportButton},
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
      chosenAnimal: null,
      animalProperty: {
        typeAnimal: null,
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
    this.animalProperty.typeAnimal = this.animalType;
  },
  computed: {
    breedList() {
      if (this.animalProperty.typeAnimal == "dog") {
        //В зависимости от типа животного подгружаем список пород
        const breed_string = require("!raw-loader!../dog_breed.txt");

        return breed_string.default.split("\n").filter((el) => el != "");
      }
      if (this.animalProperty.typeAnimal == "cat") {
        const breed_string = require("!raw-loader!../cat_breed.txt");

        return breed_string.default.split("\n").filter((el) => el != "");
      } else {
        return null;
      }
    },
  },
  watch: {
    chosenAnimal: function(ind) {
      console.log(this.breedList);
      this.animalProperty.breed = this.animals[ind].breed;
      this.animalProperty.typeAnimal = this.animals[ind].typeAnimal;
      this.animalProperty.place = this.city;
      this.animalProperty.male =
        this.animals[ind].male == "male" ? "female" : this.animals[ind].male;
      //  this.animalProperty.breed=this.animals[ind].breed
    },
  },
  methods: {
    getSupportWindow(){

    },
    getMyProfile(){
      this.$emit('myProfile','SearchScreen')
    },

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
@import "../assets/main.scss";
.dog {
  background-image: url("../assets/dog1w.svg"), url("../assets/dog1w.svg"),
    url("../assets/cover_dog.png");
  background-position: -15% 0rem, 120% 0%, center;
  opacity: 0.9;
  background-size: 90vh, 90vh, cover;
  background-repeat: no-repeat, no-repeat, no-repeat;
  overflow: hidden;
  user-select: none;      
  @media screen and (orientation: portrait) {
    background-image: url("../assets/dog1w_transp.png"),
      url("../assets/dog1w.svg"), url("../assets/cover_dog.png");
    background-position: center bottom, 110% 110%, center;
    background-size: 95%, 20vh, cover;
  }
  
}
.cat {
  background-image: url("../assets/cat1w.svg"), url("../assets/cat1w.svg"),
    url("../assets/cover_cat.png");
  background-position: -9% 20%, 102% 20%, center;
  background-size: 80vh, 80vh, cover;
  background-repeat: no-repeat, no-repeat, no-repeat;
  opacity: 0.9;
  overflow: hidden;
   user-select: none;      
  .support{
    text-shadow:2px 2px #F5F0A2 ;
  }
  @media screen and (orientation: portrait) {
    background-image: url("../assets/cat1w_transp.png"),
      url("../assets/cat1w.svg"), url("../assets/cover_cat.png");
    background-position: center bottom, 100% 102%, center;
    background-size: 100%, 20vh, cover;
  }
  
}
.animalproperty {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  position: relative;
  font-family: "Amatic SC";
  // font-size: max(2rem, 3vw);
  font-style: normal;
  font-weight: 900;
  letter-spacing: 0rem;
  text-align: left;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
  .animalproperty-fortext {
    display: flex;
    position: relative;
    justify-content: start;
    align-items: center;
    font-family: Amatic SC;
    font-style: normal;
    font-weight: bold;
    font-size: max(2rem, 3vw);
    top: 1rem;
    width: 100%;
    margin-bottom: 2rem;
    // margin-bottom: -0.5em;
    color: #000000;
    height: 5%;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
      0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
    @media screen and (orientation: portrait) {
      margin-bottom: 1rem;
      // height: 3%;
    }
    p {
      display: inline;
      box-sizing: border-box;
      padding: 0 0 0 0;
      margin: 0 0 0 0;
    }
  }
  .animalproperty-forinput {
    height: 95%;
    justify-self: end;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    gap: min(0.8rem, 1vh);
    @media screen and (max-height: 610px) {
      // position:absolute;
      padding-bottom: 3rem;
      justify-content: start;
      overflow: auto;
      height: 90%;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar {
        background: transparent;
      }
    }
    @media screen and (orientation: portrait) {
      height: 93vh;
      gap: 0;
      display: flex;
      align-items: space-between;
      justify-content: space-between;
      padding-bottom: 1rem;
    }
    .input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: Amatic SC;
      font-style: normal;
      font-weight: bold;
      font-size: max(1rem, 1.5vw);
      // line-height: 6rem;
      color: #000000;
      // margin-top: 5px;
      height: min(6rem, 10vh);

      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
        0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
      @media screen and (max-height: 610px) {
        height: auto;
      }
      @media screen and (orientation: portrait) {
        max-height: 10%;
      }
      p {
        // margin-top: -1.4rem;
        // margin-bottom: 1.4rem;
        display: inline;
        box-sizing: border-box;
        padding: 0rem 0rem 1rem 0rem;
        margin: 0 0 0 0;
      }
      select {
        // margin-top: -3rem;
        display: flex;
        text-align: center;
        text-justify: center;
        justify-content: center;
        align-items: center;
        width: max(12rem, 25vw);
        height: max(1.4rem, 3.4vh);
        background: rgba(255, 255, 255, 0.3);
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        transform: matrix(1, 0, 0, 1, 0, 0);

        text-align: center;
        text-justify: center;
        font-family: $font-family;
        text-shadow: $textshadow;
        font-size: max(1rem, 1.4vw);
        transition: 0.3s;
        opacity: 0.8;
        @media screen and (max-height: 610px) {
          margin-top: -1rem;
        }
        &:hover {
          transform: scale(1.2);
        }
      }
      input {
        // margin-top: -3rem;
        appearance: auto;
        width: max(12rem, 25vw);
        height: max(1.4rem, 3vh);
        background: rgba(255, 255, 255, 0.3);
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        padding: 0.1rem;
        text-align: center;
        text-justify: center;
        font-family: $font-family;
        text-shadow: $textshadow;
        font-size: max(1rem, 1.4vw);
        // font-size: max(1.8vw, 1.2rem);
        transition: 0.3s;
        opacity: 0.8;

        z-index: 100;
        @media screen and (max-height: 610px) {
          margin-top: -1rem;
        }
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    
  }
  .footer{
    width:100%;
  }
}

.age {
  max-height: 3rem;
  width: 39%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (orientation: portrait) {
    width: 65%;
  }
  @media screen and (max-height: 610px) {
    width: 32%;
  }
  p {
    margin-top: 1rem;
    height: 3rem;
  }
  .ageinput {
    display: flex;
    flex-direction: row;
      width: 100%;
    .range {
      text-align: center;
      width: 100%;
       @media screen and (max-height: 610px) {
        margin-top: -1rem;
      }
      input {
        @media screen and (max-height: 610px) {
          margin-top: -1rem;
        }
        margin-top: 0;
        margin-left: 10px;
        width: max(3rem, 4vw);
        height: max(1.4rem, 3.5vh);
        background: rgba(255, 255, 255, 0.3);
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        padding: 0.1rem;
        text-align: center;
        text-justify: center;
        font-family: $font-family;
        text-shadow: $textshadow;
        font-size: max(1rem, 1.4vw);
        // font-size: max(1.8vw, 1.2rem);
        transition: 0.3s;
        opacity: 0.8;

        z-index: 100;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
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



@keyframes rotname {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0deg);
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

.btn {
  height: max(2rem, 6vh);
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(108.6deg, #95c671 13.72%, #698852 89.83%);
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 30px 0px;
  padding: 0 1rem 0 1rem;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: max(1.9vw, 1.4rem);
  cursor: pointer;
  color: #000000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  transition: 0.3s;
  &:active {
  box-shadow: 3px 6px;

  animation: rotname 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97)  infinite ;
}
@media screen and (max-height: 610px){
  margin-top: 1rem;
}
  @media screen and (orientation: portrait) {
    border-radius: 20px 0px;
  }
  &:hover {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  }
 
}
</style>

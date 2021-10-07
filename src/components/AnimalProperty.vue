<template>
  <div class="animal-property">
    <div class="fortext">
      <h4>Выберите свойства животного</h4>
    </div>
    <div class="forinput">
      <div class="formale">
        <p>Выберите пол животного</p>
        <select name="male" v-model="animalProperty.male">
          <option value="man">мужской</option>
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
        
        <select v-model="animalProperty.place" placeholder="район" >
          <option :value="city" v-for="(city, ind) in selected" :key="ind" >{{
            city
          }}</option>
        </select>
      </div>
      <div class="formale">
        <p>Выберите примерную дату вязки</p>
        <input type="date" v-model="animalProperty.dateMating"/>
      </div>
      <button class="btn" @click="submit">Искать пару</button>
    </div>
  </div>
</template>
<script>
//import {cities} from './cities.json'
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
        dateMating:null,
      },
      breedList: [],
      cityList: [],
      citySelected:null
    };
  },
  mounted() {
   
    const cities = require("../cities.json");
    //console.log(citiess,typeof(citiess))
    this.cityList = cities;
    

    if (this.animalType == "dog") {
      //console.log(this.animalType);
      const breed_string = require("!raw-loader!../dog_breed.txt");

      this.breedList = breed_string.default.split("\r\n").filter(el=>el!='');
    }
    if (this.animalType == "cat") {
      const breed_string = require("!raw-loader!../cat_breed.txt");

      this.breedList = breed_string.default.split("\r\n");
    }
    console.log(this.breedList)
  },
  computed:{
     selected(){
      let citySelected=[]
      this.cityList.forEach(city => {
         
        citySelected.push(city['Город'])
      })
      console.log([...this.cityList].sort())
      return citySelected.sort().filter(el=>el!='')

  },
  },

  methods: {
   
     // console.log(Number(city['Широта']).toFixed(1),Number(this.location.coords.latitude).toFixed(1))
      
     
    
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
.fortext {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-overflow: clip;
  font-size: 2em;
  text-shadow: 5px 5px 10px rgb(49, 42, 42);
}
.forinput {
  display: flex;
  flex-direction: column;
  height: 85vh;
  justify-content: space-around;
  align-items: center;
}
.formale {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  text-shadow: 5px 5px 10px rgb(49, 42, 42);
}
input,
select {
  width: 30vw;
  height: 2em;
  border: 2px solid;
  border-radius: 8px;
  text-align: center;
}
option {
  text-align: center;
  text-shadow: 5px 5px 10px rgb(49, 42, 42);
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
  /* transition: all 1.9s cubic-bezier(0.075, 0.82, 0.165, 1) ;  */
  animation: 0.3s alternate rot_name;
}
@keyframes rot_name {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(3deg);
  }
}
</style>

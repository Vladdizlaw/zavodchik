<template>
  <div class="wrapper">
    <section class="animal-form1" v-if="currentPartForm == 1">
      <div class="animal-form1_block__noanimal" v-show="newRegistration">
        <div
          class="personal_data_checkbox"
          @click="notHaveAnimal = !notHaveAnimal"
          :class="{ checked: notHaveAnimal }"
        ></div>
        <p>У меня нет животного</p>
      </div>
      <div class="animal-form1_block" v-show="!notHaveAnimal">
        <p>Вид животного</p>
        <select v-model="animalForm.typeAnimal">
          <option value="cat">Кошка </option>
          <option value="dog">Собака</option>
        </select>
        <div class="errmsg" :v-show="errs.type">{{ errs.type }}</div>
      </div>
      <div class="animal-form1_block" v-show="!notHaveAnimal">
        <p>Пол</p>
        <select v-model="animalForm.male">
          <option value="male">мужской </option>
          <option value="female">Женский</option>
        </select>
        <div class="errmsg" :v-show="errs.male">{{ errs.male }}</div>
      </div>

      <div class="animal-form1_block" v-show="!notHaveAnimal">
        <p>Возраст</p>
        <input
          type="number"
          min="0"
          max="50"
          step="0.5"
          v-model="animalForm.age"
        />
        <div class="errmsg" :v-show="errs.age">
          {{ errs.age }}
        </div>
      </div>
      <div class="animal-form1_block" v-show="!notHaveAnimal">
        <p>Порода</p>
        <select v-model="animalForm.breed" placeholder="порода">
          <option :value="bred" v-for="(bred, ind) in breedList" :key="ind">{{
            bred
          }}</option>
        </select>
        <div class="errmsg" :v-show="errs.breed">{{ errs.breed }}</div>
      </div>
      <div class="animal-form1_block" v-show="!notHaveAnimal">
        <p>Имя животного</p>
        <input type="text" v-model="animalForm.name" />
        <div class="errmsg" :v-show="errs.nameAnimal">
          {{ errs.nameAnimal }}
        </div>
      </div>
      <button class="animal-form1_btn" @click.stop="getRegistrationAnimal1">
        <p>Далее</p>
      </button>
    </section>
    <section class="animal-form1" v-if="currentPartForm == 2 && !notHaveAnimal">
      <div class="animal-form1_block">
        <p>Предположительная дата вязки</p>
        <input type="date" v-model="animalForm.dateMating" />
      </div>
      <div class="animal-form1_block">
        <p>Награды, титулы, медали</p>
        <input type="text" v-model="animalForm.awards" />
      </div>
      <div class="animal-form1_block">
        <p>Прививки</p>
        <input type="text" v-model="animalForm.vaccination" />
      </div>
      <div class="animal-form1_block">
        <p>Окрас</p>
        <input type="text" v-model="animalForm.color" />
      </div>
      <div class="animal-form1_block">
        <p>Условия вязки</p>
        <input type="text" v-model="animalForm.matingConditions" />
      </div>
      <button class="animal-form1_btn" @click.stop="getRegistrationAnimal2">
        <p>Далее</p>
      </button>
    </section>
    <section class="animal-form1" v-if="currentPartForm == 3">
      <PhotoAdd
        :message="'Фото животных'"
        @photo="getPhotoAnimal"
        v-if="!notHaveAnimal"
      />

      <div class="animal-form1_block__noanimal trial">
        <div
          class="personal_data_checkbox"
          @click="licenseAgreement"
          :class="{ checked: regForm['licenseAgreement'] }"
        ></div>
        <div class="personal_data_text">
          <p>Я принимаю Соглашение на обработку персональных данных</p>

          <div class="errmsg errlicense" :v-show="errs.licenseAgreement">
            {{ errs.licenseAgreement }}
          </div>
        </div>
      </div>
      <div class="animal-form1_block__noanimal ">
        <div
          class="personal_data_checkbox"
          @click="startTrial"
          :class="{ checked: regForm['startTrial']['value'] }"
        ></div>
        <div class="personal_data_text">
          <p>Попробовать бесплатно</p>
          <div class="errmsg errtrial" :v-show="errs.startTrial">
            {{ errs.startTrial }}
          </div>
        </div>
      </div>
      <button class="animal-form1_btn" @click.stop="getRegistrationAnimal3">
        <p>Сохранить животное и зарегестрировать аккаунт </p>
      </button>
      <button
        class="animal-form1_btn"
        v-show="!notHaveAnimal || animalForm.breed"
        @click.stop="addNewAnimal"
      >
        <p>Сохранить животное и добавить {{amountNextAnimal}} </p>
      </button>
    </section>
  </div>
</template>
<script>
import PhotoAdd from "../components/PhotoAdd.vue";
export default {
  name: "AnimalRegistration",
  props: {startPart: Number},
  components: {
    PhotoAdd,
  },

  data() {
    return {
      animalsSize:0,
      notHaveAnimal: false,
      newRegistration: true,
      currentPartForm: 1,
      regForm: {
        licenseAgreement: false,
        startTrial: { value: false, date: null },
      },

      animalForm: {
        typeAnimal: null,
        male: null,
        age: 1,
        breed: null,
        name: null,
        dateMating: null,
        awards: null,
        vaccination: null,
        color: null,
        matingConditions: null,
        photoAnimal: [],
        photoUrl: [],
        id: null,
        owner: null,
      },
      errs: {
        breed: "",
        type: "",
        male: "",
        nameAnimal: "",
        age: "",
        licenseAgreement: "",
        startTrial: "",
      },
    };
  },
  watch:{
   
   
  },
  computed: {
    amountNextAnimal(){
      let result=''
      if (!this.animalsSize||this.animalsSize==0){
        result= 'второе'
      }
      if (this.animalsSize==1){
        result= 'третье'
      }
       if (this.animalsSize==2){
        result= 'четвертое'
      }
       if (this.animalsSize==3){
        result= 'пятое'
      }
      return result 
    },
    breedList() {
      let breed_list = [];
      if (this.animalForm.typeAnimal == "dog") {
        //В зависимости от типа животного подгружаем список пород
        const breed_string = require("!raw-loader!../dog_breed.txt");

        breed_list = breed_string.default
          .split("\r\n")
          .filter((el) => el != "");
      }
      if (this.animalForm.typeAnimal == "cat") {
        const breed_string = require("!raw-loader!../cat_breed.txt");

        breed_list = breed_string.default
          .split("\r\n")
          .filter((el) => el != "");
      }
      return breed_list;
    },
  },
  mounted(){
    if(this.startPart){
       console.log('start',this.startPart)
      this.currentPartForm=this.startPart
    }
  },
  methods: {
    clearAnimalForm(){
      this.animalForm={
        typeAnimal: null,
        male: null,
        age: 1,
        breed: null,
        name: null,
        dateMating: null,
        awards: null,
        vaccination: null,
        color: null,
        matingConditions: null,
        photoAnimal: [],
        photoUrl: [],
        id: null,
        owner: null,
      }
    },
    licenseAgreement() {
      this.regForm.licenseAgreement = !this.regForm.licenseAgreement;
    },
    startTrial() {
      this.regForm.startTrial.value = !this.regForm.startTrial.value;
      if (this.regForm.startTrial.value) {
        this.regForm.startTrial.dateStart = Date.now();
        this.regForm.startTrial.dateEnd =
          this.regForm.startTrial.dateStart + 86400000 * 15;
      }
    },
    addNewAnimal() {
      this.newRegistration=false
      this.animalsSize=this.animalsSize+1
      this.$emit("addNewAnimal", { animalForm: this.animalForm }); 
      this.currentPartForm=1
    },
    getPhotoAnimal(value) {
      this.animalForm.photoAnimal = value.photo;
    },
    getRegistrationAnimal1() {
      let valid = true;
      if (!this.notHaveAnimal) {
        if (!this.animalForm.typeAnimal) {
          valid = false;
          this.errs.type = "Выберите тип животного";
          setTimeout(() => {
            this.errs.type = "";
          }, 3000);
        }
        if (!this.animalForm.name) {
          valid = false;
          this.errs.nameAnimal = "Введите имя животного";
          setTimeout(() => {
            this.errs.nameAnimal = "";
          }, 3000);
        }
        if (!this.animalForm.male) {
          valid = false;
          this.errs.male = "Выберите пол";
          setTimeout(() => {
            this.errs.male = "";
          }, 3000);
        }
        if (this.animalForm.age < 0 || this.animalForm.age > 50) {
          valid = false;
          this.errs.age = "Введите корректный возраст животного";
          setTimeout(() => {
            this.errs.age = "";
          }, 3000);
        }
        if (!this.animalForm.breed) {
          valid = false;
          this.errs.breed = "Выберите породу";
          setTimeout(() => {
            this.errs.breed = "";
          }, 3000);
        }
        if (!valid) {
          return;
        }
        this.newRegistration = false;
        this.currentPartForm = 2;
      } else {
        this.newRegistration = false;
        this.currentPartForm = 3;
      }
    },
    getRegistrationAnimal2() {
      this.currentPartForm = 3;
    },
    getRegistrationAnimal3() {
      let valid = true;

      if (!this.regForm.licenseAgreement) {
        valid = false;
        this.errs.licenseAgreement = "Требуется подписать соглашение";
        setTimeout(() => {
          this.errs.licenseAgreement = "";
        }, 3000);
      }
      if (!this.regForm.startTrial.value) {
        valid = false;
        this.errs.startTrial = "Требуется активировать пробный период";
        setTimeout(() => {
          this.errs.startTrial = "";
        }, 3000);
      }
      if (!valid) {
        return;
      }
      this.$emit("completeRegistration", {
        animalForm: !this.notHaveAnimal?this.animalForm:null,
        regForm: this.regForm,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";
* {
  box-sizing: border-box;
}
.wrapper {
  width: 100vw;
  height: 100%;
  @media screen and (max-height: 645px) {
    height: 70%;
  }

  // position: relative;
}
.trial {
  @media screen and (orientation: portrait) {
    width: 75vw;
    align-items: start;
    justify-content: start;
  }
}
.errmsg {
  color: #ff0000;
  display: flex;
  font-family: inherit;
  font-size: max(1.4vw, 0.9rem);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
  top: max(1.6vw, 1.4rem);
  position: absolute;
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}
.errlicense {
  left: max(22%, 18vw);
  top: max(1vw, 1rem);
  @media screen and (max-width: 1000px) {
    left: max(27%, 23vw);
  }
  @media screen and (max-width: 700px) and (orientation: portrait) {
    left: 35%;
  }
}
.errtrial {
  top: max(1vw, 1rem);
}
.animal-form1 {
  display: flex;
  flex-direction: column;
  justify-content: start;
  @media screen and (min-height: 469px) {
    justify-content: center;
  }

  align-items: center;
  overflow: auto;
  height: 100%;
  width: 100%;
  gap: 1vh;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar {
    background: transparent;
  }
  &_block {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: $font-family;
    text-shadow: $textshadow;
    &__noanimal {
      position: relative;
      //   width: max(12rem, 25vw);

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      font-family: $font-family;
      text-shadow: $textshadow;
      font-size: max(2.5vw, 1.7rem);
      gap: 1vw;
      .personal_data_checkbox {
        //   margin-top: 0.2em;
        min-width: max(1.6rem, 3vh);
        min-height: max(1.6rem, 3vh);
        background: #ffffff;
        opacity: 0.8;
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
        border-radius: max(0.5vw, 8px);
        transition: all 0.3s;
        cursor: pointer;
      }
      .personal_data_checkbox:hover {
        opacity: 1;
        transform: scale(110%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
          0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
      }

      .checked {
        background: url("../assets/checked.svg");
        background-position: center;
        background-size: 90%;
        background-repeat: no-repeat;
      }
    }

    p {
      font-size: max(1.9vw, 1.4rem);
      box-sizing: border-box;
      margin: 0 0 1rem 0;
    }
    input {
      width: max(12rem, 25vw);
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
      font-size: max(1.8vw, 1.2rem);
      transition: 0.3s;
      opacity: 0.8;

      &:focus {
        transform: scale(110%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      }
      &:hover {
        transform: scale(110%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      }
    }
    select {
      display: flex;
      text-align: center;
      text-justify: center;
      justify-content: center;
      align-items: center;
      width: max(12rem, 25vw);
      height: max(1.4rem, 3.5vh);
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
      font-size: max(1.7vw, 1.1rem);
      transition: 0.3s;
      opacity: 0.8;
      &:focus {
        transform: scale(110%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      }
      &:hover {
        transform: scale(110%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      }
      option {
        text-align: center;
        text-justify: center;
      }
    }
  }
  .animal-form1_btn {
    // margin-top: max(2rem, 5vw);
    // margin-bottom: max(2rem, 5vh);
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
    @media screen and (orientation: portrait) {
      border-radius: 20px 0px;
    }
    &:hover {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
      border: 1px solid #000000;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
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
</style>

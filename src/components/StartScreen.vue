<template>
  <div class="screen">
    <kinesis-container
      v-if="!mobileUserAgent&&!portaitOrient"
      :duration="300"
      :perspective="1000"
    >
      <kinesis-element :strength="15" type="depth">
        <div class="screen_text">
          <p>Выбор животного</p>
        </div></kinesis-element
      >
      <div class="screen_image">
        <kinesis-element :strength="15" type="depth">
          <div class="screen_image__dog" @click="chooseTypeAnimal('dog')"></div>
        </kinesis-element>
        <kinesis-element :strength="15" type="depth">
          <div class="screen_image__cat" @click="chooseTypeAnimal('cat')"></div>
        </kinesis-element>
      </div>
      <div class="screen_r">
        <div class="screen_r__registration" v-if="!authentification">
          <kinesis-element :strength="19" type="depth">
            <a class="reg" @click="registration">Регистрация</a>
          </kinesis-element>
          <p>|</p>
          <kinesis-element :strength="21" type="depth">
            <a class="sign" @click="sign">Вход</a>
          </kinesis-element>
        </div>
        <div class="screen_r__registration" v-if="authentification">
          <kinesis-element :strength="21" type="depth">
            <a class="signup" @click="signUp"> Войти как {{ nameStart }} </a>
          </kinesis-element>
        </div>
      </div>
    </kinesis-container>

    <div v-if="mobileUserAgent|| portaitOrient">
      <div class="screen_text animate">
        <p>Выбор животного</p>
      </div>

      <div class="screen_image">
        <div class="screen_image__dog" @click="chooseTypeAnimal('dog')"></div>

        <div class="screen_image__cat" @click="chooseTypeAnimal('cat')"></div>
      </div>
      <div class="screen_r">
        <div class="screen_r__registration" v-if="!authentification">
          <a class="reg" @click="registration">Регистрация</a>

          <p>|</p>

          <a class="sign" @click="sign">Вход</a>
        </div>
        <div class="screen_r__registration" v-if="authentification">
          <a class="signup" @click="signUp">
            Войти как <strong>{{ nameStart }}</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //Стартовый экран с выбором типа животного, кнопкой входа или регистрации .
  //Принимает булевое значение мобильный ли клиент, имя юзера и аутентификацию. Выдает соответствующие события "animalType"
  //"registration" , "sign","enterProfile"
  name: "StartScreen",
  props: {
    mobileUserAgent: { type: Boolean }, //В зависимости от значения показывается шаблон экрана с анимацией ховера или нет
    nameStart: { type: String }, //Имя авторизованого пользователя
    authentification: { type: Boolean }, //авторизован ли пользователь
  },

  data() {
    return {
      animalType: null,
    };
  },
  methods: {
    chooseTypeAnimal(value) {
      this.$emit("animalType", { typeAnimal: value });
    },
    registration() {
      this.$emit("registration", null);
    },
    sign() {
      this.$emit("sign", null);
    },
    signUp() {
      this.$emit("enterProfile", null);
    },
  },
  computed:{
    portaitOrient(){
      if (screen.orientation.type=='portrait-primary'){
        console.log(screen.orientation.type)
        return true
      }else{
         console.log(screen.orientation.type)
        return false
      }
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";

@keyframes flame {
  0%{
     filter: drop-shadow(0px 4px 4px rgba(13, 100, 20, 0.2))
      drop-shadow(10px 10px 4px rgba(15, 92, 15, 0.25));
    transform: scale(1);
  }
  10%
  {
    filter: drop-shadow(0px 4px 4px rgba(13, 100, 20, 0.2))
      drop-shadow(10px 10px 4px rgba(15, 92, 15, 0.25));
    transform: scale(1.01);
  }

  30%
   {
    filter: drop-shadow(0px 4px 4px rgba(28, 209, 98, 0.3))
      drop-shadow(10px 10px 4px rgba(15, 82, 15, 0.55));
    transform: scale(1.03);
  }

   50%
   {
    filter: drop-shadow(0px 4px 4px rgba(28, 209, 98, 0.3))
      drop-shadow(10px 10px 4px rgba(15, 82, 15, 0.55));
    transform: scale(1.01);
  }
  70%
   {
    filter: drop-shadow(0px 6px 4px rgba(17, 173, 38, 0.5))
      drop-shadow(10px 10px 6px rgba(25, 133, 25, 0.75));
    transform: scale(1.03);
  }
90%
   {
    filter: drop-shadow(0px 6px 4px rgba(17, 173, 38, 0.5))
      drop-shadow(10px 10px 6px rgba(25, 133, 25, 0.75));
    transform: scale(1.01);
  }
 100%
  {
    filter: drop-shadow(0px 4px 4px rgba(22, 124, 47, 0.3))
      drop-shadow(10px 10px 4px rgba(14, 85, 14, 0.55));
    transform: scale(1.00);
  }
}
.screen {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url("../assets/cover.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  &_text {
    position: absolute;
    top: 0;
    display: flex;
    width: 100vw;
    max-height: 20%;
    justify-content: space-around;
    align-items: start;
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 6vw;
    line-height: 30rem;
    color: #000000;
    text-shadow: $textshadow;
    @media screen and (max-width: 991px) {
      top: -10rem;
    }

    @media screen and (orientation: portrait) {
      animation: flame 2s linear infinite;
      font-size: 6vh;
      top: -30vh;
    }
    @media screen and (orientation: portrait) and (max-height: 670px) {
      margin: 0;
      top: -35vh;
      font-size: 6vh;
    }
  }

  .screen_image {
    position: relative;

    display: flex;
    height: 70%;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    @media screen and (orientation: portrait) {
      margin-top: 5vh;
      flex-direction: column;
      height: auto;
      align-items: center;
      justify-content: center;
    }

    .screen_image__cat {
      position: relative;
      width: 20vw;
      height: 21vw;
      background: no-repeat url("../assets/cat.svg");
      background-size: cover;
      opacity: 0.95;
      transition: 1.2s;
      margin-right: 5vw;
      cursor:pointer;
      @media screen and (orientation: portrait) {
        width: 25vh;
        height: 26vh;
        margin-left: 15vh;
      }

      &:hover:after {
        content: "";
        border-radius: 50%;
        height: 87.5%;
        border: 2px solid green;
        box-shadow: 5px 5px rgb(2, 95, 2);
        position: absolute;
        top: 10.5%;
        left: 1%;
        width: 92%;
        filter: drop-shadow(10px 10px 10px rgba(1, 32, 0, 0.75))
          drop-shadow(20px 20px 20px rgba(9, 112, 7, 0.75));
      }
      &:active:after {
        content: "";
        border-radius: 50%;
        height: 87.5%;
        border: 2px solid green;
        box-shadow: 7px 7px black;
        position: absolute;
        top: 10.5%;
        left: 1%;
        width: 92%;
      }
      &:hover {
        opacity: 1;
        width: 22vw;
        height: 23vw;
          @media screen and (orientation: portrait) {
        width: 27vh;
        height: 28vh;
                }
      }
    }
    .screen_image__dog {
      position: relative;
      width: 20vw;
      height: 20vw;
      background: no-repeat url("../assets/dog.svg");
      background-size: cover;
      opacity: 0.95;
      transition: 1.2s;
      margin-left: 5vw;
      cursor:pointer;
      @media screen and (orientation: portrait) {
        margin-right: 10vh;
        justify-self: flex-start;
        width: 25vh;
        height: 25vh;
      }

      &:hover:after {
        content: "";
        border-radius: 50%;
        height: 82.7%;
        border: 2px solid green;
        box-shadow: 5px 5px rgb(2, 95, 2);
        position: absolute;
        top: 10.5%;
        left: 8%;
        width: 84%;
        filter: drop-shadow(10px 10px 10px rgba(1, 32, 0, 0.75))
          drop-shadow(20px 20px 20px rgba(9, 112, 7, 0.75));
      }
      &:active:after {
        content: "";
        border-radius: 50%;
        height: 83%;
        border: 2px solid green;
        box-shadow: 7px 7px black;
        position: absolute;
        top: 10.5%;
        left: 8%;
        width: 84%;
      }

      &:hover {
        opacity: 1;
        width: 22vw;
        height: 22vw;
        @media screen and (orientation: portrait) {
        width: 28vh;
        height: 28vh;
                }
    }

 }
  }

  .screen_r {
    position: relative;
    margin-top: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: $font-family;
    font-style: normal;
    font-weight: bold;
    font-size: 2vw;
    line-height: 91px;
    color: #000000;
    text-shadow: $textshadow;
    @media screen and (orientation: portrait) {
      margin: 0;

      bottom: -5vh;

      font-size: 4vh;
    }
    @media screen and (max-height: 490px) {
      bottom: 30vh;
    }
    .reg,
    .sign {
      margin-left: 0.2em;
      margin-right: 0.2em;
      transition: all 0.5s;
      cursor:pointer;
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

    &__registration {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.signup {
  font-size: 2.8vw;
  animation: flame 2s linear infinite;
  text-transform: uppercase;
  cursor: pointer;
  @media screen and (orientation: portrait) {
    font-size: 6vw;
  }
  &:hover {
    text-shadow: 5px 5px 4px #003902;
  }
}
 
@media only screen and (max-width: 1300px) {
  .screen-text {
    margin-top: -2em;
  }
}

</style>

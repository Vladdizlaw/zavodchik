<template>
  <div
    class="wrapper"
    :class="{ dog: user.animal.type == 'dog', cat: user.animal.type == 'cat' }"
  >
    <div class="header">
      <back-button :func="back" class="backbutton" />
      <div class="header__text">
        <p>Аккаунт</p>
      </div>

      <div class="header__search" @click="search">
        <img src="../assets/search.svg" alt="" />
        <p>Поиск</p>
      </div>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="main-left__name">
          <p>{{ user.animal.name }} {{ user.animal.age }}</p>
        </div>
        <div class="main-left__data">
          <p>Пол:{{ user.animal.male }}</p>
          <p>Порода:{{ user.animal.breed }}</p>
          <p>Город:{{ user.profile.city }}</p>
          <p>Окрас:{{ user.animal.color }}</p>
          <p>Награды:{{ user.animal.awards }}</p>
          <p>Прививки:{{ user.animal.vaccination }}</p>
          <p>Возможный период случки:{{ user.animal.date }}</p>
          <p>Условие вязки:{{ user.animal.matingConditions }}</p>
          <p>
            Контактные данные:{{ user.profile.name }},{{ user.profile.tel
            }}, {{ user.profile.mail }}
          </p>
        </div>
      </div>
      <div class="main-right" v-show="urls">
        <div class="main-right__photos">
          <div class="photo__LU">
            <div class="LU__UP photo" v-show="urls[0]">
              <img :src="urls[0]" alt="" />
            </div>
            <div class="LU__DOWN">
              <div class="LU__DOWN_left">
                <div class="LU__DOWN_left_1 photo"><img :src="urls[6]" alt=""  v-show="urls[6]"/></div>
                <div class="LU__DOWN_left_2 photo"><img :src="urls[8]" alt="" v-show="urls[8]"/></div>
                <div class="LU__DOWN_left_3 photo"><img :src="urls[10]"  v-show="urls[10]" /></div>
              </div>
              <div class="LU__DOWN_right">
                <div class="LU__DOWN_right_1 photo"><img :src="urls[2]"  alt=""  v-show="urls[2]" /></div>
                <div class="LU__DOWN_right_2 photo"><img :src="urls[4]" alt=""  v-show="urls[4]"/></div>
              </div>
            </div>
          </div>
          <div class="photo__RU">
            <div class="RU__UP">
              <div class="RU__UP_left">
                <div class="RU__UP_left_1 photo"><img :src="urls[3]" alt=""  v-show="urls[3]"/></div>
                <div class="RU__UP_left_2 photo"><img :src="urls[5]" alt=""  v-show="urls[5]"/></div>
              </div>
              <div class="RU__UP_right">
                <div class="RU__UP_right_1 photo"><img :src="urls[7]" alt=""  v-show="urls[7]" /></div>
                <div class="RU__UP_right_2 photo"><img :src="urls[9]" alt=""  v-show="urls[9]"/></div>
                <div class="RU__UP_right_3 photo"><img :src="urls[11]" alt=""  v-show="urls[11]"/></div>
              </div>
            </div>
            <div class="RU__DOWN photo"><img :src="urls[1]" alt=""  v-show="urls[1]"/></div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-setings" @click="search">
        <img src="../assets/setings.svg" alt=""  />
        <p>Настройка</p>
      </div>
      <div class="footer-time"><p>До конца пробного периода осталось: {{lastTrialTime}} дней</p> <button>Оплатить</button></div>
      <div class="footer-exit">
        <p>Выйти из аккаунта</p>
        <img src="../assets/exit.svg" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import BackButton from "./BackButton.vue";
export default {
  components: { BackButton },
  name: "ProfileScreen",
  props: {
    user: Object,
  },
  data() {
    return {
      url: null,
    };
  },
  mounted() {
    console.log(this.user);
  },
  methods:{
      back(){},
      search(){
       this.$emit("back", { state: "settings" });
    }
  },
  
  computed: {
    urls() {
      if  (!this.user.animal.photoAnimal){
          return null
      }
      const urls = [];
      this.user.animal.photoAnimal.forEach((u) => {
        urls.push(URL.createObjectURL(u));
      });
       this.user.animal.photoLitter.forEach((u) => {
        urls.push(URL.createObjectURL(u));
      });
      return urls;
    },
    lastTrialTime(){
        const timestampNow=Date.now()
        let result=Math.round((this.user.animal.startTrial.dateEnd-timestampNow)/5184000)
        return result
    },
    
  },
};
</script>
<style scoped>
.dog {
  background: url("../assets/cover_dog_acc.svg"), url("../assets/cover_dog.png");
  background-position: center, center;
  background-size: 70vh, cover;
  background-repeat: no-repeat, no-repeat;
}
.cat {
  background: url("../assets/cover_cat_acc.svg"), url("../assets/cover_cat.png");
  background-position: center, center;
  background-size: 100vh, cover;
  background-repeat: no-repeat, no-repeat;
}
.wrapper {
  font-family: "Amatic SC";
  font-size: 2.5em;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);

  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

.header {
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: start;
  align-items: center;
}
.backbutton {
  font-size: 1.25em;
  max-width: 20%;
}
.header__text {
  min-width: 78%;
  justify-self: center;
  font-size: 2.5em;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
}
.header__search {
  font-size: 1.4em;
  display: flex;
  max-width: 22%;
  flex-wrap: nowrap;
  gap: 0.15em;
}
.header__search > img {
  height: 0.7em;
}
.header__search:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
.main {
  display: flex;
  width: 90vw;
  height: 70vh;
  justify-content: start;
  align-items: center;
}
.main-left {
  margin-left: 2em;
  width: 50%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: space-between;
}
.main-left__name {
  height: 20%;
  font-size: 1.5em;
  margin-bottom: 1em;
}
.main-left__data {
  flex: 2;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  gap: 1%;
}
.main-right {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: end;
  margin-left: 2em;
}

.main-right__photos {
  width: 100%;
  height: 100%;
  /* border: 2px solid black; */
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  /* z-index: 100; */
  position: relative;
  justify-content: center;
  align-items: start;
  padding: 0;
  margin: 0;
}
.photo__LU {
  width: 50%;
  height: 100%;
  /* border: 2px dashed black; */
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.LU__UP {
  width: 100%;
  height: 45%;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75); */
  /* border-radius: 10px; */
  /* border: 1px dashed black; */
}
.LU__DOWN {
  width: 100%;
  height: 55%;
  /* border: 1px dashed black; */
  display: flex;
}
.LU__DOWN_left {
  height: 100%;
  width: 45%;
  /* border: 1px dashed; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.LU__DOWN_right {
  height: 100%;
  width: 55%;
  /* border: 1px dashed; */
  display: flex;
  flex-direction: column;
}
.LU__DOWN_left_1,
.LU__DOWN_left_2,
.LU__DOWN_left_3,
.RU__UP_right_1,
.RU__UP_right_2,
.RU__UP_right_3 {
  height: 33%;
  width: 100%;
  /* border: 1px dashed; */
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75); */
  /* border-radius: 10px; */
}
.LU__DOWN_right_1,
.LU__DOWN_right_2,
.RU__UP_left_1,
.RU__UP_left_2 {
  height: 50%;
  width: 100%;
  /* border: 1px dashed; */
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75); */
  /* border-radius: 10px; */
}
.photo__RU {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.RU__UP {
  height: 55%;
  width: 100%;
  /* border: 1px dashed; */
  display: flex;
}
.RU__UP_left {
  height: 100%;
  width: 55%;
  /* border: 1px dashed; */
  display: flex;
  flex-direction: column;
}
.RU__UP_right {
  height: 100%;
  width: 45%;
  /* border: 1px dashed; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.RU__DOWN {
  height: 55%;
  width: 100%;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75); */
  /* border-radius: 10px; */
}
.photo{
    position: relative;
    
    /* overflow:hidden; */
}
.photo>img {
  position:absolute;
  width: 100%; 
  height:100%; 
 box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75); 
 border: 0.5px solid green; 
  border-radius: 10px;
  transition: all .4s;
  
  
  
}
.photo>img:hover{
    width:110%;
    height:110%;
    z-index: 1;
    /* border:1px green;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75); */
}
.footer {
  margin-top: 1em;
  margin-bottom: 0.5em;
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.footer-setings {
  display: flex;
  justify-content: center;
}
.footer-time{
  display:flex;
  min-width:68%;
  justify-content: center;
  gap:1em;
  font-size: 0.7em;

}
.footer-time>button{
  border: 1px solid #000000;
box-sizing: border-box;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75));
border-radius: 15px 0px;
padding:0 1em 0 1em;

}
.footer-exit {
  flex-wrap: nowrap;
  width: 20%;
  display: flex;
  justify-content: center;
}
.footer-exit > img {
  height: 0.9em;
  margin-top: 0.1em;
  margin-left: 0.2em;
}
.footer-exit:hover,
.footer-setings:hover
 {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
    
}
.footer-time>button:hover{
  box-shadow: 5px 5px 10px 5px rgba(1, 32, 0, 0.25), 10px 10px 10px 10px rgba(9, 112, 7, 0.75);
}
</style>

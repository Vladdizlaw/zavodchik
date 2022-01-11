<template>
  <div
    class="wrapper"
    :class="{ dog: user.animal.type == 'dog', cat: user.animal.type == 'cat' }"
  >
    <transition name="bounce">
      <Modal :flag="modalPhoto" :imageUrl="url" @cancelModal="cancelModal" />
     
    </transition>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="main-left__name">
          <p>{{ user.animal.name }}, {{ user.animal.age }} {{ pluralize }}</p>
        </div>
        <div class="main-left__data">
          <p>Пол:{{ user.animal.male }}</p>
          <p>Порода:{{ user.animal.breed }}</p>
          <p>Город:{{ user.profile.city }}</p>
          <p v-if="user.animal.color">Окрас:{{ user.animal.color }}</p>
          <p v-if="user.animal.awards">Награды:{{ user.animal.awards }}</p>
          <p v-if="user.animal.vaccination" >Прививки:{{ user.animal.vaccination }}</p>
          <p v-if="user.animal.date">Возможный период случки:{{ user.animal.date }}</p>
          <p v-if="user.animal.matingConditions">Условие вязки:{{ user.animal.matingConditions }}</p>
          <p>
            Контактные данные:{{ user.profile.name }},{{
              user.profile.seenFlags.seenTelFlag ? user.profile.tel : ""
            }}
            {{ user.profile.mail }}
          </p>
        </div>
      </div>
      <div class="main-right" v-show="urls" >
        <div class="main-right__photos" @click="сheckPhotos($event)">
          <div class="photo__LU">
            <div class="LU__UP photo" v-show="urls[0]" >
              <img :src="urls[0]" name="0" />
            </div>
            <div class="LU__DOWN">
              <div class="LU__DOWN_left">
                <div class="LU__DOWN_left_1 photo">
                  <img :src="urls[6]" alt="" name="6" v-show="urls[6]" />
                </div>
                <div class="LU__DOWN_left_2 photo">
                  <img :src="urls[8]" alt="" name="8" v-show="urls[8]" />
                </div>
                <div class="LU__DOWN_left_3 photo">
                  <img :src="urls[10]" name="10" v-show="urls[10]" />
                </div>
              </div>
              <div class="LU__DOWN_right">
                <div class="LU__DOWN_right_1 photo">
                  <img :src="urls[2]" name="2" alt="" v-show="urls[2]" />
                </div>
                <div class="LU__DOWN_right_2 photo">
                  <img :src="urls[4]" name="4" alt="" v-show="urls[4]" />
                </div>
              </div>
            </div>
          </div>

          <div class="photo__RU">
            <div class="RU__UP">
              <div class="RU__UP_left">
                <div class="RU__UP_left_1 photo">
                  <img :src="urls[3]" name="3" alt="" v-show="urls[3]" />
                </div>
                <div class="RU__UP_left_2 photo">
                  <img :src="urls[5]" name="5" alt="" v-show="urls[5]" />
                </div>
              </div>
              <div class="RU__UP_right">
                <div class="RU__UP_right_1 photo">
                  <img :src="urls[7]" name="7" alt="" v-show="urls[7]" />
                </div>
                <div class="RU__UP_right_2 photo">
                  <img :src="urls[9]" name="9" alt="" v-show="urls[9]" />
                </div>
                <div class="RU__UP_right_3 photo">
                  <img :src="urls[11]" name="11" alt="" v-show="urls[11]" />
                </div>
              </div>
            </div>
            <div class="RU__DOWN photo">
              <img :src="urls[1]" name="1" alt="" v-show="urls[1]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
export default {
  name: "ProfileScreen",
  components:{Modal},
  props: {
    user: Object,
  },
  data() {
    return {
      url: null,
      modalPhoto: false,
    };
  },
 
  methods: {
    сheckPhotos(e) {
      // console.log('check',e)
      if (!e?.target.name) {
        return;
      }
      // const modal = this.$refs.modal;

      // const img = document.createElement("img");
      // img.style.height = "90vh";
      // img.style.maxWidth = "80vw";
      // img.style.border = "1px solid black";
      // img.style.borderRadius = "5px";
      // console.log(e.target.name)
      this.url = this.urls[e.target.name];
      // modal.style.zIndex = "1000";
      // modal.prepend(img);
      this.modalPhoto = true;
      // console.log(this.url);
    },

    cancelModal() {
      // const modal = this.$refs.modal;
      // const img = modal.getElementsByTagName("img");

      // //  console.log(img)

      this.modalPhoto = false;
      // Array.from(img).forEach((el) => {
      //   el.remove();
      // });
    },
  },
  computed: {
    pluralize() {
      let res;
      if (this.user.animal.age>1&&this.user.animal.age<5) {
        res = "года";
      } else if (this.user.animal.age == 1) {
        res = "год";
      } else {
        res = "лет";
      }
      return res;
    },

    urls() {
      if (!this.user.photoUrl?.length) {
        return null;
      }
      const urls = [];
      this.user.photoUrl?.forEach((u) => {
        urls.push("http://localhost:5000/" + u);
      });

      return urls;
    },
  },
};
</script>
<style scoped>
.dog {
  background: url("../assets/cover_dog_acc.svg"), url("../assets/cover_dog.png");
  background-position: center, center;
  background-size: 100vh, cover;
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
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0em;
  text-align: left;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);

  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  position: relative;
}

.header {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 2em;
  display: flex;
  justify-content: start;
  align-items: center;
}

.main {
  display: flex;
  width: 90vw;
  max-height: 65vh;
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
  align-items: space-around;
}
.main-left__name {
  max-height: 10%;
  font-size: 3.5rem;
  /* margin-bottom: 1em; */
}
.main-left__data {
  flex: 1 1 35vh;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 2rem;
  font-size: 2rem;
}
.main-left__data > p {
  margin-top: -2rem;
}
.main-right {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: end;
  margin-left: 2em;
  margin-top: 2rem;
}

.main-right__photos {
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  /* z-index: 100; */
  position: relative;
  justify-content: center;
  align-items: start;
  padding: 0;
  margin: 0;
  cursor: pointer;
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
}
.LU__DOWN_right_1,
.LU__DOWN_right_2,
.RU__UP_left_1,
.RU__UP_left_2 {
  height: 50%;
  width: 100%;
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
}
.photo {
  position: relative;

  /* overflow:hidden; */
}
.photo > img {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  border: 0.5px solid green;
  border-radius: 10px;
  transition: all 0.4s;
}
.photo > img:hover {
  width: 110%;
  height: 120%;
  z-index: 100;
  /* border:1px green;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75); */
}
.footer {
  /* margin-top: 1rem; */
  /* margin-bottom: 1rem; */
  position: absolute;
  bottom:0.5rem;
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: space-around;
  flex-wrap: nowrap;
}
</style>

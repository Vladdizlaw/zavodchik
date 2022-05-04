<template>
  <div
    class="wrapper"
    :class="{
      dog:
        this.user &&
        this.user.animals[currentAnimal] &&
        this.user.animals[currentAnimal].typeAnimal == 'dog',
      cat:
        (this.user &&
          this.user.animals[currentAnimal] &&
          this.user.animals[currentAnimal].typeAnimal == 'cat') ||
        !Object.keys(user.animals).length,
    }"
  >
    <Modal ref="modal">
      <template #content>
        <img :src="url" class="image" alt="view photo" />
      </template>
    </Modal>
    <slot name="modalAnother"></slot>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="main-left__name">
          <p v-show="Object.keys(user.animals).length">
            {{
              user && user.animals[currentAnimal]
                ? user.animals[currentAnimal].name
                : null
            }},
            {{
              user && user.animals[currentAnimal]
                ? user.animals[currentAnimal].age
                : null
            }}
            {{ pluralize }}
          </p>
          <p v-show="!Object.keys(user.animals).length">НЕТ ЖИВОТНОГО</p>
          <img
            class="arrowR"
            src="../assets/ArrowR.svg"
            alt="previos"
            @click="showNextAnimal"
            v-show="Object.keys(user.animals).length > 1"
          />
        </div>
        <div class="main-left__data">
          <p>Тип:{{ typeValue }}</p>
          <p>Пол:{{ maleValue }}</p>
          <p>
            Порода:{{
              user && user.animals[currentAnimal]
                ? user.animals[currentAnimal].breed
                : null
            }}
          </p>
          <p>Город:{{ user ? user.profile.city : null }}</p>
          <p
            v-if="
              user && user.profile.hood && user.profile.seenFlags.seenHoodFlag
            "
          >
            Район:{{ user ? user.profile.hood : null }}
          </p>
          <p
            v-if="
              user &&
                user.animals[currentAnimal] &&
                user.animals[currentAnimal].color
            "
          >
            Окрас:{{ user.animals[currentAnimal].color }}
          </p>
          <p
            v-if="
              user &&
                user.animals[currentAnimal] &&
                user.animals[currentAnimal].awards
            "
          >
            Награды:{{ user.animals[currentAnimal].awards }}
          </p>
          <p
            v-if="
              user &&
                user.animals[currentAnimal] &&
                user.animals[currentAnimal].vaccination
            "
          >
            Прививки:{{ user.animals[currentAnimal].vaccination }}
          </p>
          <p
            v-if="
              user &&
                user.animals[currentAnimal] &&
                user.animals[currentAnimal].dateMating
            "
          >
            Возможный период случки:{{ user.animals[currentAnimal].dateMating }}
          </p>
          <p
            v-if="
              user &&
                user.animals[currentAnimal] &&
                user.animals[currentAnimal].matingConditions
            "
          >
            Условие вязки:{{ user.animals[currentAnimal].matingConditions }}
          </p>
          <p>
            Контактные данные:{{ user ? user.profile.name : null }},{{
              user && user.profile.seenFlags.seenTelFlag ? user.profile.tel : ""
            }}
            {{ user ? user.profile.mail : null }}
          </p>
        </div>
      </div>
      <div class="main-center" v-show="urls">
        <div class="main-center__photos__mobile" @click="сheckPhotos($event)">
          <div class="photos_mobile" v-show="urls && urls[0]">
            <img
              :src="urls ? urls[0] : null"
              name="0"
              v-show="urls && urls[0]"
            />
            
          </div>
        </div>
        <div class="main-center__photos" @click="сheckPhotos($event)">
          <div class="photo__LU">
            <div class="LU__UP photo" v-show="urls && urls[0]">
              <img
                :src="urls ? urls[0] : null"
                name="0"
                v-show="urls && urls[0]"
              />
            </div>
            <div class="LU__DOWN">
              <div class="LU__DOWN_left">
                <div class="LU__DOWN_left_1 photo">
                  <img
                    :src="urls ? urls[6] : null"
                    alt=""
                    name="6"
                    v-show="urls && urls[6]"
                  />
                </div>
                <div class="LU__DOWN_left_2 photo">
                  <img
                    :src="urls ? urls[8] : null"
                    alt=""
                    name="8"
                    v-show="urls && urls[8]"
                  />
                </div>
                <div class="LU__DOWN_left_3 photo">
                  <img
                    :src="urls ? urls[10] : null"
                    name="10"
                    v-show="urls && urls[10]"
                  />
                </div>
              </div>
              <div class="LU__DOWN_right">
                <div class="LU__DOWN_right_1 photo">
                  <img
                    :src="urls ? urls[2] : null"
                    name="2"
                    alt=""
                    v-show="urls && urls[2]"
                  />
                </div>
                <div class="LU__DOWN_right_2 photo">
                  <img
                    :src="urls ? urls[4] : null"
                    name="4"
                    alt=""
                    v-show="urls && urls[4]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="photo__RU">
            <div class="RU__UP">
              <div class="RU__UP_left">
                <div class="RU__UP_left_1 photo">
                  <img
                    :src="urls ? urls[3] : null"
                    name="3"
                    alt=""
                    v-show="urls && urls[3]"
                  />
                </div>
                <div class="RU__UP_left_2 photo">
                  <img
                    :src="urls ? urls[5] : null"
                    name="5"
                    alt=""
                    v-show="urls && urls[5]"
                  />
                </div>
              </div>
              <div class="RU__UP_right">
                <div class="RU__UP_right_1 photo">
                  <img
                    :src="urls ? urls[7] : null"
                    name="7"
                    alt=""
                    v-show="urls && urls[7]"
                  />
                </div>
                <div class="RU__UP_right_2 photo">
                  <img
                    :src="urls ? urls[9] : null"
                    name="9"
                    alt=""
                    v-show="urls && urls[9]"
                  />
                </div>
                <div class="RU__UP_right_3 photo">
                  <img
                    :src="urls ? urls[11] : null"
                    name="11"
                    alt=""
                    v-show="urls && urls[11]"
                  />
                </div>
              </div>
            </div>
            <div class="RU__DOWN photo">
              <img
                :src="urls ? urls[1] : null"
                name="1"
                alt=""
                v-show="urls && urls[1]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="main-right_top">
          <slot name="main_right_top"></slot>
        </div>
        <div class="main-right_center">
          <slot name="main_right_center"></slot>
        </div>
        <div class="main-right_bottom">
          <slot name="main_right_bottom"></slot>
        </div>
      </div>
    </div>

    <div class="main_mobile">
      <img
        class="arrowR"
        src="../assets/ArrowL.svg"
        alt="previos"
        @click="showPreviosPhoto"
        v-show="showPhotoMobileStart > 1"
      />
      <div
        class="main_mobile_photo"
        v-for="(u, ind) in urls.slice(showPhotoMobileStart, showPhotoMobileEnd)"
        :key="ind"
      >
        <img
          :src="u ? u : null"
          alt=""
          :name="ind + showPhotoMobileStart"
          v-show="u"
          @click="сheckPhotos($event)"
        />
      </div>
      <img
        class="arrowR"
        src="../assets/ArrowR.svg"
        alt="previos"
        @click="showNextPhoto"
        v-show="showPhotoMobileEnd < urls.length"
      />
    </div>
    <div class="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
export default {
  //Component to show profile 
  name: "ProfileScreen",
  components: { Modal },
  props: {
    user: { type: Object, require: true },
    mobileUserAgent: { type: Boolean },
  },
  data() {
    return {
      currentAnimal: 0, //Cuurent animal of this.user
      url: null, //urls to photo at server
      showPhotoMobileStart: 1, //pagination start of mobile shown photos
      showPhotoMobileEnd: 4, //pagination end of mobile shown photos
    };
  },

  mounted() {},

  methods: {
    showNextPhoto() {
      this.showPhotoMobileStart = this.showPhotoMobileStart + 3;
      this.showPhotoMobileEnd = this.showPhotoMobileEnd + 3;
    },
    showPreviosPhoto() {
      this.showPhotoMobileStart = this.showPhotoMobileStart - 3;
      this.showPhotoMobileEnd = this.showPhotoMobileEnd - 3;
    },
    showNextAnimal() {
      this.currentAnimal < Object.keys(this.user.animals).length - 1
        ? ++this.currentAnimal
        : (this.currentAnimal = 0);
    },
    async сheckPhotos(e) {
      // console.log('check',e)
      if (!e?.target?.name) {
        return;
      }

      this.url = this.urls[e.target.name];

      await this.$refs.modal.openModal();
    },

    cancelModal() {
      this.$refs.modal.closeModal();
    },
  },
  computed: {
    typeValue() {
      if (!Object.keys(this.user.animals).length) {
        return "нет животного";
      }
      if (
        this.user &&
        this.user.animals &&
        this.user.animals[this.currentAnimal].typeAnimal == "dog"
      ) {
        return "собака";
      }
      if (
        this.user &&
        this.user.animals &&
        this.user.animals[this.currentAnimal].typeAnimal == "cat"
      ) {
        return "кошка";
      }
      return "нет животного";
    },
    maleValue() {
      if (!Object.keys(this.user.animals).length) {
        return "нет животного";
      }
      if (
        this.user &&
        this.user.animals &&
        this.user.animals[this.currentAnimal].male == "male"
      ) {
        return "мужской";
      }
      if (
        this.user &&
        this.user.animals &&
        this.user.animals[this.currentAnimal].male == "female"
      ) {
        return "женский";
      } else {
        return "нет животного";
      }
    },
    pluralize() {
      let res;
      if (
        this.user?.animals[this.currentAnimal] &&
        this.user?.animals[this.currentAnimal].age > 1 &&
        this.user?.animals[this.currentAnimal].age < 5
      ) {
        res = "года";
      } else if (
        this.user?.animals[this.currentAnimal] &&
        this.user?.animals[this.currentAnimal].age == 1
      ) {
        res = "год";
      } else {
        res = "лет";
      }
      return res;
    },

    urls() {
      if (
        this.user?.animals[this.currentAnimal] &&
        !this.user?.animals[this.currentAnimal].photoUrl?.length
      ) {
        return null;
      }
      const urls = [];
      this.user?.animals[this.currentAnimal] &&
        this.user?.animals[this.currentAnimal].photoUrl?.forEach((u) => {
          urls.push("http://localhost:5000/" + u);
        });

      return urls;
    },
  },
};
</script>
<style lang="scss" scoped>
.dog {
  background: url("../assets/cover_dog_acc.svg"), url("../assets/cover_dog.png");
  background-position: center, center;
  background-size: 100vh, cover;
  background-repeat: no-repeat, no-repeat;
  @media screen and (orientation: portrait) {
    background-size: 100vw, cover;
  }
}
.cat {
  background: url("../assets/cover_cat_acc.svg"), url("../assets/cover_cat.png");
  background-position: center, center;
  background-size: 100vh, cover;
  background-repeat: no-repeat, no-repeat;
  @media screen and (orientation: portrait) {
    background-size: 100vw, cover;
  }
}
.wrapper {
  font-family: "Amatic SC";
  font-size: max(2rem, 3vw);
  font-style: normal;
  font-weight: 900;
  letter-spacing: 0em;
  text-align: left;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  @media screen and (orientation: portrait) {
    justify-content: start;
  }
}

.header {
  margin-top: 0rem;
  width: 100%;
  max-height: 3rem;
  display: flex;
  justify-content: start;
  align-items: center;
  @media screen and (orientation: portrait) {
    margin-top: 1vh;
    margin-bottom: 0rem;
  }
}
.main_mobile {
  width: 100%;
  height: 20%;
  display: none;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 0.5rem;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar {
    background: transparent;
  }
  @media screen and (orientation: portrait) {
    display: flex;
    flex-direction: row;
  }
  &_photo {
    width: 12vh;
    height: 12vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    img {
      position: absolute;
      width: 80%;
      height: 80%;
      object-fit: cover;
      object-position: cover;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
      border: 0.5px solid green;
      border-radius: 10px;
      transition: all 0.5s;
      &:hover {
        transform: scale(1.3);
      }
    }
  }
}

.main {
  display: flex;
  width: 95vw;
  height: 80vh;
  justify-content: flex-start;
  overflow: hidden;
  align-items: center;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar {
    background: transparent;
  }
  @media screen and (orientation: portrait) {
    width: 100%;
    height: 75%;
  }
  @media screen and (max-height: 540px) {
    height: 90vh;
  }
  .main-left {
    margin-left: 2em;
    width: 35%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    @media screen and (orientation: portrait) {
      margin-left: 1rem;
    }
    .main-left__name {
      box-sizing: border-box;
      margin: 0px;
      height: auto;
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      p {
        font-size: max(3vw, 1.7rem);
      }
      .arrowR {
        width: max(1vw, 1rem);
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
          0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        transition: all 0.3s;
        opacity: 0.7;
        &:hover {
          transform: scale(1.2);
          opacity: 0.8;
        }
      }
      @media screen and (orientation: portrait) {
        display: flex;
      }
      @media screen and (max-height: 540px) {
        margin: 0 0 0 0;
      }
    }
    .main-left__data {
      flex: 1 1 35vh;
      max-height: 70%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      align-self: start;
      overflow: auto;
      @media screen and (orientation: portrait) {
        margin-top: 0rem;
      }
      p {
        margin: 0 0 0 0;
        display: flex;
        font-size: max(1.9vw, 1.3rem);
      }
    }
  }
  .main-center {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (orientation: portrait) {
      margin-top: 10rem;
      align-items: start;
    }
    .main-center__photos__mobile {
      justify-self: start;
      width: 100%;
      height: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and (orientation: landscape) {
        display: none;
      }
      .photos_mobile {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        img {
          position: absolute;
          width: 80%;
          height: 80%;
          object-fit: cover;
          object-position: cover;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
          border: 0.5px solid green;
          border-radius: 10px;
          transition: all 0.5s;
        }
      }
    }
    .main-center__photos {
      width: 90%;
      height: 90%;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      position: relative;
      justify-content: center;
      align-items: start;
      padding: 0;
      margin: 0;
      cursor: pointer;
      @media screen and (orientation: portrait) {
        display: none;
      }
      .photo__LU {
        width: 50%;
        height: 100%;
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
        display: flex;
      }
      .LU__DOWN_left {
        height: 100%;
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .LU__DOWN_right {
        height: 100%;
        width: 55%;
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
        display: flex;
      }
      .RU__UP_left {
        height: 100%;
        width: 55%;
        display: flex;
        flex-direction: column;
      }
      .RU__UP_right {
        height: 100%;
        width: 45%;
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
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: cover;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
          border: 0.5px solid green;
          border-radius: 10px;
          transition: all 0.5s;
          &:hover {
            z-index: 100;
            transform: scale(1.1);
          }
        }
      }
    }
  }
  .main-right {
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
    position: relative;
    width: 25%;
    height: 80%;
    @media screen and (orientation: portrait) {
      gap: 5vh;
      align-self: start;
      margin-top: 11vh;
      margin-right: 1rem;
      height: 30%;
    }
    &_top,
    &_center,
    &_bottom {
      width: 100%;
      height: 33%;
      position: relative;
      @media screen and (orientation: portrait) {
      }
    }
  }
}

.footer {
  margin-bottom: 1rem;
  display: flex;
  width: 100vw;
  max-height: 3rem;
  justify-content: space-around;
  align-items: flex-end;
  flex-wrap: nowrap;
}
.image {
  width: 100%;
  height: auto;
  @media screen and (orientation: portrait) {
    object-fit: fill;
  }
}
</style>

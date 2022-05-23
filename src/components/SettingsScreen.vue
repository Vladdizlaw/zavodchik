<template>
  <div
    class="wrapper"
    :class="{
      dog:
        !user.animals[0] ||
        (user.animals[0] && user.animals[currentAnimal].typeAnimal == 'dog'),
      cat: user.animals[0] && user.animals[currentAnimal].typeAnimal == 'cat',
    }"
  >
    <Modal ref="supportModal">
      <template #content>
        <div class="modal-warning">
          <p class="modal-warning_title">Опишите суть проблемы</p>
          <textarea
            class="modal-warning_input"
            type="textarea"
            v-model="msgToSupport"
          ></textarea>
          <button class="modal-warning_button" @click="sendToSupport">
            отправить в поддержку
          </button>
        </div>
      </template>
    </Modal>
    <section class="settings-common" v-if="state == 'start'">
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>

        <template #center>
          <div class="header__text">
            <img src="../assets/setting.svg" alt="" />
            <p>Настройка</p>
          </div>
        </template>
      </Header>
      <div class="main">
        <div class="main-menu">
          <p @click="state = 'contacts'">Контактные данные</p>
          <p v-if="user.animals[0]" @click="state = 'animal'">
            Данные животного
          </p>
          <p @click="state = 'chats'">Мои чаты</p>
          <p @click="state = 'noticed'">Настроить уведомления</p>
          <p @click="state = 'purchase'">Оплата</p>
        </div>
      </div>

      <div class="footer">
        <Header>
          <template #left>
            <support-button @support="getSupportWindow" />
          </template>
          <template #right>
            <logout-button @logout="logout" />
          </template>
        </Header>
      </div>
    </section>
    <section class="settings-contacts" v-show="state == 'contacts'">
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>

        <template #center>
          <div class="header__text">
            <p>Контактные данные</p>
          </div>
        </template>
        <template #right>
          <save-changes-button @saveProfile="save" />
        </template>
      </Header>
      <div class="main">
        <div class="contacts">
          <div class="wrapper-left">
            <p>Ваше имя</p>
            <p>Телефон</p>
            <p>E-mail</p>
            <p>Пароль</p>
            <p>Город</p>
            <p>Адрес (Район/Улица)</p>
          </div>
          <div class="wrapper-right">
            <input type="text" v-model="user.profile.name" />
            <div
              class="input__seen"
              @mouseenter="telMessageShow"
              @mouseleave="telMessageHide"
            >
              <input
                ref="tel"
                type="tel"
                v-phone
                v-model="user.profile.tel"
                :class="{ unseen: !seenTelFlag }"
              />
              <img
                src="../assets/seen.svg"
                @click="seenTel"
                alt=""
                v-if="seenTelFlag"
              /><img
                src="../assets/unseen.svg"
                v-if="!seenTelFlag"
                @click="seenTel"
                alt=""
              />
              <div ref="messageTel" class="input__seen__help">
                <p>
                  {{
                    seenTelFlag
                      ? "Другие польователи видят эти данные"
                      : "Другие польователи не видят эти данные"
                  }}
                </p>
              </div>
            </div>

            <input type="text" v-model="user.profile.mail" />
            <input type="text" v-model="user.profile.pass" />
            <select v-model="user.profile.city">
              <option
                :value="city"
                v-for="(city, ind) in selectedCity"
                :key="ind"
                >{{ city }}</option
              >
            </select>
            <div
              class="input__seen"
              @mouseenter="hoodMessageShow"
              @mouseleave="hoodMessageHide"
            >
              <input
                ref="hood"
                type="text"
                v-model="user.profile.hood"
                :class="{ unseen: !seenHoodFlag }"
              />
              <img
                src="../assets/seen.svg"
                v-if="seenHoodFlag"
                @click="seenHood"
                alt=""
              />
              <img
                src="../assets/unseen.svg"
                v-if="!seenHoodFlag"
                @click="seenHood"
                alt=""
              />
              <div ref="messageHood" class="input__seen__help hood">
                <p>
                  {{
                    seenHoodFlag
                      ? "Другие польователи видят эти данные"
                      : "Другие польователи не видят эти данные"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <Header>
          <template #left>
            <support-button @support="getSupportWindow" />
          </template>
          <template #right>
            <logout-button @logout="logout" />
          </template>
        </Header>
      </div>
    </section>
    <section class="settings-animal" v-if="state == 'animal'">
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>

        <template #center>
          <kinesis-container :duration="300">
            <div class="header__text">
              <p>Данные животного</p>
            </div>
          </kinesis-container>
        </template>
        <template #right>
          <save-changes-button @saveProfile="save" />
        </template>
      </Header>
      <div class="main-animal">
        <div class="wrapper-left__animal">
          <div class="animal__input">
            <p>Вид</p>
            <select v-model="user.animals[currentAnimal].typeAnimal">
              <option value="cat">Кошка </option>
              <option value="dog">Собака</option>
            </select>
          </div>
          <div class="animal__input">
            <p>Пол</p>
            <select v-model="user.animals[currentAnimal].male">
              <option value="male">мужской </option>
              <option value="female">Женский</option>
            </select>
          </div>
          <div class="animal__input">
            <p>Возраст</p>
            <input type="number" v-model="user.animals[currentAnimal].age" />
          </div>
          <div class="animal__input">
            <p>Кличка</p>
            <input type="text" v-model="user.animals[currentAnimal].name" />
          </div>
          <div class="animal__input">
            <p>Прививки</p>
            <input
              type="text"
              v-model="user.animals[currentAnimal].vaccination"
            />
          </div>
          <div class="animal__input">
            <p>Новый период случки</p>
            <input
              type="date"
              v-model="user.animals[currentAnimal].dateMating"
            />
          </div>
        </div>
        <div class="wrapper-right__animal">
          <div class="animal__input">
            <p>Окрас</p>
            <input type="text" v-model="user.animals[currentAnimal].color" />
          </div>
          <div class="animal__input">
            <p>Награды</p>
            <input type="text" v-model="user.animals[currentAnimal].awards" />
          </div>
          <div class="animal__input">
            <p>Условия вязки</p>
            <input
              type="text"
              v-model="user.animals[currentAnimal].matingConditions"
            />
          </div>
          <div class="animal__input" v-if="user.profile.animals.length > 1">
            <p>Выбрать другое животное</p>
            <select v-model="currentAnimal">
              <option
                v-for="(animalIndex, ind) in Object.keys(user.animals)"
                :key="ind"
                :value="animalIndex"
                >{{ user.animals[animalIndex].name }}</option
              >
            </select>
          </div>
        </div>
      </div>
      <div class="footer">
        <Header>
          <template #left>
            <support-button @support="getSupportWindow" />
          </template>
          <template #right>
            <logout-button @logout="logout" />
          </template>
        </Header>
      </div>
    </section>
    <section class="settings-noticed" v-if="state == 'noticed'">
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>

        <template #center>
          <kinesis-container :duration="300">
            <div class="header__text">
              <p>Настройка уведомлений</p>
            </div>
          </kinesis-container>
        </template>
        <template #right>
          <save-changes-button @saveProfile="save" />
        </template>
      </Header>
      <div class="main_noticed">
        <div class="wrapper-left_noticed">
          <div class="personal_data">
            <div
              class="personal_data_checkbox"
              @click="noticeBreed.value = !noticeBreed.value"
              :class="{ checked: noticeBreed.value }"
            ></div>
            <div class="personal_data_text">
              <p>Уведомлять о новых пользователях такой же породы</p>
            </div>
          </div>
          <div
            class="personal_data_inner"
            :class="{ enabled: noticeBreed.value }"
          >
            <div
              class="personal_data_checkbox"
              @click="
                noticeBreed.value
                  ? (noticeBreed.mail = !noticeBreed.mail)
                  : null
              "
              :class="{ checked: noticeBreed.mail }"
            ></div>
            <div class="personal_data_text">
              <p>По e-mail</p>
            </div>
          </div>
          <div
            class="personal_data_inner"
            :class="{ enabled: noticeBreed.value }"
          >
            <div
              class="personal_data_checkbox"
              @click="
                noticeBreed.value
                  ? (noticeBreed.push = !noticeBreed.push)
                  : null
              "
              :class="{ checked: noticeBreed.push }"
            ></div>
            <div class="personal_data_text">
              <p>С помощью push-уведомлений</p>
            </div>
          </div>
        </div>
        <div class="wrapper-right_noticed">
          <div class="personal_data">
            <div
              class="personal_data_checkbox"
              @click="noticeMatingDate.value = !noticeMatingDate.value"
              :class="{ checked: noticeMatingDate.value }"
            ></div>
            <div class="personal_data_text">
              <div>
                <p>
                  Уведомлять о новых сообщениях от пользователей когда офлайн
                </p>
              </div>
            </div>
          </div>
          <div
            class="personal_data_inner"
            :class="{ enabled: noticeMatingDate.value }"
          >
            <div
              class="personal_data_checkbox"
              @click="
                noticeMatingDate.value
                  ? (noticeMatingDate.mail = !noticeMatingDate.mail)
                  : null
              "
              :class="{ checked: noticeMatingDate.mail }"
            ></div>
            <div class="personal_data_text">
              <div><p>По e-mail</p></div>
            </div>
          </div>
          <div
            class="personal_data_inner"
            :class="{ enabled: noticeMatingDate.value }"
          >
            <div
              class="personal_data_checkbox"
              @click="
                noticeMatingDate.value
                  ? (noticeMatingDate.push = !noticeMatingDate.push)
                  : null
              "
              :class="{ checked: noticeMatingDate.push }"
            ></div>
            <div class="personal_data_text">
              <div><p>С помощью push-уведомлений</p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <Header>
          <template #left>
            <support-button @support="getSupportWindow" />
          </template>
          <template #right>
            <logout-button @logout="logout" />
          </template>
        </Header>
      </div>
    </section>
    <section class="settings-chats" v-if="state == 'chats'">
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>

        <template #center>
          <kinesis-container :duration="300">
            <div class="header__text">
              <p>Мои чаты</p>
            </div>
          </kinesis-container>
        </template>
        <template #right>
          <save-changes-button @saveProfile="save" />
        </template>
      </Header>
      <div class="main">
        <chats-screen
          :selfUser="user"
          :pusher="pusher"
          @updateUser="updateUser"
        />
      </div>
      <div class="footer">
        <Header>
          <template #left>
            <support-button @support="getSupportWindow" />
          </template>
          <template #right>
            <logout-button @logout="logout" />
          </template>
        </Header>
      </div>
    </section>
  </div>
</template>
<script>
import Header from "./Header.vue";
import BackButton from "./BackButton.vue";
import SaveChangesButton from "./SaveChangesButton.vue";
import SupportButton from "./SupportButton.vue";
import LogoutButton from "./LogoutButton.vue";
import Modal from "./Modal.vue";
import ChatsScreen from "./ChatsScreen.vue";
export default {
  name: "SettingsScreen",
  components: {
    Header,
    BackButton,
    SaveChangesButton,
    SupportButton,
    LogoutButton,
    Modal,
    ChatsScreen,
  },
  props: {
    user: Object,
    selectedCity: Array,
    pusher: Object,
    startState: String,
  },
  data() {
    return {
      state: "start",
      seenTelFlag: true,
      seenHoodFlag: true,
      seenHoodHelpMessage: "",
      noticeBreed: { value: false, mail: false, push: false },
      noticeMatingDate: { value: false, mail: false, push: false },
      msgToSupport: "",
      currentAnimal: 0,
    };
  },
  methods: {
    sendToSupport() {
      console.log(this.msgToSupport);
      this.$refs.supportModal.confirm();
    },
    updateUser() {
      this.$emit("updateUser", null);
    },
    getSupportWindow() {
      this.msgToSupport = "";
      this.$refs.supportModal.openModal();
    },
    logout() {
      this.$emit("logout", null);
    },
    hoodMessageShow() {
      this.$refs.messageHood.style.opacity = "0.8";
    },
    telMessageShow() {
      this.$refs.messageTel.style.opacity = "0.8";
    },
    hoodMessageHide() {
      console.log("hide", this.$refs.messageHood.style);
      this.$refs.messageHood.style.opacity = "0";
    },
    telMessageHide() {
      this.$refs.messageTel.style.opacity = "0";
    },

    back() {
      console.log(this.state);
      if (this.startState == "chats") {
        this.$emit("back", null);
        return;
      }
      if (this.state == "start") {
        this.$emit("back", null);
      } else {
        this.state = "start";
      }
    },

    contacts() {
      this.state = "contacts";
      // console.log(this.state);
    },
    save() {
      this.user.profile.seenFlags = {
        seenTelFlag: this.seenTelFlag,
        seenHoodFlag: this.seenHoodFlag,
      };
      // console.log(this.user);
      this.$emit("saveProfile", this.user);
    },
    seenTel() {
      if (this.seenTelFlag) {
        this.seenTelFlag = false;
      } else {
        this.seenTelFlag = true;
      }
    },
    seenHood() {
      if (this.seenHoodFlag) {
        this.seenHoodFlag = false;
      } else {
        this.seenHoodFlag = true;
      }
    },
  },
  watch: {
    "noticeBreed.value"(val) {
      if (!val) {
        this.noticeBreed.mail = false;
        this.noticeBreed.push = false;
      }
    },
    "noticeMatingDate.value"(val) {
      if (!val) {
        this.noticeMatingDate.mail = false;
        this.noticeMatingDate.push = false;
      }
    },
    
  },

  computed: {},
  mounted() {
    this.noticeBreed = this.user?.profile.noticeBreed;
    this.noticeMatingDate = this.user?.profile.noticeMessages;
    this.seenHoodFlag = this.user.profile.seenFlags?.seenHoodFlag;
    this.seenTelFlag = this.user.profile.seenFlags?.seenTelFlag;
    if(this.startState){
      this.state=this.startState
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/main.scss";
%flex-type {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
}

.unseen {
  opacity: 0.5;
}
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
  text-align: left;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    max-height: 7vh;
  }
}

.header__text {
  position: relative;

  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  /* font-size: 1.8em; */
  flex-wrap: nowrap;
  p {
    font-size: max(3vw, 2rem);
    margin-block-start: 0rem;
    margin-block-end: 0rem;
  }
  //

  @keyframes rotate {
    0% {
      transform: rotate(0turn);
    }

    100% {
      transform: rotate(1turn);
    }
  }
  img {
    height: max(4vw, 2.5rem);
    margin-right: 0.2rem;
    animation: rotate 2.5s 0s linear infinite forwards normal;
  }
}
.settings-common {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70vh;
  overflow: auto;
  // background-color: transparent;
  &::-webkit-scrollbar {
    width: 10px; // manage scrollbar width here
  }
  &::-webkit-scrollbar {
    background: transparent; // manage scrollbar background color here
  }
  &::-moz-scrollbar {
    width: 10px; // manage scrollbar width here
  }
  &::-moz-scrollbar {
    background: transparent; // manage scrollbar background color here
  }
  &_noticed {
    @extend %flex-type;
    align-items: center;
    justify-content: space-between;
    max-height: 80vh;
    width: 100vw;
    position: relative;
  }
}
.main-menu {
  // padding-top: 4rem;
  width: 100%;
  //  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  // line-height: 1rem;

  transition: all 0.4s;
  cursor: pointer;
  overflow: auto;
  // box-sizing: border-box;
  @media screen and(max-height:600px) {
    justify-content: center;
    gap: 0px;
    // align-items: start;
    // height: 40vh;
  }
  p {
    margin-block-end: 0.5rem;
    margin-block-start: 0.5rem;
    font-size: max(2.5vw, 1.8rem);
    transition: 0.3s;
  }
  p:hover {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5),
      10px 10px 4px rgba(9, 112, 7, 0.75);
    transform: scale(1.1);
  }
  p:active {
    text-shadow: 5px 2px 2px rgba(0, 0, 0, 0.5),
      2px 2px 2px rgba(9, 112, 7, 0.75);
    transform: scale(0.98);
  }
}

.footer {
  /* margin-top: 1rem; */
  margin-bottom: 1rem;
  //  margin-bottom: 1rem;
  display: flex;
  width: 100vw;
  // height: 10vh;
  justify-self: flex-end;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
}

.settings-contacts,
.settings-animal,.settings-chats {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  .contacts {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    width: 100vw;
    .wrapper-left {
      @extend %flex-type;
      /* padding-top: 1.8rem; */
      margin-left: 5vw;

      width: 30%;
      height: 100%;

      p {
        margin-block-end: 0rem;
        margin-block-start: 0rem;
        font-size: max(1.9vw, 1.4rem);
      }
    }
    .wrapper-right {
      @extend %flex-type;
      margin-left: 5vw;
      width: 70%;
      height: 100%;
      input,
      select {
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
        font-size: max(1rem, 1.4vw);
        transition: 0.3s;
        // opacity: 0.8;
        &:focus {
          transform: scale(110%);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
        }
        &:hover {
          transform: scale(110%);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.75);
        }
      }
      .input__seen {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        &:hover {
          img {
            transform: translateX(1.3rem);
            @media screen and (orientation: portrait) {
              transform: translateX(0.1rem);
            }
          }
        }
      }
      img {
        transition: 0.3s;
        padding-left: 0.2rem;
        width: max(2.5vw, 2rem);
      }
      .input__seen__help {
        justify-self: end;
        margin-left: 1rem;
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid #000000;
        box-sizing: border-box;
        border-radius: 10px;
        font-size: 1.3rem;
        width: fit-content;
        padding: 0 0.5rem 0 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 3rem;
        transition: 0.3s;
        position: relative;
        // right:-18vw;
        opacity: 0;
        transition: 0.3s;

        @media screen and (orientation: portrait) {
          border-radius: 10px 10px -20rem 10px;

          position: absolute;
          top: 0%;
          left: 50%;
          transform:translate(-60%,-150%)
        }

        p {
          margin-block-end: 0rem;
          margin-block-start: 0rem;
          font-size: max(1.2vw, 1rem);
        }
        /* visibility: hidden; */
      }
      &__animal {
        @extend %flex-type;
        // gap:6.5rem;
        justify-content: space-around;
        height: 100%;
        width: 50%;
      }
      &_noticed {
        @extend %flex-type;
        align-items: center;
        max-height: 50%;
        width: 100%;
      }
    }
  }

  &_noticed {
    @extend %flex-type;
    align-items: center;
    justify-content: space-between;
    max-height: 50%;
    width: 100%;
  }
}
.main-animal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  overflow: auto;
  // background-color: transparent;
  &::-webkit-scrollbar {
    width: 10px; // manage scrollbar width here
  }
  &::-webkit-scrollbar {
    background: transparent; // manage scrollbar background color here
  }
  &::-moz-scrollbar {
    width: 10px; // manage scrollbar width here
  }
  &::-moz-scrollbar {
    background: transparent; // manage scrollbar background color here
  }
  @media screen and (orientation: portrait) {
    flex-direction: column;
    height: 100%;
    padding-top:2rem;
  }
  @media screen and (max-height: 600px) {
    padding-top:2rem;

  }
}
.wrapper-left__animal,
.wrapper-right__animal {
  margin-left: 5rem;
  height: 100%;
  @extend %flex-type;
  width: 50%;
  // overflow:auto;
  @media screen and (orientation: portrait) {
    height: 50%;
    width: 100%;
   
  }
   @media screen and (max-height: 600px) {
   margin-left:1.5rem;
   gap:0.5rem;
    
  }
  p {
    margin-block-end: 0rem;
    margin-block-start: 0rem;
    font-size: max(1.9vw, 1.4rem);
  }
}
.animal__input {
  margin-top: -2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: max(4vw, 2rem);
  width: 40vw;
  @media screen and (orientation: portrait) {
    width: 80%;
  }
  select,
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
    font-size: max(1rem, 1.4vw);
    transition: 0.3s;
  }
}

.animal__input > input[type="date"] {
  width: 13.5rem;
}

.personal_data_checkbox {
  margin-top: 2rem;
  width: 1em;
  height: 1em;
  background: #ffffff;
  opacity: 0.5;
  border: 1px solid #000000;
  // box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  transition: all 0.2s;
  cursor: pointer;
}
.personal_data_checkbox:hover {
  width: 1.1em;
  height: 1.1em;
}
.personal_data_text {
  // width: 9em;
  display: flex;
  // position: relative;
  height: 5.5rem;
}

.checked {
  background: url("../assets/checked.svg");
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
}
.enabled {
  opacity: 1;
}
.modal-warning {
  width: 50vw;
  height: 100%;
  border: 1px solid black;
  @extend %flex-type;
  align-items: center;
  background: url("../assets/cover1.png");
  background-position: center;
  background-size: cover;
  overflow: hidden;
  filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));

  &_input {
    width: 70%;
    height: 55%;
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.25));
  }
  &_button {
    width: 10rem;
    background-image: url("../assets/cover_dog.png");
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
    font-size: 1.5rem;

    &:hover {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
        drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
    }
    &:active {
      filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
        drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
    }
  }
}

.settings_common {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>

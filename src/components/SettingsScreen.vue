<template>
  <div
    class="wrapper"
    :class="{
      dog: user.animal.typeAnimal == 'dog',
      cat: user.animal.typeAnimal == 'cat',
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
          <button class="modal-warning_button" @click="sendToSupport">отправить в поддержку</button>
        </div>
      </template>
    </Modal>
    <section class="settings-common" v-if="state == 'start'">
      <Header>
        <template #left>
          <back-button @back="back" />
        </template>

        <template #center>
          <kinesis-container :duration="300">
            <div class="header__text">
              <kinesis-element :strength="500" type="rotate">
                <img src="../assets/setting.svg" alt="" />
              </kinesis-element>
              <p>Настройка</p>
            </div>
          </kinesis-container>
        </template>
      </Header>
      <div class="main">
        <div class="main-menu">
          <p @click="state = 'contacts'">Контактные данные</p>
          <p @click="state = 'animal'">Данные животного</p>
          <p @click="state = 'chats'">Мои чаты</p>
          <p @click="state = 'noticed'">Настроить уведомления</p>
          <p>Оплата</p>
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
          <kinesis-container :duration="300">
            <div class="header__text">
              <p>Контактные данные</p>
            </div>
          </kinesis-container>
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
      <div class="main">
        <div class="wrapper-left__animal">
          <div class="animal__input">
            <p>Вид</p>
            <select v-model="user.animal.typeAnimal">
              <option value="cat">Кошка </option>
              <option value="dog">Собака</option>
            </select>
          </div>
          <div class="animal__input">
            <p>Пол</p>
            <select v-model="user.animal.male">
              <option value="мужской">мужской </option>
              <option value="Женский">Женский</option>
            </select>
          </div>
          <div class="animal__input">
            <p>Возраст</p>
            <input type="number" v-model="user.animal.age" />
          </div>
          <div class="animal__input">
            <p>Кличка</p>
            <input type="text" v-model="user.animal.name" />
          </div>
          <div class="animal__input">
            <p>Прививки</p>
            <input type="text" v-model="user.animal.vaccination" />
          </div>
          <div class="animal__input">
            <p>Возможный период случки</p>
            <input type="date" v-model="user.animal.dateMating" />
          </div>
        </div>
        <div class="wrapper-right__animal">
          <div class="animal__input">
            <p>Окрас</p>
            <input type="text" v-model="user.animal.color" />
          </div>
          <div class="animal__input">
            <p>Награды</p>
            <input type="text" v-model="user.animal.awards" />
          </div>
          <div class="animal__input">
            <p>Условия вязки</p>
            <input type="text" v-model="user.animal.matingConditions" />
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
              <div><p>Уведомлять о новых периодах для случки</p></div>
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
      <chats-screen :selfUser="user" :pusher="pusher"/>
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
import ChatsScreen from './ChatsScreen.vue';
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
  props: { user: Object, selectedCity: Array ,pusher:Object},
  data() {
    return {
      state: "start",
      seenTelFlag: true,
      seenHoodFlag: true,
      seenHoodHelpMessage: "",
      noticeBreed: { value: false, mail: false, push: false },
      noticeMatingDate: { value: false, mail: false, push: false },
      msgToSupport: "",
    };
  },
  methods: {
    sendToSupport(){
      console.log(this.msgToSupport)
      this.$refs.supportModal.confirm();

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
      this.$refs.messageHood.style.opacity = "0";
    },
    telMessageHide() {
      this.$refs.messageTel.style.opacity = "0";
    },

    back() {
      console.log(this.state);
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
    this.noticeBreed = this.user?.noticeBreed;
    this.noticeMatingDate = this.user?.noticeMatingDate;
    this.seenHoodFlag = this.user.profile.seenFlags?.seenHoodFlag;
    this.seenTelFlag = this.user.profile.seenFlags?.seenTelFlag;
  },
};
</script>
<style lang="scss" scoped>
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
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0rem;
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

.header__text {
  position: relative;

  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-size: 1.8em; */
  flex-wrap: nowrap;
}

.header__text > img {
  height: 1em;
  margin-right: 0.2em;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70vh;
  overflow:auto;
  // background-color: transparent;
  &::-webkit-scrollbar {
      width:30px; // manage scrollbar width here
    }
    &::-webkit-scrollbar  {
      background:transparent; // manage scrollbar background color here
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
  padding-top: 4rem;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  line-height: 81px;
  font-size: 1.2em;
  transition: all 0.4s;
  cursor: pointer;
}
.main-menu > p {
  margin-top: -3rem;
}
.main-menu > p:hover {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5),
    10px 10px 4px rgba(9, 112, 7, 0.75);
  font-size: 1.1em;
}
.footer {
  /* margin-top: 1rem; */
  /* margin-bottom: 0.5rem; */
  display: flex;
  width: 100vw;
  height: auto;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 0rem;
}

.contacts {
  display: flex;
  height: 90%;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
}

.wrapper-left {
  @extend %flex-type;
  /* padding-top: 1.8rem; */
  margin-left: 5rem;

  min-width: 30%;
  height: 100%;

  &__animal {
    margin-left: 5rem;
    height: 100%;
    @extend %flex-type;
    width: 50%;
  }
  &_noticed {
    @extend %flex-type;
    align-items: center;
    justify-content: space-between;
    max-height: 50%;
    width: 100%;
  }
}

.wrapper-right {
  @extend %flex-type;

  max-width: 70%;
  height: 100%;

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
.contacts > .wrapper-left > p {
  margin-top: -0rem;
}
.animal__input {
  margin-top: -2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  width: 40vw;
}
.animal__input > select,
.animal__input > input {
  font: inherit;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  height: 2.8rem;
  width: 25rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
}
.animal__input > input[type="date"] {
  width: 13.5rem;
}
.input__seen > img {
  margin-top: -1.3rem;
  /* display: flex; */
  padding-left: 0.2rem;
  width: 2.5rem;
  /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75)); */
}
.input__seen {
  display: flex;
  position: relative;
}
.input__seen__help {
  margin-top: -1.1rem;
  margin-left: 0.3rem;
  right: 0rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 1.3rem;
  /* width:15rem; */
  padding: 0 1rem 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 3rem;
  transition: 0.3s;
  position: relative;
  opacity: 0;
  transition: 0.3s;
  /* visibility: hidden; */
}

.input__seen > input,
.wrapper-right > input,
.wrapper-right > select {
  margin-top: -1rem;
  font: inherit;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  height: 1em;
  width: 13em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
  font-size: inherit;
}
input:hover,
select:hover {
  font-size: 1.01em;
  /* height: 2em; */
}
option {
  display: flex;
  justify-content: center;
  text-align: center;
}
.personal_data {
  // margin-top:2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  flex-wrap: nowrap;
  width: 45%;
  &_inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    margin-left: 5rem;
    width: 29%;
    flex-wrap: nowrap;
    opacity: 0.6;
  }
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
    background-image:  url("../assets/cover_dog.png");
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
    &:active{
       filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
        drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));

    }
  }
}
</style>

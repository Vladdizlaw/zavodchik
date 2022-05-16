<template>
  <div
    :class="{
      dog: searchParams.animalType == 'dog',
      cat: searchParams.animalType == 'cat',
    }"
  >
    <div class="formap">
      <Header class="formap_header">
        <template #left>
          <back-button @back="back" />
        </template>
        <template #center>
          <div class="formap_header_message">
            <p>{{ message }}</p>
          </div>
        </template>
      </Header>

      <div id="map"></div>
      <div class="logo" v-for="user in agregatedUsers" :key="user.profile.id">
        <div :id="'b' + user.profile.id" class="forimage">
          <img
            :src="require(`../assets/${srcpic()}.svg`)"
            class="catlogo"
            :data="user.profile.id"
            :alt="user.animal[0].name"
            @click="showLogoMsg(user.profile.id)"
          />
          <div
            class="logomsg"
            :id="'a' + user.profile.id"
            :class="{ active: clack }"
          >
            <img
              class="arrowR"
              src="../assets/ArrowR.svg"
              alt="next"
              @click="showNextAnimal(user.animal.length)"
              v-show="user.animal.length > 1"
            />
            <p>
              Порода:
              <span>{{
                user.animal.length > 1
                  ? user.animal[currentAnimalIndex].breed
                  : user.animal[0].breed
              }}</span>
            </p>
            <div class="logomsg__image">
              <img
                :src="getUrl(user)"
                v-if="user.animal[0].photoUrl.length > 0"
                alt=""
              />
            </div>
            <p>
              Пол:
              <span>{{
                user.animal.length > 1
                  ? animalMale(user.animal[currentAnimalIndex].male)
                  : animalMale(user.animal[0].male)
              }}</span>
            </p>
            <p>
              Возраст:
              <span>{{
                user.animal.length > 1
                  ? user.animal[currentAnimalIndex].age
                  : user.animal[0].age
              }}</span>
            </p>
            <p v-if="user.animal.length > 1
                    ? user.animal[currentAnimalIndex].dateMating
                    : user.animal[0].dateMating" class ="logomsg__mating"  >
              Вязка:
              <span
                ><br />{{
                  user.animal.length > 1
                    ?new Intl.DateTimeFormat().format(new Date(user.animal[currentAnimalIndex].dateMating))
                    :new Intl.DateTimeFormat().format(new Date(user.animal[0].dateMating))
                }}</span
              >
            </p>
            <button
              class="logomsg_button"
              @click.stop="viewDetails(user.profile.id)"
            >
              <p>Детали</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Overlay from "ol/Overlay";
import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import BackButton from "./BackButton.vue";
import Header from "./Header.vue";
import { URI_SERVER } from "../api.js";
export default {
  components: { Header, BackButton },
  //Компонент отрисовывает карту ставит метки на ней, принимает массив юзеров  и геопозицию
  name: "MapScreen",
  props: {
    location: Object,
    searchParams: Object,
    users: Object,
  },
  data() {
    return {
      map: null, //Объект карты
      clack: false, //флаг для отображения деталей на карте
      currentAnimalIndex: 0, // текущее животное одного хозяина
    };
  },

  computed: {
    message() {
      //Показывает сообщение о найденых юзерах
      if (!this.users.owners.length) {
        return "По вашему запросу ничего не найдено , попробуйте другой запрос";
      } else {
        return `По вашему запросу  найдено ${this.users.owners.length} пользователей `;
      }
    },
    agregatedUsers() {
      let result = [];
      if (this.users?.owners?.length == 0) {
        return null;
      }
      this.users?.owners?.forEach((owner) => {
        let animal = this.users.animals.filter((el) => {
          if (el.owner == owner.id) {
            return true;
          }
        });

        const aggUser = { profile: owner, animal };

        result.push(aggUser);
      });
      return result;
    },

    
  },
  async created() {},
  async mounted() {
    console.log("users",this.users, "aggUser",this.agregatedUsers);
    let projection = fromLonLat(
      //Позиция для центра карты по текущей геопозиции
      [this.location.longitude, this.location.latitude],
      "EPSG:3857"
    );
    this.map = new Map({ target: "map" }); //Создаем карту
    const view = new View({
      center: projection,
      zoom: 16,
      constrainResolution: true,
    });

    this.map.setView(view);
    const osmSource = new OSM();
    const osmLayer = new TileLayer({ source: osmSource });
    this.map.addLayer(osmLayer);
    this.agregatedUsers?.forEach((user) => {
      //выводим на карту всех юзеров
      const catlogo = new Overlay({
        element: document.getElementById("b" + user.profile.id),
      });
      catlogo.setPosition(
        fromLonLat([
          user.profile.location.longitude,
          user.profile.location.latitude,
        ])
      );
      this.map.addOverlay(catlogo);
    });
    window.addEventListener("resize", this.updateMap, true);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMap);
  },

  methods: {
    srcpic() {
      //Random иконок на карте
      if (this.searchParams.animalType == "dog") {
        let arrPic = [
          "dogmap1",
          "dogmapc",
          "dogmap",
          "dogmapc1",
          "dogmap2",
          "dogmapc2",
          "dogmap3",
          "dogmapc3",
          "dogmap4",
          "dogmapc4",
          "dogmap5",
          "dogmapc5",
          "dogmap6",
          "dogmapc6",
          "dogmap7",
          "dogmap8",
        ];
        return arrPic[Math.floor(Math.random() * arrPic.length)];
      } else {
        let arrPic = [
          "catmap1",
          "catmapc",
          "catmap",
          "catmap2",
          "catmapc2",
          "catmap3",
          "catmapc3",
          "catmap4",
          "catmapc4",
          "catmap5",
          "catmapc5",
          "catmap6",
          "catmapc6",
          "catmap7",
          "catmapc7",
        ];
        return arrPic[Math.floor(Math.random() * arrPic.length)];
      }
    },
    animalMale(male) {
      if (male == "male") {
        return "муж";
      } else {
        return "жен";
      }
    },
    showNextAnimal(animalArrayLength) {
      if (this.currentAnimalIndex < animalArrayLength-1 ) {
        ++this.currentAnimalIndex;
        console.log(
          "length",
          animalArrayLength,
          "Index",
          this.currentAnimalIndex
          
        );return
      } else if (this.currentAnimalIndex >= animalArrayLength-1 ) {
        this.currentAnimalIndex=0;
        console.log(
          "length",
          animalArrayLength,
          "Index",
          this.currentAnimalIndex
        );return
      }
    },
    updateMap() {
      setTimeout(() => {
        this.map.updateSize();
      }, 400);
    },
    showLogoMsg(id) {
      // Делает видимым/невидимым logomsg
      const div = document.querySelector(`#a${String(id)}`);
      if (div.style.opacity == 0) {
        div.style.opacity = 1;
        div.classList.add("active");
      } else {
        div.style.opacity = 0;
        div.classList.remove("active");
        this.currentAnimalIndex=0
      }
    },
    back() {
      this.$emit("back", "map");
    },
    getUrl(user) {
      //Возращает url фото юзера на сервере
      if (!user.animal[0].photoUrl[0]) {
        return "no foto";
      } else if (user.animal.length == 1) {
        return `${URI_SERVER}/` + user.animal[0].photoUrl[0];
      } else if (user.animal.length>1){
         return `${URI_SERVER}/` + user.animal[this.currentAnimalIndex].photoUrl[0];
      }
    },

    viewDetails(data) {
      this.$emit("viewDetails", { id: data });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/main.scss";
.formap {
  user-select: none;      
  padding-top: 2rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  &_header {
    position: absolute;
    top: -1rem;
    object-fit: cover;
    @media screen and(orientation:portrait) {
      top: 1rem;
    }
    &_message {
      p {
        font-family: $font-family;
        text-shadow: $textshadow;
        font-size: max(2vw, 1rem);
      }
    }
  }
}

#map {
  user-select: none;  
  width: 80vw;
  height: 80vh;
  border: 1px solid;
  border-radius: 3px;
  transition: 0.4s;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  @media screen and(orientation:portrait) and (max-height: 750px) {
    height: 70vh;
  }
  @media screen and(max-height:340px) {
    height: 60vh;
  }
  &:hover {
    filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.55))
      drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25));
  }
}

.dog {
  height: 100vh;
  background: url("../assets/cover_dog.png");
  background-position: center;
  background-size: cover;
}
.cat {
  height: 100vh;
  background: url("../assets/cover_cat.png");
  background-position: center;
  background-size: cover;
}
.forimage {
  position: relative;
}
.catlogo {
  width: max(5vw, 2.8rem);
  height: max(6vh, 2.8rem);
  transition: all 1s;
  &:hover {
    transform: scale(1.2)
  }
  &:active {
   transform: scaleZ(2.3);
  }
}

.logomsg {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 50px 0px;
  padding: 1rem 1rem 1rem 1rem;
  background: url("../assets/cover1.png");
  background-position: center;
  background-size: cover;
  width: max(10rem, 12vw);
  height: fit-content;
  // object-fit:cover;
  z-index: 1;
  display: none;
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: max(1.3vw, 1rem);
  line-height: 1rem;
  position: relative;
  opacity: 0;
  transition: all 0.5s;
 
  @media screen and (orientation: portrait) {
    font-size: max(1.3vh, 1rem);
    line-height: 0.7rem;
  }
  &:hover {
    // font-size: max(1.3vw, 1.3rem);

    transform: scaleX(1.1);
    z-index: 1000;
    filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.55))
      drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25));
  }
  &__mating{
    display:flex;
    flex-wrap: wrap;
    max-width:35%;
  }
  &__image {
    width: 30%;
    height: 52%;
    position: absolute;
    top: 35%;
    left: 1em;
    border: 1px solid black;
    transition: all 0.5s;
    border-radius: 10px 10px;
    overflow: hidden;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    &:hover {
      img {
        transform: scale(1.2);
      }
    }
    img {
      object-fit: cover;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px 10px;
      transition: 0.5s;
      // &:hover {
      //   width: 110%;
      //   // transform: scale(1.1);
      // }
    }
  }
  &_button {
    font: inherit;
    font-size: 1em;
    /* align-self: center; */
    border: 1px solid;
    width: auto;
    margin-right: 1rem;
    height: 2em;
    border-radius: 0px 10px;
    background-color: transparent;
    text-align: center;
    align-content: center;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    &:hover {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
      filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.55))
        drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25));
    }
    &:active {
      box-shadow: 4px 3px black;
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

.active {
  background: url("../assets/cover1.png");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
}

.logo {
  display: none;
}

span {
  text-shadow: 0px 4px 4px #013309, 0px 4px 4px #025e00, 0px 4px 4px #00ff38;
}
</style>

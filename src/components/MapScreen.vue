<template>
  <div
    :class="{
      dog: searchParams.animalType == 'dog',
      cat: searchParams.animalType == 'cat',
    }"
  >
    <div class="formap">
      <div id="map"></div>
      <div class="logo" v-for="user in users" :key="user.id">
        <div :id="user.name" class="forimage">
          <img
            :src="require(`../assets/${srcpic}.svg`)"
            class="catlogo"
            :alt="user.name"
            @mouseenter="clack = true"
            @mouseleave="clack = false"
          />
          <div
            class="logomsg"
            @mouseenter="(clack = true), upElement($event)"
            @mouseleave="(clack = false), downElement($event)"
            :class="{ active: clack }"
          >
            <p>
              Порода: <span>{{ user.breed }}</span>
            </p>
            <p>
              Возраст: <span>{{ user.age }}</span>
            </p>
            <p>
              Дата вязки: <span>{{ user.dateMating }}</span>
            </p>
            <button @click.stop="viewDetails(user.id)">
              
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
export default {
  //Компонент отрисовывает карту ставит метки на ней, принимает тип животного и геопозицию
  name: "MapScreen",
  props: {
    location: Object,
    searchParams: Object,
  },
  data() {
    return {
      users: null,

      clack: false, //aфлаг для отображения деталей на карте
    };
  },
  computed: {
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
  },
  created() {
    this.getUsersData();
  },
  mounted() {
    let projection = fromLonLat(
      //Позиция для центра карты по текущей геопозиции
      [this.location.coords.longitude, this.location.coords.latitude],
      "EPSG:3857"
    );
    const map = new Map({ target: "map" }); //Создаем карту
    const view = new View({
      center: projection,
      zoom: 16,
      constrainResolution: true,
    });

    map.setView(view);
    const osmSource = new OSM();
    const osmLayer = new TileLayer({ source: osmSource });
    map.addLayer(osmLayer);
    // console.log(this.location);
    this.users.forEach((user) => {
      //выводим на карту всех юзеров
      const catlogo = new Overlay({
        element: document.getElementById(user.name),
      });
      catlogo.setPosition(fromLonLat([user.lat, user.long]));
      map.addOverlay(catlogo);
    });
  },
  methods: {
    upElement(f) {
      //отображение деталей на карте без opacity
     
      f.path[0].style.opacity = 1;
    },
    downElement(f) {
     
      f.path[0].style.opacity = 0.2;
    },
    getUsersData() {
      //Получаем данные о юзерах из файла (заглушка)
      if (this.searchParams.animalType == "dog") {
        this.users = require("../user_dog.json");
      } else {
        this.users = require("../user_cat.json");
      }
    },
    viewDetails(data) {
      this.$emit("viewDetails", { id: data });
      // console.log(data);
    },
  },
};
</script>
<style scoped>
.formap {
  padding-top: 2em;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  /* margin-top: 2em; */
}
#map {
  width: 90%;
  height: 90vh;
  border: 1px solid;
  border-radius: 5px;
  box-shadow: 4px 6px rgb(38, 44, 11);
}
#map:hover {
  box-shadow: 5px 7px black;
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
  z-index: 100;
}
.catlogo {
  width: 5em;
  height: 5em;
  transition: all 1s;
}
.catlogo:hover {
  width: 6em;
  height: 6em;
  /* color: rgb(9, 39, 9); */
}
.catlogo:active {
  transform: rotate(180deg);
}

.logomsg {
  /* border: 2px solid; */
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 50px 0px;

  background: url("../assets/cover1.png");
  background-position: center;
  background-size: cover;
  min-width: 10em;
  min-height: 7em;
  /* color: rgb(41, 3, 3); */
  z-index: -1;
  display: none;
  box-shadow: 5px 7px rgb(3, 73, 3);
  font-family: Amatic SC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  position: relative;
  opacity:1;
  transition: all 0.5s;
}
.logomsg:hover{
  font-size:1.3em;
  width:11em;
  height:8em;
}
.active {
  background: url("../assets/cover1.png");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* opacity: 1; */
  position: relative;
   opacity: 0.2; 
 
  z-index: 1000;
  overflow: hidden;
}

.logo {
  display: none;
}
button {
  border: 1px solid;
  width: 50%;
  
  border-radius: 0 50px;
  /* background-color: rgba(31, 236, 117, 0.5); */
  /* box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25); */
  font-size: 0.7em;
}
button:hover {
  box-shadow: 3px 4px black;
}
button:active {
  box-shadow: 4px 3px black;
}
span {
  text-shadow: 0px 4px 4px #013309, 0px 4px 4px #025e00, 0px 4px 4px #00ff38;
}
</style>

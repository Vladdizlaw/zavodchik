<template>
  <div class="photo">
    <div>
      <p>{{ message }}</p>
    </div>
    <div class="forphoto">
      <img
        class="arrowL"
        src="../assets/ArrowL.svg"
        alt="previos"
        @click="previos"
        v-show="page > 1"
      />

      <label
        for="fileupload"
        class="square"
        v-if="
          (photo.length < 1 && page == 1) ||
            (photo.length < 4 && page == 2) ||
            (photo.length < 7 && page == 3)
        "
      >
        <input
          id="fileupload"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          @change="onFileChange"
        />
      </label>

      <label
        class="square"
        v-if="
          (photo.length < 2 && page == 1) ||
            (photo.length < 5 && page == 2) ||
            (photo.length < 8 && page == 3)
        "
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          @change="onFileChange"
        />
      </label>

      <label
        class="square"
        v-if="
          (photo.length < 3 && page == 1) ||
            (photo.length < 6 && page == 2) ||
            (photo.length < 9 && page == 3)
        "
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          @change="onFileChange"
        />
      </label>
      <img
        class="square"
        :src="imageUrl[currentposition]"
        :alt="photo"
        v-if="
          (photo.length > 0 && page == 1) ||
            (photo.length > 3 && page == 2) ||
            (photo.length > 6 && page == 3)
        "
        @click="deletePhoto(0)"
      />
      <img
        class="square"
        :src="imageUrl[currentposition + 1]"
        :alt="photo"
        v-if="
          (photo.length > 1 && page == 1) ||
            (photo.length > 4 && page == 2) ||
            (photo.length > 7 && page == 3)
        "
        @click="deletePhoto(1)"
      />
      <img
        class="square"
        :src="imageUrl[currentposition + 2]"
        :alt="photo"
        v-if="
          (photo.length > 2 && page == 1) ||
            (photo.length > 5 && page == 2) ||
            (photo.length > 8 && page == 3)
        "
        @click="deletePhoto(3)"
      />
      <img
        class="arrowR"
        src="../assets/ArrowR.svg"
        alt="next"
        @click="next"
        v-show="photo.length >= 3 && page < 3"
      />
    </div>
    <div class="error" :v-show="error">{{ error }}</div>
  </div>
</template>
<script>


export default {
  name: "PhotoAdd",
  props: { message: String },
  data() {
    return {
      imageUrl: [],
      photo: [],
      page: 1,
      currentposition: 0,
      error: "",
    };
  },
  watch: {
    page() {
      // console.log((this.page - 1) * 3);
      this.currentposition = (this.page - 1) * 3;
    },
  },
  methods: {
    validate(fileName) {
      const arrFileName = fileName.split(".");
      const allowedExt = ["jpg", "gif", "png", "jpeg", "bmp"];
      if (allowedExt.includes(arrFileName[arrFileName.length - 1])) {
        return true;
      } else {
        this.error = "Неподдерживаемый тип файлов";
        setTimeout(() => {
          this.error = "";
        }, 3000);
        return false;
      }
    },
    onFileChange(f) {
      if (this.validate(f?.target?.files[0]?.name)) {
        this.photo.push(f.target.files[0]);
        this.imageUrl.push(URL.createObjectURL(f.target.files[0]));
        this.$emit("photo", { photo: this.photo });
      }

      return;
    },
    deletePhoto(n) {
      this.photo.splice(this.currentposition + n, 1);
      this.imageUrl.splice(this.currentposition + n, 1);
    },
    previos() {
      if (this.page <= 1) {
        return;
      }
      this.page--;
    },
    next() {
      if (this.page >= 3) {
        return;
      }
      this.page++;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/main.scss";
.photo {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-items: center;
  gap: 0.3rem;
}
.forphoto {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: max(1rem, 2vw);
  position: relative;
}
.arrowL {
  position: absolute;
  left: -1em;
}
.arrowR {
  position: absolute;
  left: 104%;
}
.square {
  width: max(3.6rem, 5vw);
  height: max(3.6rem, 5vw);
  border: 1px solid;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;
  background: #ffffff;
  opacity: 0.5;
  transition: all 0.3s;
  cursor: pointer;
}
.square:after {
  content: "";
  position: absolute;
  /* width:1px; */
  height: 80%;
   top: 10%;
  @media screen and (orientation: portrait){
    height: 83%;
    top:5%;
  }
  border: 2px solid;
 
}
.square:before {
  content: "";
  position: absolute;
  /* width:1px; */
  width: 80%; 
  border: 2px solid;
  top: 50%;
  left: 10%;
  @media screen and (orientation: portrait){
    left:5%;
    width: 83%;
  }
 
}
.square:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25), 0px 6px 6px rgba(0, 0, 0, 0.25),
    0px 6px 6px rgba(0, 0, 0, 0.25);
  transform: scale(110%);
  opacity: 1;
}
input[type="file"] {
  color: transparent;
  opacity: 0;
  display: none;
}
p {
  font-family: $font-family;
  text-shadow: $textshadow;
  font-size: max(2.5vw, 1.7rem);

  text-align: left;
}
.error {
  display: flex;
  font-family: $font-family;
  font-style: normal;
  font-weight: bold;
  font-size: max(1.4vw, 0.9rem);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  color: #ff0000;

  bottom: -1em;
  position: absolute;
}
</style>

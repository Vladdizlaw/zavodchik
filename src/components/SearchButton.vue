<template>
  <div class="search" @click="search">
    <img src="../assets/search.svg" alt="" />
    <p>Поиск пары</p>
  </div>
</template>
<script>
export default {
  name: "SearchButton",

  data() {
    return {};
  },
  methods: {
    search() {
      this.$emit("search", null);
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  font-family: "Amatic SC";
  font-size: max(2.7vw, 2rem);
  font-style: normal;
  font-weight: 900;
  width: auto;
  gap: 0.2rem;
  line-height: 1.5rem;
  letter-spacing: 0rem;
  text-align: left;
  cursor: pointer;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: matrix(1, 0, 0, 1, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s;
  p {
    box-sizing: border-box;
    @media screen and (max-width: 450px) {
      display: none;
    }
  }
  img {
    height: object-fit;
  }
}

.search:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>

<template>
  <div class="setings_button" @click="settings">
    <img class="roll" src="../assets/setings.svg" alt="" />
    <p>Настройка</p>
  </div>
</template>
<script>
export default {
  name: "SettingsButton",
  data() {
    return {};
  },
  methods: {
    settings() {
      this.$emit("settings", null);
    },
  },
};
</script>
<style lang="scss" scoped>
.setings_button {
  font-size: 2.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  p {
    font-size: max(2.7vw, 2rem);
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  &:hover .roll {
  transform: rotate(1080deg);
}
&:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
}
.roll {
  height: max(3.6vw, 2.5rem);
  transition: 0.4s;
  margin-right: -0.5rem;
  @media screen and (max-width: 600px) and (min-height: 580px) {
    height: 2.9rem;
    // margin-bottom: 1rem;
  }
}



</style>

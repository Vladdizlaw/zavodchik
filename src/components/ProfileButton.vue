<template>
  <div class="profile" @click="profile">
    <p>Мой профиль</p>
    <img src="../assets/profile.svg" alt="" />
  </div>
</template>
<script>
export default {
  name: "ProfileButton",

  data() {
    return {};
  },
  methods: {
    profile() {
      this.$emit("back", { state: "profile" });
    },
  },
};
</script>
<style scoped>
.profile {
  font-size: 2.5rem;
  display: flex;
  /* width: 5rem; */
  flex-wrap: nowrap;
  gap: 0.15rem;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
}
.profile > img {
  height: 0.7em;
}
.profile:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
.profile:active {
  filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
    drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
}
</style>

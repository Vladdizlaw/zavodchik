<template>
  <div class="supportbutton" @click="callSupport">
    <img src="../assets/support.svg" alt="" />
    <p>Поддержка</p>
  </div>
</template>
<script>
export default {
  name: "SupportButton",

  data() {
    return {};
  },
  methods: {
    callSupport() {
      this.$emit("support", null);
    },
  },
};
</script>
<style scoped>
.supportbutton {
  display: flex;
  justify-content: center;
  min-width: 10rem;
  margin-left: 0.3rem;
  align-items: center;
  transition: 0.3s;
}
.supportbutton:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>

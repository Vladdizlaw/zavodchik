<template>
<div>
  <div class="savebutton" @click="save">
    <img src="../assets/save.svg"  />
    <p>Сохранить изменения</p>
  </div>
</div>
</template>
<script>
export default {
  name: "SaveChangesButton",
  props: {},
  data() {
    return {};
  },
  methods: {
    save() {
     
      this.$emit("saveProfile", null);
    },
  },
};
</script>
<style scoped>
.savebutton {
  display: flex;
  flex-wrap: nowrap;
  gap:0.3rem;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3s;
  cursor: pointer;
  
}
.savebutton :hover{
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
.savebutton :active {
  filter: drop-shadow(0px 4px 4px rgba(39, 33, 33, 0.5))
    drop-shadow(10px 10px 4px rgba(4, 24, 4, 0.75));
}
</style>

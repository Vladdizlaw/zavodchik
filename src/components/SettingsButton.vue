<template>
    <div class="footer-setings" @click="settings">
      <img class="roll" src="../assets/setings.svg" alt="" />
      <p>Настройка</p>
    </div>
</template>
<script>
export default {
    name:'SettingsButton',
    data() {
        return{

        }
        
    },
    methods:{
         settings() {
      this.$emit("back", { state: "settings" });
    },
    }
}
</script>
<style scoped>
.footer-setings {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
}
.roll{
  transition: 0.3s;
}


.footer-setings:hover .roll {
  transform: rotate(1080deg);
  
}
.footer-setings:hover {
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>
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
      this.$emit('settings',null)
    },
    }
}
</script>
<style scoped>
.footer-setings {
  font-size: 2.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  
}
.roll{
  height:3.7rem;
  transition: 0.4s;
  margin-right: -0.5rem;
}


.footer-setings:hover .roll {
  transform: rotate(1080deg);
  
}
.footer-setings:hover {
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>
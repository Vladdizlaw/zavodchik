<template>
     <div class="header__save" @click="save" v-show="state !== 'start'">
        <img src="../assets/save.svg" alt="" />
        <p>Сохранить изменения</p>
      </div>
</template>
<script>
export default {
    name: 'SaveChangesButton',
    props:{
        
    },
    data() {
        return {

        }
        
    },
    methods:{
        save(){

        }
    }
}
</script>
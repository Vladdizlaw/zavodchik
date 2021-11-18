<template>
    <div>
        <img :src="url" alt="" width="100" height="100">
    </div>
</template>
<script>
export default {
    name:'ProfileScreen',
    props:{
        user:Object
    },
    data(){
        return{
            url:null
        }
    },
    mounted(){
        console.log(this.user)
        this.url=URL.createObjectURL(this.user.animal.photoAnimal[0])
    }
}
</script>
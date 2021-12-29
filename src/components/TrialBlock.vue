<template>
     <div class="trial-block">
      <p>До конца пробного периода осталось: {{ lastTrialTime }} дней</p>
      <button @click="pay">Оплатить</button>
    </div>
</template>
<script>
export default {
    name:'TrialBlock',
    props:{'startTrial':Object},
    data() {
        return {
            
        }
    },
    methods:{
         pay() {
         this.$emit('pay',null)

    },
    },
     computed: {
    lastTrialTime() {
      const timestampNow = Date.now();
      let result = Math.round(
        (this.startTrial.dateEnd - timestampNow) / 5184000
      );
      return result;
    },
  },
}
</script>
<style scoped>
.trial-block {
  display: flex;
  /* min-width: 68%; */
  justify-content: center;
  align-items: center;
  gap: 1em;
  font-size: 2rem;
}
.trial-block > button {
    height:2rem;
    width:6rem;
  border: 1px solid #000000;
  box-sizing: border-box;
   transition: 0.3s;
  border-radius: 15px 0px;
  padding: 0 1em 0 1em;
  background: transparent;
}
button:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>
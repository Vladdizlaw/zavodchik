<template>
<div class="wrapper">
 <div class="trial-block" v-if="lastTrialTime>0">
    <p>До конца подписки осталось:</p>
    <strong> {{ lastTrialTime }} {{pluralize(lastTrialTime)}}</strong>
    <button @click="pay">Оплатить</button>
  </div>
  <div class="trial-block" v-if="lastTrialTime<=0">
    <p>Подписка закончилась</p>
    <strong></strong>
    <button @click="pay">Оплатить</button>
  </div>

</div>
 
</template>
<script>
export default {
  name: "TrialBlock",
  props: { startTrial: Object },
  data() {
    return {};
  },
  methods: {
    pay() {
      this.$emit("pay", null);
    },
     pluralize(day) {

      const dictDay={
        0:'дней',
        1:'день',
        2:'дня',
        3:'дня',
        4:'дня',
        5:'дней'
      }
      return day>5?'дней':dictDay[day]
    },
  },
  computed: {
   

    lastTrialTime() {
      console.log('trial-block',Date(this.startTrial?.dateEnd),Date.now())
      const timestampNow = Date.now();
      let result = Math.round(
        (Date.parse(this.startTrial?.dateEnd) - timestampNow) / 86_400_000
      );
      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
.trial-block {
  display: flex;
  /* min-width: 68%; */
  justify-content: center;
  align-items: center;
  gap: 1rem;
  p {
    line-height: 1.2rem;
    box-sizing: border-box;
    font-size: max(2.3vw, 1.5rem);

    @media screen and (max-width: 765px) {
      display: none;
    }
  }
  strong {
    display: flex;
    font-size: max(2vw, 1.3rem);
     @media screen and (max-width: 470px) {
      display: none;
    }

  }
}
button {
  height: 2rem;
  width: 6rem;
  border: 1px solid #000000;
  box-sizing: border-box;
  transition: 0.3s;
  border-radius: 15px 0px;
  padding: 0 1rem 0 1rem;
  background: transparent;
}
button:hover {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(10px 10px 4px rgba(9, 112, 7, 0.75));
}
</style>

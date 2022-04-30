<template>
  <div class="trial-block">
    <p>До конца пробного периода</p>
    <strong>осталось: {{ lastTrialTime }} дней</strong>
    <button @click="pay">Оплатить</button>
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
  },
  computed: {
    lastTrialTime() {
      console.log('trial-block',this.startTrial)
      const timestampNow = Date.now();
      let result = Math.round(
        (this.startTrial?.dateEnd - timestampNow) / 86_400_000
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

import Vue from "vue";
import App from "./App.vue";
import VueKinesis from "vue-kinesis";
import VueRouter from 'vue-router'
import router from "./router/routes.js"

import Vuex from "vuex";
import store from './store/index.js'
Vue.config.productionTip = false;
Vue.use(VueKinesis);
Vue.use(VueRouter)
new Vue({
  store,router,
  render: (h) => h(App),
}).$mount("#app");

Vue.directive("phone", {
  bind(el) {
    function replaceNumberForInput(value) {
      let val = "";
      const x = value
        .replace(/\D/g, "")
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

      if (!x[2] && x[1] !== "") {
        val = x[1] === "8" ? x[1] : "8" + x[1];
      } else {
        val = !x[3]
          ? x[1] + x[2]
          : x[1] + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
      }

      return val;
    }

    function replaceNumberForPaste(value) {
      const r = value.replace(/\D/g, "");
      let val = r;
      if (val.charAt(0) === "7") {
        val = "8" + val.slice(1);
      }
      return replaceNumberForInput(val);
    }

    el.oninput = function(e) {
      if (!e.isTrusted) {
        return;
      }
      this.value = replaceNumberForInput(this.value);
    };

    el.onpaste = function() {
      setTimeout(() => {
        const pasteVal = el.value;
        this.value = replaceNumberForPaste(pasteVal);
      });
    };
  },
});
// Vue.use(VueKinesis);
Vue.use(Vuex);


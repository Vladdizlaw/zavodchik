import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      animal: {
        type: "",
        male: "",
        age: null,
        breed: "",
        name: "",
        dateMating: null,
        awards: null,
        vaccination: null,
        color: null,
        matingConditions: null,

        licenseAgreement: false,

        startTrial: {
          value: false,
          date: null,
          dateStart: null,
          dateEnd: null,
        },
      },
      id: null,
      location: null,
      photoAnimal: [],
      photoLitter: [],
      profile: {
        mail: "",
        tel: "",
        name: "",
        pass: "",
        city: "",
        id: "",
        hood: "",
        seenFlags: { seenHoodFlag: true, seenTelFlag: true },
      },
    },
  },
  getters: {
    USER: (state) => {
      return state.user;
    },
  },
  mutations: {
    SAVE_USER_PROFILE: (state, payload) => {
      Object.keys(payload).forEach((key) => {
        state.user.profile[key] = payload[key];
        console.log("save profile -", key);
      });
    },
    SAVE_USER_ANIMAL: (state, payload) => {
      Object.keys(payload).forEach((key) => {
        state.user.animal[key] = payload[key];
        console.log("save animal -", key);
      });
    },
    SAVE_USER: (state, payload) => {
      Object.keys(payload).forEach((key) => {
        state.user[key] = payload[key];
        console.log("save user", key);
      });
    },
  },
  actions: {
    GET_USER: async (context) => {
      let { data } = await Axios.get("http://localhost:5000/get_user");
      context.commit("SAVE_USER", data);
    },
    // POST_USER:async (context,payload)=>{
    //   await axios.post('http://localhost:5000/create_user',payload)
    // }
  },
});

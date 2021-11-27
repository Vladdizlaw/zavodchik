import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
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
          photoAnimal: [],
          photoLitter: [],
          licenseAgreement: false,
          
          startTrial: {
            value: false,
            date: null,
            dateStart: null,
            dateEnd: null,
          },
        },
        location: {},
        city: "",
        id: null,
        profile: {
          mail: "",
          tel: "",
          name: "",
          pass: "",
          city: "",
          id: "",
          hood: "",
          seenFlags:{seenHoodFlag:true,seenTelFlag:true},
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
        Object.keys(payload).forEach(key=>{
         state.user.profile[key] = payload[key]
        })
        console.log('save',state.user)
      },
      SAVE_USER_ANIMAL: (state, payload) => {
        Object.keys(payload).forEach(key=>{
         state.user.animal[key] = payload[key]
        })
        console.log('save',state.user)
      },
    },
  });
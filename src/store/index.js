import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
// import AnimalModule from "./modules/animal.js";

import ProfileModule from "./modules/profile.js";
Vue.use(Vuex);
export default new Vuex.Store({
  
  modules: {
    
    animals: {} ,
    profile: ProfileModule,
   
  },
  getters: {
    USER: (state) => {
      return state;
    },
  },
  mutations:{
    SAVE_ANIMAL: (state,payload)=>{
      const ind=payload.ind
      console.log('ind-',ind)
      Object.keys(payload).forEach((key) => {
        if (!(key=="_id"||key=="__v")){
        state.animals[ind][key] = payload[key];
        }
        // console.log("save animal -", key);
      });
    },
    ADD_ANIMALS_TO_PROFILE:(state)=>{
      //ДОбовляет в профайл список id животных
      Object.keys(state.animals).forEach((key)=>{
        state.profile.animals.push(state.animals[key]['id'])
      })
      console.log('ADD_ANIMALS_TO_PROFILE', state.profile.animals)
    }
  },
  actions:{
    GET_ANIMALS: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.get(
        `http://localhost:5000/api/get_animals${payload}`,
        {
          headers: headers,
        }
      );
      console.log("GET_Animals-", data);
      data.forEach((el)=>{
        context.commit("SAVE_ANIMAL", el);
      })
      
    },
    POST_ANIMAL: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      console.log("Vuex payload:", payload);
      await Axios.post("http://localhost:5000/api/create_animal", payload, {
        headers: headers,
      });

      // context.commit("SAVE_ANIMAL", payload);
    },
  }
});

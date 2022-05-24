import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
// import AnimalModule from "./modules/animal.js";
import {URI_SERVER} from "../api.js"
import ProfileModule from "./modules/profile.js";
import MetaModule from "./modules/meta.js"
Vue.use(Vuex);
export default new Vuex.Store({
  
  modules: {
    
    animals: {} ,
    profile: ProfileModule,
    meta: MetaModule,
   
  },
  getters: {
    USER: (state) => {
      return state;
    },
  },
  mutations:{
    DELETE_ALL_ANIMALS: (state)=>{
      console.log(' DELETE_ALL_ANIMALS')
      state.animals={}
    },
    SAVE_ALL_ANIMALS: (state,payload)=>{
      console.log("saving all animals",payload);

      state.animals=payload

    },
    SAVE_ANIMAL: (state,payload)=>{
      const ind=payload.ind
      console.log('ind-',ind)
      Object.keys(payload).forEach((key) => {
        if (!(key=="_id"||key=="__v")){
        state.animals[ind][key] = payload[key];
       
        }
        
      }); 
      console.log("animal saved ");
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
    UPDATE_ALL_ANIMALS: async (context, payload) =>{
      const headers = {
        "Content-Type": "application/json",
      };
      
      let { data } = await Axios.put(
        `${URI_SERVER}/api/update_all_animals`,
        payload,
        { headers: headers }
      );
      
      context.commit("SAVE_ALL_ANIMALS", data);
    },

    GET_ANIMALS: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.get(
        `${URI_SERVER}/api/get_animals${payload}`,
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
      await Axios.post(`${URI_SERVER}/api/create_animal`, payload, {
        headers: headers,
      });

      // context.commit("SAVE_ANIMAL", payload);
    },
  }
});

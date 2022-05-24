import Axios from "axios";
import {URI_SERVER} from "../../api.js"
export default {
  state: () => ({
    userId:null,  
    lastEnteredTimes: [],
    lastLievedTimes: [],
    lastEnteredCoords: [],
    lastEnterUserAgent:[]
  }),
  getters: {
    META: (state) => {
        return state;
      },
  },
  mutations: {
    SAVE_META:(state,payload)=>{
        Object.keys(payload).forEach((key) => {
            if(key=="userId"){
                state[key]=payload[key]
            }
            if (!(key == "userId" || key == "__v")&&payload[key]) {
               console.log("meta saved",payload[key]);  
              state[key].push(payload[key]);
    
            
            }
          });
           
        },

    },
    actions: {
        GET_META: async (context, payload) => {
            const headers = {
              "Content-Type": "application/json",
            };
            let { data } = await Axios.get(
              `${URI_SERVER}/api/meta/${payload}`,
              {
                headers: headers,
              }
            );
            console.log("GET_META", data);
      
            context.commit("SAVE_META", data);
          },
          UPDATE_META: async (context, payload) => {
            const headers = {
              "Content-Type": "application/json",
            };
            let { data } = await Axios.put(
              `${URI_SERVER}/api/meta`,
              payload,
              { headers: headers }
            );
      
            context.commit("SAVE_META", data);
          },  
      }

  }
 


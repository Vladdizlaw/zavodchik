import Axios from "axios";
export default {
    
  state: () => ({
    typeAnimal: null,
    male: null,
    age: null,
    breed: null,
    name: null,
    dateMating: null,
    awards: null,
    vaccination: null,
    color: null,
    matingConditions: null,
    photoAnimal: [],
    photoUrl: [],
    id: null,
    ind:null,
  }),
  getters: {
   
  },
  mutations: {
  
    DELETE_ANIMAL: (state) => {
      Object.keys(state).forEach((key) => {
        typeof state[key] === "object"
          ? Object.keys(state[key]).forEach((e) => {
              state[key][e] = null;
            })
          : (state[key] = null);

        console.log("delete animal", key);
      });
    },
  },
  actions: {
   
    
    UPDATE_ANIMAL: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.put(
        "http://localhost:5000/api/update_animal",
        payload,
        { headers: headers }
      );

      context.commit("SAVE_ANIMAL", data.animals);
    },
  },

};

import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      animals: [
        {
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
          id:null,
        },
      ],

      profile: {
        mail: null,
        tel: null,
        name: null,
        pass: null,
        city: null,
        id: null,
        hood: null,
        seenFlags: { seenHoodFlag: true, seenTelFlag: true },
        licenseAgreement: false,
        location: null,
        token: null,
        noticeBreed: { value: false, mail: false, push: false },
        noticeMessages: { value: false, mail: false, push: false },
        chats: [],
        startTrial: {
          value: false,
          date: null,
          dateStart: null,
          dateEnd: null,
        },
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
      console.log("payload:", payload);
      payload.forEach((animal, ind) => {
        Object.keys(animal).forEach((key) => {
          state.user.animals[ind][key] = animal[key];
          console.log("save animal", ind, key, animal[key]);
        });
      });
    },
    ADD_USER_ANIMAL: (state) => {
      const newAnimalSchema = {
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
        owner:null,
        id:null,
      };
      state.user.animals.push(newAnimalSchema);
    },
    SAVE_USER_META: (state, payload) => {
      Object.keys(payload).forEach((key) => {
        if (key !== "_id" || key != "animals" || key != "profile") {
          state.user[key] = payload[key];
          console.log("save user", key);
        }
      });
    },
    DELETE_USER: (state) => {
      Object.keys(state.user).forEach((key) => {
        typeof state.user[key] === "object"
          ? Object.keys(state.user[key]).forEach((e) => {
              state.user[key][e] = null;
            })
          : (state.user[key] = null);

        console.log("delete user", key, typeof state.user[key]);
      });
    },
  },
  actions: {
    GET_AUTH_USER: async (context) => {
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.get(
        `http://localhost:5000/api/get_auth_user`,
        { withCredentials: true },
        {
          headers: headers,
        }
      );
      console.log("GET_AUTH_USER-", data);
      context.commit("SAVE_USER", data);
    },
    GET_USER: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.get(
        `http://localhost:5000/api/get_user${payload}`,
        {
          headers: headers,
        }
      );
      console.log("GET_USER-", data);
      context.commit("SAVE_USER_META", data);
      context.commit("SAVE_USER_ANIMAL", data.animals);
      context.commit("SAVE_USER_PROFILE", data.profile);
    },
    POST_USER: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      // console.log("Vuex payload:", payload);
      await Axios.post("http://localhost:5000/api/create_user", payload, {
        headers: headers,
      });
      let data = payload;
      context.commit("SAVE_USER_META", data);
      context.commit("SAVE_USER_ANIMAL", data.animals);
      context.commit("SAVE_USER_PROFILE", data.profile);
    },
    UPDATE_USER: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.put(
        "http://localhost:5000/api/update_user",
        payload,
        { headers: headers }
      );
      context.commit("SAVE_USER_META", data);
      context.commit("SAVE_USER_ANIMAL", data.animals);
      context.commit("SAVE_USER_PROFILE", data.profile);
    },
  },
});

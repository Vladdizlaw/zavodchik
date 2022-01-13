import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      animal: {
        typeAnimal: "",
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
      token: null,
      photoAnimal: [],
      photoUrl: [],
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
        if (key !== "_id") {
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
      context.commit("SAVE_USER", data);
    },
    POST_USER: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      // console.log("Vuex payload:", payload);
      await Axios.post("http://localhost:5000/api/create_user", payload, {
        headers: headers,
      });
      context.commit("SAVE_USER", payload);
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
      context.commit("SAVE_USER", data);
    },
  },
});

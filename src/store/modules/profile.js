import Axios from "axios";

export default {
  state: () => ({
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
    animals: [],
    startTrial: {
      value: false,
      date: null,
      dateStart: null,
      dateEnd: null,
    },
  }),
  getters: {
    PROFILE: (state) => {
      return state;
    },
  },
  mutations: {
    SAVE_PROFILE: (state, payload) => {
      Object.keys(payload).forEach((key) => {
        if (!(key == "_id" || key == "__v")) {
          state[key] = payload[key];

          console.log("save profile -", key);
        }
      });
    },
    DELETE_PROFILE: (state) => {
      Object.keys(state).forEach((key) => {
        typeof state[key] === "object"
          ? Object.keys(state[key]).forEach((e) => {
              state[key][e] = null;
            })
          : (state[key] = null);

        console.log("delete user", key);
      });
    },
  },
  actions: {
    GET_PROFILE: async (context, payload) => {
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

      context.commit("SAVE_PROFILE", data);
    },
    GET_AUTH_PROFILE: async (context) => {
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
      context.commit("SAVE_PROFILE", data);
    },
    POST_PROFILE: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      // console.log("Vuex payload:", payload);
      await Axios.post("http://localhost:5000/api/create_user", payload, {
        headers: headers,
      });

      context.commit("SAVE_PROFILE", payload);
    },
    UPDATE_PROFILE: async (context, payload) => {
      const headers = {
        "Content-Type": "application/json",
      };
      let { data } = await Axios.put(
        "http://localhost:5000/api/update_user",
        payload,
        { headers: headers }
      );

      context.commit("SAVE_PROFILE", data);
    },
  },
};

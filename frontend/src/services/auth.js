import axios from "axios";

const baseURL = `/api`;

const auth = {
  async logIn(username, password) {
    try {
      const response = await axios.post(baseURL + "/login", {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  async signUp(username, password) {
    try {
      const response = await axios.post(baseURL + "/signup", {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default auth;

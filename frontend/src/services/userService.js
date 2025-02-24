import axios from "axios";

const baseURL = `/api/users/me`;

const userService = {
  async getUser() {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  },

  async updateUser(newData) {
    const response = await axios.put(baseURL, newData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  },

  async getUserHisory(params = null) {
    const response = await axios.get(
      baseURL +
        "/history" +
        (params
          ? `?start_date=${params.start_date}&end_date=${params.end_date}`
          : ""),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  },

  async getUserHistoryAt(date) {
    const response = await axios.get(baseURL + "/history/" + date, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  },

  async postUserHistory(entry) {
    const response = await axios.post(baseURL + "/history", entry, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  },
};

export default userService;

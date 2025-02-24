import axios from "axios";

const baseURL = `/api/tasks`;

const taskService = {
  async getTasks() {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  },

  async postTask(taskName) {
    const response = await axios.post(
      baseURL,
      {
        name: taskName,
        completed: false,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  },

  async updateTask(taskId, newTask) {
    const response = await axios.put(
      baseURL + `/${taskId}`,
      {
        name: newTask.name,
        completed: newTask.completed,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  },

  async deleteTask(taskId) {
    const response = await axios.delete(baseURL + `/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.status === 204;
  },
};

export default taskService;

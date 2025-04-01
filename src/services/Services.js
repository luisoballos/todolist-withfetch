export const USERNAME = "luisoballos";
const BASE_URL = `https://playground.4geeks.com/todo`;
const USER_URL = `/users/${USERNAME}`;
const API_URL = `/todos/${USERNAME}`;

export const Services = {
  fetchUser: async () => {
    try {
      const request = await fetch(`${BASE_URL}/users`);
      const response = await request.json();
      return response;
    } catch (e) {
      console.log(e);
    }
  },

  fetchTasks: async () => {
    try {
      const request = await fetch(`${BASE_URL}${USER_URL}`);
      const response = await request.json();
      return response.todos || [];
    } catch (e) {
      console.error("Error fetching user todos: ", e);
      return [];
    }
  },

  createUser: async () => {
    try {
      const request = await fetch(`${BASE_URL}${USER_URL}`, {
        method: "POST",
      });
      return [];
    } catch (e) {
      console.error("Error creating user:", e);
      return [];
    }
  },

  addTask: async (todo) => {
    try {
      const request = await fetch(`${BASE_URL}${API_URL}`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
      const newToDo = await request.json();
      return newToDo;
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  },

  removeTask: async (index) => {
    try {
      const request = await fetch(`${BASE_URL}/todos/${index}`, {
        method: "DELETE",
      });
      return request.ok;
    } catch (e) {
      console.error("Error removing task: ", e);
      return false;
    }
  },

  clearAllTasks: async () => {
    try {
      const request = await fetch(`${BASE_URL}${USER_URL}`, {
        method: "DELETE",
      });
      return request.ok;
    } catch (e) {
      console.error("Error deleting tasks: ", e);
    }
  },
};

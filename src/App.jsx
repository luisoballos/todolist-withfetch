import { useState, useEffect } from "react";
import { Services } from "./services/Services";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleFetchUser = async () => {
    try {
      const data = await Services.fetchUser();
      const userExists = data.users.some((user) => user.name === Services.USERNAME);

      if (userExists) {
        await handleFetchTasks();
      } else {
        await handleCreateUser();
      }
    } catch (e) {
      console.error("Error fetching user: ", e);
    }
  };

  const handleFetchTasks = async () => {
    try {
      const data = await Services.fetchTasks();
      setTasks(data);
    } catch (e) {
      console.error("Error fetching tasks: ", e);
    }
  };

  const handleCreateUser = async () => {
    try {
      const emptyTasks = await Services.createUser();
      setTasks(emptyTasks);
    } catch (e) {
      console.error("Error creating user: ", e);
    }
  };
  

  const handleAddTask = async () => {
    try {
      const todo = { label: newTask, is_done: false };
      const data = await Services.addTask(todo);
      setTasks((prevTasks) => [...prevTasks, data]);
      setNewTask("");
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };

  const handleClearAllTasks = async () => {
    try {
      const data = await Services.clearAllTasks();
      setTasks([]);
    } catch (e) {
      console.error("Error clearing tasks: ", e);
    }
  };

  const handleRemoveTask = async (id) => {
    try {
      const success = await Services.removeTask(id);
      if (success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    } catch (e) {
      console.error("Error removing task: ", e);
    }
  };  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container w-25 p-4 shadow">
          <h2 className="text-center mb-4">To-Do List</h2>
          <div className="d-flex mb-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a task..."
              className="form-control"
            />
            <button onClick={handleAddTask} className="btn btn-primary">
              Add
            </button>
          </div>
          <ul style={{ listStyleType: "none" }} className="gap-3">
            {tasks.length === 0 ? (
              <li className="text-center text-muted">No tasks, add a task</li>
            ) : (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center mb-2"
                >
                  {task.label}
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
          <button
            onClick={handleClearAllTasks}
            className="btn btn-warning mt-3 w-100"
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

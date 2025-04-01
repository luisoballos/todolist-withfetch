const ToDoList = ({ tasks, removeTask }) => {
  return (
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
              onClick={() => removeTask(task.id)}
              className="btn btn-danger btn-sm"
            >
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default ToDoList;

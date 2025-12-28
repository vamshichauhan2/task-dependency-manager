import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await api.get("tasks/");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await api.post("tasks/", { title });
    setTitle("");
    loadTasks();
  };

  const updateStatus = async (id, status) => {
    await api.patch(`tasks/${id}/`, { status });
    loadTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Dependency Manager</h2>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ color: statusColor[task.status] }}>
            {task.title}

            <select
              value={task.status}
              onChange={(e) => updateStatus(task.id, e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="completed">completed</option>
              <option value="blocked">blocked</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

const statusColor = {
  pending: "gray",
  in_progress: "blue",
  completed: "green",
  blocked: "red",
};

export default App;

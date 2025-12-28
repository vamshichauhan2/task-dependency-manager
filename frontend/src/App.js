import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [title, setTitle] = useState("");
  const [childTask, setChildTask] = useState("");
  const [parentTask, setParentTask] = useState("");
  const [error, setError] = useState("");

  const loadTasks = async () => {
    const res = await api.get("tasks/");
    setTasks(res.data);
  };

  const loadDependencies = async () => {
    const res = await api.get("tasks/");
    const deps = [];
    res.data.forEach(t => {
      if (t.dependencies) {
        t.dependencies.forEach(d => {
          deps.push(d);
        });
      }
    });
    setDependencies(deps);
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

  const addDependency = async () => {
    setError("");
    try {
      await api.post(`tasks/${childTask}/dependencies/`, {
        depends_on_id: parentTask,
      });
      setChildTask("");
      setParentTask("");
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.error || "Error adding dependency");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Dependency Manager</h2>

      {/* Add Task */}
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add Task</button>

      {/* Task List */}
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ color: statusColor[task.status] }}>
            {task.title}
            <select
              value={task.status}
              onChange={e => updateStatus(task.id, e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="completed">completed</option>
              <option value="blocked">blocked</option>
            </select>
          </li>
        ))}
      </ul>

      {/* Add Dependency */}
      <h3>Add Dependency</h3>
      <select value={childTask} onChange={e => setChildTask(e.target.value)}>
        <option value="">Task</option>
        {tasks.map(t => (
          <option key={t.id} value={t.id}>{t.title}</option>
        ))}
      </select>

      <span> depends on </span>

      <select value={parentTask} onChange={e => setParentTask(e.target.value)}>
        <option value="">Dependency</option>
        {tasks.map(t => (
          <option key={t.id} value={t.id}>{t.title}</option>
        ))}
      </select>

      <button onClick={addDependency}>Add</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* GRAPH */}
      <h3>Dependency Graph</h3>
      <svg width="400" height={tasks.length * 80}>
        {tasks.map((task, index) => (
          <g key={task.id}>
            <rect
              x="50"
              y={index * 70}
              width="200"
              height="40"
              fill={statusColor[task.status]}
            />
            <text
              x="60"
              y={index * 70 + 25}
              fill="white"
            >
              {task.title}
            </text>
          </g>
        ))}
      </svg>
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

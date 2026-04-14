import { useState } from "react";
import API from "../api";

export default function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleCreate = async () => {
    await API.post("/tasks/", task);
    setTask({ title: "", description: "", status: "pending" });
    refresh();
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-3">Create New Task</h3>

      <input
        className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <input
        className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Description"
        value={task.description}
        onChange={(e) =>
          setTask({ ...task, description: e.target.value })
        }
      />

      <select
        className="border p-2 rounded w-full mb-3"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </div>
  );
}
import { useState } from "react";
import API from "../api";

export default function TaskList({ tasks, refresh, user }) {
  const [editingTask, setEditingTask] = useState(null);

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}/`);
    refresh();
  };

  const updateTask = async () => {
    await API.put(`/tasks/${editingTask.id}/`, editingTask);
    setEditingTask(null);
    refresh();
  };

  const getStatusColor = (status) => {
    if (status === "completed") return "bg-green-100 text-green-700";
    if (status === "in_progress") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          {user?.role === "admin" && (
            <p className="text-xs text-gray-400 mb-1">
              User: {task.user}
            </p>
          )}

          {editingTask && editingTask.id === task.id ? (
            <>
              <input
                className="border p-2 rounded w-full mb-2"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
              />

              <input
                className="border p-2 rounded w-full mb-2"
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, description: e.target.value })
                }
              />

              <select
                className="border p-2 rounded w-full mb-3"
                value={editingTask.status}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={updateTask}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-400 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h4 className="text-lg font-semibold">{task.title}</h4>
              <p className="text-gray-600">{task.description}</p>

              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditingTask(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
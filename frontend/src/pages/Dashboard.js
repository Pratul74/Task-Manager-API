import { useEffect, useState, useCallback } from "react";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = useCallback(async () => {
    try {
      let res;

      if (user?.role === "admin") {
        res = await API.get("/tasks/admin/");
      } else {
        res = await API.get("/tasks/");
      }

      setTasks(res.data.results || res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load tasks");
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md mb-6">
          
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>

            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                user?.role === "admin"
                  ? "bg-yellow-300 text-black"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {user?.role === "admin" ? "👑 Admin" : "👤 User"}
            </span>

            <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <TaskForm refresh={fetchTasks} />

        
        <TaskList tasks={tasks} refresh={fetchTasks} user={user} />
      </div>
    </div>
  );
}
import { useEffect, useState, useCallback } from "react";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = useCallback(async () => {
    try {
      let baseUrl;

      if (user?.role === "admin") {
        baseUrl = "/tasks/admin/";
      } else {
        baseUrl = "/tasks/";
      }

      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (status) params.append("status", status);

      const url = `${baseUrl}?${params.toString()}`;

      const res = await API.get(url);

      setTasks(res.data.results || res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load tasks");
    }
  }, [user, search, status]);


  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


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

        
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3">
          
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        
        <TaskForm refresh={fetchTasks} />


        <TaskList tasks={tasks} refresh={fetchTasks} user={user} />
      </div>
    </div>
  );
}
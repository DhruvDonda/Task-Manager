import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Navbar from "./component/Navbar";
import TaskForm from "./component/TaskForm";
import StatusColumn from "./component/StatusColumn";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        } else {
          console.error("Stored tasks are not an array:", parsedTasks);
        }
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData) => {
    const newTask = { ...taskData, id: Date.now().toString() };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage immediately
    setIsModalOpen(false);
  };

  const handleEditTask = (taskData) => {
    if (!editingTask) return;
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...taskData, id: task.id } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage immediately
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage immediately
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const tasksByStatus = {
    "To Do": filteredTasks.filter((task) => task.status === "To Do"),
    "In Progress": filteredTasks.filter((task) => task.status === "In Progress"),
    Completed: filteredTasks.filter((task) => task.status === "Completed"),
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
      />

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-2" size={20} />
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
            <StatusColumn key={status} title={status} tasks={statusTasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
          ))}
        </div>
      </main>

      {(isModalOpen || editingTask) && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsModalOpen(false)}></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{editingTask ? "Edit Task" : "Add New Task"}</h2>
              <TaskForm
                isEdit={!!editingTask}
                task={editingTask || undefined}
                onSubmit={editingTask ? handleEditTask : handleAddTask}
                onClose={() => {
                  setIsModalOpen(false);
                  setEditingTask(null);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

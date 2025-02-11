import React from "react";
import { Edit2, Trash2 } from "lucide-react";

function TaskItem({ task, onEdit, onDelete }) {
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-3">{task.description}</p>

      <div className="text-sm text-gray-500 mb-3">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="p-1 text-gray-500 hover:text-blue-600"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 text-gray-500 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

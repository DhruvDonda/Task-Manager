import React from "react";
import TaskItem from "./TaskItem";

function StatusColumn({ title, tasks, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default StatusColumn;

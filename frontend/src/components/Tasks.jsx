import React from "react";

const Task = ({ task, onComplete, onDelete }) => {
  return (
    <div className={`p-4 border rounded ${task.completed ? "bg-green-200" : "bg-white"}`}>
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <div className="mt-2 flex justify-between">
        <button
          onClick={() => onComplete(task.id)}
          className={`px-4 py-2 rounded ${task.completed ? "bg-red-500" : "bg-green-500"} text-white`}
        >
          {task.completed ? "Desmarcar" : "Completada"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Task;

import React, { useEffect, useState } from "react";
import Task from "./components/Tasks";
import "./App.css";

const API_URL = "http://localhost:3000/api/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        fetchTasks(); // Recargar tareas
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (id) => {
    setLoading(true);
    try {
      const task = tasks.find((t) => t.id === id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (response.ok) fetchTasks();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        // Limpiar las tareas localmente
        const remainingTasks = tasks.filter((task) => task.id !== id);
        setTasks(remainingTasks);
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Gestor de Tareas</h1>

      <form onSubmit={createTask} className="mb-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading} // Desactivar el botón durante el proceso
        >
          {loading ? "Cargando..." : "Agregar Tarea"}
        </button>
      </form>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onComplete={completeTask}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No hay tareas</p>
        )}
      </div>
    </div>
  );
};

export default App;

import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let tasks: { id: string; title: string; description: string; completed: boolean; createdAt: Date }[] = []; // Almacenamiento temporal en memoria

// Obtener todas las tareas
app.get("/api/tasks", async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// Crear una nueva tarea
app.post("/api/tasks", async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "El título y la descripción son obligatorios" });
    }

    const newTask = {
      id: String(tasks.length + 1),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// Actualizar una tarea existente
app.put("/api/tasks/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = tasks.find((t) => t.id === id);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

// Eliminar una tarea
app.delete("/api/tasks/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    tasks = tasks.filter((t) => t.id !== id);

    if (tasks.length === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

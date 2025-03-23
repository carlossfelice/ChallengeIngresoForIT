"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let tasks = []; // Almacenamiento temporal en memoria
// Obtener todas las tareas
app.get("/api/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
}));
// Crear una nueva tarea
app.post("/api/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la tarea" });
    }
}));
// Actualizar una tarea existente
app.put("/api/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la tarea" });
    }
}));
// Eliminar una tarea
app.delete("/api/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        tasks = tasks.filter((t) => t.id !== id);
        if (tasks.length === 0) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json({ message: "Tarea eliminada" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la tarea" });
    }
}));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

/*define las rutas de tu aplicación utilizando el módulo express.Router()*/

const { Router } = require("express");
// Importa las funciones del controlador
const {
  getToDos,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require("../controller/ToDoController");

// Crea una instancia de Router de Express

const router = Router();

// Configura las rutas y asocia las funciones del controlador
router.get("/get", getToDos);            // Ruta para obtener todas las tareas
router.post("/save", saveToDo);          // Ruta para guardar una nueva tarea
router.put("/update/:id", updateToDo);   // Ruta para actualizar una tarea existente
router.delete("/delete/:id", deleteToDo); // Ruta para eliminar una tarea

// Exporta el router configurado con las rutas
module.exports = router;

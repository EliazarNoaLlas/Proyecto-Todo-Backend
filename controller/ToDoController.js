/**
 * contiene funciones para manejar las operaciones CRUD (Crear, Leer, Actualizar y Eliminar) 
 * de la aplicacion TODO
 */
const ToDoModel = require("../models/ToDoModel");

// ======================= Obtener todas las tareas ==================================
module.exports.getToDos = async (req, res) => {
  try {
    // Consulta todas las tareas en la base de datos
    const toDos = await ToDoModel.find();
    // Responde con el array de tareas
    res.send(toDos);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, msg: "Hubo un error al obtener las tareas." });
  }
};

// ======================= Guardar una nueva tarea ==================================
module.exports.saveToDo = (req, res) => {
  const { toDo } = req.body;

  // Crea una nueva tarea en la base de datos
  ToDoModel.create({ toDo })
    .then((data) => {
      console.log("Guardado exitosamente...");
      // Responde con los datos de la tarea creada y un código de estado 201 (creado)
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      // En caso de error, responde con un mensaje de error
      res.status(500).send({ error: err, msg: "Hubo un error al guardar la tarea." });
    });
};

// ======================= Actualizar una tarea existente ==================================
module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;

  // Busca y actualiza la tarea por su ID en la base de datos
  ToDoModel.findByIdAndUpdate(id, { toDo })
    .then(() => {
      // Responde con un mensaje indicando que la actualización fue exitosa
      res.send("Actualizado exitosamente...");
    })
    .catch((err) => {
      console.error(err);
      // En caso de error, responde con un mensaje de error
      res.status(500).send({ error: err, msg: "Hubo un error al actualizar la tarea." });
    });
};


// Eliminar una tarea
module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;

  // Busca y elimina la tarea por su ID en la base de datos
  ToDoModel.findByIdAndDelete(id)
    .then(() => {
      // Responde con un mensaje indicando que la eliminación fue exitosa
      res.send("Eliminado exitosamente...");
    })
    .catch((err) => {
      console.error(err);
      // En caso de error, responde con un mensaje de error
      res.status(500).send({ error: err, msg: "Hubo un error al eliminar la tarea." });
    });
};
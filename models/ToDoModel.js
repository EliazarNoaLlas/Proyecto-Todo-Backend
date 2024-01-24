/*define el esquema de datos para las tareas en tu aplicación utilizando Mongoose
*/
const mongoose = require("mongoose");
// Define el esquema de la tarea

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
});
// Crea y exporta el modelo basado en el esquema

module.exports = mongoose.model("ToDo", toDoSchema);

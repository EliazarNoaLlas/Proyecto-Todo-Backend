const chai = require('chai');
const chaiHttp = require ('chai-http');
const app = require("../Server");
const ToDoModel = require("../models/ToDoModel");

chai.use(chaiHttp);
const expect = chai.expect;

describe("ToDoController", () => {
  // Limpiar la base de datos antes de cada prueba
  beforeEach(async () => {
    await ToDoModel.deleteMany({});
  });

  describe("GET /api/get", () => {
    it("should get all todos", async () => {
      // Agregar algunas tareas de prueba a la base de datos
      await ToDoModel.create({ toDo: "Task 1" });
      await ToDoModel.create({ toDo: "Task 2" });

      // Realizar la solicitud GET
      const res = await chai.request(app).get("/api/get");

      // Verificar el código de estado y el formato de la respuesta
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(2);
    });
  });

  describe("POST /api/save", () => {
    it("should save a new todo", async () => {
      const newTodo = { toDo: "New Task" };

      // Realizar la solicitud POST
      const res = await chai.request(app).post("/api/save").send(newTodo);

      // Verificar el código de estado y la respuesta
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("_id");
      expect(res.body.toDo).to.equal(newTodo.toDo);

      // Verificar que la tarea se haya guardado en la base de datos
      const savedTodo = await ToDoModel.findById(res.body._id);
      expect(savedTodo).to.not.be.null;
      expect(savedTodo.toDo).to.equal(newTodo.toDo);
    });
  });

  describe("PUT /api/update/:id", () => {
    it("should update an existing todo", async () => {
      // Agregar una tarea de prueba a la base de datos
      const existingTodo = await ToDoModel.create({ toDo: "Existing Task" });

      const updatedTodo = { toDo: "Updated Task" };

      // Realizar la solicitud PUT para actualizar la tarea
      const res = await chai
        .request(app)
        .put(`/api/update/${existingTodo._id}`)
        .send(updatedTodo);

      // Verificar el código de estado y la respuesta
      expect(res).to.have.status(200);
      expect(res.text).to.equal("Actualizado exitosamente...");

      // Verificar que la tarea se haya actualizado en la base de datos
      const refreshedTodo = await ToDoModel.findById(existingTodo._id);
      expect(refreshedTodo.toDo).to.equal(updatedTodo.toDo);
    });
  });

  describe("DELETE /api/delete/:id", () => {
    it("should delete an existing todo", async () => {
      // Agregar una tarea de prueba a la base de datos
      const existingTodo = await ToDoModel.create({ toDo: "Task to Delete" });

      // Realizar la solicitud DELETE para eliminar la tarea
      const res = await chai.request(app).delete(`/api/delete/${existingTodo._id}`);

      // Verificar el código de estado y la respuesta
      expect(res).to.have.status(200);
      expect(res.text).to.equal("Eliminado exitosamente...");

      // Verificar que la tarea se haya eliminado de la base de datos
      const deletedTodo = await ToDoModel.findById(existingTodo._id);
      expect(deletedTodo).to.be.null;
    });

    it('should handle deleting a non-existent todo', async () => {
      // Intentar eliminar una tarea que no existe
      const res = await chai.request(app).delete('/api/delete/invalidId');

      // Verificar el código de estado y el mensaje de error
      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('Tarea no encontrada');
    });
  });
});

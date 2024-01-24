const supertest = require("supertest");
const app = require("../Server");
const ToDoModel = require("../models/ToDoModel");

const request = supertest(app);

describe("Integration Tests", () => {
  // Limpiar la base de datos antes de cada prueba
  beforeEach(async () => {
    await ToDoModel.deleteMany({});
  });

  it("should create, get, update, and delete a todo", async () => {
    // Crear una nueva tarea
    const newTodo = { toDo: "Integration Test Task" };
    const createResponse = await request.post("/api/save").send(newTodo);

    // Verificar la respuesta de creación
    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty("_id");
    expect(createResponse.body.toDo).toBe(newTodo.toDo);

    // Obtener todas las tareas
    const getResponse = await request.get("/api/get");

    // Verificar la respuesta de obtención
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toBeInstanceOf(Array);
    expect(getResponse.body.length).toBe(1);
    expect(getResponse.body[0].toDo).toBe(newTodo.toDo);

    // Actualizar la tarea
    const updatedTodo = { toDo: "Updated Integration Test Task" };
    const updateResponse = await request.put(`/api/update/${createResponse.body._id}`).send(updatedTodo);

    // Verificar la respuesta de actualización
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.text).toBe("Actualizado exitosamente...");

    // Eliminar la tarea
    const deleteResponse = await request.delete(`/api/delete/${createResponse.body._id}`);

    // Verificar la respuesta de eliminación
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.text).toBe("Eliminado exitosamente...");
  });
});

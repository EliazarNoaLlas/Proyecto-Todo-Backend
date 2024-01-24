const chai = require("chai");
const mongoose = require("mongoose");
const ToDoModel = require("../models/ToDoModel");

const expect = chai.expect;

describe("ToDoModel", () => {
  // Limpiar la base de datos antes de cada prueba
  beforeEach(async () => {
    await ToDoModel.deleteMany({});
  });

  describe("toDo Schema", () => {
    it("should be a valid model", () => {
      const todo = new ToDoModel({ toDo: "Sample Task" });
      expect(todo.validateSync()).to.be.undefined;
    });

    it("should be invalid if 'toDo' is not provided", () => {
      const todo = new ToDoModel({});
      expect(todo.validateSync().errors.toDo).to.exist;
    });
  });

});
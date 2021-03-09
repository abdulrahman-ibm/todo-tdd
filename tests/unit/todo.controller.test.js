const TodoController = require("../../controllers/todo.controller")
const TodoModel = require("../../model/todo.model")

// A mock is an object registers calls
TodoModel.create = jest.fn()

describe("TodoController.createTodo", () => {
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function")
    })
    it("should call TodoModel.create", () => {
        TodoController.createTodo()
        expect(TodoModel.create).toBeCalled()
    })
})
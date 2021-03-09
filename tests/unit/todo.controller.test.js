const TodoController = require("../../controllers/todo.controller")
const TodoModel = require("../../model/todo.model")
const httpMocks = require("node-mocks-http")
const newTodo = require("../mock-data/new-todo.json")

// A mock is an object registers calls
TodoModel.create = jest.fn()

describe("TodoController.createTodo", () => {
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function")
    })
    it("should call TodoModel.create", () => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()
        const next = null

        req.body = newTodo

        TodoController.createTodo(req, res, next)

        expect(TodoModel.create).toBeCalledWith(newTodo)
    })
})
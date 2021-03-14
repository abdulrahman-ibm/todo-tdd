const TodoController = require("../../controllers/todo.controller")
const TodoModel = require("../../model/todo.model")
const httpMocks = require("node-mocks-http")
const newTodo = require("../mock-data/new-todo.json")
const allTodos = require("../mock-data/all-todos.json")

// A mock is an object registers calls
TodoModel.create = jest.fn()
TodoModel.find = jest.fn()
TodoModel.findById = jest.fn()

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe("TodoController.getTodoById", () => {
    beforeEach(() => {
        req.params.todoId = "604a5d79cbed981735cdd2d4"
    })

    it("should have a getTodoById function", () => {
        expect(typeof TodoController.getTodoById).toBe("function")
    })

    it("should call TodoModel.findById with route parameters", async () => {
        await TodoController.getTodoById(req, res, next)

        expect(TodoModel.findById).toBeCalledWith(req.params.todoId)
    })

    it("should return a 200 response code and the found todo", async () => {
        TodoModel.findById.mockReturnValue(newTodo)
        await TodoController.getTodoById(req, res, next)

        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    it("should handle errors in getTodoById", async () => {
        const errorMessage = { message: "Error finding todo"}
        const rejectedPromise = Promise.reject(errorMessage)

        TodoModel.findById.mockReturnValue(rejectedPromise)
        await TodoController.getTodoById(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    })

    it("should return 404 when item doesn't exist", async () => {
        TodoModel.findById.mockReturnValue(null)
        await TodoController.getTodoById(req, res, next)

        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
})

describe("TodoController.getTodos", () => {
    it("should have a getTodos function", () => {
        expect(typeof TodoController.getTodos).toBe("function")
    })

    it("should call TodoModel.find({})", async () => {
        await TodoController.getTodos(req, res, next)

        expect(TodoModel.find).toBeCalledWith({})
    })

    it("should return a 200 status code and all todos", async () => {
        TodoModel.find.mockReturnValue(allTodos)
        await TodoController.getTodos(req, res, next)
        
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(allTodos)
    })

    it("should handle errors in getTodos", async () => {
        const errorMessage = { message: "Error finding todos"}
        const rejectedPromise = Promise.reject(errorMessage)

        TodoModel.find.mockReturnValue(rejectedPromise)
        await TodoController.getTodos(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    })
})

describe("TodoController.createTodo", () => {
    beforeEach(() => {
        req.body = newTodo
    })
    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function")
    })

    it("should call TodoModel.create", () => {
        TodoController.createTodo(req, res, next)

        expect(TodoModel.create).toBeCalledWith(newTodo)
    })

    it("should return a 201 response code", async () => {
        await TodoController.createTodo(req, res, next)

        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it("should return JSON in response", async () => {
        TodoModel.create.mockReturnValue(newTodo)
        await TodoController.createTodo(req, res, next)

        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    it("should handle errors", async () => {
        const errorMessage = { message: "'done' property is missing" }
        const rejectedPromise = Promise.reject(errorMessage)

        TodoModel.create.mockReturnValue(rejectedPromise)
        await TodoController.createTodo(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    })
})
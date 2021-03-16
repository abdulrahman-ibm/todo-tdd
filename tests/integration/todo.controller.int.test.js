const request = require("supertest")

const app = require("../../app")
const endpointUrl = "/todos/"
const newTodo = require("../mock-data/new-todo.json")

let firstTodo, newTodoId
const nonExistentTodo = "827fea05d7d50921c14e683c";

describe(endpointUrl, () => {
    it("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl)

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body[0].title).toBeDefined()
        expect(response.body[0].done).toBeDefined()

        firstTodo = response.body[0]
    })

    it("GET by ID " + endpointUrl + ":todoId", async () => {
        const response = await request(app)
        .get(endpointUrl + firstTodo._id)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(firstTodo.title)
        expect(response.body.done).toBe(firstTodo.done)
    })

    it("GET todoId doesn't exist " + endpointUrl + ":todoId", async () => {
        const response = await request(app)
        .get(endpointUrl + "604a5d79cbed98e735c2d2d4")

        expect(response.statusCode).toBe(404)
    })

    it("POST " + endpointUrl, async () => {
        const response = await request(app)
        .post(endpointUrl)
        .send(newTodo)

        expect(response.statusCode).toBe(201)
        expect(response.body.title).toBe(newTodo.title)
        expect(response.body.done).toBe(newTodo.done)
        
        newTodoId = response.body._id
    })

    it("should return error 500 on malformed data with POST" + endpointUrl, async () => {
        const response = await request(app)
        .post(endpointUrl)
        .send({title: "Missing done property"})

        expect(response.statusCode).toBe(500)
        expect(response.body).toStrictEqual({
            message: "Todo validation failed: done: Path `done` is required."
        })
    })

    it("PUT " + endpointUrl, async () => {
        const testData = {title: "Make integration test for PUT", done: true}
        const res = await request(app).put(endpointUrl + newTodoId)
        .send(testData)

        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(testData.title)
        expect(res.body.done).toBe(testData.done)
    })

    it("DELETE " + endpointUrl, async () => {
        const res = await request(app)
        .delete(endpointUrl + newTodoId)

        expect(res.statusCode).toBe(200)
        expect(res.body._id).toBe(newTodoId)
    })

    it("DELETE 404 " + endpointUrl, async () => {
        const res = await request(app)
        .delete(endpointUrl + nonExistentTodo)

        expect(res.statusCode).toBe(404)
    })
})
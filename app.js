const express = require("express")
const dotenv = require("dotenv")
const app = express()
const todoRoutes = require("./routes/todo.routes")
const mongoDb = require("./mongodb/mongodb.connect")

dotenv.config()
mongoDb.connect()
app.use(express.json())

app.use("/todos", todoRoutes)

app.get("/", (req, res) => {
    res.json("Hello, World!")
})

module.exports = app
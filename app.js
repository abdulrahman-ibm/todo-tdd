const express = require("express")
const dotenv = require("dotenv")
const app = express()
const todoRoutes = require("./routes/todo.routes")
const mongoDb = require("./mongodb/mongodb.connect")

dotenv.config()
mongoDb.connect()
app.use(express.json())

app.use("/todos", todoRoutes)
app.use((error, req, res, next) => {
    res.status(500).json({message: error.message})
})

app.get("/", (req, res) => {
    res.json("Hello, World!")
})

module.exports = app
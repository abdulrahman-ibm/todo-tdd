const express = require("express")

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
    res.jsonŸ("Hello, World!")
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`))
const mongoose = require("mongoose")

async function connect() {
    try {
        console.log("Connecting to MongoDB database...")
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
    } catch (err) {
        console.error("Error connecting to MongoDB database")
        console.error(err)
    }
}

module.exports = { connect };
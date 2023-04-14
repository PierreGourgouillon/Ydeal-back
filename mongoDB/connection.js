const mongoose = require("mongoose")

async function connectionMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://developer:2VuVTjrkmyihc69t@ydeal.j8705tk.mongodb.net/?retryWrites=true&w=majority")
        console.log("Connecté à mongodb")
    } catch (e) {
        console.log(e)
    }
}

module.exports = connectionMongoDB
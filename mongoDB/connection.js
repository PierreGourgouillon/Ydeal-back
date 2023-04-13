const mongoose = require("mongoose")

async function connectionMongoDB() {
    try {
        await mongoose.connect(
            "mongodb+srv://developer:2VuVTjrkmyihc69t@ydeal.j8705tk.mongodb.net/?retryWrites=true&w=majority")
        console.log("Connecté à mongodb")
    } catch (e) {
        console.log("Problème de connexion")
    }
}

module.exports = connectionMongoDB
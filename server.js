const express = require("express")
const app = express()

const mongoose = require("mongoose")
const URI = ''

mongoose.connect(URI)

let db = mongoose.connection

db.on('open',()=>{
    console.log("Connection with database established")
})
db.on("error",()=>{
    console.log("connection failed")
})

app.use(express.json())

const moviesRoutes = require("./apis/movies")

app.use("/api/movies",moviesRoutes)

app.listen(4000,()=>{
    console.log("server running at 4000 ")
})

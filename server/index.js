import express from "express";
import AuthRoute from "./routes/auth.js"
import TodosRoute from "./routes/todo.js"

const app = express()
const PORT = 3000

app.use("/api/user", AuthRoute)
app.use("/api/todos", TodosRoute)

app.get("/", (req, res, next) => {
    res.send("hello world")
})

// glabol error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server Error"
    res.status(statusCode).json({erorr: message})
})

app.listen(PORT, () =>{
    console.log(`listinin on port ${PORT}`)
})
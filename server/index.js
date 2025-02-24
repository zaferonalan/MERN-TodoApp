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

app.listen(PORT, () =>{
    console.log(`listinin on port ${PORT}`)
})
import express from "express";
import AuthRoute from "./routes/auth.js"
import TodosRoute from "./routes/todo.js"
import dotenv from "dotenv";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express()
const PORT = 3000

dotenv.config()
// app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser())
app.use("/api/user", AuthRoute)
app.use("/api/todos", TodosRoute)

app.get("/", (req, res, next) => {
    res.send("hello world")
})

// glabol error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server Error"
    res.status(statusCode).json({error: message})
})

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})
import { connectToDB } from "../utils/connect.js";
import Todo from "../models/todoModel.js";
import { createError } from '../utils/error.js'

export async function getAllTodos(req, res, next) {
    await connectToDB()
    const todos = await Todo.find({userID: req.user.id})
    res.status(200).send(todos)
}

export async function getTodo(req, res, next) {
    
}

export async function updateTodo(req, res, next) {
    
}

export async function deleteTodo(req, res, next) {
    
}

export async function addTodo(req, res, next) {
    console.log(req.body)
    if (!req.body || !req.body.title) {
        return next(createError(404, "Title is required"))
    }
    await connectToDB()
    const newTodo = new Todo({title: req.body.title, userID: req.user.id})
    res.send(newTodo)

}
import User from "../models/userModel.js"
import { connectToDB } from "../utils/connect.js"
import { createError } from "../utils/error.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export async function register(req, res, next) {
    const data = req.body;
    console.log(data)
    if (!data?.email || !data?.password) {
        return next(createError(400, "Missing fields"))
    }
    await connectToDB();
    const alreadyRegistered = await User.exists({email: data.email})
    if (alreadyRegistered) return next(createError(400, "User already exists"))
    
    // res.send("register")
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(data.password, salt)
    const newUser = new User({...data, password: hash})
    // res.send(newUser)
    await newUser.save()
    res.status(201).json("User created successfully")
}

export async function login(req, res, next) {
    const data = req.body
    console.log(data)
    if (!data?.email || !data?.password) {
       return next(createError(400, "Missing fields"))
    }
    await connectToDB()
    const user = await User.findOne({email: data.email})
    if (!user) {
       return next(createError(400, "Invalid credentials"))
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password)
    if (!isPasswordCorrect) {
       return next(createError(400, "Invalid credentials"))
    }

    const token = jwt.sign({id: user._id}, process.env.JWT)
    console.log(token)
    // res.send("login route")
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }).status(200).json("User logged in")
}

export async function logout(req, res, next) {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }).status(200).json({message:"Logged out successfully"})
}
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required:[true, "Must provide an email"],
        uniq:[true, "Email must be unique"]
    },
    password:{
        type: String,
        required:[true, "Must provide an email"],
    }
})

const User = mongoose.model("User", userSchema )

export default User
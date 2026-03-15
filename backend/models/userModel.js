import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},

    image:{
        type:String,
        default:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTgiIGhlaWdodD0iOTgiIHZpZXdCb3g9IjAgMCA5OCA5OCIgZmlsbD0ibm9uZSI...'
    },

    address:{
        line1:{type:String,default:''},
        line2:{type:String,default:''}
    },

    gender:{type:String,default:"Not Selected"},
    dob:{type:String,default:"Not Selected"},
    phone:{type:String,default:"0000000000"}

},{minimize:false})

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel
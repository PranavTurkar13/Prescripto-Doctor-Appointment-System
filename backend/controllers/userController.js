import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

const registerData = async (req,res) =>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please Enter a Strong Password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
        }else{
            return res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const getProfile = async(req,res)=>{
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select("-password")

        res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const updateProfile = async(req,res) =>{
    try {
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"Data Missing"})
        } 
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        
        if(imageFile){
            const uploadImage = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = uploadImage.secure_url;
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        
        res.json({success:true,message:"Profile Updated"})
    
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to Book Appointment for Doctor
const bookAppointment = async(req,res) =>{
    try {
        const {userId,docId,slotDate,slotTime} = req.body
        
        const docData = await doctorModel.findById(docId).select('-password')
        if(!docData){
            return res.json({success:false,message:"Doctor not Available"})
        }

        let slots_booked = docData.slots_booked

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot not Available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        
        const userData = await userModel.findById(userId).select('-password')

        // ✅ FIX: Convert docData to plain object and remove slots_booked
        const docDataPlain = docData.toObject()
        delete docDataPlain.slots_booked

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData: docDataPlain,
            amount: docDataPlain.fees,
            date: Date.now()
        }

        // ✅ FIX: Call .save() on the instance (newAppointment), not the class (appointmentModel)
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // Update doctor's booked slots
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true,message:"Appointment Booked"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const listUserAppointments = async(req,res) =>{
    try {
        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId})
        
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {registerData,loginUser,getProfile,updateProfile,bookAppointment,listUserAppointments}
import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listUserAppointments, loginUser, razorpayPayment, registerData, updateProfile, verifyPayment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerData)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listUserAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/razorpay-payment',authUser,razorpayPayment)
userRouter.post('/verify-payment',authUser,verifyPayment)

export default userRouter
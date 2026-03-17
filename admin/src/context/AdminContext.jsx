import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) =>{
    const [atoken, setAtoken] = useState(localStorage.getItem("atoken")?localStorage.getItem("atoken"):'')
    const backendurl = import.meta.env.BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const getAllDoctors = async() =>{
        try {
            const {data} = await axios.post(backendurl + '/api/admin/all-doctors' ,{},{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailability = async(docId) =>{
        try {
            const {data} = await axios.post(backendurl + '/api/admin/change-availability',{docId},{headers:{atoken}})
            if(data.success){
                getAllDoctors()
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        atoken,setAtoken,backendurl,doctors,getAllDoctors,changeAvailability
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
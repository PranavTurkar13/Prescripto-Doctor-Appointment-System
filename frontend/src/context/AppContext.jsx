import { createContext } from "react";
import { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from "react";

export const AppContext = createContext();
const currencySymbol = '$'
const backendurl = import.meta.env.VITE_BACKEND_URL

const AppContextProvider = (props)=>{
    const [doctors, setDoctors] = useState([])
    const getDoctorsData = async() =>{
        try {
            const {data} = await axios.get(backendurl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getDoctorsData()
    }, [])

    const value = { doctors,currencySymbol }
    return(
        <AppContext.Provider value ={value}>{props.children}</AppContext.Provider>
    );

}

export default AppContextProvider;
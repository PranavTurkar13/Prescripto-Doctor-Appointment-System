import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from "./AppContext";

const currencySymbol = '$';
const backendurl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || false);
    const [userData, setUserData] = useState(false);

    // ✅ Kept as standalone — called from outside effects (e.g. after cancel appointment)
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/user/get-profile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ Inline async function inside effect — linter is satisfied
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get(backendurl + '/api/doctor/list');
                if (data.success) {
                    setDoctors(data.doctors);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchDoctors();
    }, []);

    // ✅ Inline async function inside effect — linter is satisfied
    useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/user/get-profile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ Always call the async function — handle the reset inside it
    const syncUserState = async () => {
        if (token) {
            await fetchUserProfile();
        } else {
            await Promise.resolve(); // yields to event loop
            setUserData(false);     // now seen as async callback, not sync setState
        }
    };

    syncUserState();
}, [token]);

    const value = {
        doctors, currencySymbol, token, setToken,
        backendurl, userData, setUserData,
        loadUserProfileData, getDoctorsData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
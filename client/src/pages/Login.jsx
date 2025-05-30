import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export const Login = () => {

    const [state, setState] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContent);

    const handleState = () => {
        if(state === "Sign Up"){
            setState("Login");
        } else{
            setState("Sign Up")
        }
    }

    const handleNavigation = () => {
        navigate("/");
    }

    const handleSubmit = async (e) => {
       try {
            axios.defaults.withCredentials = true;
             e.preventDefault();
        if(state ==="Sign Up"){
          const {data} = await axios.post(backendUrl + "/api/auth/register", {name, email, password})
          if(data.success){
            setIsLoggedIn(true)
            getUserData()
            navigate('/');
          } else{
            toast.error(data.message)
          }
        } else{
            const {data} = await axios.post(backendUrl + "/api/auth/login", {email, password})
          if(data.success){
            setIsLoggedIn(true)
            getUserData()
            navigate('/');
          } else{
            toast.error(data.message)
          }
        }
       } catch (error) {
        toast.error(error.message)
       }
    }


    return(
        <>
            <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
                <img onClick={handleNavigation} src={assets.logo} className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" alt="logo-image" />
                <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
                    <h2 className="text-3xl font-semibold text-white text-center mb-3">{state === "Sign Up" ? "Create Account" : "Login"}</h2>
                    <p className="text-center text-sm mb-6">{state === "Sign Up" ? "Create Your Account" : "Login To Your Account!"}</p>
                    
                    <form onSubmit={handleSubmit}>
                        {state === "Sign Up" && (
                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <img src={assets.person_icon} alt="person-icon" />
                                <input className="bg-transparent outline-none" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                        )}
                        
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.mail_icon} alt="mail-icon" />
                            <input className="bg-transparent outline-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.lock_icon} alt="password-icon" />
                            <input className="bg-transparent outline-none" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        
                            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium mb-4">{state}</button>
                        
                        {state === "Login" && (
                            <p onClick={() => navigate("/reset-password")} className="text-indigo-500 cursor-pointer underline text-center mb-4">Forgot Password</p>
                        )}

                        <p className="mb-4 text-gray-400 text-center">{state === "Sign Up" ? "Already Registered?" : "Don't have an Account" } <span onClick={handleState} className="text-indigo-500 cursor-pointer underline">{state === "Sign Up" ? "Click to Login" : "Sign Up Here" }</span></p>
                    </form>
                </div>
            </div>
        </>
    );
}
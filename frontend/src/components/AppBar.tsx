import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/userSlice";
import { clearState } from "../utils/blogSlice";
export const AppBar=()=>{
    
    const isAuthenticated=useSelector((store)=>store.user.isLoggedin)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.clear("token");
        dispatch(loginUser(false));
        dispatch(clearState());
        navigate("/signin")
    }
    const handleAuth=()=>{

        if(isAuthenticated)
            {
                handleLogout();
            }
            else {
                navigate("/sigin");
            }

    }

    return (
        <div className="border-b-2 flex justify-between items-center p-2">
            <Link to="/blogs">
            <div className="cursor-pointer font-extrabold font-serif">
                Thoughtful Blogs
            </div>
            </Link>
            <div className="flex justify-center ">
                <Link to="/publish">
            <button type="button" className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm  text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-20 h-8 mr-10">New</button>   </Link>  <Avatar   name={"Aniruddh semalty"} size={"big"}/>
            <button type="button" className=" ml-4 text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm  text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-20 h-8 mr-10" onClick={handleAuth}>{isAuthenticated?"Logout":"Login"}</button>
            
            </div>

        </div>
    )
}
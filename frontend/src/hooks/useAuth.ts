import { useDispatch } from "react-redux"
import { loginUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuth=()=>{
const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
const token=localStorage.getItem("token");
if(token)
    {
        dispatch(loginUser(true));
    }
    else {
        navigate("/signin");
    }
},[])
}

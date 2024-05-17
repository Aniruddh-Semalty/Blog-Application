import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
export const useProfile=()=>{
    const [posts,setPosts]=useState(null);
    const [user,setUser]=useState(null);

const getData=async()=>{
const response=await axios.get(`${BACKEND_URL}/api/v1/user/profile`,{
    headers:{
        Authorization:localStorage.getItem("token")
    }
})
setPosts(response.data.posts);
setUser(response.data.user);
}
useEffect(()=>{
getData();
},[])
console.log("hi hook")

return {
    posts,user
}
}
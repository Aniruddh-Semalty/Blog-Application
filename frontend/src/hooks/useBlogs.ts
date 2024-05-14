import { useEffect,useState } from "react";
import axios from "axios";
import { getBlogs } from "../utils/blogSlice";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";
export const useBlogs=()=>{
    const [loading,setLoading]=useState(true);

    const cachedBlogs=useSelector((store:{blog:{blogs:string}})=>store.blog.blogs)
    
    const dispatch=useDispatch();
    const [blogs,setBlogs]=useState([]);
    useEffect(()=>{
          axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token"),
            }
          })
         
           .then(response=>{
            setBlogs(response.data.blogs);
            dispatch(getBlogs(response.data.blogs));
            setLoading(false);
           })
           
    },[])

    return cachedBlogs!=null?{loading:false,blogs:cachedBlogs}: {
        loading,
        blogs
    }
}
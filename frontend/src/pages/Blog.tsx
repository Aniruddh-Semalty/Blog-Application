import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'

import { BACKEND_URL } from '../config';
import { useParams } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { Avatar } from '../components/BlogCard';
interface blogType{
  content:string;
  title:string;
  author:{
    name:string;
  }
}
export const Blog = () => {
  const [loading,setLoading]=useState<Boolean>(true);
  const [blog,setBlog]=useState<blogType>({});
  const {id}=useParams();
  const getBlog=async()=>{
    const response=await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
      headers:{
        Authorization:localStorage.getItem("token"),
      }
    })
    
    setBlog(response.data.blog);
    setLoading(false);
  }
  useEffect(()=>{
    getBlog();
  },[])
  if(loading)
    {
      return <div>Loading....</div>
    }
  return (
    <>
    <div>
      <AppBar/>
    </div>
    <div className='p-20'>
      <div className="grid grid-cols-12">
     <div className='col-span-9 text-5xl font-extrabold pb-10 '>{blog.title}</div>
      <div>
        <div className='pb-2 text-gray-500'>Author</div>
        <div className='flex justify-center items-center'>
        <div className=''><Avatar name={blog.author.name} size="big"/></div>
      <div className='col-span-3 pl-2 font-bold text-xl p-2'>{blog.author.name}</div>
        </div>
      </div>
      </div>
      <div className="grid grid-cols-12">
      <div className='col-span-8 text-gray-500 text-lg'>{blog.content}</div>
      </div>
    </div>
   
    </>
  )}
  
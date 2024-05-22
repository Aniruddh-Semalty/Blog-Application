
import React from 'react'
import Icon from "../assets/pen.svg"
import logo from "../assets/delete.png" 
import DeleteIcon from "../assets/delete.svg"
import { BlogCard } from './BlogCard'
import { useState } from 'react'
import { ConfirmedModal } from './ConfirmedModal'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import axios from 'axios'
import { BACKEND_URL } from '../config'
const EditBlogCard = ({post,user}) => {
  const [openModal,setIsOpenModal]=useState(false);
  const [openConfirmModal,setConfirmModal]=useState(false);
    const navigate=useNavigate();
    
    const navigateToUpdateBlog=()=>{
        navigate(`/updateblog/${post.id}`)
    }

    const openDeleteModal=()=>{
      setIsOpenModal(true);
    }

    const closeDeleteModal=()=>{
      setIsOpenModal(false);
    }

    const confirmDelete=async()=>{
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${post.id}`,{
        headers:{
          Authorization:localStorage.getItem("token"),
        }
      });
      setIsOpenModal(false);
      setConfirmModal(true);
    }
    const closeConfirmModal=()=>{
      setConfirmModal(false);
      window.location.reload();
    }

    
    
  return (
    <div>
        <div className='flex justify-end items-center cursor-pointer  '>
       <div className='flex items-center justify-end w-full'>
  
       <img src= {logo} className=" w-4 h-4 mr-10"  alt="Delete Icon" onClick={openDeleteModal} />  
  <img src={Icon} className="pt-2 w-4 h-8" alt="Icon" onClick={navigateToUpdateBlog} />
  
    </div>
   
        </div>
        <BlogCard id={post.id} 
        authorName={user?.name}
        title={post.title}
        content={post.content}
        publishedDate={"2022 janusary"}
        
        
        />
       
        <Modal
        isVisible={openModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}

      />
      <ConfirmedModal isVisible={openConfirmModal} onClose={closeConfirmModal}/>
    
    </div>
  )
}

export default EditBlogCard
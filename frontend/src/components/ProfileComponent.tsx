import React from 'react'
import { AppBar } from './AppBar'
import { useState } from 'react'
import { Avatar, BlogCard } from './BlogCard';
import { useProfile } from '../hooks/useProfile';
import EditBlogCard from './EditBlogCard';
import { ProfileSkeleton } from './ProfileSkeleton';
import { UpdateModal } from './UpdateProfileModal';


const ProfileComponent= () => {
  const {loading,user,posts}=useProfile();
 
  const [editProfile,setEditProfile]=useState(false);
  const [postView,setPostView]=useState<Boolean>(true);
  const [aboutView,setAboutView]=useState<Boolean>(false);

  if(loading)
    {
      return (
        <>
      <AppBar/>
      <div className='grid grid-cols-12'>
      <div className='col-span-12'>
      <ProfileSkeleton/>
      </div>
      </div>
      </>
      )
    }
    
    const setUpdateModal=()=>{
      setEditProfile(true)
    }

    const closeModal=()=>{
      setEditProfile(false);
    }

    

  return (
    <>
    <AppBar/>
    
    <div className='p-16 grid grid-cols-12'>
      <div className='col-span-9'>
      <div className='text-5xl font-bold col-span-9'>
       {user?.name}
      </div>
      <div className='flex border-b col-span-9 pb-4 '>
      <div className='mt-8 mr-8 cursor-pointer ' onClick={()=>{setPostView(true),setAboutView(false)}}>Posts</div>
      <div className='mt-8 ml-8 cursor-pointer' onClick={()=>{setAboutView(true);setPostView(false)}}>About</div>
      </div>
      <div className=' mt-8'>
        {postView?<Posts posts={posts} user={user}/>:<About user={user}/>}
      </div>
      </div>
     <div className=' ml-6 col-span-3'>
     
        <div className='flex flex-col justify-center items-center'>
        <Avatar name={user?.name} size="extraLarge"/>
        <div className='mt-4 font-semibold'>{user?.name}</div>
        <div className='mt-4 cursor-pointer text-xs text-green-600' onClick={setUpdateModal}>Edit profile</div>
        </div>
      </div >
      <UpdateModal isVisible={editProfile} onClose={closeModal}/>
     
    </div>

    </>
  )
}


const Posts=({posts,user})=>{
  return <div>
    {
      posts.map((post)=>{
        return <EditBlogCard post={post} user={user}/>
      })
    }
  </div>
}

const About=({user})=>{
  return <div className='font-semibold text-lg font-serif pb-4'>{user?.about}</div>
}

export default ProfileComponent

import { BlogCardSkeleton } from "./BlogCardSkeleton"
export const ProfileSkeleton=()=>{
    return (
   <div className="">
    <div className="grid grid-cols-12">
    <div className=" ml-14 p-16 col-span-9 mt-24 bg-gray-200 text-6xl animate-pulse text-gray-200 rounded-lg"></div>
    <div className="p-16 mt-24 ml-24 w-24 h-24 rounded-full bg-gray-200 animate-pulse "></div>
    </div>
    
    <ProfileBlogCardSkeleon/>
    <ProfileBlogCardSkeleon/>
    <ProfileBlogCardSkeleon/>
    <ProfileBlogCardSkeleon/>
    <ProfileBlogCardSkeleon/>
    <ProfileBlogCardSkeleon/>
    
   
  
    </div>
   
    )
} 

const ProfileBlogCardSkeleon=()=>{
    return (
        <div className="ml-14 mt-14  animate-pulse  flex flex-col items-start">
        
        <div className="w-1/2">
            <div className="flex w-full">
            <div className="mr-4 w-5 h-3 rounded-full bg-gray-200 border ">
            </div>
            <div className="p-2 w-1/3 bg-gray-200  rounded-lg"></div>
        </div>
        </div>
        <div className="mt-4 bg-gray-200 w-1/2 h-6 rounded-lg">

        </div>
        <div className="mt-4 bg-gray-200 w-1/2 h-4 rounded-lg"></div>
        <div className="w-1/2 justify-center">
        <div className="mt-4 bg-gray-200 w-1/6 h-2 rounded-lg"></div>
        </div>
        
        </div>
    )

    
}
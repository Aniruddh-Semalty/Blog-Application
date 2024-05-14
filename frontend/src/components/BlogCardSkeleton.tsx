import { Avatar, Circle } from "./BlogCard"

export const BlogCardSkeleton=()=>{
    return (<div className="mt-14  animate-pulse  flex flex-col items-center">
        
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
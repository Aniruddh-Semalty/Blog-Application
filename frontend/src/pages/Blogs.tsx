
import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks/useBlogs";

import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { blogsType } from "../utils/type";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
const Blogs = () => {
  const {loading,blogs}=useBlogs();

    useAuth();
 

  if(loading)
    {
      return(<div>
         <AppBar />
       <BlogCardSkeleton/>
       <BlogCardSkeleton/>
       <BlogCardSkeleton/>
       <BlogCardSkeleton/>
       <BlogCardSkeleton/>
      </div>)
    }

  return (
    <>
    
      <div className="p-4">
        <AppBar />
      </div>
      
      <div className="flex justify-center">
        <div className="max-w-2xl">
          
          {blogs.map((blog:blogsType)=>(
          <div className="cursor-pointer">
            <BlogCard
              id={blog.id.toString()}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={"2022 janusary"}
            />
          </div>))}
         
         
          </div>
        </div>
      
     
    </>
  );
};

export default Blogs;

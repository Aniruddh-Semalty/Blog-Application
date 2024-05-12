import React from "react";
import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks/useBlogs";
const Blogs = () => {
  const {loading,blogs}=useBlogs();

  if(loading)
    {
      return(<div>
        Loading...
      </div>)
    }

  return (
    <>
    
      <div className="p-4">
        <AppBar />
      </div>
      
      <div className="flex justify-center">
        <div className="max-w-2xl">
          
          {blogs.map((blog)=>(
          <div className="cursor-pointer">
            <BlogCard
              id={blog.id}
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

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { useDispatch } from "react-redux";
import { cacheTheBlog } from "../utils/blogSlice";
interface blogType {
  content: string;
  title: string;
  author: {
    name: string;
  };
  id: number;
}
export const Blog = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const dispatch = useDispatch();
  const [blog, setBlog] = useState<blogType>({});
  const cachedBlogs = useSelector((store) => store.blog.clickedBlogs);

  const { id } = useParams();

  const getBlog = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setBlog(response.data.blog);
    setLoading(false);
    for (let i = 0; i < cachedBlogs.length; i++) {
      if (cachedBlogs[i] == response.data.blog.id) return;
    }
    dispatch(cacheTheBlog(response.data.blog));
  };
  const setCachedBlog = () => {
    let filterBlog = null;
    for (let i = 0; i < cachedBlogs.length; i++) {
      if (cachedBlogs[i].id === id) {
        filterBlog = cachedBlogs[i];
        break;
      }
    }
    if (filterBlog != null) {
      setBlog(filterBlog);
      setLoading(false);
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    let isAlreadyVisited = setCachedBlog();
    if (!isAlreadyVisited) getBlog();
  }, []);
  if (loading) {
    return (
      <>
        <AppBar />
        <FullBlogSkeleton />
      </>
    );
  }
  return (
    <>
      <div>
        <AppBar />
      </div>
      <div className="p-20">
        <div className="grid grid-cols-12">
          <div className="col-span-9 text-5xl font-extrabold pb-10 ">
            {blog.title}
          </div>
          <div>
            <div className="pb-2 text-gray-500">Author</div>
            <div className="flex justify-center items-center">
              <div className="">
                <Avatar name={blog.author.name} size="big" />
              </div>
              <div className="col-span-3 pl-2 font-bold text-xl p-2">
                {blog.author.name}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-8 text-gray-500 text-lg">{blog.content}</div>
        </div>
      </div>
    </>
  );
};

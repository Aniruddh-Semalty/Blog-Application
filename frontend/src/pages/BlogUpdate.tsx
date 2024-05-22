import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { AppBar } from "../components/AppBar";
import { TextArea } from "../components/TextArea";
import { useNavigate } from "react-router-dom";
const BlogUpdate = () => {
  const { blogId } = useParams();
  
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate=useNavigate();
  const getBlogData = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setTitle(response.data.blog.title);
    setContent(response.data.blog.content);
    setLoading(false);
  };
  useEffect(() => {
    getBlogData();
  }, [blogId]);
  if (loading) {
    return (
      <>
        {" "}
        <AppBar />
        <FullBlogSkeleton />
      </>
    );
  } else {
    return (
      <div className="">
        <AppBar />
        <div className="flex flex-col items-center mt-10">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
            value={title}
            className="focus:outline-none shadow-xl text-2xl p-4 rounded-lg text-black border w-1/2 font-bold h-16 "
          />
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={async () => {
              const response = await axios.put(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                  id:blogId,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );

              navigate(`/blog/${response.data.id}`);
            }}
            className="mt-2 shadow-md bg-green-600 rounded-full text-white font-semibold  w-20 p-2"
          >
            {" "}
            Update Post
          </button>
        </div>
      </div>
    );
  }
};

export default BlogUpdate;

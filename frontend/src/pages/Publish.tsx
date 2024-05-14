import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { TextArea } from "../components/TextArea";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="">
      <AppBar />
      <div className="flex flex-col items-center mt-10">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title"
          className="focus:outline-none shadow-xl text-2xl p-4 rounded-lg text-black border w-1/2 font-bold h-16 "
        />
        <TextArea onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="flex justify-center">
        <button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title,
                content,
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
          Submit
        </button>
      </div>
    </div>
  );
};

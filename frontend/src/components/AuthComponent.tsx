import React from "react";
import { useState } from "react";
import { SignupInput } from "@aniruddhsemalty/blog-common";
import {SigninInput} from "@aniruddhsemalty/blog-common"
import { Link, Navigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthComponent = ({ type }: { type: "signup" | "signin" }) => {
  const [isSigninForm, setIsSigninForm] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
   password:"",
    email: "",
  });
  const navigate=useNavigate();
  async function sendRequest(){
    try{
    const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup":"signin"}`,postInputs);

    const jwt=response.data.jwt;

    
    localStorage.setItem("token",jwt);
    navigate("/blogs");
    }
    catch(e)
    {
      alert("Error while signing up");
    }
  }

  return (
    <div className="flex flex-col  justify-center items-center w-full p-10  h-screen">
      <div className="w-2/3">
        <div className="my-6">
          <h1 className="text-3xl font-extrabold m-4 mb-2 text-center">
            {type === "signin" ? "Sign in" : "Create an account"}
          </h1>
          <div className="text-lg text-gray-400 text-center flex justify-center ">
            {type === "signin" ? "Not registerd ?" : "Already have an account"}
            <Link
              className="pl-2 underline"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </div>
       
        <div className="flex flex-col p-2">
        {type==="signup"?
          <LabelledInput
            label="Username"
            placeholder="Enter your username"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
            type="text"
          />:null}

          <LabelledInput
            label="Email"
            placeholder="abc@example.com"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
            type="text"
          />

          <LabelledInput
            label="Password"
            placeholder="Enter password"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
            type="password"
          />

          <button onClick={sendRequest} className="bg-black text-white  rounded-lg h-10 my-2">
            {type === "signin" ? "Sign in" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface labelledInputTypes {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEventHandler) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: labelledInputTypes) {
  return (
    <div className="flex flex-col">
      <label className="text-md font-semibold">{label}</label>

      <input
        type={type || "text"}
        onChange={onChange}
        placeholder={placeholder}
        className="h-8 rounded-md p-2 my-2"
      ></input>
    </div>
  );
}

export default AuthComponent;

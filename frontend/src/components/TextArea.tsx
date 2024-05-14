import { ChangeEvent } from "react";


export const TextArea = ({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) => {
  return (
    <div className="w-1/2 mt-10">
      <textarea  onChange={onChange} rows= "10" className=" w-full bg-gray-100 focus:outline-none p-4 text-lg " placeholder="Enter your content here ">

      </textarea>
    </div>
  );
};

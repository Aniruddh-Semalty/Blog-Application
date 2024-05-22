import { ChangeEventHandler } from "react";


export const TextArea = ({onChange ,value}:{onChange:(e:ChangeEventHandler<HTMLTextAreaElement>)=>void}) => {
  return (
    <div className="w-1/2 mt-10">
      <textarea  value={value} onChange={onChange} rows= {10} className=" w-full bg-gray-100 focus:outline-none p-4 text-lg " placeholder="Enter your content here ">

      </textarea>
    </div>
  );
};

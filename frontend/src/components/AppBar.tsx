import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar=()=>{
    return (
        <div className="border-b-2 flex justify-between items-center p-2">
            <Link to="/blogs">
            <div className="cursor-pointer font-extrabold font-serif">
                Thoughtful Blogs
            </div>
            </Link>
            <div className="flex justify-center ">
                <Link to="/publish">
            <button type="button" className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm  text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-20 h-8 mr-10">New</button>   </Link>  <Avatar  name={"Aniruddh semalty"} size={"Big"}/>
            </div>

        </div>
    )
}
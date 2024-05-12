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
            <div>
                <Avatar  name={"Aniruddh semalty"} size={"Big"}/>
            </div>

        </div>
    )
}
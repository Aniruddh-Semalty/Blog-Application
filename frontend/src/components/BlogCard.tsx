import { Link } from "react-router-dom";
interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id:string;
}
export const BlogCard=({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}><div  className="border-b-2  p-8">

        <div className="flex items-center pb-1" >
            <Avatar name={authorName} size={"small"}/>
           
        <span className="p-2 font-medium">{authorName}</span>
        <Circle/>
          <span className="text-gray-400 pl-2">{publishedDate}</span>
        </div>
        <div  className="font-extrabold text-2xl pb-2">
            {title}
        </div>
        <div className="text-lg font-serif pb-4">
            {
                content.slice(0,100)+"..."
            }
        </div>
        <div className="text-sm">
            {
                `${Math.ceil(content.length/100)} minutes read`
            }
        </div>
    </div>
    </Link>
}

export const Avatar=({name,size="small"}:{name:string,size:"big"|"small"})=>{
    return (
        
<div className={`relative inline-flex items-center justify-center ${size==="small"? "w-5 h-5":"w-8 h-8"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 `}>
    <span className={`font-medium ${size==="small"?"text-xs":"text-md"}  text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>

    )
}


export const Circle=()=>{
    return(
        <div className="h-1 w-1 rounded-full  bg-gray-500 border-black-4"></div>
    )
}
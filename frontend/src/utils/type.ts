export interface blogsType{
    id:string;
    content:string;
    title:string;
    author:{
        name:string;
    }

}
export interface BlogState{
    blogs:blogsType[]|null;
    clickedBlogs:blogsType[];
}
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {verify} from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@aniruddhsemalty/blog-common";
export const blogRouter=new Hono<
{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET:string,
      },
    Variables:{
        userId:string,
    }
}>();

blogRouter.use("/*",async(c,next)=>{

    const token=c.req.header("Authorization")||"";
    const user=await verify(token,c.env.JWT_SECRET);

    if(user)
        {
            c.set("userId",user.id);
            await next();
        }
        else
        {
            c.status(403);
            return c.json({
                "message":"You are not logged in"
            })
        }

  
})
blogRouter.post("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
        const body = await c.req.json();
        const {success}=createBlogInput.safeParse(body);
    if(!success)
      {
        c.status(411);
        return c.json({
          message:"Invalid inputs",
        })
      }
        const userId=c.get("userId");
        const blog=await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:userId,
            }
        })
    return c.json({
        "id":blog.id,
    });
  });

  blogRouter.delete("/:id",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id=c.req.param("id");
   
    await prisma.post.delete({
      where:{
        id,
      }
    })

    return c.json({
      message:"Delete successfully",
    })


  })
  
  blogRouter.put("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
        const body = await c.req.json();
        console.log(body);
        const {success}=updateBlogInput.safeParse(body);
    if(!success)
      {
        c.status(411);
        return c.json({
          message:"Invalid inputs",
        })
      }

        const blog=await prisma.post.update({
            where:{
                id:body.id,
            },
            data:{
                title:body.title,
                content:body.content,
                
            }
        })
    return c.json({
        "id":blog.id,
    });
  });
  blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const blogs=await prisma.post.findMany({
        select:{
          content:true,
          title:true,
          id:true,
          author:{
            select:{
              name:true
            }
          }
        }
      });
      return c.json({
        blogs,
      });
      
  });
  blogRouter.get("/:id", async(c) => {
    const id=c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
        

        const blog=await prisma.post.findFirst({
            where:{
                id:id,
            },
            select:{
              id:true,
              content:true,
              title:true,
              author:{
                select:{
                  name:true
                }
              }
            }
            
        })
    return c.json({
        blog,
    });
  });
  
  
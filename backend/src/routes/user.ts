import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {verify,sign} from "hono/jwt";
import { signinInput, signupInput } from "@aniruddhsemalty/blog-common";

export const userRouter=new Hono<
{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET:string;
      };
}>();
userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try{
    const body = await c.req.json();
    console.log(body);
    const {success}=signupInput.safeParse(body);
    if(!success)
      {
        c.status(411);
        return c.json({
          message:"Inputs not correct",
        })
      }
     
   const user=await prisma.user.create({
      data: {
        name:body.name,
        email: body.email,
        password: body.password,
      },
    });
  
 
  
   
    const token=await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
      jwt:token,
    });
  }catch(e)
  {
    console.log(e);
    c.status(411);
    return c.json({
      error:"User already exists" 
    })
  }
  });

  userRouter.get("/profile",async(c)=>{
   
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const token=c.req.header("Authorization")||"";
      const verifiedUser= await verify(token,c.env.JWT_SECRET);
      if(verifiedUser)
        {
          const user=await prisma.user.findUnique({
            where:{
              id:verifiedUser.id,
            },
            select:{
              id: true,
              name: true,
              about:true,
            }
          })
          if(!user){
            c.status(403);
            return c.json({error:"User not found"});
          }

          const posts=await prisma.post.findMany({
            where: {
              authorId:verifiedUser.id
            },
          
          })

          return c.json({
            user,posts
          })

        }
        else {
          c.status(403);
          return c.json({error:"Invalid user"});
        }
  })
  userRouter.put("/update",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body=await c.req.json();
    const token=c.req.header("Authorization")||"";
    const verfiedUser=await verify(token,c.env.JWT_SECRET);
    console.log(body.username);
    console.log(body.about);
    if(verfiedUser)
      {
    const user=await prisma.user.update({
      where:{
        id:verfiedUser.id,

      },
      data:{
        name:body.username,
        about:body.about,
      }
    })

    return c.json({msg:"Profile updated successfully"});
  }
  else {
    c.status(403);
    return c.json({error:"Invalid user"});
  }
  })
  
  userRouter.post("/signin", async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success)
      {
        c.status(411);
        return c.json({
          message:"Invalid inputs",
        })
      }
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }   
    });
    if(!user){
      c.status(403);
      return c.json({error:"User not found"});
    }
    const token=await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
      jwt:token,
    });
  });
  
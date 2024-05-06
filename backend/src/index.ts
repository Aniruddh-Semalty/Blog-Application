import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {decode,verify,sign} from "hono/jwt";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET:string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use("/api/v1/blog/*",async(c,next)=>{
  const header=c.req.header("authorization")||"";
  const token=header.split(" ")[1];
  const response=await verify(header,c.env.JWT_SECRET);

  if(response.id)
   next();
  else{
    c.status(403);
    return c.json({error:"Unauthorized"});
  }
})

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const user=await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  const token=await sign({id:user.id},c.env.JWT_SECRET);
  return c.json({
    jwt:token,
  });
});

app.post("/api/v1/user/signin", async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body=await c.req.json();
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
  return c.text("Signin");
});

app.post("/api/v1/blog", (c) => {
  return c.text("blog");
});

app.put("/api/v1/blog", (c) => {
  return c.text("put blog");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("get byu id");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("get by bulk");
});

export default app;

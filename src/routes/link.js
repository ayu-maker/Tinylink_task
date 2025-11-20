import express from "express";
import { PrismaClient } from "@prisma/client";
import { generateCode } from "../utils/generateCode.js";


const prisma=new PrismaClient();
const router=express.Router();


//api for creating link 
router.post("/",async(req,res)=>{
    try{
        let{url,code}=req.body;

        //validating url 
        if(!url){
            return res.status(400).json({error:"Url is required"});
        }
        //check code validation
        if(!code){
            code=generateCode(6);
        }

        const exist=await prisma.link.findUnique({
            where:{code},
        });
        if(exist){
            return res.status(409).json({error:"Code already exists"});
        }

        const newlink=await prisma.link.create({
            data:{
                url,
                code,
            },
        });
        res.json(newlink);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"});
    }
});


//api for fetching links
router.get("/",async(req,res)=>{
    try{
        const links=await prisma.link.findMany({
            orderBy:{createdAt:"desc"}
        });
        res.json(links);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"});
    }
});

//fetch link using code
router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete link by code
router.delete("/:code", async (req, res) => {
    try {
        const { code } = req.params;

        //validation of link
        const link = await prisma.link.findUnique({
            where: { code },
        });

        if (!link) {
            return res.status(404).json({ error: "Link not found" });
        }

        await prisma.link.delete({
            where: { code },
        });

        res.json({ message: "Link deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
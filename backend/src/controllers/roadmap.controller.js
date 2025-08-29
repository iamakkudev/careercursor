import { aiRoadmap } from "./ai.controller.js"
import { Roadmap } from "../models/roadmap.model.js"
import { generateRoadmapPDF } from "../lib/pdfKit.config.js"
import path from 'path'
import fs from 'fs'
import { sendCongratulationEmail } from "../brevo/email.js"
import { User } from "../models/user.model.js"



export const roadmap = async(req,res)=>{
    try {
        const { job } = req.body

        if(!job?.trim()) return res.status(400).json({message:"Error in Roadmap route"})

        const response = await aiRoadmap(job)
        if(response.error) return res.status(response.status).json({message: response.message})


        //its already in json format so i don't have to use .json 
        res.status(200).json({data: response.data, 
            message:response.fallback
            ? "⚠️ Rate limit hit, response served from fallback model."
            : "✅ Response served from preferred model."
        })
    } catch (error) {
        console.log("Error in Roadmap route :", error?.response?.data || error.message,error)
        res.status(500).json({message:error.message})
    }
}


export const getRoadmap = async(req,res) =>{
    try {

        const userId = req.user._id;
        if(!userId){
         return res.status(404).json({success:false,message: "User not found"})
        }

        const user = await User.findById(userId).select("-password");

        if(!user.roadmap) return res.status(400).json({message: "Please Add The Roadmap"});

        const roadmap = await Roadmap.findById(user.roadmap)
       
        res.status(200).json({success:true, roadmap})
    } catch (error) {
        console.log("Error in get Roadmap route :", error.message)
        res.status(500).json({message:error.message})
    }
}

export const addRoadmap = async(req,res) =>{
    try {
        const {job, data} = req.body;

        const userId = req.user._id;
        if(!userId){
         return res.status(404).json({success:false,message: "User not found"})
        }

        const user = await User.findById(userId).select("-password");

        if(user.roadmap) return res.status(400).json({message: "Roadmap added in Tracker Already."});

        if(!data || !job) return res.status(400).json({message: "Invalid data. please try again"});

        const roadmap = new Roadmap({jobTitle:job, about: data.about, requirements: data.requirements, phases:data.phases})

        await roadmap.save()
        user.roadmap = roadmap._id

        await user.save()

        await sendCongratulationEmail(user.email,user.name);

        res.status(200).json({success:true, message:"Roadmap Added in tracker successfully"})
    } catch (error) {
        console.log("Error in Add Roadmap route :", error.message)
        res.status(500).json({message:error.message})
    }
}

export const createRoadmapPdf= (req,res)=> {
  try {
    const { jobTitle, roadmapData } = req.body;
    if (!jobTitle || !roadmapData) {
        return res.status(400).json({ message: 'Missing job title or roadmap data' });
    }

    const link = generateRoadmapPDF(roadmapData, jobTitle);

    res.status(200).redirect(`/roadmap/${link}`);
  } catch (error) {
    console.log("Error in Add Roadmap route :", error.message)
    res.status(500).json({message:error.message})
  }
};

export const downloadRoadmapPdf= (req,res)=> {
  try {
    const fileName = req.params.file;
    if (!fileName) {
        return res.status(400).json({ message: 'File is missing' });
    }

    const filePath = path.join(process.cwd(), 'public', 'roadmaps', fileName);


    res.download(filePath, (err) => {
    if (err) {
        console.error("Download failed:", err.message);
        return res.status(500).send("Could not download file");
    }

    fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
        console.error("Failed to delete file:", unlinkErr.message);
        } else {
        console.log("✅ Deleted file after download:", filePath);
        }
    });
    });
  } catch (error) {
    console.log("Error in download route :", error.message)
    res.status(500).json({message:error.message})
  }
};
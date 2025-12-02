import { aiGovJob, aiMoreJob, aiPassionJob,aiPrivateJob, aiQualifyJob} from "./ai.controller.js"

export const addJoblist = async(req,res)=>{
    req.status(200).send("hello")
}
export const privateJobs = async(req,res)=>{
    try {
        const response = await aiPrivateJob()
         if(response.error) return res.status(response.status).json({message: response.message})
        
        //its already in json format so i don't have to use .json 
         res.status(200).json({data: response.data, 
            message:response.fallback
            ? "⚠️ Rate limit hit, response served from fallback model."
            : "✅ Response served from preferred model."
        })
    } catch (error) {
        console.log(error.data)
        console.log("AI error details:", error?.response?.data || error.message)
        res.status(500).json({message:error.message})
    }
}

export const govJobs = async(req,res)=>{
    try {
        const response = await aiGovJob()
         if(response.error) return res.status(response.status).json({message: response.message})
        
        //its already in json format so i don't have to use .json 
         res.status(200).json({data: response.data, 
            message:response.fallback
            ? "⚠️ Rate limit hit, response served from fallback model."
            : "✅ Response served from preferred model."
        })
    } catch (error) {
        console.log("AI error details:", error?.response?.data || error.message)
        res.status(500).json({message:error.message})
    }
}

export const passionJobs = async(req,res)=>{
    try {
        const { prompt } = req.body

        if(!prompt) return res.status(400).json({message:"Please Enter Your Interest"})
        
        const response = await aiPassionJob(prompt)
         if(response.error) return res.status(response.status).json({message: response.message})
        req.session.passion = `i like ${prompt}`
        
        //its already in json format so i don't have to use .json 
         res.status(200).json({data: response.data, 
            message:response.fallback
            ? "⚠️ Rate limit hit, response served from fallback model."
            : "✅ Response served from preferred model."
        })
    } catch (error) {
        console.log("AI error details:", error?.response?.data || error.message)
        res.status(500).json({message:error.message})
    }
}

export const qualifyJobs = async(req,res)=>{
    try {
        const { qualify } = req.body
        if (!Array.isArray(qualify) || qualify.length === 0) {
        return res.status(400).json({ message: "Please select at least one qualification." });
        }



        const response = await aiQualifyJob(qualify)
         if(response.error) return res.status(response.status).json({message: response.message})
        req.session.qualify = `My qualifications are: ${qualify.join(",")}`
        
        //its already in json format so i don't have to use .json 
         res.status(200).json({data: response.data, 
            message:response.fallback
            ? "⚠️ Rate limit hit, response served from fallback model."
            : "✅ Response served from preferred model."
        })
    } catch (error) {
        console.log("AI error details:", error?.response?.data || error.message)
        res.status(500).json({message:error.message})
    }
}

export const moreJob = async(req, res) =>{
    try {
         if (!req.session.passion && !req.session.qualify) {
                return res.status(401).json({ message: "Session expired or not set" });
            }
        const userInput = req.session.passion || req.session.qualify;
        if (!userInput) return res.status(400).json({ message: "No previous input found. Please enter passion or qualification first." });

        const response = await aiMoreJob(userInput);
         if(response.error) return res.status(response.status).json({message: response.message})
        
        //its already in json format so i don't have to use .json 
         res.status(200).json({data: response.data, 
            message:response.fallback
            ? "⚠️ Rate limit hit, response served from fallback model."
            : "✅ Response served from preferred model."
        })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

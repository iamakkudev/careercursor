import {safeOpenRouterCall} from '../lib/ai.config.js'
import JSON5 from 'json5'
const parseAIResponse = (response) => {
    try {
        const rawContent = response?.data?.choices?.[0]?.message?.content || '';
        const jsonString = rawContent.replace(/```json|```/g, '').trim();
        const parseData = JSON5.parse(jsonString);
        return ({data:parseData, fallback: response.fallback})
    } catch (error) {
        console.error("JSON parse error:", error);
        return [];
    }
}

export const aiPassionJob = async(prompt) =>{
   
        const response = await safeOpenRouterCall( {
        model: 'deepseek/deepseek-chat-v3.1:free',
        messages: [
            {
            role: "system",
            content: `You are a career advisor in India. 
                    Return only JSON. Format:

                    [
                    {
                        "title": "Job Title",
                        "salary": "INR/month",
                        "reputation": "High / Medium / Low",
                        "reason": "Why this job matches"
                    }
                    ]

                    No explanation or markdown.`
                },
            {
            role: "user",
            content: `I like ${prompt.join(", ")}`
            }
        ]
        })

        
        return (response.error ? response : parseAIResponse(response))
  
}

export const aiPrivateJob = async() =>{
   
        const response = await safeOpenRouterCall( {
        model: 'deepseek/deepseek-chat-v3.1:free',
        messages: [
            {
            role: "system",
            content: `Act as a career advisor in India.  
                    Return a JSON array only in this format (no markdown, no extra text):

                    [
                    {
                        "title": "Job Title",
                        "salary": "INR/month",
                        "reputation": "High / Medium / Low",
                        "reason": "Why this private sector job is suitable for freshers"
                    }
                    ]

                    Suggest top 10 private sector jobs in India for fresh graduates.`
                },
                {
                role: "user",
                content: "List top 10 private jobs in India."
                }
        ]
        })
        return (response.error ? response : parseAIResponse(response))
}

export const aiGovJob = async() =>{
   
        const response = await safeOpenRouterCall( {
        model: 'meta-llama/llama-3.2-3b-instruct:free', // You can try claude-3-haiku for better reasoning
        messages: [
            {
            role: "system",
            content: `Act as a career advisor in India.  
                    Return a JSON array only in this format (no markdown, no extra text):

                    [
                    {
                        "title": "Job Title",
                        "salary": "INR/month",
                        "reputation": "High / Medium / Low",
                        "reason": "Why this government job is considered top"
                    }
                    ]

                    Suggest top 10 government jobs in India suitable for freshers.`
                },
                {
                role: "user",
                content: "List top 10 government jobs in India."
                }
        ]
        })
        return (response.error ? response : parseAIResponse(response))
  
}

export const aiQualifyJob = async(qualify) =>{
   
        const response = await safeOpenRouterCall( {
        model: 'meta-llama/llama-3.2-3b-instruct:free', 
        messages: [
            {
            role: "system",
            content: `Act as a career advisor in India.  
                        Return a JSON array only in this format (no markdown, no extra text):

                        [
                        {
                            "title": "Job Title",
                            "salary": "INR/month",
                            "reputation": "High / Medium / Low",
                            "reason": "Why this job fits the given qualifications"
                        }
                        ]

                        Suggest 5 jobs based on the user's qualifications`
                },
            {
            role: "user",
            content: `My qualifications are: ${qualify.join(",")}. Suggest 5 suitable job options.`
            }
        ]
        })
        return (response.error ? response : parseAIResponse(response))
  
}

export const aiMoreJob = async(userInput) =>{
   
        const response = await safeOpenRouterCall( {
        model: 'deepseek/deepseek-chat-v3-0324:free', 
        messages: [
            {
            role: "system",
            content: `You are an expert Indian career advisor. Based on the user's previous input, suggest 5 **new and different** job options in valid JSON format.
                        Format:
                        [
                        {
                            "title": "Job Title",
                            "salary": "Starting salary in INR per month",
                            "reputation": "High / Medium / Low",
                            "reason": "Why this job fits the user"
                        }
                        ]
                        Guidelines:
                        - Do not repeat jobs from earlier
                        - Recommend suitable jobs based on the user's passion or qualification
                        - Keep the suggestions fresh but still realistic
                        - Output only JSON`

                },
            {
            role: "user",
            content: "Suggest 5 more job options based on this: " + userInput
            }
        ]
        })
        return (response.error ? response : parseAIResponse(response))
  
}

export const aiRoadmap = async(job) =>{
   
        const response = await safeOpenRouterCall( {
        model: 'deepseek/deepseek-chat-v3.1:free', 
        messages: [
            {
            role: "system",
            content: `You are a career roadmap expert for Indian students and freshers.
                        Given a job title, return a complete roadmap in this **strict JSON format** (no markdown, no extra text):

                        {
                        "about": "Brief intro to the job in India",
                        "requirements": ["Required skills or qualifications"],
                        "phases": [
                            {
                            "phase": "Phase 1: Title",
                            "description": "Summary of this phase",
                            "items": [
                                {
                                "title": "Step title",
                                "details": "What to learn/do"
                                }
                            ]
                            }
                        ]
                        }

                        Guidelines:
                        - Use simple, clear language
                        - JSON must be valid and match the format exactly
                        - Include both learning and practical actions
                        - Mention tools or skills relevant in India
                        - Output only the JSON`

                },
            {
            role: "user",
            content: job
            }
        ]
        })
        return (response.error ? response : parseAIResponse(response))
  
}


const Resume = require("../models/Resume.js");
const fs = require("fs");
const pdf= require("pdf-parse");
const groq = require("../config/groq.js");
const { parse } = require("path");


exports.uploadResume = async(req,res)=>{
    // console.log(req.user);
    // console.log(req.file);
    try{

        const dataBuffer = 
        fs.readFileSync(req.file.path);

        const pdfData = await
          pdf(dataBuffer);

        console.log(pdfData.text);

        // const response = await
        // ai.models.groqContent({
        //     model:""
        //     contents:`
        //     you are an ATS Resume
        //      Expert.

        //     Analyze this resume.
        //     Resume:
        //     ${pdfData.text}

        //     GIVE:
        //     1. ATS score out of 100
        //     2. Strengths
        //     3. Weaknesses
        //     4. Missing Skills
        //     5. Suggestions`
        // });
        // const result = response.text();
        // console.log(result);

        // const models = await ai.models.list();

        // console.log(models);

        const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
      {
       role: "system",
       content: "You are an ATS Resume Expert."
      },
      {
       role: "user",
       content:`Analyze this resume.

   Resume:
  ${pdfData.text}

  Return ONLY valid JSON in this format:

{
      "atsScore": Number,
      "strengths": [String],
      "weaknesses": [String],
      "missingSkills": [String],
      "suggestions": [String]
}

     Do not use markdown.
     Do not use \`\`\`json.
     Return only JSON.`

    }
]
 });

    
    

const analysis = JSON.parse(response.choices[0].message.content);

console.log(analysis);

        
        const resume = await
        Resume.create({
            user:req.user.id,
            resumePath:req.file.path,
            resumeText:pdfData.text,
            analysis:analysis,
        });
       
        return res.status(200).json({
            success:true,
            message:"Resume uploaded successfully",
            resume,
            analysis
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};


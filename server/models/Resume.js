const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    resumePath:{
        type:String,
        required:true
    },

    resumeText:{
     type:String
    },
    
    analysis:{
      atsScore: Number,
      strengths: [String],
      weaknesses: [String],
      missingSkills: [String],
      suggestions: [String],

    },
    uploadedAt:{
        type:Date,
        default:Date.now
    }

});

module.exports= mongoose.model("Resume",resumeSchema);
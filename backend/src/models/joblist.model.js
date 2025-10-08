import mongoose from "mongoose";

const JoblistSchema = new mongoose.Schema({
  list:[
    {
        title:String,
        salary:String,
        reputation:String,
        reason:String
    }
  ]
});

export const Joblist = mongoose.model('Joblist', joblistSchema);

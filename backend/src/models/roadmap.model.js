import mongoose from "mongoose";


const roadmapSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  about: { type: String },
  requirements: [String],
  phases: [
    {
      phase: String,
      description: String,
      items: [
        {
          title: String,
          details: String
        }
      ]
    }
  ],
});

export const Roadmap = mongoose.model('Roadmap', roadmapSchema);

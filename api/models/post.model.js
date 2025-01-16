const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    jobType: {
      type: String,
      required: true,
      enum: [
        "Full-time (On-site)",
        "Part-time (On-site)",
        "Full-time (Remote)",
        "Part-time (Remote)",
      ],
    },
    jobDescription: {
      type: String,
      required: true,
    },
    qualifications: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

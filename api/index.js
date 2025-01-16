const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const { initializeDatabase } = require("./db/db.connect");
const Post = require("./models/post.model");

app.use(express.json());
app.use(cors());

initializeDatabase();
const PORT = process.env.PORT;

app.post("/api/job", async (req, res) => {
  try {
    const newJob = new Post(req.body);
    const savedJob = await newJob.save();

    if (savedJob) {
      res
        .status(201)
        .json({ message: "Job posted successfully.", job: savedJob });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/job", async (req, res) => {
  try {
    const jobs = await Post.find();

    if (jobs) {
      res.json(jobs);
    } else {
      res.status(404).json({ error: "Jobs not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/job/:id", async (req, res) => {
  try {
    const jobData = await Post.findById(req.params.id);

    if (jobData) {
      res
        .status(200)
        .json({ message: "Job data found successfully.", job: jobData });
    } else {
      res.status(404).json({ error: "Job data not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.delete("/api/job/:id", async (req, res) => {
  try {
    const deletedData = await Post.findByIdAndDelete(req.params.id);

    if (deletedData) {
      res
        .status(200)
        .json({ message: "Job data deleted successfully.", job: deletedData });
    } else {
      res.status(404).json({ error: "Job data not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

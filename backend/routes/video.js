const express = require("express");
const Video = require("../models/video");
const WatchHistory = require("../models/watchhistory");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


// returns list of videos (protected)
router.get("/", auth, async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

// POST /api/videos/track
// body: { videoId: "...", minutes: number }  (minutes is delta minutes to add)
router.post("/track", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const { videoId, maxMinute } = req.body;

    if (!videoId || typeof maxMinute !== "number" || maxMinute < 0) {
      return res.status(400).json({ msg: "videoId and valid maxMinute required" });
    }

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ msg: "video not found" });

    let record = await WatchHistory.findOne({ user: userId, video: videoId });
    if (record) {
      // Only update if user progressed further
      if (maxMinute > record.minutesWatched) {
        record.minutesWatched = maxMinute;
        record.lastWatchedAt = Date.now();
        await record.save();
      }
    } else {
      record = new WatchHistory({
        user: userId,
        video: videoId,
        minutesWatched: maxMinute,
      });
      await record.save();
    }

    res.json({ msg: "watch time updated", record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});


// returns a single video by id (protected)
router.get("/:id", auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});



module.exports = router;

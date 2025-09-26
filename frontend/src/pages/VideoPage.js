import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./VideoPage.css";

function VideoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [lastSentTime, setLastSentTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setVideo(data);
        else setVideo(null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video:", err);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [navigate, token, id]);

  const handleTimeUpdate = async (e) => {
    if (!video || !video._id) return;

    const currentMinute = Math.floor(e.target.currentTime / 60);
    if (currentMinute > lastSentTime) {
      try {
        await fetch("http://localhost:5000/api/videos/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            videoId: video._id,
            maxMinute: currentMinute,
          }),
        });

        setLastSentTime(currentMinute);
      } catch (err) {
        console.error("Error tracking watch time:", err);
      }
    }
  };

  if (loading)
    return <p style={{ color: "#fff", textAlign: "center" }}>Loading video...</p>;
  if (!video)
    return <p style={{ color: "#fff", textAlign: "center" }}>Video not found.</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
        color: "#fff",
      }}
    >
      {/* Video container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1000px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 12px 32px rgba(0,0,0,0.4)",
          marginBottom: "40px",
        }}
      >
        <video
          controls
          onTimeUpdate={handleTimeUpdate}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Back Button with animation */}
      {/* Floating Back Button */}
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}

export default VideoPage;

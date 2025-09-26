import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AnimatedCubes from "./AnimatedCubes"; 

function Dashboard() {
  const [username, setUsername] = useState("");
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUsername(JSON.parse(storedUser).username);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/videos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        py: 4,
        overflow: "hidden", // ensure cubes don’t scroll outside
      }}
    >
      {/* Navigation Bar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
          zIndex: 10, // ensure navbar is above cubes
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Animated Cube Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15, // subtle overlay behind cards
          zIndex: 1,
          pointerEvents: "none", // cubes won't block clicks
        }}
      >
        <AnimatedCubes />
      </Box>

      <Container sx={{ py: 4, position: "relative", zIndex: 5 }}>
        {/* Greeting above thumbnails */}
        <Typography
          variant="h4"
          sx={{ color: "#fff", fontWeight: "bold", mb: 4 }}
        >
          Hello {username}!
        </Typography>

        {/* Video Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "flex-start",
          }}
        >
          {videos.map((video) => (
            <Card
              key={video._id}
              sx={{
                width: 350, // increased size
                borderRadius: 3,
                boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 12px 32px rgba(0,0,0,0.3)",
                },
                background:
                  "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
              }}
            >
              <CardActionArea onClick={() => navigate(`/video/${video._id}`)}>
                <CardMedia
                  component="img"
                  height="220" // larger thumbnail
                  image={
                    video.thumbnail ||
                    "https://via.placeholder.com/400x225?text=No+Thumbnail"
                  }
                  alt={video.title}
                />
                <CardContent
                  sx={{
                    background:
                      "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    {video.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;

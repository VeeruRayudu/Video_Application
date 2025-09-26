import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // store error message

  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(""); // reset error before request
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      if (
        err.response?.status === 400 &&
        err.response?.data?.msg === "Email already registered"
      ) {
        setError("User already exists. Please login.");
      } else {
        setError(err.response?.data?.msg || "Signup failed");
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            width: "100%",
            maxWidth: 400,
            margin: "auto",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create Account ✨
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Sign up to get started
          </Typography>

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1, fontWeight: "bold" }}
            >
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              "&:hover": {
                background: "linear-gradient(90deg, #5a67d8, #6b46c1)",
              },
            }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignupPage;

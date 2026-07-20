import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: string } })?.response?.data ??
        "Invalid credentials";
      setError(typeof msg === "string" ? msg : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Decorative gradient orbs */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          top: "-10%",
          left: "-5%",
          filter: "blur(40px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-5%",
          filter: "blur(40px)",
        }}
      />

      <Card
        elevation={0}
        sx={{
          width: { xs: "90%", sm: 420 },
          borderRadius: 4,
          position: "relative",
          zIndex: 1,
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(30, 41, 59, 0.7)",
          backdropFilter: "blur(24px)",
        }}>
        <CardContent sx={{ p: 5 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.25rem",
              }}>
              HR
            </Box>
          </Box>

          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            sx={{ color: "#e2e8f0", mb: 0.5 }}>
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: "#94a3b8", mb: 3 }}>
            Sign in to your HRMS account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  color: "#e2e8f0",
                  "& fieldset": { borderColor: "rgba(148,163,184,0.3)" },
                  "&:hover fieldset": { borderColor: "rgba(148,163,184,0.5)" },
                },
                "& .MuiInputLabel-root": { color: "#94a3b8" },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#64748b", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  color: "#e2e8f0",
                  "& fieldset": { borderColor: "rgba(148,163,184,0.3)" },
                  "&:hover fieldset": { borderColor: "rgba(148,163,184,0.5)" },
                },
                "& .MuiInputLabel-root": { color: "#94a3b8" },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#64748b", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#64748b" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                background:
                  "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)",
                },
              }}>
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;

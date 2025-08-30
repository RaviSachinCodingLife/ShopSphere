"use client";

import Link from "next/link";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useLogin } from "./useLogin";

export default function Login() {
  const { form, handleChange, handleLogin, loading, error, inputs } =
    useLogin();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={2}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          border: "1px solid #a9cef3ff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ color: "#1976d2" }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} mb={3}>
          Sign in to continue to{" "}
          <span style={{ fontWeight: 600, color: "#1976d2" }}>ShopSphere</span>
        </Typography>

        <form onSubmit={handleLogin}>
          {inputs.map((input) => (
            <TextField
              key={input.name}
              label={input.label}
              type={input.type}
              name={input.name}
              value={form[input.name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": { borderColor: "#b0bec5" },
                  "&:hover fieldset": { borderColor: "#1976d2" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                    borderWidth: 2,
                  },
                },
              }}
            />
          ))}

          {error && (
            <Alert severity="error" sx={{ mt: 2, textAlign: "left" }}>
              {error.message}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

        <Typography variant="body2" mt={3} sx={{ color: "text.secondary" }}>
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            style={{
              textDecoration: "none",
              fontWeight: 600,
              color: "#1976d2",
            }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

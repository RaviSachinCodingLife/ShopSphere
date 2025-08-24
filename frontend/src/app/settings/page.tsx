"use client";

import { useSettings } from "./useSettings";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid, Paper,
  TextField,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";

export default function Settings() {
  const {
    user,
    upgrading,
    handleUpgrade,
    handleLogout,
    handleUpdateProfile,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
  } = useSettings();

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error">Please login to access Settings</Typography>
      </Box>
    );
  }

  return (
    <Box width="100%" p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" fontWeight={500} gutterBottom color="textSecondary">
        Settings
      </Typography>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              background: "rgba(100,149,237,0.08)",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 4, }}>
              <Avatar
                src={user.avatar || ""}
                alt={user.username}
                sx={{ width: 150, height: 150, mx: "auto", mb: 2, bgcolor: "#6495ED" }}
              />
              <Typography variant="h6" fontWeight={500} textTransform={"capitalize"}>
                {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="body2" mt={1} fontWeight={600} sx={{ color: "cornflowerblue" }}>
                Role: {user.role}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              background: "rgba(100,149,237,0.08)",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: "cornflowerblue" }}>
              Account Settings
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Username"
                defaultValue={user.username}
                fullWidth
                onBlur={(e) => handleUpdateProfile("username", e.target.value)}
              />
              <TextField
                label="Email"
                defaultValue={user.email}
                fullWidth
                onBlur={(e) => handleUpdateProfile("email", e.target.value)}
              />
              <TextField
                label="Change Password"
                type="password"
                placeholder="New password"
                fullWidth
                onBlur={(e) => handleUpdateProfile("password" as keyof typeof user, e.target.value)}
              />
            </Box>

            <Box mt={4} display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#4169E1",
                  "&:hover": { bgcolor: "#27408B" },
                  borderRadius: 2,
                  px: 3,
                }}
                onClick={handleUpgrade}
                disabled={upgrading}
              >
                {upgrading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Upgrade to Admin"}
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#4169E1",
                  color: "#4169E1",
                  "&:hover": { bgcolor: "#4169E1", color: "#fff" },
                  borderRadius: 2,
                  px: 3,
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

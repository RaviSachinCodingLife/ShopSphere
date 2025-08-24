"use client";
import { useState } from "react";
import { useTopbar } from "./useComponents";
import Link from "next/link";
import {
    AppBar,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Box,
    Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function Topbar() {
    const { user, logout } = useTopbar();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backdropFilter: "blur(12px)",
                background: "rgba(255, 255, 255, 0.8)",
                color: "black",
                borderBottom: "2px solid rgba(100, 149, 237, 0.5)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        color: "cornflowerblue",
                        cursor: "pointer",
                        letterSpacing: "0.5px",
                    }}
                    component={Link}
                    href="/"
                >
                    E-Commerce Analytics
                </Typography>

                {user ? (
                    <Box>
                        <Button
                            onClick={handleMenu}
                            startIcon={<AccountCircle />}
                            sx={{
                                textTransform: "capitalize",
                                fontWeight: 600,
                                color: "cornflowerblue",
                                "&:hover": { bgcolor: "rgba(100,149,237,0.1)" },
                            }}
                        >
                            Hi, {user.username}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem component={Link} href="/settings" onClick={handleClose}>
                                <Settings fontSize="small" sx={{ color: "cornflowerblue", mr: 1 }} />{" "}
                                <span
                                    style={{
                                        fontWeight: 500,
                                        fontSize: "0.95rem",
                                        color: "text.primary",
                                    }}
                                >
                                    Settings
                                </span>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    logout();
                                }}
                            >
                                <Logout fontSize="small" sx={{ color: "cornflowerblue", mr: 1 }} />
                                <span
                                    style={{
                                        fontWeight: 500,
                                        fontSize: "0.95rem",
                                        color: "text.primary",
                                    }}
                                >
                                    Logout
                                </span>
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "cornflowerblue",
                            color: "cornflowerblue",
                            fontWeight: 600,
                            "&:hover": {
                                borderColor: "blue",
                                backgroundColor: "rgba(100,149,237,0.08)",
                            },
                        }}
                        component={Link}
                        href="/auth/login"
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

"use client";

import { BarChart3, Package, Users, Activity, Truck } from "lucide-react";
import Link from "next/link";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box,
    Divider,
} from "@mui/material";



const items = [
    { href: "/", label: "Dashboard", icon: <BarChart3 size={20} /> },
    { href: "/sales", label: "Sales", icon: <Activity size={20} /> },
    { href: "/inventory", label: "Inventory", icon: <Package size={20} /> },
    { href: "/users", label: "Users", icon: <Users size={20} /> },
    { href: "/orders", label: "Orders", icon: <Truck size={20} /> },
];

const drawerWidth = 260;

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backdropFilter: "blur(14px)",
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRight: "2px solid rgba(100, 149, 237, 0.5)",
                    boxShadow: "4px 0 20px rgba(0,0,0,0.05)",
                },
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        color: "cornflowerblue",
                        letterSpacing: "1px",
                        flexGrow: 1,
                    }}
                >
                    ShopSphere
                </Typography>
            </Toolbar>

            <Divider sx={{ border: "1px solid rgba(100, 149, 237, 0.5)" }} />

            <List>
                {items.map((it) => (
                    <ListItemButton
                        key={it.href}
                        component={Link}
                        href={it.href}
                        sx={{
                            borderRadius: 2,
                            mx: 1,
                            my: 0.5,
                            transition: "0.25s ease",
                            "&:hover": {
                                bgcolor: "rgba(100, 149, 237, 0.5)",
                                transform: "translateX(4px)",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "cornflowerblue", minWidth: 40 }}>
                            {it.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={it.label}
                            slotProps={{
                                primary: {
                                    sx: {
                                        fontWeight: 500,
                                        fontSize: "0.95rem",
                                        color: "text.primary",
                                    },
                                },
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Box
                sx={{
                    mt: "auto",
                    px: 2,
                    py: 3,
                    textAlign: "center",
                    borderTop: "1px solid rgba(100, 149, 237, 0.5)",
                    background:
                        "linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.3))",
                }}
            >
                <Typography
                    variant="body2"
                    fontSize="0.8rem"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                >
                    v1.0
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        color: "cornflowerblue",
                        textTransform: "capitalize",
                        textShadow: "0px 0px 6px rgba(100, 149, 237, 0.5)",
                    }}
                >
                    made by ravisachincodinglife
                </Typography>
            </Box>
        </Drawer>
    );
}

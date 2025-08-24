"use client";

import { Card, CardContent, Typography, useTheme, Box } from "@mui/material";
import { KpiCardProps, KpiGridProps } from "./type";


const KpiCard = ({ title, value, hint }: KpiCardProps) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                flex: 1,
                minHeight: 140,
                borderRadius: 4,
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.85)",
                border: "2px solid rgba(100, 149, 237, 0.5)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary, fontWeight: 500, letterSpacing: 0.5 }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{ mt: 1, color: "cornflowerblue", wordBreak: "break-word" }}
                >
                    {value}
                </Typography>

                {hint && (
                    <Typography variant="caption" sx={{ mt: 0.5, display: "block", color: theme.palette.text.disabled }}>
                        {hint}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

const KpiGrid = ({ children }: KpiGridProps) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                },
                gap: 2,
                width: "100%",
            }}
        >
            {children}
        </Box>
    );
}


export { KpiCard, KpiGrid }
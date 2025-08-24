"use client";

import { useQuery } from "@apollo/client/react";
import { USERS } from "@/graphql/queries";
import { UsersData, UsersVars } from "./type";
import {
    Box,
    Typography, Card,
    CircularProgress,
    Alert,
    Divider
} from "@mui/material";
import LineAreaChart from "@/components/LineAreaChart";
import { KpiCard, KpiGrid } from "@/components/KpiCard";


export default function Users() {
    const { data, loading, error } = useQuery<UsersData, UsersVars>(USERS, {
        variables: { range: "last_30" },
    });

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress sx={{ color: "#4169E1" }} />
            </Box>
        );

    if (error)
        return (
            <Box p={4}>
                <Alert severity="error">{String(error)}</Alert>
            </Box>
        );

    if (!data) return null;
    const u = data.userBehavior;

    return (
        <Box width="100%" p={{ xs: 2, md: 4 }}>
            <Typography variant="h4" fontWeight={500} gutterBottom color="textSecondary">
                User Analytics
            </Typography>


            <KpiGrid>
                <KpiCard title="Active Users" value={u.activeUsers} />
                <KpiCard title="New Users" value={u.newUsers} />
                <KpiCard title="Returning Users" value={u.returningUsers} />
                <KpiCard title="Avg Session (min)" value={u.avgSessionMins} />
            </KpiGrid>

            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    p: 3,
                }}
            >
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: "#4169E1" }}>
                    Conversion Funnel (Relative)
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <LineAreaChart data={u.funnel} xKey="date" dataKey="value" />
            </Card>
        </Box >
    );
}

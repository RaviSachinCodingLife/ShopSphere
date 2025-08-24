"use client";

import { useDashboard } from "./useDashboard";
import { KpiCard, KpiGrid } from "@/components/KpiCard";
import LineAreaChart from "@/components/LineAreaChart";
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

export default function Dashboard() {
  const { data, loading, error, openError, handleCloseError } = useDashboard();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={50} color="info" />
      </Box>
    );
  }

  if (!data) return null;

  const kpis = [
    { title: "Total Sales", value: `$${data.dashboardKPIs.totalSales.toLocaleString()}`, hint: "Last 30 days" },
    { title: "Orders in Progress", value: data.dashboardKPIs.ordersInProgress },
    { title: "Active Users", value: data.dashboardKPIs.activeUsers },
  ];

  return (
    <Box width="100%" p={{ xs: 2, md: 4 }}>
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleCloseError} variant="filled">
          {String(error)}
        </Alert>
      </Snackbar>

      <Typography variant="h4" fontWeight={500} color="textSecondary" gutterBottom >
        Dashboard
      </Typography>

      <KpiGrid>
        {kpis.map((kpi, idx) => (
          <KpiCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            hint={kpi.hint}
          />
        ))}
      </KpiGrid>

      <Box flex={1} px={{ xs: 1, md: 2 }} mt={1}>
        <LineAreaChart
          data={data.salesAnalytics.revenueTrend}
          xKey="date"
          dataKey="value"
          title="Revenue Trend"
          subtitle="Last 30 Days Overview"
        />
      </Box>
    </Box>
  );
}

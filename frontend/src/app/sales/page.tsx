"use client";

import LineAreaChart from "@/components/LineAreaChart";
import {
    Box,
    Typography,
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
} from "@mui/material";
import { useSales } from "./useSales";


export default function Sales() {
    const { data, loading, error, changeFilter, FILTERS, PRODUCT_HEADERS } = useSales();

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={50} sx={{ color: "#6495ED" }} />
            </Box>
        );

    if (error) return <Typography color="error">{String(error)}</Typography>;
    if (!data) return null;

    const s = data.salesAnalytics;

    return (
        <Box width="100%" p={{ xs: 2, md: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap">
                <Typography variant="h4" fontWeight={500} color="textSecondary">
                    Sales Analytics
                </Typography>
                <ButtonGroup>
                    {FILTERS.map((f) => (
                        <Button
                            key={f.label}
                            onClick={() => changeFilter(f.range, f.groupBy)}
                            variant="outlined"
                            sx={{
                                textTransform: "capitalize",
                                borderColor: "#6495ED",
                                color: "#6495ED",
                                "&:hover": { backgroundColor: "#4169E1", color: "#fff", borderColor: "#4169E1" },
                            }}
                        >
                            {f.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>

            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    mb: 4,
                    backdropFilter: "blur(12px)",
                    background: "rgba(100,149,237,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
            >
                <LineAreaChart data={s.revenueTrend} xKey="date" dataKey="value" />
            </Paper>

            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    backdropFilter: "blur(12px)",
                    background: "rgba(100,149,237,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
            >
                <Typography variant="h6" fontWeight={500} mb={2} color="textSecondary">
                    Top Products
                </Typography>
                <Table sx={{ minWidth: 900 }} size="small">
                    <TableHead sx={{ bgcolor: "#6495ED22" }}>
                        <TableRow>
                            {PRODUCT_HEADERS.map((h) => (
                                <TableCell key={h.key} sx={{ fontWeight: 600, color: "#4169E1" }}>
                                    {h.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {s.topProducts.map((p: any) => (
                            <TableRow
                                key={p.id}
                                hover
                                sx={{ "&:hover": { backgroundColor: "rgba(100,149,237,0.15)" } }}
                            >
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.units}</TableCell>
                                <TableCell>${p.revenue.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}
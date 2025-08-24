"use client";

import {
    CircularProgress,
    Box,
    Table,
    Typography,
    ButtonGroup,
    Button,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Pagination,
} from "@mui/material";
import { useInventory } from "./useInventory";

export default function Inventory() {
    const pageSize = 12;
    const {
        data,
        loading,
        error,
        filters,
        setPage,
        setStatus,
        STATUS_COLORS,
        TABLE_HEADERS,
        STATUSES,
    } = useInventory(pageSize);

    if (loading)
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >
                <CircularProgress size={50} sx={{ color: "#6495ED" }} />
            </Box>
        );
    if (error) return <Typography color="error">{String(error)}</Typography>;
    if (!data) return null;

    const inv = data.inventory;
    const totalPages = Math.ceil(inv.total / inv.pageSize);

    return (
        <Box width="100%" p={{ xs: 2, md: 4 }}>
            <Typography
                variant="h4"
                fontWeight={500}
                color="textSecondary"
                gutterBottom
            >
                Inventory
            </Typography>

            <ButtonGroup sx={{ mb: 3, borderRadius: 2 }} variant="outlined">
                {STATUSES.map((s) => {
                    const currentStatus = s === "ALL" ? null : s;
                    return (
                        <Button
                            key={s}
                            variant={
                                filters.status === currentStatus ? "contained" : "outlined"
                            }
                            onClick={() => setStatus(currentStatus)}
                            sx={{
                                textTransform: "capitalize",
                                color: filters.status === currentStatus ? "#fff" : "#6495ED",
                                backgroundColor:
                                    filters.status === currentStatus ? "#6495ED" : "transparent",
                                borderColor: "#6495ED",
                                "&:hover": {
                                    backgroundColor: "#4169E1",
                                    color: "#fff",
                                    borderColor: "#4169E1",
                                },
                            }}
                        >
                            {s.replace("_", " ")}
                        </Button>
                    );
                })}
            </ButtonGroup>

            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    mb: 3,
                    overflowX: "auto",
                    backdropFilter: "blur(12px)",
                    background: "rgba(100,149,237,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
            >
                <Table sx={{ minWidth: 1000 }} size="small">
                    <TableHead sx={{ bgcolor: "#6495ED22" }}>
                        <TableRow>
                            {TABLE_HEADERS.map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{ fontWeight: 600, color: "#4169E1" }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inv.items.map((it) => (
                            <TableRow
                                key={it.id}
                                hover
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "rgba(100,149,237,0.15)",
                                    },
                                }}
                            >
                                <TableCell>{it.sku}</TableCell>
                                <TableCell>{it.name}</TableCell>
                                <TableCell>{it.stock}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={it.status.replace("_", " ")}
                                        sx={{
                                            backgroundColor: STATUS_COLORS[it.status] || "#6495ED44",
                                            color: "#fff",
                                            fontWeight: 600,
                                            textTransform: "capitalize",
                                        }}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Box display="flex" justifyContent="flex-end">
                <Pagination
                    count={totalPages}
                    page={filters.page}
                    color="primary"
                    onChange={(_, value) => setPage(value)}
                    sx={{
                        "& .MuiPaginationItem-root": { color: "#4169E1" },
                        "& .Mui-selected": { backgroundColor: "#6495ED" },
                    }}
                />
            </Box>
        </Box>
    );
}

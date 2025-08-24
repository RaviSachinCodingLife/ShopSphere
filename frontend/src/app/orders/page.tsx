"use client";

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
    Chip,
    Stack,
} from "@mui/material";
import { useOrders } from "./useOrders";


export default function Orders() {
    const { data,
        loading,
        error,
        status,
        changeStatus,
        handleUpdate,
        fetchMore,
        STATUSES,
        STATUS_COLORS,
        ACTIONS,
        TABLE_HEADERS, } = useOrders();

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={50} sx={{ color: "#6495ED" }} />
            </Box>
        );

    if (error) return <Typography color="error">{String(error)}</Typography>;
    if (!data) return null;

    const edges = data.orders.edges;

    return (
        <Box width="100%" p={{ xs: 2, md: 4 }}>
            <Typography variant="h4" fontWeight={500} gutterBottom color="textSecondary">
                Order Tracking
            </Typography>

            {/* Status Filters */}
            <ButtonGroup sx={{ mb: 3, borderRadius: 2 }}>
                {STATUSES.map((s) => (
                    <Button
                        key={s}
                        onClick={() => changeStatus(s)}
                        variant={status === (s === "ALL" ? undefined : s) ? "contained" : "outlined"}
                        sx={{
                            textTransform: "capitalize",
                            color: status === (s === "ALL" ? undefined : s) ? "#fff" : "#6495ED",
                            backgroundColor: status === (s === "ALL" ? undefined : s) ? "#6495ED" : "transparent",
                            borderColor: "#6495ED",
                            "&:hover": {
                                backgroundColor: "#4169E1",
                                color: "#fff",
                                borderColor: "#4169E1",
                            },
                        }}
                    >
                        {s}
                    </Button>
                ))}
            </ButtonGroup>

            <Paper
                sx={{
                    overflowX: "auto",
                    backdropFilter: "blur(12px)",
                    background: "rgba(100,149,237,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
            >
                <Table sx={{ minWidth: 1000 }} size="small">
                    <TableHead sx={{ bgcolor: "#6495ED22" }}>
                        <TableRow>
                            {TABLE_HEADERS.map((h) => (
                                <TableCell key={h.key} sx={{ fontWeight: 600, color: "#4169E1" }}>
                                    {h.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {edges.map((e) => (
                            <TableRow
                                key={e.node.id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: "rgba(100,149,237,0.15)" },
                                }}
                            >
                                <TableCell>{e.node.id}</TableCell>
                                <TableCell>${e.node.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={e.node.status.replace("_", " ")}
                                        sx={{
                                            backgroundColor: STATUS_COLORS[e.node.status] || "#6495ED44",
                                            color: "#fff",
                                            fontWeight: 600,
                                            textTransform: "capitalize",
                                        }}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{e.node.customer}</TableCell>
                                <TableCell>{new Date(e.node.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {ACTIONS.map((st) => (
                                            <Button
                                                key={st}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    textTransform: "capitalize",
                                                    borderColor: "#6495ED",
                                                    color: "#6495ED",
                                                    minWidth: 80,
                                                }}
                                                onClick={() => handleUpdate(e.node.id, st)}
                                            >
                                                {st}
                                            </Button>
                                        ))}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {data.orders.pageInfo.hasNextPage && (
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button
                            variant="outlined"
                            sx={{ textTransform: "none", borderColor: "#6495ED", color: "#6495ED" }}
                            onClick={() => fetchMore({ variables: { after: data.orders.pageInfo.endCursor } })}
                        >
                            Load More
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
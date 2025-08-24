"use client";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    Area,
    ReferenceLine,
} from "recharts";
import {
    Card,
    CardContent,
    Typography,
    Box,
    useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

type LineAreaChartProps = {
    data: { [key: string]: any }[];
    xKey: string;
    dataKey: string;
    title?: string;
    subtitle?: string;
};

const AnimatedTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(100,149,237,0.25)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
            >
                <p style={{ margin: 0, fontSize: "0.8rem", color: "gray" }}>
                    {dayjs(label).format("DD/MM/YY")}
                </p>
                {payload.map((entry: any, index: number) => (
                    <p
                        key={`item-${index}`}
                        style={{
                            margin: 0,
                            fontWeight: 600,
                            color: "cornflowerblue",
                        }}
                    >
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};

export default function LineAreaChart({
    data,
    xKey,
    dataKey,
    title = "Sales Trend",
    subtitle = "Last 6 Months Overview",
}: LineAreaChartProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                borderRadius: 4,
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
        >
            <CardContent>
                <Box mb={2}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ color: "cornflowerblue" }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>

                <Box sx={{ height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="0%"
                                        stopColor="cornflowerblue"
                                        stopOpacity={0.4}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="cornflowerblue"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(0,0,0,0.1)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey={xKey}
                                tickFormatter={(date) => dayjs(date).format("DD/MM/YY")}
                                tick={{ fill: theme.palette.text.secondary }}
                                axisLine={{ stroke: "cornflowerblue", strokeWidth: 2 }}
                                tickLine={{ stroke: "cornflowerblue", strokeWidth: 1 }}
                            />
                            <YAxis
                                tick={{ fill: theme.palette.text.secondary }}
                                axisLine={{ stroke: "cornflowerblue", strokeWidth: 2 }}
                                tickLine={{ stroke: "cornflowerblue", strokeWidth: 1 }}
                            />
                            <Tooltip content={<AnimatedTooltip />} />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ fontWeight: 500 }}
                            />


                            <Line
                                type="monotone"
                                dataKey={dataKey}
                                stroke="cornflowerblue"
                                strokeWidth={3}
                                dot={{
                                    r: 5,
                                    fill: "white",
                                    stroke: "cornflowerblue",
                                    strokeWidth: 2,
                                }}
                                activeDot={{ r: 7, strokeWidth: 2, fill: "cornflowerblue" }}
                                isAnimationActive={true}
                                animationDuration={1200}
                                animationEasing="ease-in-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}

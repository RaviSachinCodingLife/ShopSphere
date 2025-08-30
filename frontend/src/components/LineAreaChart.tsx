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
} from "recharts";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import dayjs from "dayjs";
import AnimatedTooltip from "./AnimatedTooltip";

type LineAreaChartProps<T extends object = { date: string; value: number }> = {
  data: T[];
  xKey: keyof T;
  dataKey: keyof T;
  title?: string;
  subtitle?: string;
};

export default function LineAreaChart<T extends object>({
  data,
  xKey,
  dataKey,
  title = "Sales Trend",
  subtitle = "Last 6 Months Overview",
}: LineAreaChartProps<T>) {
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
                dataKey={xKey as string}
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
                dataKey={dataKey as string}
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

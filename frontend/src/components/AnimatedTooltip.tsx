import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

type TooltipPayloadItem<Value = number | string, Name = string> = {
  name?: Name;
  value?: Value;
  [key: string]: unknown;
};

type AnimatedTooltipProps<Value = number | string, Name = string> = {
  active?: boolean;
  payload?: TooltipPayloadItem<Value, Name>[];
  label?: string | number;
};

const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;

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
        {label !== undefined && (
          <p style={{ margin: 0, fontSize: "0.8rem", color: "gray" }}>
            {dayjs(String(label)).format("DD/MM/YY")}
          </p>
        )}

        {payload.map((entry: TooltipPayloadItem, index: number) => {
          return (
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
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTooltip;

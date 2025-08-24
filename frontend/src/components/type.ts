import { ReactNode } from "react";

type KpiCardProps = {
  title: string;
  value: string | number;
  hint?: string;
};
type KpiGridProps = {
  children: ReactNode;
};

export type { KpiCardProps, KpiGridProps };

import { useQuery } from "@apollo/client/react";
import { DASHBOARD } from "@/graphql/queries";
import { DashboardData } from "./type";
import { useState, useEffect } from "react";

export function useDashboard() {
  const { data, loading, error } = useQuery<DashboardData>(DASHBOARD);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (error) setOpenError(true);
  }, [error]);

  const handleCloseError = () => setOpenError(false);

  return { data, loading, error, openError, handleCloseError };
}

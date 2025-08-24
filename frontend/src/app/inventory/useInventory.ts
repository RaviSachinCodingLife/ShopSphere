"use client";

import { INVENTORY } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";
import { useState, useCallback } from "react";
import { InventoryData, InventoryVars } from "./type";

export function useInventory(pageSize = 12) {
  const [filters, setFilters] = useState<{
    page: number;
    status: string | null;
  }>({
    page: 1,
    status: null,
  });

  const { data, loading, error, refetch } = useQuery<
    InventoryData,
    InventoryVars
  >(INVENTORY, {
    variables: { page: filters.page, pageSize, status: filters.status },
  });

  const setPage = useCallback(
    (page: number) => {
      setFilters((prev) => ({ ...prev, page }));
      refetch({ page, pageSize, status: filters.status });
    },
    [refetch, pageSize, filters.status]
  );

  const setStatus = useCallback(
    (status: string | null) => {
      setFilters({ page: 1, status });
      refetch({ page: 1, pageSize, status });
    },
    [refetch, pageSize]
  );

  const STATUS_COLORS: Record<string, string> = {
    IN_STOCK: "#4caf50",
    LOW: "#ff9800",
    OUT_OF_STOCK: "#f44336",
    ALL: "#6495ED",
  };

  const TABLE_HEADERS = ["SKU", "Name", "Stock", "Status"];

  const STATUSES = ["ALL", "IN_STOCK", "LOW", "OUT_OF_STOCK"];

  return {
    data,
    loading,
    error,
    filters,
    setPage,
    setStatus,
    STATUS_COLORS,
    TABLE_HEADERS,
    STATUSES,
  };
}

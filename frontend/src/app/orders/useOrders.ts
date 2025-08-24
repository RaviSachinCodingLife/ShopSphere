"use client";

import { ORDERS, UPDATE_ORDER } from "@/graphql/queries";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState, useEffect, useCallback } from "react";
import { OrdersData, OrdersVars } from "./type";

function useOrders() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { data, loading, error, fetchMore, refetch } = useQuery<
    OrdersData,
    OrdersVars
  >(ORDERS, { variables: { first: 15, after: null, status } });
  const [updateOrder] = useMutation(UPDATE_ORDER);

  useEffect(() => {
    const interval = setInterval(
      () => refetch({ first: 15, after: null, status }),
      5000
    );
    return () => clearInterval(interval);
  }, [refetch, status]);

  const changeStatus = useCallback(
    (s: string) => {
      const newStatus = s === "ALL" ? undefined : s;
      setStatus(newStatus);
      refetch({ first: 15, after: null, status: newStatus });
    },
    [refetch]
  );

  const handleUpdate = useCallback(
    async (id: string, newStatus: string) => {
      await updateOrder({ variables: { id, status: newStatus } });
      refetch({ first: 15, after: null, status });
    },
    [updateOrder, refetch, status]
  );

  const STATUSES = ["ALL", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];
  const ACTIONS = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];
  const STATUS_COLORS: Record<string, string> = {
    PENDING: "#FFA726",
    SHIPPED: "#42A5F5",
    DELIVERED: "#66BB6A",
    CANCELLED: "#EF5350",
  };

  const TABLE_HEADERS = [
    { key: "id", label: "Order" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" },
    { key: "customer", label: "Customer" },
    { key: "createdAt", label: "Created" },
    { key: "actions", label: "Actions" },
  ];

  return {
    data,
    loading,
    error,
    status,
    changeStatus,
    handleUpdate,
    fetchMore,
    STATUSES,
    STATUS_COLORS,
    ACTIONS,
    TABLE_HEADERS,
  };
}

export { useOrders };

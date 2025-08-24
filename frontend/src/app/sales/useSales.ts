"use client";

import { SALES } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";
import { useCallback } from "react";
import { SalesData, SalesVars } from "./type";

function useSales() {
  const { data, loading, error, refetch } = useQuery<SalesData, SalesVars>(
    SALES,
    {
      variables: {
        range: "last_90",
        groupBy: "DAY",
        category: null,
        region: null,
      },
    }
  );

  const changeFilter = useCallback(
    (range: string, groupBy: string) => {
      refetch({ range, groupBy, category: null, region: null });
    },
    [refetch]
  );

  const FILTERS = [
    { label: "30D", range: "last_30", groupBy: "DAY" },
    { label: "90D", range: "last_90", groupBy: "WEEK" },
    { label: "1Y", range: "last_365", groupBy: "MONTH" },
  ];

  const PRODUCT_HEADERS = [
    { key: "name", label: "Product" },
    { key: "units", label: "Units" },
    { key: "revenue", label: "Revenue" },
  ];

  return { data, loading, error, changeFilter, FILTERS, PRODUCT_HEADERS };
}

export { useSales };

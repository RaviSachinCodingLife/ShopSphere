import { gql } from "@apollo/client";

export const DASHBOARD = gql`
  query {
    dashboardKPIs {
      totalSales
      ordersInProgress
      activeUsers
    }
    salesAnalytics(range: "last_30", groupBy: DAY) {
      revenueTrend {
        date
        value
      }
    }
  }
`;

export const SALES = gql`
  query Sales(
    $range: String!
    $groupBy: SalesGroupBy!
    $category: String
    $region: String
  ) {
    salesAnalytics(
      range: $range
      groupBy: $groupBy
      category: $category
      region: $region
    ) {
      range
      groupBy
      revenueTrend {
        date
        value
      }
      topProducts {
        id
        name
        revenue
        units
      }
    }
  }
`;

export const INVENTORY = gql`
  query Inventory($page: Int!, $pageSize: Int!, $status: StockStatus) {
    inventory(page: $page, pageSize: $pageSize, status: $status) {
      items {
        id
        sku
        name
        stock
        status
      }
      total
      page
      pageSize
    }
  }
`;

export const USERS = gql`
  query Users($range: String!) {
    userBehavior(range: $range) {
      activeUsers
      newUsers
      returningUsers
      avgSessionMins
      funnel {
        date
        value
      }
    }
  }
`;

export const ORDERS = gql`
  query Orders($first: Int!, $after: String, $status: OrderStatus) {
    orders(first: $first, after: $after, status: $status) {
      edges {
        node {
          id
          status
          total
          customer
          createdAt
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $status: OrderStatus!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
      total
      customer
      createdAt
    }
  }
`;

export const PREFS = gql`
  mutation Pref($theme: String!, $notifications: Boolean!) {
    updatePreference(theme: $theme, notifications: $notifications)
  }
`;

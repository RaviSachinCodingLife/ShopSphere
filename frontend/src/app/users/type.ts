type UsersData = {
  userBehavior: {
    activeUsers: number;
    newUsers: number;
    returningUsers: number;
    avgSessionMins: number;
    funnel: { date: string; value: number }[];
  };
};

type UsersVars = {
  range: string;
};

export type { UsersData, UsersVars };

interface LoginUser {
  login: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  };
}

interface LoginVariables {
  email: string;
  password: string;
}

export type { LoginUser, LoginVariables };

interface RegisterUser {
  register: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  };
}

interface RegisterVariables {
  username: string;
  email: string;
  password: string;
}

export type { RegisterUser, RegisterVariables };

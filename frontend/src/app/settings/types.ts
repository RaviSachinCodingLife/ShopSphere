type Role = "USER" | "ADMIN";

interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface UpgradeRoleResponse {
  upgradeRole: User;
}

interface UpgradeRoleVars {
  userId: string;
  role: Role;
}

export type{Role,User,UpgradeRoleResponse,UpgradeRoleVars}

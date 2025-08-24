"use client";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

const UPGRADE_ROLE = gql`
  mutation UpgradeRole($userId: ID!, $role: Role!) {
    upgradeRole(userId: $userId, role: $role) {
      id
      username
      role
    }
  }
`;


export default function Settings() {
  const [upgradeRole] = useMutation(UPGRADE_ROLE);

  const handleUpgrade = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return alert("Login required");
    await upgradeRole({ variables: { userId: user.id, role: "ADMIN" } });
    alert("Upgraded to Admin!");
  };

  return (
    <div>
      <h1>Settings</h1>
      <button onClick={handleUpgrade}>Upgrade to Admin</button>
    </div>
  );
}

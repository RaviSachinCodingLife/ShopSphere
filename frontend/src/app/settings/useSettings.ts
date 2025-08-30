"use client";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { User, UpgradeRoleResponse, UpgradeRoleVars } from "./types";

const UPGRADE_ROLE = gql`
  mutation UpgradeRole($userId: ID!, $role: Role!) {
    upgradeRole(userId: $userId, role: $role) {
      id
      username
      email
      role
      avatar
    }
  }
`;

export function useSettings() {
  const [upgradeRole, { loading: upgrading }] = useMutation<
    UpgradeRoleResponse,
    UpgradeRoleVars
  >(UPGRADE_ROLE);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpgrade = async () => {
    if (!user) {
      setErrorMessage("Login required");
      return;
    }

    try {
      const { data } = await upgradeRole({
        variables: { userId: user.id, role: "ADMIN" },
      });

      if (data?.upgradeRole) {
        setUser(data.upgradeRole);
        localStorage.setItem("user", JSON.stringify(data.upgradeRole));
        setSuccessMessage("🎉 Successfully upgraded to Admin!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("❌ Failed to upgrade role");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleUpdateProfile = (field: keyof User, value: string) => {
    if (!user) {
      setErrorMessage("Login required");
      return;
    }

    try {
      const updated = { ...user, [field]: value };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setSuccessMessage(`✅ ${field} updated successfully!`);
    } catch {
      setErrorMessage("❌ Failed to update profile");
    }
  };

  return {
    user,
    upgrading,
    handleUpgrade,
    handleLogout,
    handleUpdateProfile,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
  };
}

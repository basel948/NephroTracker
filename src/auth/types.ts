export type Role = "MANAGER" | "NURSE" | "AUX";
export type Permission =
  | "inventory.read"
  | "inventory.write"
  | "users.read"
  | "users.write";

export const ROLE_PERMS: Record<Role, Permission[]> = {
  MANAGER: ["inventory.read", "inventory.write", "users.read", "users.write"],
  NURSE: ["inventory.read", "inventory.write"],
  AUX: ["inventory.read"],
};

export type User = {
  id: string;
  username: string;
  role: string;
  // ...other fields
};

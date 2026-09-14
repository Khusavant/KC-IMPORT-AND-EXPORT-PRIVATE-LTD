// Mock Admin Users Dataset for KC Import and Export Private Limited
// TODO: replace with real API
import { AdminUser } from "./admin-types";

export const MOCK_USERS: AdminUser[] = [
  {
    id: "USR-001",
    name: "Karan Chaudhari",
    email: "admin@kc.com",
    role: "Super Admin",
    lastLogin: "2026-09-14 09:12 AM",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Pooja Patel",
    email: "pooja.patel@kcimportexport.com",
    role: "Admin",
    lastLogin: "2026-09-14 08:45 AM",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Rajesh Varma",
    email: "rajesh.v@kcimportexport.com",
    role: "Admin",
    lastLogin: "2026-09-13 05:30 PM",
    status: "Active",
  },
  {
    id: "USR-004",
    name: "Ananya Sharma",
    email: "ananya.s@kcimportexport.com",
    role: "Editor",
    lastLogin: "2026-09-12 02:15 PM",
    status: "Active",
  },
  {
    id: "USR-005",
    name: "Vikram Mehta",
    email: "vikram.m@kcimportexport.com",
    role: "Editor",
    lastLogin: "2026-08-28 11:00 AM",
    status: "Inactive",
  },
];

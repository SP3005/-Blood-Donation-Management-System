import React from "react";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = ({ userRole, setUserRole }) => {
  // Agar userRole "admin" hai toh AdminNavbar dikhaye, warna UserNavbar dikhaye
  return userRole === "admin" ? (
    <AdminNavbar setUserRole={setUserRole} />
  ) : (
    <UserNavbar setUserRole={setUserRole} />
  );
};

export default Navbar;

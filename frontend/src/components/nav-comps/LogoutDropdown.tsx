"use client";

import axios from "axios";
import { toast } from "react-toastify";

const LogoutDropdown = () => {
  const logout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      if (response?.status === 200) {
        toast("Logout successful", { type: "success" });
        window.location.href = "/";
      }
    } catch (error: any) {
      toast(
        error?.response?.data?.message || error?.message || "Logout failed",
        { type: "error" }
      );
    }
  };
  return (
    <div className="dropdown dropdown-end ml-4">
      <button type="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </button>
      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <button
            type="button"
            onClick={() => logout()}
            className="hover:bg-white/10 cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LogoutDropdown;

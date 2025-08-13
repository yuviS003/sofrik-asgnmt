"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

interface UserDetails {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoader(true);
      const response = await axios.post("/api/auth/login", userDetails);

      if (response?.status === 200) {
        toast("Login successful", { type: "success" });
        router.push("/dashboard/projects");
      }
    } catch (err: any) {
      toast(err.response?.data?.message || "Login failed", { type: "error" });
    } finally {
      setLoader(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoader(true);
      const response = await axios.post("/api/auth/register", userDetails);

      if (response?.status === 201) {
        toast("Registration successful", { type: "success" });
        router.push("/dashboard/projects");
      }
    } catch (err: any) {
      toast(err.response?.data?.message || "Registration failed", {
        type: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginOpen) await handleLogin();
    else await handleRegister();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <h1 className="mx-auto prose prose-h1:text-2xl">Task Manager</h1>

        <legend className="fieldset-legend">
          {isLoginOpen ? "Login" : "Register"}
        </legend>

        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          placeholder="Email"
          required
          value={userDetails.email}
          onChange={handleChange}
          autoComplete="off"
        />

        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          placeholder="Password"
          required
          value={userDetails.password}
          onChange={handleChange}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={loader}
          className="btn btn-neutral mt-4"
        >
          {loader && <span className="loading loading-spinner"></span>}
          {isLoginOpen ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="btn btn-ghost disabled:opacity-50 transition"
          onClick={() => setIsLoginOpen((prev) => !prev)}
        >
          {isLoginOpen
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
}

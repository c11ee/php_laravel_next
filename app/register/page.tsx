"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/services/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await register(form.username, form.email, form.password);
      alert("Registration successful!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-2xl bg-white p-8 shadow-lg"
      >
        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-neutral-900">
          Create Your Account
        </h1>
        <p className="text-center text-sm text-neutral-500">
          Please enter your details to sign up
        </p>

        {/* Input Fields */}
        <div className="space-y-4">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="rounded-xl border-neutral-300"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="rounded-xl border-neutral-300"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="rounded-xl border-neutral-300"
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="rounded-xl border-neutral-300"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-center text-sm text-red-500">{error}</p>
        )}

        {/* Register Button */}
        <Button
          type="submit"
          className="w-full rounded-xl bg-black text-white hover:bg-neutral-800"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        {/* Footer Link */}
        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
}

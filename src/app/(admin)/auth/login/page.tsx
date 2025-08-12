"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("adminEmail") as string;
    const password = formData.get("adminPassword") as string;
    try {
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
      await login(email, password);
    } catch (error) {
      toast.error("Login error: " + error);
    }
  };

  if (isAuthenticated) {
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-5">
      <Card className="w-full md:w-1/3 p-5 rounded-md flex flex-col border-white/20 border">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="adminEmail">Email</Label>
            <Input
              id="adminEmail"
              name="adminEmail"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="adminPassword">Şifre</Label>
            <Input
              id="adminPassword"
              name="adminPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="flex">
            <Button variant={"outline"} type="submit">
              Giriş Yap
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;

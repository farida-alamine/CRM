"use client";
import { deleteCookie } from "../../services/login-service";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { push } = useRouter();

  useEffect(() => {
    deleteCookie();
    push("/login");
  }, [push]);

  return <div>Logging out...</div>;
}

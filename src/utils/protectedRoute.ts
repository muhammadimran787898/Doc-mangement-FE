"use client";
import React, { Children } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute(children: any) {
  const router = useRouter();

  if (localStorage.getItem("authToken")) {
      router.push("/home");
    } else {
      return children;
  }
}

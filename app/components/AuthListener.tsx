"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function AuthListener() {
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (isSignedIn && userId) {
      // Store user in database
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(console.error);
    }
  }, [isSignedIn, userId]);

  return null; // This component doesn't render anything
}

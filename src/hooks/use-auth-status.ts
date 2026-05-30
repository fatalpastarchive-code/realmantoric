"use client";

import { useUser } from "@clerk/nextjs";

export function useAuthStatus() {
  const { user, isLoaded, isSignedIn } = useUser();

  const status = (user?.publicMetadata?.status as string) || "pending";
  const isApproved = status === "approved";
  const isDenied = status === "denied";
  const klan = user?.publicMetadata?.klan as string;

  return {
    status,
    isApproved,
    isDenied,
    klan,
    isLoaded,
    isSignedIn,
    user
  };
}

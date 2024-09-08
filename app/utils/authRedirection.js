// In utils/authRedirection.js
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function useAuthRedirection() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded && isSignedIn && user) {
      const hasRedirected = sessionStorage.getItem("hasRedirected") === "true";
      if (!hasRedirected) {
        sessionStorage.setItem("hasRedirected", "true");

        // Check if this is the user's first sign in
        const isFirstSignIn = user.createdAt === user.updatedAt;

        if (isFirstSignIn) {
          router.push("/register");
        } else {
          router.push("/profile");
        }
      }
    }
  }, [isSignedIn, isLoaded, user, router]);
}

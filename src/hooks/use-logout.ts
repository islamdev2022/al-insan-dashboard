"use client"

import { useMutation } from "@tanstack/react-query"
import { logoutUser, type LogoutResponse } from "@/lib/auth"
import { useRouter } from "next/navigation"

export const useLogout = () => {
  const router = useRouter()

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      // Handle successful logout
      console.log("Logout successful:", data.message)

      // Clear any additional user data from localStorage
      localStorage.removeItem("user")

      // Redirect to login page
      router.push("/auth")

      // Optional: You can add toast notification here
      // toast.success("Logged out successfully")
    },
    onError: (error) => {
      // Handle logout error (though we always succeed locally)
      console.error("Logout error:", error.message)

      // Still redirect to login even if API fails
      router.push("/login")
    },
  })
}

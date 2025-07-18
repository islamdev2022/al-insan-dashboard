"use client"

import { useMutation } from "@tanstack/react-query"
import { login, type LoginCredentials, type LoginResponse } from "@/lib/auth"
import { useRouter } from "next/navigation"

export const useLogin = () => {
  const router = useRouter()

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => {
      // Handle successful login
      console.log("Login successful:", data)

      // Redirect to dashboard or home page
      router.push("/dashboard")

      // You can also store user data in localStorage or context
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }
    },
    onError: (error) => {
      // Handle login error
      console.error("Login failed:", error.message)
    },
  })
}

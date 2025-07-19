"use client"

import { useMutation } from "@tanstack/react-query"
import { registerUser, type RegisterCredentials, type RegisterResponse } from "@/lib/auth"

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterCredentials>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Handle successful registration
      console.log("User registered successfully:", data)
    },
    onError: (error) => {
      // Handle registration error
      console.error("Registration failed:", error.message)
    },
  })
}

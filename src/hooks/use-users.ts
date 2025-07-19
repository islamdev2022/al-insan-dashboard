"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
  getAllUsers, 
  getUserById, 
  updateUserEmail, 
  updateUserPhone,
  updateUser,
  deleteUser,
  type UsersResponse,
  type UserResponse,
  type UpdateEmailData,
  type UpdatePhoneData,
  type UpdateUserData
} from "@/functions/users"

// Hook to get all users
export const useUsers = () => {
  return useQuery<UsersResponse, Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  })
}

// Hook to get single user
export const useUser = (id: string) => {
  return useQuery<UserResponse, Error>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  })
}

// Hook to update user email
export const useUpdateUserEmail = () => {
  const queryClient = useQueryClient()
  
  return useMutation<UserResponse, Error, { id: string; data: UpdateEmailData }>({
    mutationFn: ({ id, data }) => updateUserEmail(id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] })
      // Update specific user cache
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] })
    },
    onError: (error) => {
      console.error("Failed to update user email:", error.message)
    },
  })
}

// Hook to update user phone
export const useUpdateUserPhone = () => {
  const queryClient = useQueryClient()
  
  return useMutation<UserResponse, Error, { id: string; data: UpdatePhoneData }>({
    mutationFn: ({ id, data }) => updateUserPhone(id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] })
      // Update specific user cache
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] })
    },
    onError: (error) => {
      console.error("Failed to update user phone:", error.message)
    },
  })
}

// Hook to update user (firstName and lastName)
export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation<UserResponse, Error, { id: string; data: UpdateUserData }>({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] })
      // Update specific user cache
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] })
    },
    onError: (error) => {
      console.error("Failed to update user:", error.message)
    },
  })
}

// Hook to delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error) => {
      console.error("Failed to delete user:", error.message)
    },
  })
}

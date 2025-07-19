import api from "../api";
import type { AxiosError } from "axios"

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UsersResponse {
  success: boolean
  message: string
  data: User[]
}

export interface UserResponse {
  success: boolean
  message: string
  data: User
}

export interface UpdateEmailData {
  email: string
}

export interface UpdatePhoneData {
  phone: string
}

export interface UpdateUserData {
  firstName: string
  lastName: string
}

// Type guard for AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "response" in error
}

// Get all users
export const getAllUsers = async (): Promise<UsersResponse> => {
  try {
    const response = await api.get("/users")
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Failed to fetch users")
      }
    }
    throw new Error("An unexpected error occurred while fetching users")
  }
}

// Get single user by ID
export const getUserById = async (id: string): Promise<UserResponse> => {
  try {
    const response = await api.get(`/${id}`)
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Failed to fetch user")
      }
    }
    throw new Error("An unexpected error occurred while fetching user")
  }
}

// Update user email
export const updateUserEmail = async (id: string, data: UpdateEmailData): Promise<UserResponse> => {
  try {
    const response = await api.put(`/users/updateEmail`, { id, ...data })
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Failed to update email")
      }
    }
    throw new Error("An unexpected error occurred while updating email")
  }
}

// Update user phone
export const updateUserPhone = async (id: string, data: UpdatePhoneData): Promise<UserResponse> => {
  try {
    const response = await api.put(`/users/updatePhone`, { id, ...data })
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Failed to update phone")
      }
    }
    throw new Error("An unexpected error occurred while updating phone")
  }
}

// Update user (firstName and lastName)
export const updateUser = async (id: string, data: UpdateUserData): Promise<UserResponse> => {
  try {
    const response = await api.put(`/users/update`, { id, ...data })
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Failed to update user")
      }
    }
    throw new Error("An unexpected error occurred while updating user")
  }
}

// Delete user
export const deleteUser = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.delete(`/users/${id}`)
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Failed to delete user")
      }
    }
    throw new Error("An unexpected error occurred while deleting user")
  }
}

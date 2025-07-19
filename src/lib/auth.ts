import api from "../api"
import type { AxiosError } from "axios"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  firstName: string
  lastName: string
  email: string
  phone: string
  image?: string | null
}

// Updated interface to match your actual API response
export interface LoginResponse {
  status: string
  data: {
    _id: string
    firstName: string
    lastName: string
    role: string
    email: string
    __v: number
    token: string
  }
  message: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

export interface LogoutResponse {
  success: boolean
  message: string
}

// Type guard for AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "response" in error
}

// Token management functions
export const setAuthToken = (token: string): void => {
  // Store in localStorage for client-side access
  localStorage.setItem("token", token)

  // Also set as a client-side cookie for middleware access
  // Set cookie with same options as your backend (except HttpOnly)
  document.cookie = `token=${token}; Path=/; Secure; SameSite=None; Max-Age=86400`
}

export const removeAuthToken = (): void => {
  localStorage.removeItem("token")
  // Also remove the cookie
  document.cookie = "token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Helper function to parse cookie string (keep for backward compatibility if needed)
function parseCookie(cookieStr: string): [string | null, string | null] {
  const parts = cookieStr.split(";")[0].split("=")
  if (parts.length >= 2) {
    return [parts[0].trim(), parts[1].trim()]
  }
  return [null, null]
}

// Helper function to extract token from Set-Cookie header
function extractTokenFromCookie(cookieStr: string): string | null {
  const [cookieName, cookieValue] = parseCookie(cookieStr)
  if (cookieName === "token" && cookieValue) {
    return cookieValue
  }
  return null
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post("/admin/login", credentials)
    // Check if token is in response data first (preferred method)
    if (response.data.status === "LOGIN_SUCCESS" && response.data.data?.token) {
      setAuthToken(response.data.data.token)
      console.log("✅ Token stored from response data")
    }
    // Fallback: extract token from Set-Cookie header if not in response body
    else if (response.headers["set-cookie"]) {
      let token: string | null = null
      // Extract token from Set-Cookie header
      for (const cookie of response.headers["set-cookie"]) {
        const extractedToken = extractTokenFromCookie(cookie)
        if (extractedToken) {
          token = extractedToken
          break
        }
      }
      if (token) {
        setAuthToken(token)
        console.log("✅ Token stored from Set-Cookie header")
      }
    }
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Login failed")
      }
    }
    throw new Error("An unexpected error occurred")
  }
}

export const registerUser = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  try {
    const response = await api.post("/auth/register", credentials)
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Registration failed")
      }
    }
    throw new Error("An unexpected error occurred during registration")
  }
}

export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    const token = getAuthToken()

    // If no token exists, just clear local storage
    if (!token) {
      removeAuthToken()
      return {
        success: true,
        message: "Logged out successfully",
      }
    }

    // Make API call to logout endpoint (if your backend has one)
    const response = await api.post(
      "/admin/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    // Clear token regardless of API response
    removeAuthToken()
    console.log("✅ User logged out successfully")

    return (
      response.data || {
        success: true,
        message: "Logged out successfully",
      }
    )
  } catch (error: unknown) {
    // Even if API call fails, clear the token locally
    removeAuthToken()
    console.log("✅ Token removed from localStorage (API call failed)")

    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        // Don't throw error for logout - just log it
        console.warn("Logout API error:", errorData.message)
      }
    }

    // Always return success for logout to ensure user is logged out locally
    return {
      success: true,
      message: "Logged out successfully",
    }
  }
}

// Simple logout function for immediate use (without API call)
export const logout = (): void => {
  removeAuthToken()
  console.log("✅ Token removed from localStorage")
}

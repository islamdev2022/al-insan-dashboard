import api from "../api";
import type { AxiosError } from "axios"

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  user?: {
    id: string
    username: string
    email?: string
  }
}

// Type guard for AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "response" in error
}

// Helper function to parse cookie string
function parseCookie(cookieStr: string): [string | null, string | null] {
  const parts = cookieStr.split(";")[0].split("=")
  if (parts.length >= 2) {
    return [parts[0].trim(), parts[1].trim()]
  }
  return [null, null]
}

// Helper function to parse cookie options
function parseOptions(cookieStr: string) {
  const options: any = {}
  const parts = cookieStr.split(";").slice(1)

  parts.forEach((part) => {
    const [key, value] = part.split("=").map((p) => p.trim())
    if (key.toLowerCase() === "expires") {
      options.expires = new Date(value)
    } else if (key.toLowerCase() === "max-age") {
      options.maxAge = Number.parseInt(value)
    } else if (key.toLowerCase() === "path") {
      options.path = value
    } else if (key.toLowerCase() === "secure") {
      options.secure = true
    } else if (key.toLowerCase() === "httponly") {
      options.httpOnly = true
    } else if (key.toLowerCase() === "samesite") {
      const s = value.toLowerCase()
      if (["lax", "strict", "none"].includes(s)) {
        options.sameSite = s as "lax" | "strict" | "none"
      }
    }
  })

  return options
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post("/admin/login", credentials)

    // Handle cookies if present in response headers
    if (response.headers["set-cookie"]) {
      const cookieHeader = response.headers["set-cookie"]

      if (Array.isArray(cookieHeader)) {
        for (const cookie of cookieHeader) {
          const [cookieName, cookieValue] = parseCookie(cookie)
          if (cookieName && cookieValue) {
            // Set cookie in browser (for client-side)
            document.cookie = cookie
          }
        }
      } else if (typeof cookieHeader === "string") {
        const [cookieName, cookieValue] = parseCookie(cookieHeader)
        if (cookieName && cookieValue) {
          document.cookie = cookieHeader
        }
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

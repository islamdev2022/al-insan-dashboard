"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Home } from "lucide-react"
import { useLogin } from "@/hooks/use-login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormErrors {
  email?: string
  password?: string
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const loginMutation = useLogin()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (formData.email.length < 3) {
      newErrors.email = "Email must be at least 3 characters"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    loginMutation.mutate(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#65FFA6] via-[#34d399] to-[#22c55e] flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full h-auto md:h-[500px] p-4 md:p-6 flex flex-col-reverse md:flex-row gap-4 md:gap-6">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center px-2 md:px-8 py-4 md:py-0">
          {/* Home Icon */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Home className="w-10 h-10 md:w-12 md:h-12 text-black" />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">Welcome Home</h1>
            <p className="text-gray-600 text-base md:text-lg">Enter Your Details</p>
          </div>

          {/* Error Alert */}
          {loginMutation.isError && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {loginMutation.error?.message || "Login failed. Please try again."}
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            {/* Email Input */}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-5 md:px-6 py-3 md:py-4 border rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-base md:text-lg ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                }`}
                disabled={loginMutation.isPending}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-4">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`w-full px-5 md:px-6 py-3 md:py-4 pr-12 md:pr-14 border rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-base md:text-lg ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                  }`}
                  disabled={loginMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loginMutation.isPending}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 ml-4">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <div className="pt-2 md:pt-4">
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-3 md:py-4 px-6 rounded-full transition-colors duration-200 text-base md:text-lg"
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Side - Donate Platform Card */}
        <div className="flex-1 bg-gradient-to-br from-[#65FFA6] via-[#34d399] to-[#22c55e] rounded-2xl flex flex-col items-center justify-center text-white shadow-lg min-h-[180px] md:min-h-0 py-6 md:py-0">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4">Donate</h2>
            <p className="text-lg md:text-2xl font-semibold opacity-90">Platform</p>
          </div>
        </div>
      </div>
    </div>
  )
}

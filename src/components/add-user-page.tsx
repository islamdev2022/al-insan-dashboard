"use client"

import type React from "react"
import { User, Camera, Upload, Mail, Phone, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { useRegister } from "@/hooks/use-register"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string | null
}

interface AddUserPageProps {
  onCancel: () => void
  onSuccess?: () => void
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

export function AddUserPage({ onCancel, onSuccess }: AddUserPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: null as string | null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const registerMutation = useRegister()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await registerMutation.mutateAsync(formData)
      // Success callback
      onSuccess?.()
      onCancel() // Close the form after successful registration
    } catch (error) {
      // Error is handled by the mutation's onError callback
      console.error("Registration error:", error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image size must be less than 5MB" }))
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Please select a valid image file" }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target?.result as string })
        setErrors((prev) => ({ ...prev, image: undefined }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex h-screen bg-[#f3f3f3]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {/* Error Alert */}
            {registerMutation.isError && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {registerMutation.error?.message || "Registration failed. Please try again."}
                </AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {registerMutation.isSuccess && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">User registered successfully!</AlertDescription>
              </Alert>
            )}

            {/* Profile Image Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#d9d9d9] rounded-full flex items-center justify-center mb-4 mx-auto">
                  {formData.image ? (
                    <img
                      src={formData.image || "/placeholder.svg?height=128&width=128"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Camera size={32} className="text-[#8c8c8c] md:w-10 md:h-10" />
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <label htmlFor="image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white border-[#d9d9d9] text-[#4c4c4c] hover:bg-[#f3f3f3] px-4 md:px-6 py-2 rounded-full text-sm"
                    asChild
                    disabled={registerMutation.isPending}
                  >
                    <span className="cursor-pointer">
                      <Upload size={16} className="mr-2" />
                      Upload new image
                    </span>
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={registerMutation.isPending}
                />
              </div>
              <p className="text-[#a4a4a4] text-xs md:text-sm mt-2">
                Please upload a clear photo, minimum size 200×200 pixels (max 5MB)
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">First Name</label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
                    <Input
                      type="text"
                      placeholder="Enter First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`pl-12 bg-[#ececec] border-[#ececec] text-[#4c4c4c] placeholder:text-[#a4a4a4] ${
                        errors.firstName ? "border-red-300 focus:border-red-500" : ""
                      }`}
                      disabled={registerMutation.isPending}
                      required
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">Last Name</label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
                    <Input
                      type="text"
                      placeholder="Enter Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`pl-12 bg-[#ececec] border-[#ececec] text-[#4c4c4c] placeholder:text-[#a4a4a4] ${
                        errors.lastName ? "border-red-300 focus:border-red-500" : ""
                      }`}
                      disabled={registerMutation.isPending}
                      required
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-12 bg-[#ececec] border-[#ececec] text-[#4c4c4c] placeholder:text-[#a4a4a4] ${
                        errors.email ? "border-red-300 focus:border-red-500" : ""
                      }`}
                      disabled={registerMutation.isPending}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
                    <Input
                      type="tel"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`pl-12 bg-[#ececec] border-[#ececec] text-[#4c4c4c] placeholder:text-[#a4a4a4] ${
                        errors.phone ? "border-red-300 focus:border-red-500" : ""
                      }`}
                      disabled={registerMutation.isPending}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>


              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                <Button
                  type="button"
                  onClick={onCancel}
                  className="px-6 md:px-8 py-2 bg-[#b9b9b9] hover:bg-[#a4a4a4] text-white rounded-full order-2 sm:order-1"
                  disabled={registerMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 md:px-8 py-2 bg-[#2ecc71] hover:bg-[#2fcd72] text-white rounded-full order-1 sm:order-2"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding User...
                    </div>
                  ) : (
                    "Add User"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { User, Camera, Upload, Mail, Phone, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface UserData {
  fullName: string
  email: string
  password: string
  phone: string
  image: string | null
}

interface AddUserPageProps {
  onCancel: () => void
  onSave: (userData: UserData) => void
}

export function AddUserPage({ onCancel, onSave }: AddUserPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    image: null as string | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex h-screen bg-[#f3f3f3]">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            {/* Profile Image Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-[#d9d9d9] rounded-full flex items-center justify-center mb-4">
                  {formData.image ? (
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Camera size={40} className="text-[#8c8c8c]" />
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <label htmlFor="image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white border-[#d9d9d9] text-[#4c4c4c] hover:bg-[#f3f3f3] px-6 py-2 rounded-full"
                    asChild
                  >
                    <span className="cursor-pointer">
                      <Upload size={16} className="mr-2" />
                      Upload new image
                    </span>
                  </Button>
                </label>
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
              <p className="text-[#a4a4a4] text-sm mt-2">Please upload a clear photo, minimum size 200×200 pixels</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
                    <Input
                      placeholder="First & Last Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-12 bg-[#ececec] border-[#ececec] text-[#4c4c4c] placeholder:text-[#a4a4a4]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-12 bg-[#ececec] border-[#ececec] text-[#4c4c4c] placeholder:text-[#a4a4a4]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-12 bg-[#ececec] border-[#ececec] text-[#4c4c4c] placeholder:text-[#a4a4a4]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">Number Phone</label>
                  <div className="relative">
                    <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
                    <Input
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-12 bg-[#ececec] border-[#ececec] text-[#4c4c4c] placeholder:text-[#a4a4a4]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  onClick={onCancel}
                  className="px-8 py-2 bg-[#b9b9b9] hover:bg-[#a4a4a4] text-white rounded-full"
                >
                  Cancel
                </Button>
                <Button type="submit" className="px-8 py-2 bg-[#2ecc71] hover:bg-[#2fcd72] text-white rounded-full">
                  Add User
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

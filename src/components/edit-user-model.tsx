"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useState } from "react"

interface User {
  name: string
  email: string
  phone: string
  password: string
}

interface EditUserModalProps {
  user: User
  onClose: () => void
  onSave: (user: User) => void
}

export function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: user?.password || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...user, ...formData })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 relative">
        <Button variant="ghost" size="sm" className="absolute right-4 top-4 p-2" onClick={onClose}>
          <X size={16} />
        </Button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-[#1f1f1f]">Edit User</h3>
          <p className="text-[#4c4c4c] mt-2">Update user information and credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-[#4c4c4c] font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 border-[#d9d9d9] focus:border-[#2ecc71] focus:ring-[#2ecc71]"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-[#4c4c4c] font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 border-[#d9d9d9] focus:border-[#2ecc71] focus:ring-[#2ecc71]"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-[#4c4c4c] font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 border-[#d9d9d9] focus:border-[#2ecc71] focus:ring-[#2ecc71]"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-[#4c4c4c] font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 border-[#d9d9d9] focus:border-[#2ecc71] focus:ring-[#2ecc71]"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[#d9d9d9] text-[#4c4c4c] hover:bg-[#f3f3f3] bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#2ecc71] hover:bg-[#2fcd72] text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

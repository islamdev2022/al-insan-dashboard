"use client"

import { Button } from "@/components/ui/button"
import { X, User, Mail, Phone, Key, Hash } from "lucide-react"

interface User {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  // Add other fields as needed
}

interface UserInfoModalProps {
  user: User
  onClose: () => void
}

export function UserInfoModal({ user, onClose }: UserInfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 relative">
        <Button variant="ghost" size="sm" className="absolute right-4 top-4 p-2" onClick={onClose}>
          <X size={16} />
        </Button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-[#2ecc71] rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-[#1f1f1f]">User Information</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] rounded-lg">
            <Hash size={20} className="text-[#4c4c4c]" />
            <div>
              <p className="text-sm text-[#4c4c4c]">User ID</p>
              <p className="font-semibold text-[#1f1f1f]">{user?.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] rounded-lg">
            <User size={20} className="text-[#4c4c4c]" />
            <div>
              <p className="text-sm text-[#4c4c4c]">Full Name</p>
              <p className="font-semibold text-[#1f1f1f]">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] rounded-lg">
            <Mail size={20} className="text-[#4c4c4c]" />
            <div>
              <p className="text-sm text-[#4c4c4c]">Email Address</p>
              <p className="font-semibold text-[#1f1f1f]">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] rounded-lg">
            <Phone size={20} className="text-[#4c4c4c]" />
            <div>
              <p className="text-sm text-[#4c4c4c]">Phone Number</p>
              <p className="font-semibold text-[#1f1f1f]">{user?.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] rounded-lg">
            <Key size={20} className="text-[#4c4c4c]" />
            <div>
              <p className="text-sm text-[#4c4c4c]">Password</p>
              <p className="font-semibold text-[#1f1f1f]">••••••••</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={onClose} className="px-8 py-2 bg-[#2ecc71] hover:bg-[#2fcd72] text-white rounded-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

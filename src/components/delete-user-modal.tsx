"use client"

import { Button } from "@/components/ui/button"
import { X, AlertTriangle } from "lucide-react"

interface User {
  name: string
  // Add other user properties here if needed
}

interface DeleteUserModalProps {
  user: User
  onClose: () => void
  onConfirm: () => void
}

export function DeleteUserModal({ user, onClose, onConfirm }: DeleteUserModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <Button variant="ghost" size="sm" className="absolute right-4 top-4 p-2" onClick={onClose}>
          <X size={16} />
        </Button>

        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} className="text-red-500" />
          </div>

          <h3 className="text-xl font-bold text-[#1f1f1f] mb-2">Delete User</h3>
          <p className="text-[#4c4c4c] mb-6">
            Are you sure you want to delete <strong>{user?.name}</strong>? This action cannot be undone.
          </p>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 border-[#d9d9d9] text-[#4c4c4c] hover:bg-[#f3f3f3] bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={onConfirm} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white">
              Delete User
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

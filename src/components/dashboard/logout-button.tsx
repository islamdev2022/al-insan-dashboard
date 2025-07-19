"use client"

import type React from "react"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import LogoutDialog from "./logout-dialog"

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export default function LogoutButton({
  variant = "ghost",
  size = "default",
  className = "",
  showIcon = true,
  children,
}: LogoutButtonProps) {
  return (
    <LogoutDialog>
      <Button variant={variant} size={size} className={className}>
        {showIcon && <LogOut className="w-4 h-4 mr-2" />}
        {children || "Sign out"}
      </Button>
    </LogoutDialog>
  )
}

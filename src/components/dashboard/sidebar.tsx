"use client"

import { useState } from "react"
import { Home, List, Users, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "List", href: "/dashboard/list", icon: List },
  { name: "User", href: "/dashboard/user", icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          variant="outline"
          size="icon"
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#2ECC71] text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-green-400">
          <h1 className="text-2xl font-bold">Donate</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-white bg-opacity-20 text-green-400 transform scale-105"
                    : "text-white hover:bg-white hover:bg-opacity-10 hover:text-green-400 hover:transform hover:scale-105"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-green-400">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-green-100 hover:bg-white hover:bg-opacity-10 hover:text-white hover:transform hover:scale-105 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign out
          </Button>
        </div>
      </div>
    </>
  )
}

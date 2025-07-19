"use client"

import { useState } from "react"
import { Home, List, Users, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import LogoutDialog from "./logout-dialog"
import Image from "next/image"
const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "List", href: "/dashboard/list", icon: List },
  { name: "User", href: "/dashboard/user", icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
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
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#2ECC71] text-white flex flex-col transform transition-all duration-300 ease-in-out lg:transform-none ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64`}
      >
        {/* Logo/Brand */}
        <div className={`p-6 border-b rounded-b-4xl border-green-400 ${isCollapsed ? "lg:px-4" : ""}`}>
          {isCollapsed ? (
            <Image
              src="/Group 1.png"
              alt="Logo"
              width={400}
              height={400}
              className="rounded-full w-32"
            />
          ) : (
            <Image
              src="/Group 1.png"
              alt="Logo"
              width={200}
              height={200}
              className="rounded-full"
            />
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:flex justify-center p-4">
          <Button
            onClick={toggleCollapse}
            variant="ghost"
            size="icon"
            className="text-green-400 hover:bg-white hover:bg-opacity-20 hover:text-green-500 w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="w-6 h-6 bg-white rounded-full size-20" /> : <ChevronLeft className="w-6 h-6 bg-white rounded-full size-20" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 px-4 space-y-2 ${isCollapsed ? "lg:px-2" : ""}`}>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center rounded-lg transition-all duration-200 group relative ${
                  isCollapsed
                    ? "lg:justify-center lg:px-3 lg:py-3 px-4 py-3"
                    : "px-4 py-3"
                } ${
                  isActive
                    ? "bg-white bg-opacity-20 text-green-400 transform scale-105"
                    : "text-white hover:bg-green-200  hover:bg-opacity-10 hover:text-green-500 hover:transform hover:scale-105"
                }`}
                title={isCollapsed ? item.name : ""}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? "lg:mr-0" : "mr-3"}`} />
                <span className={`${isCollapsed ? "lg:hidden" : ""}`}>{item.name}</span>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className={`p-4 border-t border-green-400 ${isCollapsed ? "lg:px-2" : ""}`}>
          <div className={isCollapsed ? "lg:flex lg:justify-center" : ""}>
            <LogoutDialog collapsed={isCollapsed} />
          </div>
        </div>
      </div>
    </>
  )
}
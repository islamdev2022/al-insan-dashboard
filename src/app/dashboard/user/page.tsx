"use client"
import PageHeader from "@/components/dashboard/page-header"
import UserManagement from "@/components/dashboard/user-management"

interface User {
  id: string
  name: string
  phone: string
  email: string
  date: string
  status: "Active" | "Inactive"
}

const users: User[] = [
  {
    id: "#1234",
    name: "Optima Islam",
    phone: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Active",
  },
  {
    id: "#1234",
    name: "Optima Islam",
    phone: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Active",
  },
  {
    id: "#1234",
    name: "Optima Islam",
    phone: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Inactive",
  },
  {
    id: "#1234",
    name: "Optima Islam",
    phone: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Active",
  },
]

export default function UserManagementPage() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <PageHeader title="User Management" />
      <UserManagement />
    </div>
  )
}

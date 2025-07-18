"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

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

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    email: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateUser = () => {
    console.log("Creating user:", newUser)
    setIsCreateDialogOpen(false)
    setNewUser({ name: "", phone: "", email: "" })
  }

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <>
      {/* Create User Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Another User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleCreateUser} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                  Create User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">All Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile Card View */}
          <div className="block md:hidden">
            {filteredUsers.map((user, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.id}</div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                </div>
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-blue-600 truncate ml-2">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{user.date}</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                  >
                    <td className="py-4 px-4 text-sm text-gray-900">{user.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">{user.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{user.phone}</td>
                    <td className="py-4 px-4 text-sm text-blue-600">{user.email}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{user.date}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

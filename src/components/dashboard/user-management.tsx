"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {UserInfoModal} from "@/components/user-info-model"
import { useRouter } from "next/navigation"
import { DeleteUserModal} from "@/components/delete-user-modal"
import { AddUserPage } from "@/components/add-user-page"
import { EditUserPage } from "@/components/edit-user-page"

import { 
   Edit, Trash2, 
  ChevronLeft, ChevronRight, Eye
} from "lucide-react"

interface User {
  id: string
  name: string
  phone: string
  email: string
  
  date: string
  status: "Active" | "Inactive"
}

const initialUsers: User[] = [
  {
    id: "#1234",
    name: "Khaled Bouraoui",
    phone: "+xxx xx 00 xx",
    email: "khaledbouraoui@gmail.com",
   
    date: "16/07/2023",
    status: "Active",
  },
  {
    id: "#1235",
    name: "Djebbar Islam",
    phone: "+xxx xx 00 xx",
    email: "islamdjebbar@gmail.com",
   
    date: "15/07/2023",
    status: "Active",
  },
  {
    id: "#1236",
    name: "Optima Islam",
    phone: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
   
    date: "14/07/2023",
    status: "Inactive",
  },
  {
    id: "#1237",
    name: "Ahmed Benali",
    phone: "+213 xx 00 xx",
    email: "ahmed.benali@gmail.com",
 
    date: "13/07/2023",
    status: "Active",
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"dashboard" | "add-user" | "edit-user">("dashboard")
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    email: "",
  
  })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const usersPerPage = 10
  const router = useRouter();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  interface NewUserData {
    fullName: string;
    phone: string;
    email: string;
  
  }

  const handleAddUser = (userData: NewUserData) => {
    const newUser: User = {
      id: `#${Math.floor(Math.random() * 10000)}`,
      name: userData.fullName,
      phone: userData.phone,
      email: userData.email,
   
      date: new Date().toLocaleDateString(),
      status: "Active",
    };
    setUsers([newUser, ...users]);
    setCurrentView("dashboard");
  };

  if (currentView === "add-user") {
    return (
      <AddUserPage
        onCancel={() => setCurrentView("dashboard")}
        onSave={handleAddUser}
      />
    )
  }
  if (currentView === "edit-user" && selectedUser) {
    return (
      <EditUserPage
        user={selectedUser}
        onCancel={() => setCurrentView("dashboard")}
        onSave={(userData) => {
          console.log("Updating user:", userData)
          setCurrentView("dashboard")
        }}
      />
    )
  }

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  const handleCreateUser = () => {
    console.log("Creating user:", newUser)
    setIsCreateDialogOpen(false)
    setNewUser({ name: "", phone: "", email: ""})
  }

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200"
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <main className="p-6">
        {/* Create User Banner */}
        <div className="bg-[#2ecc71] rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">Create Another User</h3>
            <p className="text-white/90 mb-6 max-w-md">
              To give someone access to the donors list and processing tools, add a new user with an ID and password.
            </p>
            <Button
                onClick={() => setCurrentView("add-user")}
                className="bg-white text-[#2ecc71] hover:bg-white/90 font-semibold px-6 py-2 rounded-full"
              >
                Create
              </Button>
          </div>
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="w-20 h-20 bg-[#ded8ff] rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-[#1f1f1f] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {/* Mobile Card View */}
          <div className="block lg:hidden">
            <div className="px-6 py-4 bg-[#f3f3f3] border-b border-[#ececec]">
              <h3 className="text-lg font-semibold text-[#1f1f1f]">All Users</h3>
            </div>
            {currentUsers.map((user, index) => (
              <div key={index} className="p-4 border-b border-[#ececec] hover:bg-[#f3f3f3]/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-[#1f1f1f]">{user.name}</div>
                      <div className="text-sm text-[#4c4c4c]">{user.id}</div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                </div>
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-[#4c4c4c]">Phone:</span>
                    <span className="text-[#1f1f1f]">{user.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4c4c4c]">Email:</span>
                    <span className="text-[#1f1f1f] truncate ml-2">{user.email}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-[#4c4c4c]">Date:</span>
                    <span className="text-[#1f1f1f]">{user.date}</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                 <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 h-8 w-8 text-blue-500 hover:bg-blue-50"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowUserInfo(true)
                      }}
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 h-8 w-8 text-blue-500 hover:bg-blue-50"
                      onClick={() => {
                        setSelectedUser(user)
                        setCurrentView("edit-user")
                      }}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 h-8 w-8 text-[#ffadae] hover:bg-red-50"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                        
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-4 px-6 py-4 bg-[#f3f3f3] border-b border-[#ececec] text-sm font-medium text-[#4c4c4c]">
              <div>#ID</div>
              <div>Name</div>
              <div>Phone</div>
              <div>Email</div>
             
              <div>Date</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#ececec]">
              {currentUsers.map((user, index) => (
                <div
                  key={index}
                  className="grid grid-cols-8 gap-4 px-6 py-4 items-center border-b border-gray-100 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                >
                  <div className="text-[#4c4c4c] font-medium">{user.id}</div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <span className="text-[#1f1f1f] font-medium">{user.name}</span>
                  </div>
                  <div className="text-[#4c4c4c]">{user.phone}</div>
                  <div className="text-[#1f1f1f]">{user.email}</div>
                  
                  <div className="text-[#4c4c4c]">{user.date}</div>
                  <div>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 h-8 w-8 text-blue-500 hover:bg-blue-50"
                      onClick={() => router.push(`/edit-user-page?id=${user.id}`)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 h-8 w-8 text-[#ffadae] hover:bg-red-50"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 h-8 w-8 text-[#a4a4a4] hover:text-[#2ecc71]"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              className={`h-8 w-8 ${
                page === currentPage
                  ? "bg-[#2ecc71] hover:bg-[#27ae60] text-white"
                  : "bg-white hover:bg-[#f3f3f3] text-[#4c4c4c] border border-[#ececec]"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 h-8 w-8 text-[#a4a4a4] hover:text-[#2ecc71]"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        
        {showDeleteModal && selectedUser && (
          <DeleteUserModal
            user={selectedUser}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => {
              console.log("Deleting user:", selectedUser)
              setShowDeleteModal(false)
            }}
          />
        )} 

        {showUserInfo && selectedUser && (
          <UserInfoModal user={selectedUser} onClose={() => setShowUserInfo(false)} />
        )}

        {showDeleteModal && selectedUser && (
          <DeleteUserModal
            user={selectedUser}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => {
              handleDeleteUser(selectedUser.id);
              setShowDeleteModal(false);
            }}
          />
        )}
      </main>
    </div>
  )
}
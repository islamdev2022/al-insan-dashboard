"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface Donation {
  id: string
  donorName: string
  amount: string
  email: string
  date: string
  status: "Pending" | "Processed" | "Cancelled"
}

const donations: Donation[] = [
  {
    id: "#1234",
    donorName: "Optima Islam",
    amount: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Processed",
  },
  {
    id: "#1234",
    donorName: "Optima Islam",
    amount: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Pending",
  },
  {
    id: "#1234",
    donorName: "Optima Islam",
    amount: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Pending",
  },
  {
    id: "#1234",
    donorName: "Optima Islam",
    amount: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Pending",
  },
  {
    id: "#1234",
    donorName: "Optima Islam",
    amount: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Processed",
  },
  {
    id: "#1234",
    donorName: "Optima Islam",
    amount: "+$44 xx 00 xx",
    email: "optimaislam@gmail.com",
    date: "16/07/2023",
    status: "Processed",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processed":
      return "bg-green-100 text-green-800 border-green-200"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function DonationsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || donation.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["All", "Pending", "Processed", "Cancelled"].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className={`whitespace-nowrap ${selectedStatus === status ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Donations Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Donations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile Card View */}
          <div className="block md:hidden">
            {filteredDonations.map((donation, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-sm">{donation.donorName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{donation.donorName}</div>
                      <div className="text-sm text-gray-500">{donation.id}</div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{donation.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-blue-600 truncate ml-2">{donation.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{donation.date}</span>
                  </div>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Donor Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                  >
                    <td className="py-4 px-4 text-sm text-gray-900">{donation.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-medium text-sm">{donation.donorName.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{donation.donorName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{donation.amount}</td>
                    <td className="py-4 px-4 text-sm text-blue-600">{donation.email}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{donation.date}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
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

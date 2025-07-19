"use client"
import PageHeader from "@/components/dashboard/page-header"
import DonationsTable from "@/components/dashboard/donations-table"

interface Donation {
  id: string
  donorName: string
  amount: string
  email: string
  date: string
  status: "Pending" | "Processed" | "Cancelled"
}


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

export default function DonationsList() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* <PageHeader title="Donations List" /> */}
      <DonationsTable />
    </div>
  )
}

"use client"
import { DollarSign, TrendingUp, Activity } from "lucide-react"
import StatsCards from "@/components/dashboard/stats-cards"
import RecentActivity from "@/components/dashboard/recent-activity"
import PageHeader from "@/components/dashboard/page-header"

const stats = [
  {
    title: "Total Donations",
    value: "1650",
    icon: DollarSign,
    color: "text-blue-600",
  },
  {
    title: "Total Raised",
    value: "1500",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Active Campaigns",
    value: "1500",
    icon: Activity,
    color: "text-purple-600",
  },
]

const recentActivity = [
  "New user to Ahmed Saeed",
  "New user to Yaser Saeed",
  "New user to Mohammed",
  "New user to Abdulrahman",
  "New user to Abdulrahman",
]

export default function DashboardHome() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Dashboard" />
      <StatsCards  />
      <RecentActivity />
    </div>
  )
}

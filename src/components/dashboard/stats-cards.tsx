import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Activity } from "lucide-react"

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

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

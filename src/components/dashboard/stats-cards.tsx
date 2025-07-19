"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Activity } from "lucide-react";
import { useTranslatedMessages } from "@/hooks/useTranslatedMessages";

export default function StatsCards() {
  const messages = useTranslatedMessages();

  const stats = [
    {
      titleKey: "dashboard.stats.totalDonations",
      value: "1650",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      titleKey: "dashboard.stats.totalUsers",
      value: "1500",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      titleKey: "dashboard.stats.activeCampaigns",
      value: "1500",
      icon: Activity,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {messages.intl.formatMessage({ id: stat.titleKey })}
            </CardTitle>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useTranslatedMessages } from "@/hooks/useTranslatedMessages";

export default function RecentActivity() {
  const messages = useTranslatedMessages();

  const recentActivity = [
    messages.intl.formatMessage({ id: "notifications.userRegistered" }) +
      " - Ahmed Saeed",
    messages.intl.formatMessage({ id: "notifications.newDonation" }) +
      " - Yaser Saeed",
    messages.intl.formatMessage({ id: "notifications.userRegistered" }) +
      " - Mohammed",
    messages.intl.formatMessage({ id: "notifications.donationCompleted" }) +
      " - Abdulrahman",
    messages.intl.formatMessage({ id: "notifications.newDonation" }) +
      " - Abdulrahman",
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
      {/* Recent Activity */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {messages.recentActivity}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-600">{activity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Number of Donors */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {messages.intl.formatMessage({ id: "dashboard.stats.totalUsers" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-green-600" />
            <div className="text-3xl md:text-4xl font-bold text-gray-900">
              20
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

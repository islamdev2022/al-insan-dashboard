"use client";
import { DollarSign, TrendingUp, Activity } from "lucide-react";
import StatsCards from "@/components/dashboard/stats-cards";
import RecentActivity from "@/components/dashboard/recent-activity";
import PageHeader from "@/components/dashboard/page-header";
import { TranslationExample } from "@/components/TranslationExample";
import { useTranslatedMessages } from "@/hooks/useTranslatedMessages";

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
];

const recentActivity = [
  "New user to Ahmed Saeed",
  "New user to Yaser Saeed",
  "New user to Mohammed",
  "New user to Abdulrahman",
  "New user to Abdulrahman",
];

export default function DashboardHome() {
  const messages = useTranslatedMessages();

  return (
    <div className="p-6 space-y-6">
      <PageHeader title={messages.dashboard} />
      <StatsCards />
      <RecentActivity />

      {/* Demo of translation system */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {messages.intl.formatMessage({ id: "language.selectLanguage" })} Demo
        </h2>
        <TranslationExample />
      </div>
    </div>
  );
}

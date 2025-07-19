"use client";

import { useIntl } from "react-intl";
import { useTranslatedMessages } from "@/hooks/useTranslatedMessages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TranslationExample() {
  const intl = useIntl();
  const messages = useTranslatedMessages();

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">{messages.dashboard}</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">
              {messages.totalUsers}
            </h3>
            <p className="text-2xl font-bold text-green-600">150</p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">
              {messages.totalDonations}
            </h3>
            <p className="text-2xl font-bold text-blue-600">75</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="default">
            {messages.add} {messages.user}
          </Button>
          <Button variant="outline">{messages.search}</Button>
          <Button variant="secondary">{messages.filter}</Button>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">{messages.recentActivity}</h3>
          <p className="text-sm text-gray-600">
            {intl.formatMessage({ id: "notifications.newDonation" })}
          </p>
          <p className="text-sm text-gray-600">
            {intl.formatMessage({ id: "notifications.userRegistered" })}
          </p>
        </div>
      </div>
    </Card>
  );
}

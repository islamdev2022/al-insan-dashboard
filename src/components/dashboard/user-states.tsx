"use client";

import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  const intl = useIntl();
  const displayMessage = message || intl.formatMessage({ id: "users.loading" });

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2 text-gray-600">{displayMessage}</span>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const intl = useIntl();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center">
        <p className="text-red-600 mb-4">
          {intl.formatMessage({ id: "users.error.failed" })}: {error}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            {intl.formatMessage({ id: "common.tryAgain" })}
          </Button>
        )}
      </div>
    </div>
  );
}

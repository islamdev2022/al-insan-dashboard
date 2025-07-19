"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogOut, AlertTriangle } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import { useTranslatedMessages } from "@/hooks/useTranslatedMessages";

interface LogoutDialogProps {
  children?: React.ReactNode;
  className?: string;
  collapsed?: boolean;
}

export default function LogoutDialog({
  children,
  className,
  collapsed = false,
}: LogoutDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const logoutMutation = useLogout();
  const messages = useTranslatedMessages();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  const handleCancel = () => {
    if (!logoutMutation.isPending) {
      setIsOpen(false);
    }
  };

  const defaultTrigger = collapsed ? (
    <Button
      variant="ghost"
      size="icon"
      className={`text-green-100 hover:bg-white hover:bg-opacity-10 hover:text-white w-12 h-12 rounded-lg group relative ${className}`}
      title={messages.logout}
    >
      <LogOut className="w-5 h-5" />
      {/* Tooltip for collapsed state */}
      <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {messages.logout}
      </div>
    </Button>
  ) : (
    <Button
      variant="ghost"
      className={`w-full justify-start text-green-100 hover:bg-white hover:bg-opacity-10 hover:text-white ${className}`}
    >
      <LogOut className="w-5 h-5 mr-3" />
      {messages.logout}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            {messages.logout}
          </DialogTitle>
          <DialogDescription>{messages.logoutConfirm}</DialogDescription>
        </DialogHeader>

        {/* Error Alert */}
        {logoutMutation.isError && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="text-red-700">
              {logoutMutation.error?.message || messages.error}
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={logoutMutation.isPending}
            className="w-full sm:w-auto bg-transparent"
          >
            {messages.cancel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full sm:w-auto"
          >
            {logoutMutation.isPending ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {messages.loading}
              </div>
            ) : (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                {messages.logout}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

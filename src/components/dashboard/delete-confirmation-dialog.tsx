"use client";

import { useState } from "react";
import { useIntl } from "react-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { User } from "@/functions/users";

interface DeleteConfirmationDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string) => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteConfirmationDialog({
  user,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteConfirmationDialogProps) {
  const intl = useIntl();

  if (!user) return null;

  const getUserFullName = (user: User): string => {
    return `${user.firstName} ${user.lastName}`;
  };

  const handleConfirm = async () => {
    await onConfirm(user._id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {intl.formatMessage({ id: "user.deleteUser" })}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                {intl.formatMessage({ id: "user.deleteWarning" })}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700">
            {intl.formatMessage(
              { id: "user.confirmDelete" },
              {
                name: getUserFullName(user),
              }
            )}
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            {intl.formatMessage({ id: "common.cancel" })}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting
              ? intl.formatMessage({ id: "user.deleting" })
              : intl.formatMessage({ id: "user.deleteUser" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

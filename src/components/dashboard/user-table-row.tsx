"use client";

import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import type { User } from "@/functions/users";

interface UserTableRowProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTableRow({
  user,
  onView,
  onEdit,
  onDelete,
}: UserTableRowProps) {
  const intl = useIntl();

  const getUserFullName = (user: User): string => {
    return `${user.firstName} ${user.lastName}`;
  };

  const getFormattedDate = (user: User): string => {
    return new Date(user.createdAt).toLocaleDateString();
  };

  const getUserStatus = (): string => {
    return intl.formatMessage({ id: "users.status.active" });
  };

  const getStatusColor = (status: string) => {
    const activeText = intl.formatMessage({ id: "users.status.active" });
    return status === activeText
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="grid grid-cols-7 gap-4 px-6 py-4 items-center border-b border-gray-100 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer">
      <div className="text-[#4c4c4c] font-medium">{user._id.slice(-8)}</div>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-medium text-sm">
            {getUserFullName(user).charAt(0)}
          </span>
        </div>
        <span className="text-[#1f1f1f] font-medium">
          {getUserFullName(user)}
        </span>
      </div>
      <div className="text-[#4c4c4c]">{user.phone}</div>
      <div className="text-[#1f1f1f]">{user.email}</div>
      <div className="text-[#4c4c4c] capitalize">{user.role}</div>
      <div className="text-[#4c4c4c]">{getFormattedDate(user)}</div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="p-2 h-8 w-8 text-blue-500 hover:bg-blue-50"
          onClick={() => onView(user)}
        >
          <Eye size={14} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="p-2 h-8 w-8 text-blue-500 hover:bg-blue-50"
          onClick={() => onEdit(user)}
        >
          <Edit size={14} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="p-2 h-8 w-8 text-[#ffadae] hover:bg-red-50"
          onClick={() => onDelete(user)}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}

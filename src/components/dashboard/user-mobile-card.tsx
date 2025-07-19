"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import type { User } from "@/functions/users";

interface UserMobileCardProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserMobileCard({
  user,
  onView,
  onEdit,
  onDelete,
}: UserMobileCardProps) {
  const getUserFullName = (user: User): string => {
    return `${user.firstName} ${user.lastName}`;
  };

  const getFormattedDate = (user: User): string => {
    return new Date(user.createdAt).toLocaleDateString();
  };

  const getUserStatus = (): "Active" | "Inactive" => {
    return "Active";
  };

  const getStatusColor = (status: "Active" | "Inactive") => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="p-4 border-b border-[#ececec] hover:bg-[#f3f3f3]/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-medium text-sm">
              {getUserFullName(user).charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-[#1f1f1f]">
              {getUserFullName(user)}
            </div>
            <div className="text-sm text-[#4c4c4c]">{user._id.slice(-8)}</div>
          </div>
        </div>
        <Badge className={getStatusColor(getUserStatus())}>
          {getUserStatus()}
        </Badge>
      </div>
      <div className="space-y-2 text-sm mb-3">
        <div className="flex justify-between">
          <span className="text-[#4c4c4c]">Phone:</span>
          <span className="text-[#1f1f1f]">{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4c4c4c]">Email:</span>
          <span className="text-[#1f1f1f] truncate ml-2">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4c4c4c]">Date:</span>
          <span className="text-[#1f1f1f]">{getFormattedDate(user)}</span>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
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

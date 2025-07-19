"use client";

import { UserTableRow } from "./user-table-row";
import { UserMobileCard } from "./user-mobile-card";
import type { User } from "@/functions/users";

interface UsersTableProps {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({
  users,
  onView,
  onEdit,
  onDelete,
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 text-center text-gray-500">
          <p>No users found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <div className="px-6 py-4 bg-[#f3f3f3] border-b border-[#ececec]">
          <h3 className="text-lg font-semibold text-[#1f1f1f]">All Users</h3>
        </div>
        {users.map((user: User) => (
          <UserMobileCard
            key={user._id}
            user={user}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 px-6 py-4 bg-[#f3f3f3] border-b border-[#ececec] text-sm font-medium text-[#4c4c4c]">
          <div>ID</div>
          <div>Name</div>
          <div>Phone</div>
          <div>Email</div>
          <div>Role</div>
          <div>Date</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#ececec]">
          {users.map((user: User) => (
            <UserTableRow
              key={user._id}
              user={user}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

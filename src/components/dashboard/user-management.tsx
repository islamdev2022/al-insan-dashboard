"use client";

import { useState } from "react";
import { CreateUserBanner } from "./create-user-banner";
import { UserSearch } from "./user-search";
import { UsersTable } from "./users-table";
import { UsersPagination } from "./users-pagination";
import { LoadingState, ErrorState } from "./user-states";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { EditUserForm } from "./edit-user-form";
import { AddUserPage } from "@/components/add-user-page";
import { UserInfoModal } from "@/components/user-info-model";
import { useUsers, useDeleteUser } from "@/hooks/use-users";
import { useTranslatedMessages } from "@/hooks/useTranslatedMessages";
import type { User } from "@/functions/users";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<
    "dashboard" | "add-user" | "edit-user"
  >("dashboard");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  // Translation messages
  const messages = useTranslatedMessages();

  // API hooks
  const { data: usersResponse, isLoading, error, refetch } = useUsers();
  const deleteUserMutation = useDeleteUser();

  // Extract users array from response
  const users: User[] = usersResponse?.data || [];

  // Helper functions
  const getUserFullName = (user: User): string => {
    return `${user.firstName} ${user.lastName}`;
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const fullName = getUserFullName(user);
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Event handlers
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserInfo(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView("edit-user");
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const confirmDeleteUser = async (userId: string) => {
    try {
      await deleteUserMutation.mutateAsync(userId);
      refetch(); // Refresh the users list
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleAddUserSuccess = () => {
    setCurrentView("dashboard");
    refetch();
  };

  const handleEditUserSuccess = () => {
    setCurrentView("dashboard");
    refetch();
  };

  // Render different views
  if (currentView === "add-user") {
    return (
      <AddUserPage
        onCancel={() => setCurrentView("dashboard")}
        onSuccess={handleAddUserSuccess}
      />
    );
  }

  if (currentView === "edit-user" && selectedUser) {
    return (
      <EditUserForm
        user={selectedUser}
        onCancel={() => setCurrentView("dashboard")}
        onSave={handleEditUserSuccess}
      />
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <main className="p-6">
        <CreateUserBanner onCreateUser={() => setCurrentView("add-user")} />

        <UserSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {isLoading && <LoadingState />}

        {error && <ErrorState error={error.message} onRetry={refetch} />}

        {!isLoading && !error && (
          <>
            <UsersTable
              users={currentUsers}
              onView={handleViewUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />

            <UsersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {/* Modals */}
        <DeleteConfirmationDialog
          user={selectedUser}
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDeleteUser}
          isDeleting={deleteUserMutation.isPending}
        />

        {showUserInfo && selectedUser && (
          <UserInfoModal
            user={{
              id: selectedUser._id,
              name: getUserFullName(selectedUser),
              email: selectedUser.email,
              phone: selectedUser.phone,
            }}
            onClose={() => setShowUserInfo(false)}
          />
        )}
      </main>
    </div>
  );
}

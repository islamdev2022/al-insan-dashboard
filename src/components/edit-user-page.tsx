"use client";

import type React from "react";
import {
  Search,
  Bell,
  Menu,
  Home,
  User,
  Camera,
  Upload,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {
  useUpdateUserEmail,
  useUpdateUserPhone,
  useUpdateUser,
} from "@/hooks/use-users";
interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  image?: string | null;
}

interface EditUserPageProps {
  user: User & { _id?: string };
  onCancel: () => void;
  onSave: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image?: string | null;
  }) => void;
}

export function EditUserPage({ user, onCancel, onSave }: EditUserPageProps) {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image?: string | null;
  }>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: user?.image || null,
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }>({});

  // API hooks
  const updateEmailMutation = useUpdateUserEmail();
  const updatePhoneMutation = useUpdateUserPhone();
  const updateUserMutation = useUpdateUser();

  const isSaving =
    updateEmailMutation.isPending ||
    updatePhoneMutation.isPending ||
    updateUserMutation.isPending;

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!user._id) {
      console.error("User ID is required for updates");
      return;
    }

    try {
      // Update firstName and lastName if changed
      if (
        formData.firstName !== user.firstName ||
        formData.lastName !== user.lastName
      ) {
        await updateUserMutation.mutateAsync({
          id: user._id,
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        });
      }

      // Update email if it changed
      if (formData.email !== user.email) {
        await updateEmailMutation.mutateAsync({
          id: user._id,
          data: { email: formData.email },
        });
      }

      // Update phone if it changed
      if (formData.phone !== user.phone) {
        await updatePhoneMutation.mutateAsync({
          id: user._id,
          data: { phone: formData.phone },
        });
      }

      onSave({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        image: formData.image,
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: null });
  };

  return (
    <div className="flex h-screen bg-[#f3f3f3]">
      {/* Sidebar */}
      <div className="w-60 bg-[#2ecc71] text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-semibold">Donate</h1>
        </div>

        <nav className="flex-1 px-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home size={20} />
              <span>Home</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Menu size={20} />
              <span>List</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Bell size={20} />
              <span>Notifications</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/20">
              <User size={20} />
              <span>User</span>
            </div>
          </div>
        </nav>

        <div className="p-4">
          <div className="px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
            Sign out
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-[#ececec] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Menu size={20} className="text-[#4c4c4c]" />
              <h2 className="text-xl font-semibold text-[#1f1f1f]">User</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]"
                />
                <Input
                  placeholder="Search"
                  className="pl-10 w-64 bg-[#f3f3f3] border-[#d9d9d9] rounded-full"
                />
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#a4a4a4] text-white">
                  U
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            {/* Profile Image Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-[#d9d9d9] rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  {formData.image ? (
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera size={40} className="text-[#8c8c8c]" />
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <label htmlFor="image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white border-[#d9d9d9] text-[#4c4c4c] hover:bg-[#f3f3f3] px-6 py-2 rounded-full"
                    asChild
                  >
                    <span className="cursor-pointer">
                      <Upload size={16} className="mr-2" />
                      Upload new image
                    </span>
                  </Button>
                </label>
                <Button
                  type="button"
                  onClick={handleDeleteImage}
                  className="bg-[#ffadae] hover:bg-[#ff9999] text-[#d63384] px-6 py-2 rounded-full"
                >
                  Delete image
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-[#a4a4a4] text-sm mt-2">
                Please upload a clear photo, minimum size 200×200 pixels
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]"
                    />
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="pl-12 bg-[#ececec] border-[#ececec] text-[#1f1f1f] font-medium"
                      required
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]"
                    />
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="pl-12 bg-[#ececec] border-[#ececec] text-[#1f1f1f] font-medium"
                      required
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]"
                    />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-12 bg-[#ececec] border-[#ececec] text-[#1f1f1f] font-medium"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#1f1f1f] font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <div className="w-5 h-3 bg-green-500 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-2 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="pl-12 bg-[#ececec] border-[#ececec] text-[#1f1f1f] font-medium"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  onClick={onCancel}
                  disabled={isSaving}
                  className="px-8 py-2 bg-[#b9b9b9] hover:bg-[#a4a4a4] text-white rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-2 bg-[#2ecc71] hover:bg-[#2fcd72] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

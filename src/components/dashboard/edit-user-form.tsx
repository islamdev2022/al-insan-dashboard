"use client";

import { useState } from "react";
import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, UserIcon, Mail, Phone, Loader2 } from "lucide-react";
import {
  useUpdateUserEmail,
  useUpdateUserPhone,
  useUpdateUser,
} from "@/hooks/use-users";
import type { User } from "@/functions/users";

interface EditUserFormProps {
  user: User;
  onCancel: () => void;
  onSave: () => void;
}

export function EditUserForm({ user, onCancel, onSave }: EditUserFormProps) {
  const intl = useIntl();
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }>({});

  const updateEmailMutation = useUpdateUserEmail();
  const updatePhoneMutation = useUpdateUserPhone();
  const updateUserMutation = useUpdateUser();

  const getUserFullName = (user: User): string => {
    return `${user.firstName} ${user.lastName}`;
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = intl.formatMessage({
        id: "user.validation.firstNameRequired",
      });
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = intl.formatMessage({
        id: "user.validation.lastNameRequired",
      });
    }
    if (!formData.email.trim()) {
      newErrors.email = intl.formatMessage({
        id: "user.validation.emailRequired",
      });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = intl.formatMessage({
        id: "user.validation.emailInvalid",
      });
    }
    if (!formData.phone.trim()) {
      newErrors.phone = intl.formatMessage({
        id: "user.validation.phoneRequired",
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

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

      // Update email if changed
      if (formData.email !== user.email) {
        await updateEmailMutation.mutateAsync({
          id: user._id,
          data: { email: formData.email },
        });
      }

      // Update phone if changed
      if (formData.phone !== user.phone) {
        await updatePhoneMutation.mutateAsync({
          id: user._id,
          data: { phone: formData.phone },
        });
      }

      onSave();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const isLoading =
    updateEmailMutation.isPending ||
    updatePhoneMutation.isPending ||
    updateUserMutation.isPending;

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <header className="bg-white border-b border-[#ececec] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onCancel}
              className="p-2 hover:bg-[#f3f3f3]"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-[#1f1f1f]">
              {intl.formatMessage({ id: "user.editUser" })}
            </h1>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* User Header */}
            <div className="bg-[#2ecc71] px-8 py-6 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-white">
                <AvatarImage src={undefined} />
                <AvatarFallback className="bg-white text-[#2ecc71] text-2xl font-bold">
                  {getUserFullName(user).charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-white">
                {getUserFullName(user)}
              </h2>
              <p className="text-white/80">ID: {user._id.slice(-8)}</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-[#4c4c4c]"
                    >
                      {intl.formatMessage({ id: "user.firstName" })}
                    </Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4c4c4c] w-4 h-4" />
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className={`pl-10 ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        placeholder={intl.formatMessage({
                          id: "user.placeholders.firstName",
                        })}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-[#4c4c4c]"
                    >
                      {intl.formatMessage({ id: "user.lastName" })}
                    </Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4c4c4c] w-4 h-4" />
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className={`pl-10 ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        placeholder={intl.formatMessage({
                          id: "user.placeholders.lastName",
                        })}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-[#4c4c4c]"
                  >
                    {intl.formatMessage({ id: "user.email" })}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4c4c4c] w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`pl-10 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder={intl.formatMessage({
                        id: "user.placeholders.email",
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-[#4c4c4c]"
                  >
                    {intl.formatMessage({ id: "user.phone" })}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4c4c4c] w-4 h-4" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`pl-10 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder={intl.formatMessage({
                        id: "user.placeholders.phone",
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="px-6"
                  >
                    {intl.formatMessage({ id: "common.cancel" })}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 bg-[#2ecc71] hover:bg-[#27ae60]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {intl.formatMessage({ id: "user.saving" })}
                      </>
                    ) : (
                      intl.formatMessage({ id: "user.saveChanges" })
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

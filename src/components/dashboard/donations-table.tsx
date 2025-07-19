"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Loader2,
  Eye,
  User,
  Calendar,
  Package,
  Mail,
  Phone,
} from "lucide-react";
import { useDonations } from "@/hooks/use-donations";
import type { DonationRecord } from "@/functions/donations";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "processed":
      return "bg-green-100 text-green-800 border-green-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "in progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function DonationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDonation, setSelectedDonation] =
    useState<DonationRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch donations from backend
  const { data: donationsResponse, isLoading, error, refetch } = useDonations();

  // Extract donations array from response
  const donations: DonationRecord[] = donationsResponse?.data || [];
  console.log("Donations Response:", donations);

  const getTotalDonors = (record: DonationRecord): number => {
    return record.donorsDetails?.length || 0;
  };

  const getTotalSacrificeTo = (record: DonationRecord): number => {
    return (
      record.donorsDetails?.reduce(
        (total, donor) => total + (donor.sacrifyTo?.length || 0),
        0
      ) || 0
    );
  };

  const getFormattedDate = (record: DonationRecord): string => {
    return new Date(record.createdAt).toLocaleDateString();
  };

  const getAssignedToName = (record: DonationRecord): string => {
    // Since assignedTo is now just an ObjectId string, we'll show it as is or "Unassigned"
    return record.assignedTo
      ? `User ${record.assignedTo.slice(-8)}`
      : "Unassigned";
  };

  const handleRowClick = (donation: DonationRecord) => {
    setSelectedDonation(donation);
    setIsDialogOpen(true);
  };

  const filteredDonations = donations.filter((record: DonationRecord) => {

    const matchesSearch =
      record.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.animalType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" ||
      record.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {/* Donation Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Donation Details - {selectedDonation?.trackingCode}
            </DialogTitle>
          </DialogHeader>

          {selectedDonation && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <Package className="h-4 w-4" />
                    Animal Type
                  </div>
                  <p className="text-lg font-semibold capitalize">
                    {selectedDonation.animalType}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <Calendar className="h-4 w-4" />
                    Created Date
                  </div>
                  <p className="text-lg font-semibold">
                    {getFormattedDate(selectedDonation)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <User className="h-4 w-4" />
                    Status
                  </div>
                  <Badge className={getStatusColor(selectedDonation.status)}>
                    {selectedDonation.status}
                  </Badge>
                </div>
              </div>

              {/* Donors Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Donors ({getTotalDonors(selectedDonation)})
                </h3>
                <div className="space-y-4">
                  {selectedDonation.donorsDetails.map((donor, index) => (
                    <Card key={donor._id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {donor.donorId.firstName} {donor.donorId.lastName}
                          </h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {donor.donorId.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {donor.donorId.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs">Language:</span>
                              <span className="uppercase">
                                {donor.donorId.lang}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">
                            Sacrifice For ({donor.sacrifyTo.length})
                          </h5>
                          <div className="space-y-1">
                            {donor.sacrifyTo.map((person, personIndex) => (
                              <div
                                key={personIndex}
                                className="text-sm bg-blue-50 px-2 py-1 rounded"
                              >
                                {person}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Donors:</span>
                    <span className="font-semibold ml-2">
                      {getTotalDonors(selectedDonation)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Beneficiaries:</span>
                    <span className="font-semibold ml-2">
                      {getTotalSacrificeTo(selectedDonation)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Assigned To:</span>
                    <span className="font-semibold ml-2">
                      {getAssignedToName(selectedDonation)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Has Proof:</span>
                    <span className="font-semibold ml-2">
                      {selectedDonation.preuveDetails ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by donor name, email, tracking code, or animal type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {[
            "All",
            "Pending",
            "Processed",
            "In Progress",
            "Completed",
            "Cancelled",
          ].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className={`whitespace-nowrap ${
                selectedStatus === status
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              <span className="ml-2 text-gray-600">Loading donations...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-red-600 mb-4">
                Failed to load donations: {error.message}
              </p>
              <Button onClick={() => refetch()} variant="outline">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Donations Table */}
      {!isLoading && !error && (
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Recent Donations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* No donations message */}
            {filteredDonations.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p>No donations found.</p>
                {searchTerm && (
                  <p className="text-sm mt-2">
                    Try adjusting your search or filter criteria.
                  </p>
                )}
              </div>
            )}

            {/* Mobile Card View */}
            {filteredDonations.length > 0 && (
              <div className="block md:hidden">
                {filteredDonations.map(
                  (donation: DonationRecord, index: number) => (
                    <div
                      key={donation._id || index}
                      className="p-4 border-b border-gray-100 hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                      onClick={() => handleRowClick(donation)}
                    >
                     
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span>{getFormattedDate(donation)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Animal Type:</span>
                          <span className="font-medium capitalize">
                            {donation.animalType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Beneficiaries:</span>
                          <span className="text-sm">
                            {getTotalSacrificeTo(donation)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Desktop Table View */}
            {filteredDonations.length > 0 && (
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Tracking Code
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Total Donors
                      </th>

                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Animal Type
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Beneficiaries
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.map(
                      (donation: DonationRecord, index: number) => (
                        <tr
                          key={donation._id || index}
                          className="border-b border-gray-100 hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                        >
                          <td className="py-4 px-4 text-sm text-gray-900">
                            {donation.trackingCode}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700"
                            >
                              {getTotalDonors(donation)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900 capitalize">
                            {donation.animalType}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              {getTotalSacrificeTo(donation)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {getFormattedDate(donation)}
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getStatusColor(donation.status)}>
                              {donation.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(donation);
                              }}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}

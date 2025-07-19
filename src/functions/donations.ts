import api from "../api";
import type { AxiosError } from "axios"

export interface DonorId {
  _id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  lang: string
  id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface DonorDetails {
  _id: string
  donorId: DonorId
  sacrifyTo: string[]
}

export interface DonationRecord {
  _id: string
  animalType: string
  assignedTo: string // ObjectId as string
  createdAt: string
  updatedAt: string
  donorsDetails: DonorDetails[]
  preuveDetails: any | null
  status: string
  statusHistory: any[]
  trackingCode: string
  __v: number
}

export interface DonationsResponse {
  success: boolean
  message: string
  data: DonationRecord[]
}

// Type guard for AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "response" in error
}

export const getAllDonations = async (): Promise<DonationsResponse> => {
  try {
    const response = await api.get("/donationRecord")
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string }
        throw new Error(errorData.message || "Failed to fetch donations")
      }
    }
    throw new Error("An unexpected error occurred while fetching donations")
  }
}
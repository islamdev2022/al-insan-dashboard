"use client"

import { useQuery } from "@tanstack/react-query"
import { getAllDonations, type DonationsResponse } from "@/functions/donations"

export const useDonations = () => {
  return useQuery<DonationsResponse, Error>({
    queryKey: ["donations"],
    queryFn: getAllDonations,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: 3,
  })
}

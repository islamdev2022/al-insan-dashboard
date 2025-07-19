"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CreateUserBannerProps {
  onCreateUser: () => void;
}

export function CreateUserBanner({ onCreateUser }: CreateUserBannerProps) {
  return (
    <div className="bg-[#2ecc71] rounded-2xl p-8 mb-6 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">
          Create Another User
        </h3>
        <p className="text-white/90 mb-6 max-w-md">
          To give someone access to the donors list and processing tools, add a
          new user with an ID and password.
        </p>
        <Button
          onClick={onCreateUser}
          className="bg-white text-[#2ecc71] hover:bg-white/90 font-semibold px-6 py-2 rounded-full"
        >
          Create
        </Button>
      </div>
      <Image
        src="/pic.png"
        alt="Logo"
        width={120}
        height={120}
        className="absolute right-10 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIntl } from "react-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Image from "next/image";
export default function HomePage() {
  const intl = useIntl();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo/Brand Section */}
        <div className="space-y-4">
          <Image
            src="/Sabeellogo.png"
            alt="Al Insan Logo"
            width={200}
            height={200}
            className="mx-auto"
          />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">
              {intl.formatMessage({ id: "homepage.welcome" })}
            </h1>
            <h2 className="text-4xl font-bold text-[#2ECC71]">
              {intl.formatMessage({ id: "homepage.title" })}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-600 leading-relaxed">
          {intl.formatMessage({ id: "homepage.description" })}
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            asChild
            size="lg"
            className="bg-[#2ECC71] hover:bg-[#27AE60] text-white px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              {intl.formatMessage({ id: "homepage.goToDashboard" })}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-8 text-sm text-gray-500">
          <p>{intl.formatMessage({ id: "homepage.startMakingDifference" })}</p>
        </div>
      </div>
    </div>
  );
}

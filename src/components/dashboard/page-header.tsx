import { Menu, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PageHeaderProps {
  title: string
}

import React, { useState } from "react";

export default function PageHeader({ title }: PageHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <header className="bg-white border-b border-[#ececec] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu size={20} className="text-[#4c4c4c]" />
            <h2 className="text-xl font-semibold text-[#1f1f1f]">{title}</h2>
          </div>

          <div className="flex items-center gap-4">
            <Bell size={20} className="text-[#a4a4a4] cursor-pointer hover:text-[#2ecc71] transition-colors" />
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a4a4a4]" />
              <Input 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-[#f3f3f3] border-[#d9d9d9] rounded-full" 
              />
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-[#a4a4a4] text-white">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

  )
}

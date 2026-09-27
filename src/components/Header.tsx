'use client';

import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export default function Header({ onToggleMobileMenu }: HeaderProps) {
  return (
    <header className="bg-[#FACC15] text-gray-900 px-4 md:px-8 py-3.5 flex items-center justify-between w-full shrink-0 border-none no-print">
      {/* Mobile Menu Button & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-xl bg-black/10 hover:bg-black/20 text-gray-900 md:hidden transition-colors"
          title="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-xs font-black uppercase tracking-wider text-gray-900">
          Wanderworld Holidays Workspace
        </span>
      </div>

      {/* Right Side: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        <button
          className="relative p-1.5 text-gray-800 hover:text-black hover:bg-black/10 rounded-full transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#FACC15]"></span>
        </button>

        {/* User Profile Avatar & Name */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-black/20 shadow-xs bg-black text-[#FACC15] flex items-center justify-center font-black text-xs">
            WW
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-xs font-black text-gray-900 group-hover:text-black transition-colors">
              Hi Sakib
            </p>
            <p className="text-[10px] text-gray-800 font-bold">WanderWorld Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

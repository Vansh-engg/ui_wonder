'use client';

import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  Briefcase,
  Users,
  FileText,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onOpenFormDrawer?: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'invoice', label: 'Invoice', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#FACC15] text-gray-900 flex flex-col justify-between py-6 pl-5 transition-transform duration-300 ease-in-out md:static md:translate-x-0 h-screen shrink-0 shadow-lg border-r border-yellow-300/60 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Top Logo Header: 100% Black Blending Downward into Yellow Menu */}
          <div className="-ml-5 -mt-6 p-6 pr-5 mb-6 bg-gradient-to-b from-black via-black/90 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 justify-center py-2">
                <img
                  src="/logo.png"
                  alt="Wanderworld Logo"
                  className="h-20 sm:h-24 w-auto max-w-[210px] object-contain filter drop-shadow-[0_4px_16px_rgba(251,216,19,0.5)] brightness-110 contrast-125 transition-transform hover:scale-105"
                />
              </div>
              {/* Mobile Close Button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 md:hidden shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 font-medium text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 text-left font-bold transition-all duration-200 ${
                      isActive
                        ? 'active-tab-notch text-gray-950 shadow-xs font-black scale-[1.01]'
                        : 'text-gray-900/80 hover:text-black hover:bg-black/10 rounded-l-xl'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        isActive ? 'text-yellow-700' : 'text-gray-900/80'
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Logout Button */}
        <div className="pr-5 pb-2">
          <button
            onClick={() => alert('WanderWorld Session Logged Out')}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-900/80 hover:text-black hover:bg-black/10 rounded-xl text-sm font-bold transition-colors"
          >
            <LogOut className="w-4 h-4 text-gray-900/80" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

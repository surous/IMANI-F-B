"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { HiMenu } from "react-icons/hi";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-softWhite">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50`}
      >
        <div className="p-6 text-2xl font-bold border-b text-primary">Imani</div>
        <nav className="flex-1 p-4 space-y-2">
          <a className="block px-4 py-2 rounded hover:bg-secondary font-medium text-charcoal" href="/dashboard">Dashboard</a>
          <a className="block px-4 py-2 rounded hover:bg-secondary font-medium text-charcoal" href="/projects">Projects</a>
          <a className="block px-4 py-2 rounded hover:bg-secondary font-medium text-charcoal" href="/users">Users</a>
          <a className="block px-4 py-2 rounded hover:bg-secondary font-medium text-charcoal" href="/donations">Donations</a>
        </nav>
        <div className="p-6 border-t">
          <Button className="w-full bg-primary hover:bg-accent text-softWhite">New Project</Button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Top navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:px-6">
          <div className="flex items-center space-x-2">
            <HiMenu
              className="w-6 h-6 md:hidden cursor-pointer text-charcoal"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <h1 className="text-xl font-semibold text-charcoal">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-charcoal font-medium">Admin</span>
            <div className="w-8 h-8 rounded-full bg-primary text-softWhite flex items-center justify-center">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

import Breadcrumbs from "@/components/Breadcrumbs";
import { DashboardSidebarMenu } from "@/components/DashboardSidebarMenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const breadcrumbs = [
    {label: "Dashboard", href: "/dashboard"}
]

export default function layout({ children }: { children: React.ReactNode }) {
  return (
  <div>
      <main className="min-h-screen w-screen overflow-x-hidden">
        <div className="flex items-center justify-normal gap-2">
        
        </div>
        {children}
      </main>
      </div>
  );
}

"use client";

import { useState } from "react";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";

export default function Page() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <SectionCards />
            <ChartAreaInteractive />
          </>
        );
      case "products":
        return <DataTable data={data} />;
      case "analytics":
        return <h1 className="p-6 text-xl">📈 صفحة التحليلات</h1>;
      case "projects":
        return <h1 className="p-6 text-xl">📂 المشاريع</h1>;
      case "team":
        return <h1 className="p-6 text-xl">👥 الفريق</h1>;
      default:
        return <h1 className="p-6 text-xl">مرحباً 👋</h1>;
    }
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      {/* نمرر setActivePage للسايدبار */}
      <AppSidebar variant="inset" onNavigate={setActivePage} />

      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

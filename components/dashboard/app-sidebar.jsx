// "use client";

// import * as React from "react";
// import {
//   IconCamera,
//   IconChartBar,
//   IconDashboard,
//   IconDatabase,
//   IconFileAi,
//   IconFileDescription,
//   IconFileWord,
//   IconFolder,
//   IconHelp,
//   IconInnerShadowTop,
//   IconListDetails,
//   IconReport,
//   IconSearch,
//   IconSettings,
//   IconUsers,
// } from "@tabler/icons-react";

// import { NavDocuments } from "@/components/dashboard/nav-documents";
// import { NavMain } from "@/components/dashboard/nav-main";
// import { NavSecondary } from "@/components/dashboard/nav-secondary";
// import { NavUser } from "@/components/dashboard/nav-user";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "#",
//       icon: IconDashboard,
//     },
//     {
//       title: "المنتجات ",
//       url: "#",
//       icon: IconListDetails,
//     },
//     {
//       title: "Analytics",
//       url: "#",
//       icon: IconChartBar,
//     },
//     {
//       title: "Projects",
//       url: "#",
//       icon: IconFolder,
//     },
//     {
//       title: "Team",
//       url: "#",
//       icon: IconUsers,
//     },
//   ],
//   navClouds: [
//     {
//       title: "Capture",
//       icon: IconCamera,
//       isActive: true,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Proposal",
//       icon: IconFileDescription,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Prompts",
//       icon: IconFileAi,
//       url: "#",
//       items: [
//         {
//           title: "Active Proposals",
//           url: "#",
//         },
//         {
//           title: "Archived",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Settings",
//       url: "#",
//       icon: IconSettings,
//     },
//     {
//       title: "Get Help",
//       url: "#",
//       icon: IconHelp,
//     },
//     {
//       title: "Search",
//       url: "#",
//       icon: IconSearch,
//     },
//   ],
//   documents: [
//     {
//       name: "Data Library",
//       url: "#",
//       icon: IconDatabase,
//     },
//     {
//       name: "Reports",
//       url: "#",
//       icon: IconReport,
//     },
//     {
//       name: "Word Assistant",
//       url: "#",
//       icon: IconFileWord,
//     },
//   ],
// };

// export function AppSidebar({ onNavigate, ...props }) {
//   return (
//     <Sidebar
//       className="mt-35"
//       collapsible="offcanvas"
//       side="right" // 👈 هنا التغيير: نخلي السايدبار يظهر من اليمين
//       {...props}
//     >
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               asChild
//               className="data-[slot=sidebar-menu-button]:!p-1.5"
//             >
//               <a href="#">
//                 <IconInnerShadowTop className="!size-5" />
//                 <span className="text-base font-semibold">Acme Inc.</span>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain
//           items={data.navMain.map((item) => ({
//             ...item,
//             onClick: () => onNavigate?.(item.url), // 👈 هنا
//           }))}
//         />
//         {/* <NavMain items={data.navMain} /> */}
//         <NavDocuments items={data.documents} />
//         <NavSecondary items={data.navSecondary} className="mt-auto" />
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/dashboard/nav-documents";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "لوحة التحكم", url: "dashboard", icon: IconDashboard },
    { title: "المنتجات", url: "products", icon: IconListDetails },
    { title: "التحليلات", url: "analytics", icon: IconChartBar },
    { title: "المشاريع", url: "projects", icon: IconFolder },
    { title: "الفريق", url: "team", icon: IconUsers },
  ],
  navSecondary: [
    { title: "الإعدادات", url: "settings", icon: IconSettings },
    { title: "المساعدة", url: "help", icon: IconHelp },
    { title: "البحث", url: "search", icon: IconSearch },
  ],
  documents: [
    { name: "مكتبة البيانات", url: "library", icon: IconDatabase },
    { name: "التقارير", url: "reports", icon: IconReport },
    { name: "مساعد الكتابة", url: "word", icon: IconFileWord },
  ],
};

export function AppSidebar({ onNavigate, ...props }) {
  return (
    <Sidebar

      className="mt-35" // ✅ tailwind الصحيح
      collapsible="offcanvas"
      side="right"
      {...props}
    >
      {/* ===== Header ===== */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <button
                onClick={() => onNavigate?.("dashboard")}
                className="flex items-center gap-2"
              >
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ===== Content ===== */}
      <SidebarContent>
        {/* القائمة الرئيسية */}
        <nav className="flex flex-col gap-1 px-2">
          {data.navMain.map((item) => (
            <button
              key={item.title}
              onClick={() => onNavigate?.(item.url)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
            >
              <item.icon className="size-5" />
              <span>{item.title}</span>
            </button>
          ))}
        </nav>

        {/* المستندات */}
        <NavDocuments items={data.documents} />

        {/* القائمة الثانوية */}
        <NavSecondary
          items={data.navSecondary.map((item) => ({
            ...item,
            onClick: () => onNavigate?.(item.url),
          }))}
          className="mt-auto"
        />
      </SidebarContent>

      {/* ===== Footer ===== */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

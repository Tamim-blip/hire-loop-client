'use client'

import type { LucideIcon } from "lucide-react"
import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
  Wallet,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import Link from "next/link"

type Role = "admin" | "seeker" | "recruiter"

type SidebarItem = {
  name: string
  url: string
  icon: LucideIcon
}

const SidebarManyByRole: Record<Role, SidebarItem[]> = {
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
    { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: Wallet },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "My Company", url: "/dashboard/recruiter/company", icon: Building2 },
    { name: "Add Job", url: "/dashboard/recruiter/add-job", icon: PlusCircle },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
}

export function DashBoardSiteBar() {

    const {data : session} = useSession()
    const role = session?.user?.role
    const navItems =
      role === "admin" || role === "recruiter"
        ? SidebarManyByRole[role]
        : SidebarManyByRole.seeker


  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
  <SidebarMenu>
  {navItems.map((Item) => (
    <SidebarMenuItem key={Item?.name}>
      <SidebarMenuButton render={<Link href={Item?.url} />}>
        <Item.icon />
        <span>{Item?.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
</SidebarGroup>

      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

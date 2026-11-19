import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashBoardSiteBar } from "./_components/dashboardSiteBar";


const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
    <SidebarProvider>
      <DashBoardSiteBar></DashBoardSiteBar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
};

export default DashBoardLayout;
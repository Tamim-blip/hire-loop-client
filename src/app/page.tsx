import { SiteNavbar } from "@/components/layout/site-navbar";
import { HeroBanner } from "@/components/layout/hero-banner";
import { NextRoleSection } from "@/components/layout/next-role-section";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main>
        <HeroBanner />
        <NextRoleSection />
      </main>
      <SiteFooter />
    </>
  );
}

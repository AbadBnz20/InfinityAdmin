import { NavbarWrapper } from "@/components/ui/navbar/NavbarWrapper";
import { SidebarWrapper } from "@/components/ui/sidebar/SidebarWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <SidebarWrapper />
      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  );
}

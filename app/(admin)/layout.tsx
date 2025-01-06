import { NavbarWrapper } from "@/components/ui/navbar/NavbarWrapper";
import { SidebarWrapper } from "@/components/ui/sidebar/SidebarWrapper";
import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  

  return (
    <section className="flex">
      <SidebarWrapper />
      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  );
}

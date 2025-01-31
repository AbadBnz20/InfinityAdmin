import { GetPermissionsByUser } from "@/actions/permissions.action";
import { NavbarWrapper } from "@/components/ui/navbar/NavbarWrapper";
import { SidebarWrapper } from "@/components/ui/sidebar/SidebarWrapper";
import { createClient } from "@/utils/server";
import { notFound, redirect } from "next/navigation";

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

  const permissions = await GetPermissionsByUser(user.id);
  console.log(permissions.length)
  if (permissions.length == 0) {
    notFound();
  }

  return (
    <section className="flex">
      <SidebarWrapper permissions={permissions} />
      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  );
}

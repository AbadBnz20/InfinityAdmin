"user server";

import { Permissions } from "@/interfaces/permissions-interfaces";
import { createClient } from "@/utils/server";

export const GetPermissionsByUser = async (id: string) => {
  try {
    const supabase = await createClient();
    const { data: role, error } = await supabase
      .from("admin")
      .select("IdRole")
      .eq("IdUser", id)
      .single();
    if (role) {
      const { data: permisions, error: error3 } = await supabase
        .from("permissions")
        .select(
          `
       read,
       write,
       update,
       delete,
       modules (name)
     `
        )
        .eq("roleId", role.IdRole);

      return permisions as unknown as Permissions[];
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetPermissionBySession = async (
  permission: string
): Promise<Permissions | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const permissions = await GetPermissionsByUser(user.id);
  const foundPermission = permissions.find(
    (p) => p.modules.name === permission
  );

  return foundPermission || null;
};

import { createClient } from "@/utils/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { firstname, lastname, email, phone } = body;

  try {
    const usercookie = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phono: "",
    };
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      phone: phone,
      email_confirm: true,
      phone_confirm: true,
      user_metadata: usercookie,
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(
      { message: "Registrado Correctamente",data:data },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

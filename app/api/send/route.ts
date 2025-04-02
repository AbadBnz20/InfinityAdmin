
import { EmailTemplate } from "@/components/template/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const {
    fullName,
    email,
  } = body;

  try {
    const {  error } = await resend.emails.send({
      from: "Advantage <onboarding@advantageinfinityclub.com>",
      to: [email],
      subject: "¡Bienvenido a Infinity Luxury Travel Club! Accede a tu plataforma exclusiva.",
      react: EmailTemplate({
        fullName: fullName,
       
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({message: 'Email Enviado' });

  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

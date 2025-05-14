
import { EmailTemplate } from "@/components/template/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const {
    fullName,
    email,
    language,
  } = body;

  try {

    const textlanguage= language === "es" ?  "¡Bienvenido a Infinity Luxury Travel Club! Accede a tu plataforma exclusiva.":  "Welcome to Infinity Luxury Travel Club! Access your exclusive platform.";

    const {  error } = await resend.emails.send({
      from: "InfinityTravelClub <onboarding@advantageinfinityclub.com>",
      to: [email],
      subject:textlanguage,
      react: EmailTemplate({
        fullName: fullName,
        language:language
       
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

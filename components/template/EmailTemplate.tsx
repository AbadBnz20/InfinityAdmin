interface Props {
  fullName: string;
  language: "es" | "en";
}
const translations = {
  es: {
    greeting: "Estimado/a",
    welcome: "¡Nos complace darte la bienvenida a",
    platformIntro:
      "Dentro de 24 horas, tendrás acceso exclusivo a un nuevo producto, nuestra plataforma",
    platformDescription:
      "diseñada para brindarte experiencias únicas y beneficios inigualables en hoteles, resorts, yates de lujo, y transportación de primer nivel.",
    discounts:
      "Como socio, también disfrutarás de descuentos exclusivos en Seadust Cancún Family Resort, nuestro hotel insignia, diseñado para brindarte la mejor experiencia de hospedaje con el lujo y la comodidad que mereces.",
    stepsTitle: "Para acceder a la plataforma, sigue estos pasos:",
    steps: [
      "Ingresa a https://advantageinfinityclub.com.",
      "Introduce tu número de celular o correo electrónico registrado.",
      "Recibirás un código de seguridad en el medio seleccionado.",
      "Ingresa el código para completar tu acceso.",
    ],
    assistance:
      "Si necesitas asistencia o tienes alguna duda, nuestro equipo de atención al socio está disponible para apoyarte en todo momento. Escríbenos a members@infinityluxurytravelclub.com o contáctanos al (+52) 998 478 8050 , (+1) 800 871 9040.",
    closing:
      "¡Esperamos que disfrutes al máximo de todos los beneficios exclusivos que hemos preparado para ti!",
    sincerely: "Atentamente",
    platformName: "Advantage Infinity Club",
    contactEmail: "members@infinityluxurytravelclub.com",
    contactNumbers: "(+52) 998 478 8050 | (+1) 800 871 9040",
  },
  en: {
    greeting: "Dear",
    welcome: "We are pleased to welcome you to",
    platformIntro:
      "Within 24 hours, you will have exclusive access to a new product, our platform",
    platformDescription:
      "designed to provide you with unique experiences and unparalleled benefits in hotels, resorts, luxury yachts, and premium transportation.",
    discounts:
      "As a member, you will also enjoy exclusive discounts at Seadust Cancun Family Resort, our flagship hotel, designed to provide you with the best lodging experience with the luxury and comfort you deserve.",
    stepsTitle: "To access the platform, follow these steps:",
    steps: [
      "Go to https://advantageinfinityclub.com.",
      "Enter your registered phone number or email address.",
      "You will receive a security code on the selected medium.",
      "Enter the code to complete your access.",
    ],
    assistance:
      "If you need assistance or have any questions, our member support team is available to assist you at any time. Write to us at members@infinityluxurytravelclub.com or contact us at (+52) 998 478 8050 , (+1) 800 871 9040.",
    closing:
      "We hope you enjoy all the exclusive benefits we have prepared for you!",
    sincerely: "Sincerely",
    platformName: "Advantage Infinity Club",
    contactEmail: "members@infinityluxurytravelclub.com",
    contactNumbers: "(+52) 998 478 8050 | (+1) 800 871 9040",
  },
};

export const EmailTemplate = ({ fullName, language }: Props) => {
  const t = translations[language];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <p>
        {t.greeting} <strong>{fullName}</strong>,
      </p>
      <p>
        {t.welcome} <strong>Infinity Luxury Travel Club</strong>!{" "}
        {t.platformIntro} <strong>“INFINITY”</strong> {t.platformDescription}
      </p>
      <p>{t.discounts}</p>
      <h3>{t.stepsTitle}</h3>
      <ol>
        {t.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p>{t.assistance}</p>
      <p>{t.closing}</p>
      <p>{t.sincerely},</p>
      <p>
        <strong>{t.platformName}</strong>
        <br />
        <a href={`mailto:${t.contactEmail}`}>{t.contactEmail}</a>
        <br />
        <strong>{t.contactNumbers}</strong>
      </p>
    </div>
  );
};

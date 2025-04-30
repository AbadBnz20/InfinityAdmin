

interface Props{
    fullName: string;
}

export const EmailTemplate = ({fullName}:Props) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
    <p>Estimado/a <strong>{fullName}</strong>,</p>
    <p>
      ¡Nos complace darte la bienvenida a <strong>Infinity Luxury Travel Club</strong>!  Dentro de 24 horas, tendrás acceso exclusivo a un nuevo producto, nuestra plataforma <strong>“INFINITY”</strong> diseñada para brindarte experiencias únicas y beneficios inigualables en hoteles, resorts, yates de lujo, y transportación de primer nivel.
    </p>
    <p>
      Como socio, también disfrutarás de <strong>descuentos exclusivos en Seadust Cancún Family Resort</strong>, nuestro hotel insignia, diseñado para brindarte la mejor experiencia de hospedaje con el lujo y la comodidad que mereces.
    </p>
    <h3>Para acceder a la plataforma, sigue estos pasos:</h3>
    <ol>
      <li>Ingresa a <a href="https://advantageinfinityclub.com">https://advantageinfinityclub.com</a>.</li>
      <li>Introduce tu número de celular o correo electrónico registrado.</li>
      <li>Recibirás un código de seguridad en el medio seleccionado.</li>
      <li>Ingresa el código para completar tu acceso.</li>
    </ol>
    <p>
      Si necesitas asistencia o tienes alguna duda, nuestro equipo de atención al socio está disponible para apoyarte en todo momento. Escríbenos a <strong>members@infinityluxurytravelclub.com</strong> o contáctanos al <strong>(+52) 998 478 8050 , (+1) 800 871 9040.</strong>.
    </p>
    <p>
      ¡Esperamos que disfrutes al máximo de todos los beneficios exclusivos que hemos preparado para ti!
    </p>
    <p>Atentamente,</p>
    <p>
      <strong>Advantage Infinity Club</strong><br />
      <a href="mailto:members@infinityluxurytravelclub.com">members@infinityluxurytravelclub.com</a><br />
      <strong>(+52) 998 478 8050 | (+1) 800 871 9040</strong>
    </p>
  </div>
  )
}

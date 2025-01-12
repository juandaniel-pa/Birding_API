const db = require("../config/db"); // Asegurar que la ruta es correcta
const nodemailer = require("nodemailer");

exports.handleFormSubmission = async (req, res) => {
  const { name, last_name, email, phone, subject, description } = req.body;

  if (!name || !last_name || !email || !phone || !subject || !description) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    console.log("📌 Insertando en la base de datos...");
    await db.execute(
      "INSERT INTO form_submissions (name, last_name, email, phone, subject, description) VALUES (?, ?, ?, ?, ?, ?)",
      [name, last_name, email, phone, subject, description]
    );
    console.log("✅ Registro guardado en la base de datos");

    const transporter = nodemailer.createTransport({
      host: "mail.psychoshop.xyz",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    console.log("📧 Enviando correo...");
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `Nuevo formulario: ${subject}`,
      text: `Nombre: ${name} ${last_name}\nEmail: ${email}\nTeléfono: ${phone}\nDescripción: ${description}`
    });

    console.log("✅ Correo enviado correctamente");
    res.status(200).json({ message: "Formulario enviado y guardado correctamente" });
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ message: "Error al procesar el formulario" });
  }
};

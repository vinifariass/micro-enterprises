import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    throw new Error("SMTP credentials are missing. Configure SMTP_HOST, SMTP_USER and SMTP_PASS.");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return transporter;
}

function buildHtmlMessage(data: Required<Pick<ContactPayload, "name" | "email" | "message">> & Pick<ContactPayload, "phone">) {
  return `
    <table style="max-width:560px;width:100%;font-family:Arial,sans-serif;color:#1f2937;background:#f8fafc;padding:24px;border-radius:16px;">
      <tr>
        <td style="padding-bottom:16px;">
          <h2 style="margin:0;font-size:20px;color:#0f172a;">Novo contato - ${data.name}</h2>
          <p style="margin:8px 0 0;color:#334155;">Mensagem recebida pelo site MarAzul Yacht Experiences.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px;border-radius:12px;background:#fff;box-shadow:0 8px 20px rgba(15,23,42,0.08);">
          <p style="margin:0 0 12px;color:#0f172a;"><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p style="margin:0 0 12px;color:#0f172a;"><strong>Telefone:</strong> ${data.phone}</p>` : ""}
          <p style="margin:0;color:#0f172a;white-space:pre-line;">${data.message}</p>
        </td>
      </tr>
    </table>
  `;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_TO_EMAIL ?? process.env.SMTP_USER;
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER;
    const webhook = process.env.CONTACT_WEBHOOK_URL;

    if (!toEmail) {
      throw new Error("Destination email is not configured. Set CONTACT_TO_EMAIL or SMTP_TO_EMAIL.");
    }

    const emailText = `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone ?? "-"}\n\nMensagem:\n${message}`;

    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, message }),
        });
      } catch (hookError) {
        console.error("Failed to notify contact webhook", hookError);
      }
    }

    try {
      const smtpTransporter = getTransporter();
      await smtpTransporter.sendMail({
        to: toEmail,
        from: fromEmail ?? email,
        replyTo: email,
        subject: `Novo contato - ${name}`,
        text: emailText,
        html: buildHtmlMessage({ name, email, phone, message }),
      });
    } catch (mailError) {
      console.error("SMTP send failed", mailError);
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

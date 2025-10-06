"use client";

import { useMemo, useState } from "react";
import type { FocusEvent, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

type Status = "idle" | "success" | "error";
type Field = "name" | "email" | "phone" | "message";

type BoatContactFormProps = {
  className?: string;
};

type FormState = Record<Field, string>;
type ErrorState = Record<Field, string>;
type TouchedState = Record<Field, boolean>;

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const requiredFields: Field[] = ["name", "email", "message"];

const helpTexts: Record<Field, string> = {
  name: "Nome completo (como no seu documento)",
  email: "Email (para enviar informações detalhadas)",
  phone: "Telefone ou WhatsApp (para contato rápido)",
  message: "Descreva o evento, data desejada e convidados",
};

export function BoatContactForm({ className }: BoatContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<ErrorState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [touched, setTouched] = useState<TouchedState>({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const validateField = (field: Field, value: string): string => {
    const trimmed = value.trim();
    if (requiredFields.includes(field) && !trimmed) {
      return "Campo obrigatório";
    }

    if (field === "email" && trimmed) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return "Informe um email válido";
      }
    }

    if (field === "message" && trimmed.length < 20) {
      return "Descreva com pelo menos 20 caracteres";
    }

    if (field === "phone" && trimmed && trimmed.length < 9) {
      return "Informe um telefone com DDD";
    }

    return "";
  };

  const validateForm = (state: FormState) => {
    const nextErrors = {} as ErrorState;
    (Object.keys(state) as Field[]).forEach((field) => {
      nextErrors[field] = validateField(field, state[field]);
    });
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return nextErrors;
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const field = name as Field;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const updateField = (field: Field, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const fieldHasError = (field: Field) => touched[field] && Boolean(errors[field]);
  const fieldIsValid = (field: Field) => touched[field] && !errors[field] && Boolean(form[field].trim());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setStatus("idle");
    setTouched({ name: true, email: true, phone: touched.phone || Boolean(form.phone.trim()), message: true });

    const currentErrors = validateForm(form);
    const hasBlockingError = requiredFields.some((field) => currentErrors[field]);

    if (hasBlockingError) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar contato");
      }

      setStatus("success");
      setForm(initialForm);
      setTouched({ name: false, email: false, phone: false, message: false });
      setErrors({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Erro ao enviar contato", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusMessage = useMemo(() => {
    if (status === "success") {
      return "Obrigado! Nossa equipe entrará em contato em até 1 hora.";
    }
    if (status === "error" && !isSubmitting) {
      return "Não foi possível enviar agora. Revise os campos ou tente novamente.";
    }
    return "";
  }, [isSubmitting, status]);

  const baseFieldStyles = cn(
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition",
    "hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:shadow-lg focus-visible:shadow-[#00B4D8]/20 focus:outline-none"
  );

  const getFieldStyles = (field: Field) =>
    cn(
      baseFieldStyles,
      fieldHasError(field) && "border-rose-400 focus-visible:ring-rose-400 focus-visible:shadow-rose-200",
      fieldIsValid(field) && "border-emerald-300"
    );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-6 text-slate-900", className)}
      aria-busy={isSubmitting}
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-slate-800">
            Nome completo <span className="text-rose-500">*</span>
          </label>
          <p id="contact-name-help" className="text-xs text-slate-500">{helpTexts.name}</p>
          <div className="relative">
            <Input
              id="name"
              name="name"
              autoComplete="name"
              autoCapitalize="words"
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              onBlur={handleBlur}
              className={getFieldStyles("name")}
              aria-invalid={fieldHasError("name")}
              aria-describedby="contact-name-help"
            />
            {fieldIsValid("name") && (
              <CheckCircle className="absolute inset-y-0 right-3 my-auto size-4 text-emerald-500" />
            )}
            {fieldHasError("name") && (
              <AlertCircle className="absolute inset-y-0 right-3 my-auto size-4 text-rose-500" />
            )}
          </div>
          {fieldHasError("name") && (
            <p className="text-xs font-medium text-rose-500">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-800">
            Email <span className="text-rose-500">*</span>
          </label>
          <p id="contact-email-help" className="text-xs text-slate-500">{helpTexts.email}</p>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              onBlur={handleBlur}
              className={getFieldStyles("email")}
              aria-invalid={fieldHasError("email")}
              aria-describedby="contact-email-help"
            />
            {fieldIsValid("email") && (
              <CheckCircle className="absolute inset-y-0 right-3 my-auto size-4 text-emerald-500" />
            )}
            {fieldHasError("email") && (
              <AlertCircle className="absolute inset-y-0 right-3 my-auto size-4 text-rose-500" />
            )}
          </div>
          {fieldHasError("email") && (
            <p className="text-xs font-medium text-rose-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-slate-800">
          Telefone ou WhatsApp
        </label>
        <p id="contact-phone-help" className="text-xs text-slate-500">{helpTexts.phone}</p>
        <div className="relative">
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            onBlur={handleBlur}
            className={getFieldStyles("phone")}
            aria-invalid={fieldHasError("phone")}
            aria-describedby="contact-phone-help"
          />
          {fieldIsValid("phone") && (
            <CheckCircle className="absolute inset-y-0 right-3 my-auto size-4 text-emerald-500" />
          )}
          {fieldHasError("phone") && (
            <AlertCircle className="absolute inset-y-0 right-3 my-auto size-4 text-rose-500" />
          )}
        </div>
        {fieldHasError("phone") && (
          <p className="text-xs font-medium text-rose-500">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-slate-800">
          Como podemos ajudar? <span className="text-rose-500">*</span>
        </label>
        <p id="contact-message-help" className="text-xs text-slate-500">{helpTexts.message}</p>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            autoComplete="off"
            minLength={20}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            onBlur={handleBlur}
            className={cn(
              "w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition",
              "hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-[#00B4D8] focus-visible:shadow-lg focus-visible:shadow-[#00B4D8]/20 focus:outline-none",
              fieldHasError("message") && "border-rose-400 focus-visible:ring-rose-400 focus-visible:shadow-rose-200",
              fieldIsValid("message") && "border-emerald-300"
            )}
            aria-invalid={fieldHasError("message")}
            aria-describedby="contact-message-help"
          />
          {fieldIsValid("message") && (
            <CheckCircle className="absolute bottom-3 right-3 size-4 text-emerald-500" />
          )}
          {fieldHasError("message") && (
            <AlertCircle className="absolute bottom-3 right-3 size-4 text-rose-500" />
          )}
        </div>
        {fieldHasError("message") && (
          <p className="text-xs font-medium text-rose-500">{errors.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0077BE] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-[#0077BE]/30 transition hover:bg-[#0090df] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0090df] focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Enviando...
            </>
          ) : (
            "Solicite seu evento agora"
          )}
        </Button>
        {statusMessage && (
          <p
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm",
              status === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-600"
            )}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}


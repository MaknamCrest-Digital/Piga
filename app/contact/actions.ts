"use server";

import { deliver } from "@/lib/forms/deliver";
import { FALLBACK_MESSAGE, type FormState } from "@/lib/forms/types";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  if (str(fd, "company_website")) return { status: "success", message: "Thank you." }; // honeypot

  const errors: Record<string, string> = {};
  if (!str(fd, "name")) errors.name = "Required";
  if (!str(fd, "message")) errors.message = "Required";
  const email = str(fd, "email");
  const phone = str(fd, "phone");
  if (!email && !phone) errors.email = "Give us an email or a phone number";
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email";
  if (Object.keys(errors).length) return { status: "error", message: "Please check the highlighted fields.", errors };

  const result = await deliver({
    kind: "contact",
    fields: { topic: str(fd, "topic"), name: str(fd, "name"), organisation: str(fd, "organisation"), email, phone, message: str(fd, "message") },
  });
  if (!result.ok) return { status: "error", message: FALLBACK_MESSAGE };
  return { status: "success", message: "Thank you. Your message has been sent and the PiGA team will be in touch." };
}

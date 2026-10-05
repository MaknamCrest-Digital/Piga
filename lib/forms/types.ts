export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

export const FALLBACK_MESSAGE =
  "We couldn’t send this online just now. Please email info@pineapplegrowersgh.org or WhatsApp 059 159 8095 and we’ll take it from there.";

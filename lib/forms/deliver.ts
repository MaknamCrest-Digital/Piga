// Form delivery. The destination is undecided (checklist 9.5), so delivery is
// chosen by FORMS_DELIVERY and nothing is hard-coded yet:
//   unset   → development: log a redacted summary; production: report "not configured"
//   email   → TODO once 9.5 is answered (Resend/SMTP to info@)
//   wordpress | webhook → TODO, see piga-wordpress-cms skill §6

export type Submission = { kind: "membership" | "contact"; fields: Record<string, unknown> };
export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

const SENSITIVE = new Set(["ghanaCard", "phone", "email", "gps"]);

export async function deliver(sub: Submission): Promise<DeliveryResult> {
  const mode = process.env.FORMS_DELIVERY;
  if (!mode) {
    if (process.env.NODE_ENV !== "production") {
      const redacted = Object.fromEntries(Object.entries(sub.fields).map(([k, v]) => [k, SENSITIVE.has(k) ? "[redacted]" : v]));
      console.info(`[forms] ${sub.kind} submission (dev, not delivered)`, redacted);
      return { ok: true };
    }
    return { ok: false, reason: "not-configured" };
  }
  console.error(`[forms] FORMS_DELIVERY="${mode}" is not implemented yet`);
  return { ok: false, reason: "not-configured" };
}

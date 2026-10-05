"use server";

import { deliver } from "@/lib/forms/deliver";
import { FALLBACK_MESSAGE, type FormState } from "@/lib/forms/types";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

// Checklist 3.4 field set.
export async function submitMembership(_prev: FormState, fd: FormData): Promise<FormState> {
  if (str(fd, "company_website")) return { status: "success", message: "Thank you." }; // honeypot

  const errors: Record<string, string> = {};
  const required = ["firstName", "surname", "ghanaCard", "phone", "region", "village", "totalAcreage", "farmAge", "farmOwner"];
  for (const k of required) if (!str(fd, k)) errors[k] = "Required";

  const ghanaCard = str(fd, "ghanaCard").toUpperCase();
  if (ghanaCard && !/^GHA-?\d{9}-?\d$/.test(ghanaCard)) errors.ghanaCard = "Use the format GHA-123456789-0";
  const phone = str(fd, "phone").replace(/\s/g, "");
  if (phone && !/^(\+233|0)\d{9}$/.test(phone)) errors.phone = "Enter a Ghana phone number, e.g. 059 159 8095";
  if (str(fd, "farmOwner") === "No" && !str(fd, "ownerDetails")) errors.ownerDetails = "Tell us who owns the farm";

  const crops = fd.getAll("cropVariety").map((v, i) => ({
    variety: String(v),
    acreage: String(fd.getAll("cropAcreage")[i] ?? ""),
    harvest: String(fd.getAll("cropHarvest")[i] ?? ""),
    method: String(fd.getAll("cropMethod")[i] ?? ""),
  })).filter((c) => c.variety || c.acreage);

  if (Object.keys(errors).length) return { status: "error", message: "Please check the highlighted fields.", errors };

  const result = await deliver({
    kind: "membership",
    fields: {
      fieldOfficer: str(fd, "fieldOfficer"),
      aggregator: str(fd, "aggregator"),
      firstName: str(fd, "firstName"),
      middleName: str(fd, "middleName"),
      surname: str(fd, "surname"),
      date: new Date().toISOString().slice(0, 10),
      ghanaCard,
      phone,
      region: str(fd, "region"),
      village: str(fd, "village"),
      gps: str(fd, "gps"),
      totalAcreage: str(fd, "totalAcreage"),
      farmAge: str(fd, "farmAge"),
      farmOwner: str(fd, "farmOwner"),
      ownerDetails: str(fd, "ownerDetails"),
      crops,
    },
  });

  if (!result.ok) return { status: "error", message: FALLBACK_MESSAGE };
  return { status: "success", message: "Thank you. Your application has been received. You will receive your PiGA member ID within 48 hours." };
}

import type { MembershipPage } from "@/lib/content/types";

// Checklist 3.1–3.8. Approved copy: .claude/skills/piga-content/references/approved-copy.md
export const membershipPage: MembershipPage = {
  eligibility: [
    "Membership is open to anyone actively involved in pineapple farming, whether as an independent farmer, as part of a cooperative, or as a commercial operation.",
    "Aspiring farmers who are planning to start a pineapple farm are also welcome.",
  ],
  categories: [
    { name: "Individual", summary: "For independent farmers growing pineapple on their own farm, and aspiring farmers planning one." },
    { name: "Cooperative", summary: "For growers who farm and sell together as part of a cooperative." },
    { name: "Commercial", summary: "For commercial pineapple operations of any size." },
  ],
  // 3.3 is TBC: kept here so it switches on with one flag once confirmed.
  benefitsConfirmed: false,
  benefits: [
    { title: "A fair price for your fruit, negotiated collectively rather than farm by farm." },
    { title: "Same day payment for fruits, with the Association standing behind the terms and payment." },
    { title: "Access to buyers at home and for export that a single farm cannot reach." },
    { title: "Training and technical support on planting, crop management, pests and post-harvest handling." },
    { title: "Access to good planting material and quality inputs." },
    { title: "A voice wherever decisions about the pineapple sector are taken." },
  ],
  feeStatement:
    "Membership is free in all three categories. There is no joining fee, no annual due and no other charge.",
  steps: [
    { title: "Contact", body: "Get in touch with PiGA, or apply online." },
    { title: "Submit your details", body: "Tell us about you and your farm. There is no payment step, since membership is free." },
    { title: "Approval", body: "Your application is reviewed and you receive your PiGA member ID." },
  ],
  memberIdTurnaround: "48 hours",
  enquiriesEmail: "info@pineapplegrowersgh.org",
};

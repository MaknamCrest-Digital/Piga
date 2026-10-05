import type { AboutPage, HomePage } from "@/lib/content/types";

// Approved copy: .claude/skills/piga-content/references/approved-copy.md

export const homePage: HomePage = {
  hero: {
    eyebrow: "Pineapple Growers Association · Ghana",
    title: "Putting the pineapple farmer",
    highlight: "first.",
    lead: "PiGA brings Ghana’s pineapple growers together into one association with the power to negotiate fair terms, protect and represent them, and give every farm the training and good planting material it needs.",
  },
  stats: [
    { value: "Free", label: "Membership, in every category" },
    { value: "National", label: "Coverage across Ghana" },
    { value: "3", label: "Membership categories" },
    { value: "48 hrs", label: "To receive your member ID" },
  ],
  whoWeAre: [
    "The Pineapple Growers Association is a non-governmental organisation. It brings Ghana’s pineapple farmers together under one roof. On their own, growers take the price they are offered and wait to be paid. Together they can do better.",
    "PiGA helps its members sell their fruit at a price that reflects what it is worth, and sees that the money reaches them when it should. Alongside that sits the practical work: training, technical support, access to good planting material and inputs, and a route to buyers a single farm would struggle to reach.",
    "The Association works beside the Orange Growers Association and the Mango Growers Association, part of a wider effort to give Ghana’s fruit growers the representation other tree-crop sectors have had for years.",
    "PiGA is led by the board that built the Orange Growers Association, joined by a small number of new appointments. A grower joining PiGA is joining an association already run by people with a record in the sector, not a standing start.",
  ],
  vision:
    "To be recognised across Ghana and beyond as the association that puts the pineapple farmer first, shapes the policy of the sector and strengthens Ghanaian agriculture.",
  mission:
    "To bring Ghana’s pineapple growers together into one association with the power to negotiate fair terms, protect and represent them, and give every farm the training and good planting material it needs.",
  objectives: [
    { title: "A fair price", body: "Win our members a fair and transparent price for every crate of fruit they grow." },
    { title: "Paid on time", body: "Make certain growers are paid on time, on every delivery." },
    { title: "Better yield and quality", body: "Raise yield and quality through training, technical support and access to good planting material and inputs." },
    { title: "Open doors to buyers", body: "Open the doors to buyers at home and abroad that a farmer could not reach alone." },
    { title: "A voice for growers", body: "Speak for pineapple growers wherever decisions about the sector are taken." },
    { title: "A growing sector", body: "Grow what pineapple contributes to Ghana’s agricultural economy, season after season." },
  ],
  featuredPeopleIds: ["nimo-ahinkorah", "nana-yaw-baffour-frimpong", "naana-asiamah-adjei", "david-carpi", "nicholas-charway", "artem-bezukh"],
};

export const aboutPage: AboutPage = {
  establishedYear: 2026,
  history: [
    "The Pineapple Growers Association (PiGA) is a non-governmental organisation established in 2026 to strengthen Ghana’s pineapple-growing sector. The Association focuses on improving the cultivation, processing and marketing of pineapples, making the value chain more competitive, profitable and accessible to all.",
    "PiGA was created to fill a gap in the agricultural landscape: the absence of a dedicated organisation and regulatory framework to support pineapple growers, in the way that other tree-crop sectors such as cashew, shea and rubber are already supported.",
  ],
  coverage:
    "National. The Association covers the whole of Ghana, with the registered office in Akyem Oda in the Eastern Region. The intention is to become the largest pineapple association in Ghana.",
  structureIntro: [
    "Three tiers, the same as the Orange Growers Association: a Board of Directors, a Management Team reporting to it, and Regional Coordinators in the field.",
    "The same board that has managed the Orange Growers Association takes PiGA on, joined by a few new appointments. It is a deliberate choice: the people who built a working association for citrus are the ones setting up pineapple, so PiGA starts with a leadership that has already done the job once.",
  ],
};

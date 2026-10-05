import type { KnowledgeTopic, Variety } from "@/lib/content/types";

// 5.1, cross-checked by the client against GEPA and FreshFruitPortal.
export const varieties: Variety[] = [
  {
    id: "sugar-loaf",
    name: "Sugar Loaf",
    code: "SL",
    attributes: ["White flesh", "High sugar", "Very low acid"],
    summary:
      "The Ghanaian smallholder variety. Conical, white flesh, high sugar and very low acid, no woodiness in the core. Needs around 30 per cent less chemical input, 50 per cent less fertiliser and less water than the alternatives.",
  },
  {
    id: "md2",
    name: "MD2",
    code: "MD2",
    attributes: ["Deep yellow", "1 to 2.5 kg", "Long shelf life"],
    summary:
      "The main export hybrid, introduced to Ghana in 2004. Deep yellow, square shouldered, 1 to 2.5 kg, long shelf life.",
  },
  {
    id: "smooth-cayenne",
    name: "Smooth Cayenne",
    code: "SC",
    attributes: ["Cylindrical", "1.5 to 2.5 kg", "Balanced sugar and acid"],
    summary:
      "Cylindrical, 1.5 to 2.5 kg, balanced sugar and acid. Ghana’s dominant export variety until the mid 2000s and still the preferred variety for canning.",
  },
  {
    id: "queen-victoria",
    name: "Queen Victoria",
    attributes: ["Minor variety"],
    isMinor: true,
    summary: "Also grown in Ghana, on a smaller scale.",
  },
];

// 5.3–5.7 are outstanding: topics render as empty states until resources exist.
export const knowledgeTopics: KnowledgeTopic[] = [
  { id: "production", title: "Production and farm management", blurb: "Planting, spacing, nutrition and day-to-day farm practice." },
  { id: "post-harvest", title: "Harvesting and post-harvest", blurb: "When and how to harvest, and handling fruit after it leaves the plant." },
  { id: "pests", title: "Pests and diseases", blurb: "Recognising common problems and what to do about them." },
  { id: "quality", title: "Quality and certification", blurb: "Standards, certification and food safety for local and export markets." },
  { id: "markets", title: "Markets and export", blurb: "How the value chain works, from farm gate to buyer." },
];

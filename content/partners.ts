import type { Partner } from "@/lib/content/types";

// Checklist 6.1–6.3, Appendix A. Private partners stay hidden until each one
// confirms it is content to be named for PiGA (6.3). Flip consentConfirmed.
// Logos: extracted from Appendix A of the checklist (v3.8). Originals: assets/source/partners/.
// A logo being present does NOT publish a partner; consentConfirmed does.
// Publication policy: list every partner, including those whose 6.3 consent is
// still outstanding (instruction from the agency, 5 Oct 2026). consentConfirmed
// stays accurate per partner so consent can still be tracked; set this to false
// to go back to listing confirmed partners only.
export const listPartnersPendingConsent = true;

export const partners: Partner[] = [
  {
    id: "oga",
    logo: { src: "/partners/oga.png", alt: "Orange Growers Association logo", width: 978, height: 997 },
    name: "Orange Growers Association",
    shortName: "OGA",
    type: "sister-association",
    consentConfirmed: true,
    website: "https://orangegrowersgh.org",
    description:
      "The Orange Growers Association is PiGA's sister association, bringing Ghana's citrus farmers together since 2020 and growing from 273 members to more than 3,000 across 12 districts and 82 rural communities. From its headquarters in Akim Oda it works to lift the quality, the price and the cultivation of Ghanaian oranges.",
  },
  {
    id: "maga",
    logo: { src: "/partners/maga.png", alt: "Mango Growers Association logo", width: 1182, height: 773 },
    name: "Mango Growers Association",
    shortName: "MaGA",
    type: "sister-association",
    consentConfirmed: true,
    description:
      "The Mango Growers Association is PiGA's sister association in the mango sector, giving Ghana's mango farmers the same collective weight that citrus and pineapple growers have. It is built on the same model and led by the same people, so growers of all three fruits work within one family of associations.",
  },
  {
    id: "giz",
    logo: { src: "/partners/giz.png", alt: "GIZ, Deutsche Gesellschaft für Internationale Zusammenarbeit logo", width: 557, height: 153 },
    name: "GIZ",
    type: "development",
    consentConfirmed: true,
    logoIsGreyscale: true, // 6.2: request the colour original before launch
    description:
      "GIZ, the Deutsche Gesellschaft für Internationale Zusammenarbeit, implements Germany's international cooperation work and has long been active in Ghanaian agriculture. Its support brings technical standards, equipment and development expertise an association could not assemble on its own.",
  },
  {
    id: "sono",
    logo: { src: "/partners/sono.png", alt: "Sono Ghana logo", width: 1598, height: 878 },
    name: "Sono Ghana",
    type: "private",
    consentConfirmed: false,
    description:
      "Sono is a vertically integrated juice company that runs the whole chain itself, from its own farms and outgrowers through processing and logistics to sales into Europe. Its plant at Asamankese, the largest fruit juice processing facility in West Africa, handles up to 400 tonnes of fruit a day.",
  },
  {
    id: "cofrutos",
    logo: { src: "/partners/cofrutos.png", alt: "Cofrutos logo", width: 802, height: 371 },
    name: "Cofrutos",
    type: "private",
    consentConfirmed: false,
    description:
      "Cofrutos began as a Spanish farming cooperative in 1960 and is now an established juice packer in Murcia, producing 100 per cent juices, nectars, smoothies and fruit drinks under its Cofrutos and Molinera brands. It has packed in Tetra Pak since 1986 and works to ISO 9001 and IFS standards.",
  },
  {
    id: "compass",
    logo: { src: "/partners/compass.png", alt: "Compass of the World logo", width: 695, height: 312 },
    name: "Compass of the World",
    type: "private",
    consentConfirmed: false,
    description:
      "Compass of the World is an independent international drinks company based in Barcelona with more than fifteen years spent building brands across Africa, Asia and Latin America. It produces and exports beers, soft drinks, wines and energy drinks, distributes Estrella Damm across Africa, and runs its own offices in Ivory Coast and Nigeria.",
  },
  {
    id: "frutina",
    logo: { src: "/partners/frutina.png", alt: "Frutina logo", width: 241, height: 136 },
    name: "Frutina",
    type: "private",
    consentConfirmed: false,
    description:
      "Frutina is a multi-fruit and food processing partner working on local fruit-based products and value addition. Its collaboration opens processing capacity, wider markets and stronger demand for fruit grown in Ghana.",
  },
  {
    id: "oj-global",
    logo: { src: "/partners/oj-global.png", alt: "OJ Global logo", width: 650, height: 364 },
    name: "OJ Global",
    type: "private",
    consentConfirmed: false,
    description:
      "OJ Global is a private-sector partner working in business development, trade and market engagement. It strengthens the commercial side of the association, opening links and growth routes a single farm would not reach alone.",
  },
  {
    id: "kobb-and-cobb",
    logo: { src: "/partners/kobb-and-cobb.png", alt: "Kobb and Cobb logo", width: 318, height: 347 },
    name: "Kobb and Cobb",
    type: "private",
    consentConfirmed: false,
    description:
      "Kobb and Cobb is an international partner providing professional services and business support. It contributes to organisational development, strategic planning and the operational capacity that keeps an association running properly.",
  },
  {
    id: "mr-pig",
    logo: { src: "/partners/mr-pig.png", alt: "Mr Pig logo", width: 356, height: 287 },
    name: "Mr Pig",
    type: "private",
    consentConfirmed: false,
    description:
      "Mr Pig is a Ghanaian agribusiness brand working in food production and processing. The partnership links the fruit sector into the wider agribusiness chain, where scale on one side creates demand on the other.",
  },
  {
    id: "ankaa",
    logo: { src: "/partners/ankaa.png", alt: "Ankaa Tropical Oranges logo", width: 684, height: 554 },
    name: "Ankaa Tropical Oranges",
    type: "private",
    consentConfirmed: false,
    description:
      "Ankaa Tropical Oranges is a fully Ghanaian-owned fruit brand that launched in January 2024 to put farm-fresh oranges straight into consumers' hands. It picks, sorts and delivers directly, paying growers a fair return and backing them with inputs and farm management training.",
  },
  {
    id: "eastfield-farms",
    logo: { src: "/partners/eastfield-farms.png", alt: "Eastfield Farms logo", width: 611, height: 240 },
    name: "Eastfield Farms",
    type: "private",
    consentConfirmed: false,
    description:
      "Eastfield Farms runs a 1,500 acre orchard at Aperade in the Achiase district, described in the Ghanaian press as West Africa's largest orange orchard, employing 120 people. It is the farm that created the Orange Growers Association.",
  },
  {
    id: "eastfield-foundation",
    logo: { src: "/partners/eastfield-foundation.png", alt: "EastField Foundation logo", width: 718, height: 389 },
    name: "EastField Foundation",
    type: "private",
    consentConfirmed: false,
    description:
      "The EastField Foundation has been the community arm of Eastfield Farms since 2020, putting fresh fruit, seedlings and school support into the districts where the farms sit. Its OrangeWednesday programme alone reaches hundreds of schoolchildren every week.",
  },
];

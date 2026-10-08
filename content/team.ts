import type { Image, Person } from "@/lib/content/types";

// Checklist 2.1, 2.5. Order within the array is display order.
// Headshots (2.2): supplied by the client in "Leadership images.pdf" (8 Oct 2026), 300×350 (272×350 for two).
// Served from public/people/<id>.jpg; untouched originals in assets/source/people/.
// Artem Bezukh has no headshot yet, so PersonCard falls back to initials.
const headshot = (id: string, name: string, width = 300, height = 350): Image => ({
  src: `/people/${id}.jpg`,
  alt: `Portrait of ${name}`,
  width,
  height,
});

export const people: Person[] = [
  {
    id: "nimo-ahinkorah",
    name: "Nimo Ahinkorah",
    groups: ["board"],
    roles: { board: "Chairman" },
    headshot: headshot("nimo-ahinkorah", "Nimo Ahinkorah"),
  },
  {
    id: "nana-yaw-baffour-frimpong",
    name: "Nana Yaw Baffour Frimpong",
    groups: ["board", "management"],
    roles: { board: "Board member", management: "President" },
    headshot: headshot("nana-yaw-baffour-frimpong", "Nana Yaw Baffour Frimpong"),
  },
  {
    id: "abena-larbi-yeboah",
    name: "Mrs Abena Larbi Yeboah",
    groups: ["board"],
    roles: { board: "Board member" },
    headshot: headshot("abena-larbi-yeboah", "Mrs Abena Larbi Yeboah"),
  },
  {
    id: "papa-yaw-ntiforo",
    name: "Papa Yaw Ntiforo",
    groups: ["board"],
    roles: { board: "Board member" },
    headshot: headshot("papa-yaw-ntiforo", "Papa Yaw Ntiforo", 272),
  },
  {
    id: "godfred-ofosu-budu",
    name: "Prof Godfred Ofosu-Budu",
    groups: ["board"],
    roles: { board: "Board member" },
    headshot: headshot("godfred-ofosu-budu", "Prof Godfred Ofosu-Budu"),
  },
  {
    id: "kwabena-nimo-ahinkorah",
    name: "Kwabena Nimo-Ahinkorah",
    groups: ["board"],
    roles: { board: "Board member" },
    headshot: headshot("kwabena-nimo-ahinkorah", "Kwabena Nimo-Ahinkorah"),
  },
  {
    id: "naana-asiamah-adjei",
    name: "Naana Asiamah-Adjei",
    groups: ["management"],
    roles: { management: "Vice President" },
    headshot: headshot("naana-asiamah-adjei", "Naana Asiamah-Adjei"),
  },
  {
    id: "david-carpi",
    name: "David Carpi",
    groups: ["management"],
    roles: { management: "Director of Operations" },
    headshot: headshot("david-carpi", "David Carpi"),
  },
  {
    id: "nicholas-charway",
    name: "Nicholas Charway",
    groups: ["management"],
    roles: { management: "Director of Finance" },
    headshot: headshot("nicholas-charway", "Nicholas Charway", 272),
  },
  { id: "artem-bezukh", name: "Artem Bezukh", groups: ["management"], roles: { management: "Business Development Director" } },
  {
    id: "sam-dokye-yeboah",
    name: "Sam Dokye Yeboah",
    groups: ["regional"],
    region: "Eastern Region",
    roles: { regional: "Regional Coordinator" },
    headshot: headshot("sam-dokye-yeboah", "Sam Dokye Yeboah"),
  },
  {
    id: "samuel-abudu",
    name: "Samuel Abudu",
    groups: ["regional"],
    region: "Central Region",
    roles: { regional: "Regional Coordinator" },
    headshot: headshot("samuel-abudu", "Samuel Abudu"),
  },
  {
    id: "solomon-yeboah",
    name: "Solomon Yeboah",
    groups: ["regional"],
    region: "Ashanti Region",
    roles: { regional: "Regional Coordinator" },
    headshot: headshot("solomon-yeboah", "Solomon Yeboah"),
  },
];

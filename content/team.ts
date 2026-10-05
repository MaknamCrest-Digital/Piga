import type { Person } from "@/lib/content/types";

// Checklist 2.1, 2.5. Order within the array is display order.
// Headshots (2.2): available from the OGA site for all except Artem Bezukh.
// Drop files in public/people/<id>.jpg and add `headshot`.
export const people: Person[] = [
  { id: "nimo-ahinkorah", name: "Nimo Ahinkorah", groups: ["board"], roles: { board: "Chairman" } },
  {
    id: "nana-yaw-baffour-frimpong",
    name: "Nana Yaw Baffour Frimpong",
    groups: ["board", "management"],
    roles: { board: "Board member", management: "President" },
  },
  { id: "abena-larbi-yeboah", name: "Mrs Abena Larbi Yeboah", groups: ["board"], roles: { board: "Board member" } },
  { id: "papa-yaw-ntiforo", name: "Papa Yaw Ntiforo", groups: ["board"], roles: { board: "Board member" } },
  { id: "godfred-ofosu-budu", name: "Prof Godfred Ofosu-Budu", groups: ["board"], roles: { board: "Board member" } },
  { id: "kwabena-nimo-ahinkorah", name: "Kwabena Nimo-Ahinkorah", groups: ["board"], roles: { board: "Board member" } },
  { id: "naana-asiamah-adjei", name: "Naana Asiamah-Adjei", groups: ["management"], roles: { management: "Vice President" } },
  { id: "david-carpi", name: "David Carpi", groups: ["management"], roles: { management: "Director of Operations" } },
  { id: "nicholas-charway", name: "Nicholas Charway", groups: ["management"], roles: { management: "Director of Finance" } },
  { id: "artem-bezukh", name: "Artem Bezukh", groups: ["management"], roles: { management: "Business Development Director" } },
  { id: "sam-dokye-yeboah", name: "Sam Dokye Yeboah", groups: ["regional"], region: "Eastern Region", roles: { regional: "Regional Coordinator" } },
  { id: "samuel-abudu", name: "Samuel Abudu", groups: ["regional"], region: "Central Region", roles: { regional: "Regional Coordinator" } },
  { id: "solomon-yeboah", name: "Solomon Yeboah", groups: ["regional"], region: "Ashanti Region", roles: { regional: "Regional Coordinator" } },
];

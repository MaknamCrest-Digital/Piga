import type { EventItem, LegalPage, Post } from "@/lib/content/types";

// 7.2 Partial: month confirmed; date, venue and programme not yet set.
export const events: EventItem[] = [
  {
    id: "piga-launch",
    title: "PiGA launch",
    monthLabel: "November 2026",
    dateTbc: true,
    venueTbc: true,
    summary: "The official launch of the Pineapple Growers Association. Date, venue and programme will be announced here.",
  },
];

// 7.1: no news at launch.
export const posts: Post[] = [];

// 10.1 / 10.2: to be adapted from the OGA Privacy, Cookies and Terms pages
// and approved by Kobby (10.5). Routes and footer links appear once added here.
export const legalPages: LegalPage[] = [];

export type SearchItem = {
  title: string;
  href: string;
  type: "update" | "sop" | "checklist";
  snippet: string;
  searchText: string;
  status: string;
  date: string;
};
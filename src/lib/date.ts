export function formatDate(date: string): string {
  if (!date) return "";
  const clean = date.includes("T") ? date.slice(0, 10) : date.trim();
  let d = new Date(`${clean}T00:00:00`);
  if (Number.isNaN(d.getTime())) {
    d = new Date(date);
  }
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

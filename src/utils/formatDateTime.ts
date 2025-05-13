export function formatWorkoutDate(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

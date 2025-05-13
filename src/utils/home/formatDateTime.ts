/**
 * Formats a date and slot time string
 * @param date - Date string like "2025-04-28"
 * @param slotTime - Time slot like "10:00 AM - 11:00 AM"
 * @returns Formatted date time string like "April 28, 10:00 AM"
 */
export const formatDateTime = (date: string, slotTime: string): string => {
  // Month names array
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // For ISO date format (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    try {
      // Split the date string by dash
      const parts = date.split("-");

      // Get the month (subtract 1 because months are 0-indexed in JS arrays)
      const monthIndex = parseInt(parts[1], 10) - 1;
      const monthName = monthNames[monthIndex];

      // Get the day (as a number)
      const day = parseInt(parts[2], 10);

      // Get the first part of the slot time and its period
      const timePart = slotTime.split("-")[0].trim();
      const period = slotTime.slice(-2);

      return `${monthName} ${day}, ${timePart} ${period}`;
    } catch {
      // Simply return the original date in case of any errors
      return date;
    }
  }

  // For UTC date-time format (YYYY-MM-DDTHH:MM:SS.sssZ)
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(date)) {
    try {
      const dateObj = new Date(date);
      const monthName = monthNames[dateObj.getMonth()];
      const day = dateObj.getDate();

      // Get the first part of the slot time and its period
      const timePart = slotTime.split("-")[0].trim();
      const period = slotTime.slice(-2);

      return `${monthName} ${day}, ${timePart} ${period}`;
    } catch {
      return date;
    }
  }

  // For traditional format or any other format
  const timePart = slotTime.split("-")[0].trim();
  const period = slotTime.slice(-2);

  return `${date}, ${timePart} ${period}`;
};

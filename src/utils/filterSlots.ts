// check how many slots are available for the current time.

import { homeSearchCard } from "../types/homeSearchCard";

export const filterSlotsHome = (
  coaches: homeSearchCard[]
): homeSearchCard[] => {
  const currentTime = new Date();
  const currentDate = currentTime.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  return coaches
    .map((coach) => {
      if (!coach.availableSlots || !coach.date) return null;

      // If the coach's date is in the future, keep all their slots
      if (coach.date > currentDate) {
        return coach;
      }

      // If the coach's date is today, filter their slots
      if (coach.date === currentDate) {
        const filteredSlots = coach.availableSlots.filter((slot) => {
          // Parse the slot time (format: "HH:MM-HH:MM AM/PM")
          const [timeRange, period] = slot.split(" ");
          const [startTime] = timeRange.split("-");
          const [hours, minutes] = startTime.split(":").map(Number);

          // Convert to 24-hour format
          let hour24 = hours;
          if (period === "PM" && hours !== 12) hour24 += 12;
          if (period === "AM" && hours === 12) hour24 = 0;

          // Create a Date object for the slot time
          const slotTime = new Date();
          slotTime.setHours(hour24, minutes, 0, 0);

          // Only keep slots that are in the future
          return slotTime > currentTime;
        });

        // If no slots remain after filtering, return null to remove this coach
        if (filteredSlots.length === 0) return null;

        return {
          ...coach,
          availableSlots: filteredSlots,
        };
      }

      // If the coach's date is in the past, remove them
      return null;
    })
    .filter((coach): coach is homeSearchCard => coach !== null); // Remove null entries
};


export const filterSlotsCoach = (slots: string[], date: string): string[] => {
  const currentTime = new Date();
  const currentDateStr = currentTime.toLocaleDateString(); 
  const inputDate = new Date(date);
  const inputDateStr = inputDate.toLocaleDateString();

  // Only filter slots if the date is today
  if (inputDateStr === currentDateStr) {
    return slots.filter((slot) => {
      const [timeRange, period] = slot.split(" ");
      const [startTime] = timeRange.split("-");
      const [hours, minutes] = startTime.split(":").map(Number);

      // Convert to 24-hour format
      let hour24 = hours;
      if (period === "PM" && hours !== 12) hour24 += 12;
      if (period === "AM" && hours === 12) hour24 = 0;

      // Create a Date object for the slot time
      const slotTime = new Date();
      slotTime.setHours(hour24, minutes, 0, 0);

      // Only keep slots that are in the future
      return slotTime > currentTime;
    });
  }

  // For all other dates, return all slots
  return slots;
};
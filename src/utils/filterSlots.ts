// check how many slots are available for the current time.

import { homeSearchCard } from "../types/homeSearchCard";

export const filterSlotsHome = (coaches: any[]): homeSearchCard[] => {
  const currentTime = new Date();
  const currentDate = currentTime.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  // Transform the coach data to match the homeSearchCard type
  return coaches
    .map((coach) => {
      // Skip if coach doesn't have slots
      if (!coach || !coach.slots || coach.slots.length === 0) return null;

      // Format slots as "HH:MM AM/PM - (HH+1):MM AM/PM"
      const availableSlots = coach.slots
        .filter((slot: any) => {
          // Only include available slots
          return slot.state === "available";
        })
        .map((slot: any) => {
          // Convert the ISO date strings to Date objects
          const startTime = new Date(slot.startTime);
          const endTime = new Date(slot.endTime);

          // Format the time in 12-hour format
          const startHour = startTime.getUTCHours();
          const startMinute = startTime.getUTCMinutes();
          const endHour = endTime.getUTCHours();
          const endMinute = endTime.getUTCMinutes();

          const startPeriod = startHour >= 12 ? "PM" : "AM";
          const endPeriod = endHour >= 12 ? "PM" : "AM";

          const formattedStartHour = startHour % 12 || 12;
          const formattedEndHour = endHour % 12 || 12;

          const formattedStartMinute = startMinute.toString().padStart(2, "0");
          const formattedEndMinute = endMinute.toString().padStart(2, "0");

          return `${formattedStartHour}:${formattedStartMinute} ${startPeriod}-${formattedEndHour}:${formattedEndMinute} ${endPeriod}`;
        });

      if (availableSlots.length === 0) return null;

      // Get the date from the first slot
      const slotDate = coach.slots[0].startDate.split("T")[0];

      // Transform coach data to homeSearchCard format
      return {
        id: coach._id || "",
        name: `${coach.firstName} ${coach.lastName}` || "",
        imageUrl: coach.base64encodedImage || "",
        rating: coach.rating?.toString() || "0",
        preferableActivity: coach.preferableActivity || "",
        summary: coach.target || "",
        motivationPitch: coach.summary || "",
        date: slotDate,
        availableSlots: availableSlots,
      };
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

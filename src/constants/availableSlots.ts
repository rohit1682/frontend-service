export interface Slot {
  date: string; // format: YYYY-MM-DD
  startTime: string; // format: HH:mm
  endTime: string;   // format: HH:mm
}

export interface AvailableSlot {
  coachId: string;
  type: string;      // workout type e.g. "Yoga"
  time: string;      // duration e.g. "1 h"
  slots: Slot[];
}

const availableSlots: AvailableSlot[] = [
  {
    coachId: '582846d5c951184d705b65d1', // Kristin Watson
    type: "Yoga",
    time: "1 h",
    slots: [
      { date: '2025-04-14', startTime: '09:00', endTime: '10:00' },
      { date: '2025-04-14', startTime: '11:00', endTime: '12:00' },
      { date: '2025-04-14', startTime: '14:00', endTime: '15:00' }
    ]
  },
  {
    coachId: '73a21c84e3b74567893bdf12', // Wade Warren
    type: "Yoga",
    time: "1 h",
    slots: [
      { date: '2025-04-15', startTime: '10:00', endTime: '11:00' },
      { date: '2025-04-16', startTime: '12:00', endTime: '13:00' },
      { date: '2025-04-16', startTime: '15:00', endTime: '16:00' }
    ]
  },
  {
    coachId: '91d52f36a74b1183942efc76', // Cameron Williamson
    type: "Yoga",
    time: "1 h",
    slots: [
      { date: '2025-04-18', startTime: '09:30', endTime: '10:30' },
      { date: '2025-04-18', startTime: '13:00', endTime: '14:00' }
    ]
  },
  {
    coachId: '8a9b7c6d5e4f3210987g6h5j4', // Jenny Wilson
    type: "Yoga",
    time: "1 h",
    slots: [
      { date: '2025-04-19', startTime: '08:00', endTime: '09:00' },
      { date: '2025-04-19', startTime: '10:00', endTime: '11:00' }
    ]
  },
  {
    coachId: '123456789abcdef123456789', // Jacob Jones
    type: "Yoga",
    time: "1 h",
    slots: [
      { date: '2025-04-21', startTime: '09:00', endTime: '10:00' },
      { date: '2025-04-21', startTime: '11:00', endTime: '12:00' }
    ]
  },
  {
    coachId: 'abcdef123456789abcdef1234', // Guy Hawkins
    type: "Yoga",
    time: "1 h",
    slots: [
      { date: '2025-04-22', startTime: '07:30', endTime: '08:30' },
      { date: '2025-04-22', startTime: '10:30', endTime: '11:30' }
    ]
  },
  {
    coachId: 'z9y8x7w6v5u4t3s2r1q0p9o8n7', // Brooklyn Simmons
    type: "Yoga",
    time: "1 h",
    slots: [
      { date: '2025-04-24', startTime: '09:00', endTime: '10:00' },
      { date: '2025-04-25', startTime: '14:00', endTime: '15:00' }
    ]
  },
  {
    coachId: 'x5y6z7a8b9c0d1e2f3g4h5i6j7k8', // Bessie Cooper
    type: "Yoga",
    time: "1 h",
    slots: [
      { date: '2025-04-26', startTime: '08:30', endTime: '09:30' },
      { date: '2025-04-26', startTime: '11:30', endTime: '12:30' }
    ]
  }
];

export default availableSlots;

type BookingDetails = {
    type: string;
    duration: string;
    date: string;
  };
  
  type SearchResults = {
    id: number;
    coachName: string;
    title: string;
    rating: number;
    description: string;
    availableSlots: string[];
    bookingDetails: BookingDetails;
    image: string;
  };

export const searchResults: SearchResults[] = [
    {
      id: 1,
      coachName: "Kristin Waston",
      title: "Certified Personal Yoga Trainer",
      rating: 4.9,
      description: "Yoga expert dedicated to crafting personalized workout plans that align with your goals.",
      availableSlots: ["10:30 - 11:30 AM", "3:00 - 4:00 PM", "4:00 - 5:00 PM"],
      bookingDetails: {
        type: "Yoga",
        duration: "1h",
        date: "July 9, 10:00 AM"
      },
      image: "./images/avatar.png"
    },
    {
      id: 2,
      coachName: "Derek White",
      title: "Strength & Conditioning Coach",
      rating: 4.8,
      description: "Helps athletes reach peak performance with personalized strength training programs.",
      availableSlots: ["9:00 - 10:00 AM", "1:00 - 2:00 PM"],
      bookingDetails: {
        type: "Strength Training",
        duration: "1h",
        date: "July 10, 9:00 AM"
      },
      image: "/images/avatar.png"
    },
    {
      id: 3,
      coachName: "Emily Johnson",
      title: "Pilates Instructor",
      rating: 4.7,
      description: "Focused on core strength and flexibility using modern pilates techniques.",
      availableSlots: ["11:00 - 12:00 PM", "2:00 - 3:00 PM"],
      bookingDetails: {
        type: "Pilates",
        duration: "1h",
        date: "July 11, 2:00 PM"
      },
      image: "/images/avatar.png"
    },
    {
      id: 4,
      coachName: "Michael Lee",
      title: "HIIT & Cardio Specialist",
      rating: 4.6,
      description: "Pushes you to your limit with fast-paced, calorie-burning workouts.",
      availableSlots: ["6:00 - 7:00 AM", "5:00 - 6:00 PM"],
      bookingDetails: {
        type: "HIIT",
        duration: "1h",
        date: "July 12, 6:00 AM"
      },
      image: "/images/avatar.png"
    },
    {
      id: 5,
      coachName: "Sophia Martinez",
      title: "Dance Fitness Trainer",
      rating: 4.9,
      description: "Blends fun and fitness with energetic dance-based workout sessions.",
      availableSlots: ["10:00 - 11:00 AM", "4:00 - 5:00 PM"],
      bookingDetails: {
        type: "Dance Fitness",
        duration: "1h",
        date: "July 13, 4:00 PM"
      },
      image: "/images/avatar.png"
    },
    {
      id: 6,
      coachName: "James Patel",
      title: "CrossFit Level 2 Coach",
      rating: 4.5,
      description: "Specialized in high-intensity functional training with CrossFit methods.",
      availableSlots: ["7:00 - 8:00 AM", "6:00 - 7:00 PM"],
      bookingDetails: {
        type: "CrossFit",
        duration: "1h",
        date: "July 14, 7:00 AM"
      },
      image: "/images/avatar.png"
      
    },
    {
      id: 7,
      coachName: "Aisha Khan",
      title: "Zumba & Aerobics Coach",
      rating: 4.8,
      description: "Certified instructor delivering energetic group Zumba classes.",
      availableSlots: ["8:00 - 9:00 AM", "5:00 - 6:00 PM"],
      bookingDetails: {
        type: "Zumba",
        duration: "1h",
        date: "July 15, 8:00 AM"
      },
      image: "/images/avatar.png"
    },
    {
      id: 8,
      coachName: "Ryan Blake",
      title: "Bodybuilding Expert",
      rating: 4.7,
      description: "Helps build muscle mass and guides you through cutting/bulking cycles.",
      availableSlots: ["12:00 - 1:00 PM", "7:00 - 8:00 PM"],
      bookingDetails: {
        type: "Bodybuilding",
        duration: "1h",
        date: "July 16, 12:00 PM"
      },
      image: "/images/avatar.png"
    }
  ];
  

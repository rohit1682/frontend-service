export type Coach = {
    Cid: any;
    id: number;
    coachName: string;
    title: string;
    rating: number;
    description: string;
    availableSlots: string[]; 
    bookingDetails: {
      type: string; 
      duration: string;
      date: string;
      time: string;
    };
    image: string;
  };
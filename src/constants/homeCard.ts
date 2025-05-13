type BookingDetails = {
    type: string;
    duration: string;
    date: string;
  };
  
  type Coach = {

    id: number,
    Cid:string,
    coachName: string;
    title: string;
    rating: number;
    description: string;
    availableSlots: string[];
    bookingDetails: BookingDetails;
    image: string;
  };

  const workoutData: Coach[] = [
    {
      id:1,
      Cid: '582846d5c951184d705b65d1',
      coachName: "Kristin Waston",
      title: "Certified Personal Yoga Trainer",
      rating: 4.96,
      description: "Yoga expert dedicated to crafting personalized workout plans that align with your goals.",
      availableSlots: ["10:30 - 11:30 AM", "3:00 - 4:00 PM", "4:00 - 5:00 PM"],
      bookingDetails: {
        type: "Yoga",
        duration: "1h",
        date: "April 24, 10:00 AM"
      },
      image: "/images/avatar.png"
    },
    {
      id:2,
      Cid: '73a21c84e3b74567893bdf12',
      coachName: "Wade Warren",
      title: "Climbing Coach",
      rating: 4.8,
      description: "Scale new challenges with our Climbing Coach. Get instruction to improve climbing skills.",
      availableSlots: ["9:00 - 10:00 AM", "1:00 - 2:00 PM"],
      bookingDetails: {
        type: "Climbing Coach",
        duration: "1h",
        date: "April 19, 9:00 AM"
      },
      image: "/images/coaches/image2.png"
    },
    {
      id:3,
      Cid: '91d52f36a74b1183942efc76',
      coachName: "Cameron Williamson",
      title: "Strength Coach",
      rating: 5.0,
      description: "Achieve peak performance with our Strength Coach, a specialist in building muscle and increasing power.",
      availableSlots: ["11:00 - 12:00 PM", "2:00 - 3:00 PM"],
      bookingDetails: {
        type: "Strength Coach",
        duration: "1h",
        date: "April 18, 6:00 PM"
      },
      image: "/images/coaches/image3.png"
    },
    {
      id:4,
      Cid: '8a9b7c6d5e4f3210987g6h5j4',
      coachName: "Jenny Wilson",
      title: "Certified personal yoga trainer",
      rating: 4.6,
      description: "A Yoga Expert dedicated to crafting personalized workout plans that align with your goals",
      availableSlots: ["6:00 - 7:00 AM", "5:00 - 6:00 PM"],
      bookingDetails: {
        type: "Yoga",
        duration: "1h",
        date: "April 16, 6:00 AM"
      },
      image: "/images/coaches/image4.png"
    },
    {
      id:5,
      Cid: "123456789abcdef123456789",
      coachName: "Jacob Jones",
      title: "Climbing Coach",
      rating: 4.6,
      description: "Scale new challenges with our Climbing Coach. Get instruction to improve climbing skills.",
      availableSlots: ["10:00 - 11:00 AM", "4:00 - 5:00 PM"],
      bookingDetails: {
        type: "Climbing Coach",
        duration: "1h",
        date: "April 16, 4:00 PM"
      },
      image: "/images/coaches/image5.png"
    },
    {
      id:6,
      Cid: 'abcdef123456789abcdef1234',
      coachName: "Guy Hawkins",
      title: "Functional Fitness Trainer",
      rating: 4.89,
      description: "Transform your fitness with our Functional Fitness Trainer, who focuses on exercises that mimic real-life movements",
      availableSlots: ["7:00 - 8:00 AM", "6:00 - 7:00 PM"],
      bookingDetails: {
        type: "Fitness Trainer",
        duration: "1h",
        date: "April 15, 7:00 AM"
      },
      image: "/images/coaches/image6.png"
    },
    {
      id:7,
      Cid: 'z9y8x7w6v5u4t3s2r1q0p9o8n7',
      coachName: "Brooklyn Simmons",
      title: "Strength Coach",
      rating: 4.8,
      description: "Achieve peak performance with our Strength Coach, a specialist in building muscle and increasing power.",
      availableSlots: ["8:00 - 9:00 AM", "5:00 - 6:00 PM"],
      bookingDetails: {
        type: "Strength Coach",
        duration: "1h",
        date: "April 15, 8:00 AM"
      },
      image: "/images/coaches/image7.png"
    },
    {
      id:8,
      Cid: 'x5y6z7a8b9c0d1e2f3g4h5i6j7k8',
      coachName: "Bessie Cooper",
      title: "Bodybuilding Expert",
      rating: 4.7,
      description: "Helps build muscle mass and guides you through cutting/bulking cycles.",
      availableSlots: ["12:00 - 1:00 PM", "7:00 - 8:00 PM"],
      bookingDetails: {
        type: "Bodybuilding",
        duration: "1h",
        date: "April 16, 6:00 PM"
      },
      image: "/images/coaches/image8.png"
    }
  ];
  
export default workoutData;



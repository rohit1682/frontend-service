export interface CoachData {
    id: string;
    imageUrl: string;
    name: string;
    rating: string;
    summary: string;
    about: string;
    specialization: string[];
    certificates: {
      name: string;
      link: string;
    }[];
    buttons: {
      primary: string;
      secondary: string;
    };
  }
  
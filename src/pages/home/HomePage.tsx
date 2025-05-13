/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { homeSearchCard } from "../../types/homeSearchCard";
import { CoachIdNameMap } from "../../constants/coachIdNameMap";
import Calendar from "../../components/inputField/calendar";
import Dropdown from "../../components/inputField/Dropdowns";
import Button from "../../components/button/Button";
import CoachCard from "../../components/workoutCard/workoutCard";
import coachData from "../../constants/homeCard";
import NoWorkout from "../../components/workoutCard/Noworkout";
import { DropdownProvider } from "../../context/DropdownContext";
import TitleBar from "../../layouts/MainLayout/components/TitleBar";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../api/userApi";
import WorkoutLoader from "../../components/loaders/WorkoutLoader";
import { getAvailableWorkouts, bookWorkout } from "../../api/workoutsApi";
import BookingConfirmationModal from "../../components/modals/BookingConfirmationModal";
import { useToast } from "../../hooks/useToast";
import { filterSlotsHome } from "../../utils/filterSlots";

const HomePage = () => {
  const { showToast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [formData, setFormData] = useState({
    sport: "All",
    time: "All",
    coach: "All",
  });
  const [selectedWorkout, setSelectedWorkout] = useState<{
    coach: homeSearchCard;
    dateTime: string;
    selectedSlot: string;
    originalDateTime: string;
  } | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const { isLoggedIn, userData, logout } = useAuth();
  const [filteredCoaches, setFilteredCoaches] = useState(coachData);
  const [apiData, setApiData] = useState<homeSearchCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    if (!userData?.sub) return;

    try {
      await getUserProfile(userData.sub);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [userData?.sub]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Add new useEffect for initial search
  useEffect(() => {
    const initialSearch = async () => {
      setSearchInitiated(true); // Set this before starting the search to show loader
      const searchParams = {
        date: getFormattedDate(selectedDate),
        activity: formData.sport === "All" ? "" : formData.sport,
        time:
          formData.time === "All" ? "" : convertTo24HourFormat(formData.time),
        coachId: formData.coach === "All" ? "" : formData.coach,
      };

      try {
        setIsLoading(true);
        const res = await getAvailableWorkouts(searchParams);
        // Transform the API response using filterSlotsHome
        const formattedData = filterSlotsHome(res);
        setApiData(formattedData);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        showToast(
          "error",
          "Search Failed",
          "Failed to fetch workouts. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    initialSearch();
  }, []); // Empty dependency array to run only once on mount

  function convertTo24HourFormat(time12h: string): string {
    console.log("time12h", time12h);
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "AM") {
      if (hours === 12) hours = 0;
    } else if (modifier === "PM") {
      if (hours !== 12) hours += 12;
    }

    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");

    return `${hh}:${mm}`;
  }

  const getFormattedDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    const getData = async () => {
      const searchParams = {
        date: getFormattedDate(selectedDate),
        activity: formData.sport === "All" ? "" : formData.sport,
        time:
          formData.time === "All" ? "" : convertTo24HourFormat(formData.time),
        coachId: formData.coach === "All" ? "" : formData.coach,
      };

      try {
        setIsLoading(true);
        const res = await getAvailableWorkouts(searchParams);
        // Transform the API response using filterSlotsHome
        const formattedData = filterSlotsHome(res);
        setApiData(formattedData);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
    e.preventDefault();

    // Format the selected date to match the format in the coach data
    const selectedDateStr = selectedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    const filtered = coachData.filter((coach) => {
      // Extract date part without time from coach data (e.g., "April 9" from "April 9, 10:00 AM")
      const coachDate = coach.bookingDetails.date.split(",")[0].trim();

      // Extract time part from coach data (e.g., "10:00 AM" from "April 9, 10:00 AM")
      const coachTime = coach.bookingDetails.date.split(",")[1]?.trim() || "";

      // Check if sport matches (if "All" is selected, include all sports)
      const matchesSport =
        formData.sport === "All" ||
        coach.bookingDetails.type === formData.sport;

      // Check if time matches (if "All" is selected, include all times)
      const matchesTime =
        formData.time === "All" || coachTime === formData.time;

      // Check if coach matches (if "All" is selected, include all coaches)
      const matchesCoach =
        formData.coach === "All" || coach.coachName === formData.coach;

      // Check if date matches
      const matchesDate = coachDate === selectedDateStr;

      return matchesSport && matchesTime && matchesCoach && matchesDate;
    });

    setFilteredCoaches(filtered);
    setSearchInitiated(true);
  };

  const headingTitle = () => {
    if (!isLoggedIn) return "Welcome!";
    return `Welcome! ${userData?.firstName} ${userData?.lastName}`;
  };

  const handleBookWorkout = (
    coach: homeSearchCard,
    dateTime: string,
    selectedSlot: string,
    originalDateTime: string
  ) => {
    setSelectedWorkout({
      coach,
      dateTime,
      selectedSlot,
      originalDateTime,
    });
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedWorkout || !userData) return;

    try {
      setIsBooking(true);

      // Parse the selected slot to get the time
      const slotParts = selectedWorkout.selectedSlot.split(" ");
      const timeRange = slotParts[0];
      const period = slotParts[1].split("-")[0];

      // Get the time from the slot (e.g., "10:00" from "10:00 AM-11:00 AM")
      const timeSlot = timeRange.split("-")[0];

      await bookWorkout({
        clientId: userData.sub,
        coachId: selectedWorkout.coach.id || "",
        date: selectedWorkout.originalDateTime,
        timeSlot: `${timeSlot} ${period}`, // Format as "10:00 AM"
      });

      // Refresh the available slots for all coaches
      const updatedCoaches = await Promise.all(
        filteredCoaches.map(async (coach) => {
          if (coach.id?.toString() === selectedWorkout.coach.id?.toString()) {
            // Remove the booked slot from the coach's available slots
            const updatedSlots = coach.availableSlots.filter(
              (slot) => slot !== selectedWorkout.selectedSlot
            );
            return { ...coach, availableSlots: updatedSlots };
          }
          return coach;
        })
      );

      // Update the filtered coaches list
      setFilteredCoaches(updatedCoaches);

      //reload the page
      window.location.reload();

      showToast(
        "success",
        "Booking Successful",
        "Your workout has been booked successfully!"
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to book workout. Please try again.";

      showToast("error", "Booking Failed", errorMessage);
    } finally {
      setIsBooking(false);
      setIsBookingModalOpen(false);
      setSelectedWorkout(null);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSearchInitiated(false);
  };

  return (
    <>
      <TitleBar title={headingTitle()} />
      <div className="p-4 md:p-6 max-w-[1560px] mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl leading-tight font-medium mb-2 text-[#323A3A]">
          Achieve your fitness goals! <br />
          <img
            src="images/Underline.png"
            className="lg:pl-50 hidden lg:block"
            alt="Underline decoration"
          />
        </h1>
        <div className="flex flex-row gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl leading-tight font-medium mb-2 text-[#323A3A]">
            Find a workout and book today.
          </h1>
          <img
            src="images/Arrow.png"
            className="hidden lg:block"
            alt="Arrow decoration"
          />
        </div>

        <p className="font-extralight leading-loose mb-4">BOOK A WORKOUT</p>
        <DropdownProvider>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-screen-xl mx-auto">
              <div className="md:col-span-3">
                <Dropdown
                  id="sport"
                  legendText="Type of sport"
                  htmlFor="SportSelector"
                  children={[
                    "All",
                    "Yoga",
                    "Climbing",
                    "Strength",
                    "Fitness",
                    "CrossFit",
                    "Zumba",
                    "Bodybuilding",
                  ]}
                  value={formData.sport}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, sport: val }))
                  }
                />
              </div>

              <div className="md:col-span-2">
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={handleDateChange}
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Dropdown
                  id="time"
                  legendText="Time"
                  htmlFor="TimeSelector"
                  children={[
                    "All",
                    "6:00 AM",
                    "7:00 AM",
                    "8:00 AM",
                    "9:00 AM",
                    "10:00 AM",
                    "4:00 PM",
                    "5:00 PM",
                    "6:00 PM",
                    "7:00 PM",
                  ]}
                  value={formData.time}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, time: val }))
                  }
                />
              </div>

              <div className="md:col-span-3">
                <Dropdown
                  id="coach"
                  legendText="Coach"
                  htmlFor="CoachSelector"
                  children={CoachIdNameMap.map((coach) => coach.name)}
                  value={
                    CoachIdNameMap.find(
                      (option) => option.id === formData.coach
                    )?.name || "All"
                  }
                  onChange={(val) => {
                    const selectedCoach = CoachIdNameMap.find(
                      (coach) => coach.name === val
                    );
                    setFormData((prev) => ({
                      ...prev,
                      coach: selectedCoach ? selectedCoach.id : "All",
                    }));
                  }}
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  variant="primary"
                  className="w-full h-12 lg:h-14 mt-2"
                  type="submit"
                >
                  Find Workout
                </Button>
              </div>
            </div>
          </form>
        </DropdownProvider>

        {selectedWorkout && (
          <BookingConfirmationModal
            isOpen={isBookingModalOpen}
            onClose={() => {
              setIsBookingModalOpen(false);
              setSelectedWorkout(null);
            }}
            onConfirm={handleConfirmBooking}
            isLoading={isBooking}
            coach={{
              Cid: selectedWorkout.coach.id || "",
              id: parseInt(selectedWorkout.coach.id || "0"),
              coachName: selectedWorkout.coach.name || "",
              title: selectedWorkout.coach.preferableActivity || "",
              image: selectedWorkout.coach.imageUrl || "",
              rating: parseFloat(selectedWorkout.coach.rating || "0"),
              description: selectedWorkout.coach.summary || "",
              availableSlots: selectedWorkout.coach.availableSlots || [],
              bookingDetails: {
                type: selectedWorkout.coach.preferableActivity || "",
                duration: "1h",
                date: selectedWorkout.dateTime,
                time: selectedWorkout.selectedSlot,
              },
            }}
          />
        )}

        {searchInitiated && (
          <div className="min-h-screen rounded-lg">
            <p className="font-extralight mb-4 uppercase">Available Workouts</p>
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px] w-full">
                <WorkoutLoader text="Searching workouts..." size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {apiData.length > 0 ? (
                  apiData.map((coach) => (
                    <CoachCard
                      key={coach.id}
                      coach={coach}
                      dateTime={selectedDate.toLocaleDateString("en-CA")}
                      onBook={handleBookWorkout}
                    />
                  ))
                ) : (
                  <NoWorkout />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;

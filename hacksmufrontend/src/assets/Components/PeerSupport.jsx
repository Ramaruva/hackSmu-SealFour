import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { getRequest } from "../../api/axiosInstance";

// Dummy experts data
const experts = [
  { id: 1, name: "Dr. Emily Clark", specialty: "Mental Health" },
  { id: 2, name: "Dr. John Doe", specialty: "Stress Management" },
  { id: 3, name: "Dr. Sarah Lee", specialty: "Anxiety Counseling" },
];

const PeerSupportPage = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const[expertsData,setExpertsData] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const getDoctorsData = async () => {
    try {
      const data = await getRequest("doctors");
      console.log(data.data);
      setExpertsData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);
  // Dummy available time slots
  const availableTimes = [
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "3:00 PM",
    "5:00 PM",
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
    setIsBooked(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setIsBooked(false);
  };

  const handleBooking = () => {
    if (selectedTime) {
      setIsBooked(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">
            Peer Support Services
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Select a peer mentor or expert, and book a session with them below.
          </p>
        </div>

        {/* List of Available Experts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {expertsData&&expertsData.map((expert) => (
            <div
              key={expert?.doctorId}
              className={`bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition ${
                selectedExpert && selectedExpert.doctorId === expert.doctorId
                  ? "bg-green-200"
                  : ""
              }`}
              onClick={() => setSelectedExpert(expert)}
            >
              <h2 className="text-2xl font-semibold">{expert.name}</h2>
              <p className="text-gray-600">{expert.specialty}</p>
            </div>
          ))}
        </div>

        {/* Show Booking Component if an expert is selected */}
        {selectedExpert && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Choose Your Appointment Date with {selectedExpert.name}
              </h2>
              <div className="max-w-md mx-auto">
                <Calendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="w-full"
                />
              </div>
            </div>

            {/* Available Times and Booking */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Available Times for {format(selectedDate, "MMMM do, yyyy")}
              </h2>
              <ul className="text-center text-lg mb-4">
                {availableTimes.map((time) => (
                  <li
                    key={time}
                    className={`p-2 my-2 rounded cursor-pointer hover:bg-gray-200 ${
                      selectedTime === time ? "bg-green-200" : ""
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <button
                  className="bg-green-600 text-white px-6 py-2 mt-4 rounded-md hover:bg-green-700 transition duration-200"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </button>
                {isBooked && (
                  <p className="text-green-600 mt-4">
                    Your session with {selectedExpert.name} is booked for{" "}
                    {selectedTime} on {format(selectedDate, "MMMM do, yyyy")}!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center mt-12">
          <h2 className="text-3xl font-semibold text-blue-600">
            What Students Are Saying
          </h2>
          <p className="text-lg text-gray-700 mt-4 italic">
            "Peer support helped me navigate the toughest semester of my life."
          </p>
          <p className="text-lg text-gray-700 mt-2 italic">
            "I found a community that understands me."
          </p>
        </div>

        {/* Crisis Resources Section */}
        <div className="bg-yellow-100 p-6 mt-12 text-center rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-600">
            Need Immediate Help?
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            If you're in crisis, reach out to our mental health professionals or
            the national hotline for urgent help.
          </p>
          <p className="text-lg text-gray-700 mt-2">
            Call: <strong>+1-800-273-TALK (8255)</strong>
          </p>
          <p className="text-lg text-gray-700 mt-2">
            SMU Crisis Line: <strong>+1-123-456-7890</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeerSupportPage;

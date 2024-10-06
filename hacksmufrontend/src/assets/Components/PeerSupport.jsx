import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { getRequest } from "../../api/axiosInstance";
import VideoChat from './VideoChat';  // Import VideoChat Component
import { getLocalItem } from "../../localStorage";

const PeerSupportPage = ({socket,peerId}) => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [expertsData, setExpertsData] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [startVideoCall, setStartVideoCall] = useState(false); // new state for video call

  const getDoctorsData = async () => {
    try {
      const data = await getRequest("doctors");
      setExpertsData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

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

  const handleBooking = () => {
    if (selectedTime) {
      setIsBooked(true);
    }
  };

  const initateCall =()=>{
    const userData = getLocalItem("userdetails");
    const userid = userData?._id;
    if(userid&&selectedExpert){
        socket.emit('callUser', { fromUserId: userid, toUserId:  selectedExpert.userId }); 
        setStartVideoCall(true);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">
            Peer Support Services
          </h1>
        </div>

        {/* List of Available Experts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {expertsData &&
            expertsData.map((expert) => (
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
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full"
              />
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
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </li>
                ))}
              </ul>
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

              {/* Start Video Call Button */}
              <button
                className="bg-blue-600 text-white px-6 py-2 mt-4 ml-10 rounded-md hover:bg-blue-700 transition duration-200"
                onClick={initateCall}
              >
                Start Video Call
              </button>

              {/* Render VideoChat component if video call is started */}
              {startVideoCall && (
                <VideoChat peerIdToCall={peerId} setStartVideoCall={setStartVideoCall} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerSupportPage;

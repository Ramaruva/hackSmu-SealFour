import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);  // Placeholder for appointments data
  const [selectedDate, setSelectedDate] = useState(new Date());  // For calendar selection
  const [availability, setAvailability] = useState([]);  // For doctor availability

  useEffect(() => {
    // Fetch doctor's appointments from an API or server here
    const fetchAppointments = async () => {
      const response = await fetch('/api/doctor/appointments');  // Example API call
      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  // Handle date changes from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Add logic to update availability or block slots
  };

  // Example: Mock data for appointments
  const upcomingAppointments = [
    { id: 1, patient: 'John Doe', time: '10:00 AM', date: '2024-10-10', type: 'Mental Health' },
    { id: 2, patient: 'Jane Smith', time: '11:30 AM', date: '2024-10-11', type: 'Stress Management' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Doctor Dashboard</h1>

      {/* Appointments Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
        <table className="min-w-full bg-white rounded-md shadow-md">
          <thead>
            <tr className="border-b">
              <th className="p-4">Patient Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Type</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAppointments.map((appt) => (
              <tr key={appt.id} className="border-b">
                <td className="p-4">{appt.patient}</td>
                <td className="p-4">{appt.date}</td>
                <td className="p-4">{appt.time}</td>
                <td className="p-4">{appt.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calendar for Availability Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Update Your Availability</h2>
        <Calendar
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full"
        />
      </div>

      {/* Button to save availability changes */}
      <div className="text-center">
        <button
          onClick={() => console.log('Save Availability Changes')}
          className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;

import React, { useState } from 'react';
import { Chart } from 'react-chartjs-2'; // Import Chart.js
import 'chart.js/auto'; // Automatically register chart components

const FitnessTracker = () => {
  const [stepsData] = useState({ daily: 5000, weekly: 35000, monthly: 150000 }); // Dummy steps data
  const [heartRateData] = useState([70, 72, 75, 73, 76, 78, 77, 75]); // Dummy heart rate data (in bpm)

  // Data for Pie Chart (steps tracking)
  const stepsChartData = {
    labels: ['Daily Steps', 'Weekly Steps', 'Monthly Steps'],
    datasets: [
      {
        data: [stepsData.daily, stepsData.weekly, stepsData.monthly],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
      },
    ],
  };

  // Data for Line Chart (heart rate tracking)
  const heartRateChartData = {
    labels: ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM', '12 AM'], // Time intervals
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: heartRateData, // Dummy heart rate data
        borderColor: '#FF5252',
        backgroundColor: 'rgba(255, 82, 82, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Main Grid Layout */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Section on the left */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src="https://i.pinimg.com/originals/6f/92/57/6f9257527b7c844c8ed947c48e211d45.jpg"
            alt="User Avatar"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700">Welcome, Mustang!</h2>
          <p className="text-md text-gray-600">Let's hit your fitness goals today!</p>
        </div>

        {/* Charts Section: 2 Columns for Side-by-Side Layout */}
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Steps Tracking - Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Steps Tracking</h2>
            <div className="w-full max-w-sm mx-auto">
              <Chart type="pie" data={stepsChartData} height={200} width={200} />
            </div>
          </div>

          {/* Heartbeat Tracking - Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Heartbeat Tracking</h2>
            <div className="w-full max-w-sm mx-auto">
              <Chart type="line" data={heartRateChartData} height={200} width={200} />
            </div>
          </div>
        </div>
      </div>

      {/* SMU Message */}
      <div className="bg-yellow-100 p-6 mt-12 text-center rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-yellow-600">SMU Fitness Support</h2>
        <p className="text-lg text-gray-700 mt-4">
          Stay healthy and active with SMU's state-of-the-art fitness facilities. For assistance, reach out to the SMU wellness center.
        </p>
        <button
          className="bg-yellow-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-yellow-600 transition duration-200"
          onClick={() => window.open('https://smu.edu')}
        >
          Visit SMU Wellness
        </button>
      </div>

      {/* Additional Resources */}
      <div className="bg-blue-100 p-8 mt-12 text-center rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-blue-600">Additional Fitness Resources</h2>
        <p className="text-lg text-gray-700 mt-4">
          Discover more fitness resources, tips, and guides from SMU's fitness programs.
        </p>
        <button
          className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={() => window.open('https://smu.campuswell.com/')}
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default FitnessTracker;

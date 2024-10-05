import React from 'react';

const MentalHealth = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">SMU Mental Health & Wellness</h1>
        <p className="text-lg text-gray-700 mt-4">
          Supporting your mental health with resources, counseling, and peer support.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Teletherapy */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">On-Demand Teletherapy</h2>
          <p className="text-gray-600 mb-6">
            Connect with a licensed therapist for free through SMU Teletherapy, anytime, anywhere.
          </p>
          <button
            onClick={() => window.open('https://www.smu.edu/studentaffairs/drbobsmithhealthcenter/counseling-services/mentalhealthapps/smu-teletherapy')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Get Teletherapy Now
          </button>
        </div>

        {/* Mental Health Apps */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Free Mental Health Apps</h2>
          <p className="text-gray-600 mb-6">
            Access free mental health apps like WellTrack to manage your mental well-being and track your mood.
          </p>
          <button
            onClick={() => window.open('https://www.smu.edu/studentaffairs/drbobsmithhealthcenter/counseling-services/mentalhealthapps')}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Explore Apps
          </button>
        </div>

        {/* Peer Support Network */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Peer Support Network</h2>
          <p className="text-gray-600 mb-6">
            Join a 24/7 online peer support network via TogetherAll for anonymous mental health support.
          </p>
          <button
            onClick={() => window.open('https://account.v2.togetherall.com/')}
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition duration-200"
          >
            Join Peer Support
          </button>
        </div>

        {/* Workshops & Resources */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Workshops & Resources</h2>
          <p className="text-gray-600 mb-6">
            Access mental health workshops, videos, and blog articles that provide tips on stress management and more.
          </p>
          <button
            onClick={() => window.open('https://smu.campuswell.com/')}
            className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition duration-200"
          >
            Explore Resources
          </button>
        </div>
      </div>

      {/* Crisis Support */}
      <div className="bg-red-100 p-8 mt-12 text-center rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-red-600">In Crisis?</h2>
        <p className="text-lg text-gray-700 mt-4">
          If you’re in an immediate crisis, contact SMU’s 24/7 on-call counselor or dial 911 for emergencies.
        </p>
        <p className="mt-4">
          <span className="font-semibold">On-Call Counselor:</span> (214) 768-2277 <br />
          <span className="font-semibold">National Suicide Prevention Lifeline:</span> 1-800-273-8255
        </p>
      </div>
    </div>
  );
};

export default MentalHealth;

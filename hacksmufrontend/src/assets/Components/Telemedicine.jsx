import React from 'react';

const TelemedicinePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Telemedicine Services</h1>
          <p className="text-lg text-gray-700 mt-4">
            Connect with healthcare professionals anytime, anywhere through our telemedicine services.
          </p>
        </div>

        {/* Grid Layout for Telemedicine Providers and Helpline Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Telemedicine Providers Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">SMU Telemedicine Providers</h2>
            <p className="text-gray-700">
              SMU has partnered with leading telemedicine providers to offer round-the-clock services to students.
              You can access the following telemedicine services:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li><a href="https://smu.edu/telemedicine" className="text-blue-600 hover:underline">SMU Telemedicine Portal</a></li>
              <li><a href="https://smu.edu/studentaffairs" className="text-blue-600 hover:underline">Student Affairs Telehealth</a></li>
              <li><a href="https://campuswell.com/telemedicine" className="text-blue-600 hover:underline">CampusWell Telemedicine</a></li>
            </ul>
          </div>

          {/* Helpline and Contact Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Helpline & Contact Info</h2>
            <p className="text-gray-700">
              If you need immediate assistance or help, please reach out to the following helplines:
            </p>
            <ul className="mt-4 text-gray-600">
              <li><strong>General Inquiries:</strong> +1 (123) 456-7890</li>
              <li><strong>Health Center:</strong> +1 (987) 654-3210</li>
              <li><strong>Mental Health Support:</strong> +1 (555) 123-4567</li>
              <li><strong>Emergency Line:</strong> 911</li>
              <li><strong>Email:</strong> <a href="mailto:healthservices@smu.edu" className="text-blue-600 hover:underline">healthservices@smu.edu</a></li>
            </ul>
          </div>
        </div>

        {/* Live Consultation Button */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center mb-8">
          <h2 className="text-2xl font-semibold text-blue-600">Schedule a Live Consultation</h2>
          <p className="text-lg text-gray-700 mt-4">
            Need to speak with a healthcare provider right away? Schedule a live telemedicine consultation below.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={() => alert('Live consultation feature coming soon!')}
          >
            Start Live Consultation
          </button>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Is telemedicine secure?</h3>
            <p className="text-gray-700">
              Yes, SMU’s telemedicine services use encrypted and secure platforms to protect your privacy and medical information.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">How can I access telemedicine?</h3>
            <p className="text-gray-700">
              You can access telemedicine services via the SMU Telemedicine Portal or CampusWell. Just sign in with your student credentials.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">What services are available through telemedicine?</h3>
            <p className="text-gray-700">
              You can receive medical consultations, follow-ups, prescriptions, mental health services, and more through telemedicine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicinePage;

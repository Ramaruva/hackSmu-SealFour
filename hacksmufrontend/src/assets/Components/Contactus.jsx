import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can handle the form submission here, e.g., sending the data to an API
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">Contact Us</h1>
          <p className="text-lg text-gray-700 mt-4">
            We are here to assist you! Please fill out the form below or reach out using the provided contact details.
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm text-gray-600">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions, feel free to contact us via phone, email, or visit our office at the address below.
            </p>
            <ul className="text-lg mb-4">
              <li className="mb-2">
                <strong>Phone:</strong> +1-123-456-7890
              </li>
              <li className="mb-2">
                <strong>Email:</strong> contact@yourdomain.com
              </li>
              <li className="mb-2">
                <strong>Address:</strong> 123 University Ave, Suite 400, City, State, Zip
              </li>
              <li className="mb-2">
                <strong>Office Hours:</strong> Mon-Fri 9 AM - 5 PM
              </li>
            </ul>

            {/* Google Map Embed (optional) */}
            <div className="mt-8">
              <iframe
                className="w-full h-64"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.4564602876516!2d-122.40071908468118!3d37.78601167975678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808a259f3f05%3A0x8c2b4bd3c7f77a63!2s123%20University%20Ave!5e0!3m2!1sen!2sus!4v1615586126405!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

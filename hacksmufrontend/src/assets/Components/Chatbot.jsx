import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import chatbotImage from '../images/chatbot.png'; 

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);  // Reference for auto-scrolling

  // Predefined greetings and keyword-based responses
  const keywordResponses = [
    {
      // Greeting responses
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"],
      response: "Hello! How can I assist you today? If you're looking for fitness advice, mental health support, or telemedicine, feel free to ask!"
    },
    {
      // Fitness Tracker guidance
      keywords: ["fitness", "steps", "tracking", "exercise", "workouts", "physical activity", "calories", "health"],
      response: (
        <div>
          To help track your fitness goals and physical activity, check out our <Link to="/fitness-tracker" className="text-blue-500">Fitness Tracker</Link>.
        </div>
      )
    },
    {
      // Telemedicine guidance with Telemedicine page link
      keywords: ["telemedicine", "doctor online", "virtual consultation", "online doctor", "remote healthcare"],
      response: (
        <div>
          Telemedicine allows you to receive medical consultations remotely via phone or video calls. You can <Link to="/telemedicine" className="text-blue-500">book a telemedicine appointment here</Link>.
        </div>
      )
    },
    {
      // Peer Support guidance with Peer Support page link
      keywords: ["peer support", "help", "guidance", "counseling", "mentor", "emotional support", "talk to someone"],
      response: (
        <div>
          Peer support connects you with someone who has been through similar experiences and can offer emotional support. You can <Link to="/peer-support" className="text-blue-500">book a peer support session here</Link>.
        </div>
      )
    },
    {
      // Redirect to peer support for feeling unwell
      keywords: ["not feeling well", "sick", "ill", "feeling down", "need help", "overwhelmed","depressed","anxiety", "lonely"],
      response: (
        <div>
          It sounds like you're going through a tough time. We highly recommend booking an appointment with one of our peer support mentors. You can <Link to="/peer-support" className="text-blue-500">book a peer support session here</Link> and talk to someone who can help.
        </div>
      )
    },
    {
      // Booking Appointments guidance with Peer Support link
      keywords: ["appointments", "book a session", "schedule", "meeting", "availability", "appointment"],
      response: (
        <div>
          You can easily book an appointment with our peer support services by visiting the <Link to="/peer-support" className="text-blue-500">Peer Support</Link> page.
        </div>
      )
    },
    {
      // Thank You and Gratitude
      keywords: ["thank you", "thanks", "appreciate", "great", "good job"],
      response: "You're very welcome! I'm here to assist you whenever you need help. Feel free to ask anytime!"
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: 'user', content: input.toLowerCase() };
    setMessages([...messages, userMessage]);

    setInput('');  // Clear the input field

    setLoading(true);

    // Check if the user's message contains any of the keywords
    let botReply = (
      <div>
        Don't worry! If you have more queries, please <Link to="/contact" className="text-blue-500">contact us</Link> and drop a message. We will reply to you as soon as possible.
      </div>
    );
    for (let responseObj of keywordResponses) {
      for (let keyword of responseObj.keywords) {
        if (userMessage.content.includes(keyword)) {
          botReply = responseObj.response;
          break;
        }
      }
    }

    const botMessage = { role: 'bot', content: botReply };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Chatbot floating icon */}
      <img
        src={chatbotImage}
        alt="Chatbot"
        className="w-16 h-16 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}  // Toggle chatbot window
      />

      {isOpen && (
        <div className="bg-white p-4 shadow-lg rounded-lg w-80 h-96 flex flex-col">
          <div className="chatbox flex-grow overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role} my-2 p-2 rounded-md ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}>
                {typeof msg.content === 'string' ? msg.content : msg.content} {/* Rendering HTML for Link */}
              </div>
            ))}
            {loading && <p>Loading...</p>}
            <div ref={chatEndRef} /> {/* This is the dummy element for auto-scroll */}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="border p-2 w-full mb-2"
          />
          <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

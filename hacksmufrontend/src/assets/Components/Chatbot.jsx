import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle sending the message to the OpenAI API
  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]); // Show user's message

    setInput(''); // Clear input field
    setLoading(true); // Set loading state

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // or "gpt-4"
          messages: [
            ...messages,
            userMessage,
          ], // Add previous messages and the user's new message
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your actual API key
          },
        }
      );

      const botMessage = response.data.choices[0].message; // Get bot's response
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Append bot's message
    } catch (error) {
      console.error('Error with OpenAI API:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="chatbox bg-gray-100 shadow-md rounded-lg p-4 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">AI Chatbot</h2>
        <div className="messages max-h-80 overflow-y-auto p-2 bg-white rounded-lg border border-gray-300">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 mb-2 rounded-lg ${msg.role === 'user' ? 'text-right bg-blue-500 text-white' : 'text-left bg-gray-300'}`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input and send button */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-lg"
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-600 text-white p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

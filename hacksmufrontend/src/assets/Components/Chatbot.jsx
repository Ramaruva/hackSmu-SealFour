import React, { useState } from 'react';
import axios from 'axios';
import chatbotImage from '../images/chatbot.png'; 

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);  

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    setInput('');  // Clear the input field
    console.log("hi openai calls")

    try {
      setLoading(true);
      // OpenAI API call
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',  // Use 'gpt-4' if your API key has access
          messages: [{ role: 'system', content: 'You are a helpful assistant.' }, userMessage],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,  // Access the API key
          },
        }
      );
      
      const botMessage = { role: 'bot', content: response.data.choices[0].message.content };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'bot', content: 'Sorry, something went wrong.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
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
        <div className="bg-white p-4 shadow-lg rounded-lg w-80">
          <div className="chatbox">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && <p>Loading...</p>}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="border p-2 w-full"
          />
          <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

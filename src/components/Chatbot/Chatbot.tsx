'use client';

import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const [isOpen, setIsOpen] = useState(false); // State to manage toggle
  const [loading, setLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);
      const response = await axios.post<{ answer: string }>(
        'https://8076-2405-4802-9010-a1a0-c078-9606-163e-1593.ngrok-free.app/api/chatbot',
        {
          question: input,
        }
      );
      const botMessage: Message = { sender: 'bot', text: response.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: 'bot',
        text: 'An error occurred, please try again!',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChatbot}
        className={`w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-500 ${
          isOpen ? 'hidden' : ''
        }`}
      >
        {isOpen ? (
          '✖'
        ) : (
          <svg
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 58 58"
            fill="#000000"
          >
            <g>
              <path
                style={{ fill: '#049CFF' }}
                d="M23.936,54.07c0.539-0.12,0.879-0.654,0.76-1.193c-0.121-0.539-0.663-0.874-1.193-0.759 l-7.252,1.614c-0.003-0.002-0.007-0.003-0.01-0.005l-0.171,0.045l-0.326,0.073c-0.027,0.006-0.047,0.024-0.073,0.032L0,58 l4.988-14.963C2.457,38.78,1,33.812,1,28.5C1,12.76,13.76,0,29.5,0S58,12.76,58,28.5S45.24,57,29.5,57 c-3.603,0-7.048-0.673-10.221-1.894L23.936,54.07z"
              ></path>
              <path
                style={{ fill: '#FFFFFF' }}
                d="M30,22H16c-0.552,0-1-0.448-1-1s0.448-1,1-1h14c0.552,0,1,0.448,1,1S30.552,22,30,22z"
              ></path>
              <path
                style={{ fill: '#FFFFFF' }}
                d="M43,30H16c-0.552,0-1-0.448-1-1s0.448-1,1-1h27c0.552,0,1,0.448,1,1S43.552,30,43,30z"
              ></path>
              <path
                style={{ fill: '#FFFFFF' }}
                d="M43,38H16c-0.552,0-1-0.448-1-1s0.448-1,1-1h27c0.552,0,1,0.448,1,1S43.552,38,43,38z"
              ></path>
            </g>
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="w-96 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Chat with Us
            </h3>
            <button className="text-lg " onClick={toggleChatbot}>
              ✖
            </button>
          </div>
          <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50 mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-2`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.text,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <form className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            <Button
              type="submit"
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="animate-spin"></LoaderCircle>
              ) : (
                'Send'
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

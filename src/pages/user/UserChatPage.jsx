import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const socket = io('http://localhost:5000'); 

const UserChatPage = () => {
  const location = useLocation();
  const userId = location.state?.userId; 
  const vendorId = location.state?.vendorId;
  const [chats, setChats] = useState({ messages: [] });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null); 
  useEffect(() => {
    if (!userId || !vendorId) {
      console.error('User ID or Vendor ID is missing.');
      return;
    }

    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chats/fetch-chats/${userId}/${vendorId}`);
        setChats(response.data || { messages: [] });
      } catch (error) {
        console.error('Failed to fetch chats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();

    socket.emit('join-chat', { userId, vendorId });

    socket.on('message', (newMessage) => {
      if (newMessage.senderId === userId) {
        setChats((prevChats) => ({
          ...prevChats,
          messages: [...prevChats.messages, newMessage],
        }));
      }
    });

    return () => {
      socket.off('message');
    };
  }, [userId, vendorId]);

  useEffect(() => {
    
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats.messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return; 

    try {
      const sentMessage = { userId, vendorId, text: message, senderId: userId }; 
      await axios.post('http://localhost:5000/api/chats/send-message', sentMessage);
      socket.emit('send-message', sentMessage);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-screen-md mx-auto bg-gray-100 shadow-lg rounded-lg">
      <header className="bg-blue-600 text-white p-4 rounded-t-lg text-center">
        <h2 className="text-xl font-semibold">Chat with Vendor</h2>
      </header>
      <main className="flex-1 p-4 overflow-auto bg-white">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {chats.messages.map((msg, index) => (
              msg.senderId === userId && (
                <div key={index} className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-full" style={{ width: '100%' }}>
                    <p className="text-sm"> {msg.text}</p>
                  </div>
                </div>
              )
            ))}
            <div ref={chatEndRef} /> 
          </div>
        )}
      </main>
      <footer className="bg-gray-200 p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default UserChatPage;

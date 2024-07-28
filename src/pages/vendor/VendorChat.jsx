import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

const socket = io('http://localhost:5000');

const VendorChatPage = () => {
  const location = useLocation();
  const vendorId = location.state?.vendorId;
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!vendorId) {
      console.error('Vendor ID is missing.');
      return;
    }

    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chats/fetch-vendor-chats/${vendorId}`);
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Failed to fetch chats', error);
      }
    };

    fetchChats();
    socket.emit('join-chat', { vendorId });

    socket.on('message', (msg) => {
      setChats((prevChats) => {
        const chatIndex = prevChats.findIndex(chat => chat.userId === msg.senderId);
        if (chatIndex >= 0) {
          const updatedChats = [...prevChats];
          updatedChats[chatIndex].messages.push(msg);
          return updatedChats;
        } else {
          return [
            ...prevChats,
            {
              userId: msg.senderId,
              userName: msg.userName, 
              messages: [msg]
            }
          ];
        }
      });

      if (selectedUser === msg.senderId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [vendorId, selectedUser]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSelectUser = (userId) => {
    const userChat = chats.find((chat) => chat.userId === userId);
    setSelectedUser(userId);
    setMessages(userChat ? userChat.messages : []);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    try {
      await fetch('http://localhost:5000/api/chats/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser, vendorId, text: message }),
      });

      socket.emit('send-message', { userId: selectedUser, vendorId, text: message });
      setMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold mb-4">USERS</h2>
        <div className="space-y-2">
          {chats.map((chat, index) => (
            <div
            key={index}
            className="p-2 bg-white rounded-md shadow cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectUser(chat.userId)}
          >
            <p className="text-sm text-gray-700 flex items-center">
              <FaUser className="mr-2" /> 
              {chat.userName}
            </p>
          </div>
          ))}
        </div>
      </div>

      <div className="w-2/3 flex flex-col">
        <div className="flex-1 p-4 bg-gray-50 border-l border-gray-300 overflow-y-auto">
          {selectedUser ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Chat with User</h2>
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-md ${
                      msg.senderId === vendorId ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">
                      {msg.senderId === vendorId ? 'Me' : msg.userName}: {msg.text}
                    </p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">Select a user to start chatting</p>
          )}
        </div>

        <div className="bg-white p-4 border-t border-gray-300 flex items-center">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorChatPage;

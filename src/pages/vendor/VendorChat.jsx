

import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import dayjs from 'dayjs'; import Picker from 'emoji-picker-react';


const socket = io('https://watch-vogue.shop');

const VendorChatPage = () => {
  const location = useLocation();
  const vendorId = location.state?.vendorId;
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!vendorId) {
      console.error('Vendor ID is missing.');
      return;
    }

    const fetchChats = async () => {
      try {
        const response = await fetch(`https://watch-vogue.shop/api/chats/fetch-vendor-chats/${vendorId}`);
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Failed to fetch chats', error);
      }
    };

    fetchChats();
    socket.emit('join-chat', { vendorId ,userId:selectedUser});

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
      const sentMessage = { userId: selectedUser, vendorId, text: message, senderId: vendorId };
      await fetch('https://watch-vogue.shop/api/chats/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sentMessage),
      });

      socket.emit('send-message', sentMessage);
      setMessage('');
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
    } catch (error) {
      console.error('Failed to send message', error);
      toast.error('Failed to send message');
    }
  };

    const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onEmojiClick = ( emojiObject) => {
    
    
    if(message == undefined){
      setMessage(emojiObject.emoji)
    }else{
      setMessage((prevMessage) => prevMessage + emojiObject.emoji)
    }
 
    setShowEmojiPicker(false);
  };


  const formatDate = (timestamp) => {
    const date = dayjs(timestamp);
    const now = dayjs();
    if (date.isSame(now, 'day')) return 'Today';
    if (date.isSame(now.subtract(1, 'day'), 'day')) return 'Yesterday';
    return date.format('MMM D, YYYY');
  };

  return (
    <div className="flex h-screen bg-[#101820FF] text-white">
      <div className="w-1/3 bg-[#101820FF] p-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold mb-4">USERS</h2>
        <div className="space-y-2">
          {chats.map((chat, index) => (
            <div
              key={index}
              className="p-2 bg-gray-800 rounded-md shadow cursor-pointer hover:bg-gray-700"
              onClick={() => handleSelectUser(chat.userId)}
            >
              <p className="text-sm text-white flex items-center">
                <FaUser className="mr-2" />
                {chat.userName}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-2/3 flex flex-col bg-[#101820FF]">
        <div className="flex-1 p-4 bg-[#101820FF] border-l border-gray-300 overflow-y-auto">
          {selectedUser ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Chat with {chats.find((chat) => chat.userId === selectedUser)?.userName}</h2>
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.senderId === vendorId ? 'justify-end' : 'justify-start'}`}>
                     {index === 0 || dayjs(messages[index - 1].timestamp).format('MMM D, YYYY') !== dayjs(msg.timestamp).format('MMM D, YYYY') && (
                  <div className="text-center text-gray-500 m-6">
                    {formatDate(msg.timestamp)}
                  </div>
                )}
                    <div className={`p-3 rounded-lg ${msg.senderId === vendorId ? 'bg-yellow-600 text-black' : 'bg-gray-600 text-white'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <div className="text-xs text-gray-400">{dayjs(msg.timestamp).format('h:mm A')}</div> 

                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Select a user to start chatting</p>
          )}
        </div>

        {selectedUser && (
          <div className="bg-gray-900 p-4 border-t border-gray-300">
            <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 mr-2 bg-white text-[#1B213B] rounded-full"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-full left-0 mb-2">
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 p-2 border border-gray-600 rounded-lg mr-2 bg-gray-800 text-white"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#F2AA4CFF] text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorChatPage;

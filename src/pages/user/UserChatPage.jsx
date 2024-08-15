import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import dayjs from 'dayjs'
import Picker from 'emoji-picker-react';


const socket = io('https://watch-vogue.shop'); 

const UserChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId; 
  const vendorId = location.state?.vendorId;
  const [chats, setChats] = useState({ messages: [] });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null); 

  useEffect(() => {
    if (!userId || !vendorId) {
      console.error('User ID or Vendor ID is missing.');
      return;
    }

    const fetchChats = async () => {
      try {
        const response = await axios.get(`https://watch-vogue.shop/api/chats/fetch-chats/${userId}/${vendorId}`);
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
      setChats((prevChats) => ({
        ...prevChats,
        messages: [...prevChats.messages, newMessage],
      }));
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
      await axios.post('https://watch-vogue.shop/api/chats/send-message', sentMessage);
      socket.emit('send-message', sentMessage);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatDate = (timestamp) => {
    const date = dayjs(timestamp);
    const now = dayjs();
    if(date.isSame(now,'day')) return 'Today';
    if(date.isSame(now.subtract(1,'day'),'day')) return 'Yesterday';
    return date.format('MMM D, YYYY');
  }

  const onEmojiClick = ( emojiObject) => {
    
    
    if(message == undefined){
      setMessage(emojiObject.emoji)
    }else{
      setMessage((prevMessage) => prevMessage + emojiObject.emoji)
    }
 
    setShowEmojiPicker(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B213B] text-white">
        <div className="w-16 h-16 border-4 border-t-4 border-[#BEF264] border-opacity-50 rounded-full animate-spin"></div>
      </div>
    );
    }

    return (
      <div className="min-h-screen bg-[#1B213B] text-white flex flex-col items-center">
        <header className="w-full p-4 flex justify-between items-center shadow-md px-8 sm:pl-14">
          <h1 className="text-2xl font-bold text-[#BEF264]"><span className='text-white'>BRO</span>STEL</h1>
          <div className="flex items-center space-x-4 sm:pr-16">
          <button
              onClick={() => navigate(-1)}
              className="bg-[#BEF264] text-[#1B213B] px-2 py-1 rounded-lg hover:bg-yellow-600"
            >
              <FaArrowLeft />
            </button>
          </div>
        </header>
  
        <main className="flex flex-col items-center w-full px-4 py-8">
          <div className="w-full max-w-4xl bg-[#2C3554] rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-[#3E4C75] flex justify-between items-center">
              <h2 className="text-md font-bold uppercase">Chat with Vendor</h2>
            </div>
  
            <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-4">
              {chats.messages.map((msg, index) => (
                <div key={index}>
                  {/* Display date section */}
                  {index === 0 || dayjs(chats.messages[index - 1].timestamp).format('MMM D, YYYY') !== dayjs(msg.timestamp).format('MMM D, YYYY') && (
                    <div className="text-center text-gray-500 my-2">
                      {formatDate(msg.timestamp)}
                    </div>
                  )}
                  <div className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2 rounded-lg ${msg.senderId === userId ? 'bg-[#BEF264] text-black' : 'bg-[#3E4C75] text-white'}`}>
                      {msg.text}
                      <div className="text-xs text-gray-400">{dayjs(msg.timestamp).format('h:mm A')}</div> {/* Display timestamp */}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
  
            <div className="p-4 bg-[#3E4C75] flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full"
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
                onKeyDown={handleKeyPress}
                className="flex-1 p-2 bg-[#2C3554] border border-[#3E4C75] rounded-lg text-white"
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage} className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
};

export default UserChatPage;

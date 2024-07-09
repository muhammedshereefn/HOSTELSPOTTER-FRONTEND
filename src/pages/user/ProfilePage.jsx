
const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-green-500 text-xl font-bold">BROSTEL</div>
        <div className="flex items-center space-x-4">
          <button className="focus:outline-none">
            <img src="path/to/profile-icon.png" alt="Profile" className="h-8 w-8 rounded-full" />
          </button>
          <button className="focus:outline-none">
            <img src="path/to/chat-icon.png" alt="Chat" className="h-8 w-8" />
          </button>
        </div>
      </nav>
      
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
          <input className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="text" id="username" value="John Doe" readOnly />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
          <input className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="email" id="email" value="johndoe@example.com" readOnly />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="contact">Contact</label>
          <input className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="text" id="contact" value="123-456-7890" readOnly />
        </div>
        
        <button className="w-full py-2 mt-4 bg-green-500 text-black font-bold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

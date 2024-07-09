
const VendorChatPage = () => {
    return (
      <div className="h-screen bg-[#1E1E1E] text-white">
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">
          <h5 className="text-[#F2AA4CFF] w-fit cursor-pointer  font-semibold text-xl hover:text-[#8fb848]">
              BROSTEL<span className="text-white">vendor</span>
            </h5>
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-lg">Account Name</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            </div>
          </header>
          <div className="flex flex-1 overflow-hidden">
            <aside className="w-64 bg-gray-800 border-r border-gray-700">
              <div className="p-4">
                <h2 className="text-xl font-semibold">Chats</h2>
                <div className="mt-4">
                  <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                    <div className="ml-4">
                      <p className="text-lg">Suhail</p>
                      <p className="text-sm text-gray-400">I'm down! Any ideas??</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <main className="flex flex-1 flex-col bg-gray-900">
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                      <div className="ml-4">
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <p>I'm down! Any ideas??</p>
                        </div>
                        <p className="text-sm text-gray-400">11:35 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex items-center">
                      <div className="bg-green-600 p-3 rounded-lg">
                        <p>Hi team ✌️</p>
                      </div>
                      <p className="ml-4 text-sm text-gray-400">11:31 AM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-700">
                <input
                  type="text"
                  className="w-full p-3 bg-gray-800 rounded-lg"
                  placeholder="Start typing..."
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };
  
  export default VendorChatPage;
  
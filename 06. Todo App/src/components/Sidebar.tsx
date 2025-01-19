import { Calendar, ListTodo, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4 z-40 transition-all duration-300 ease-in-out transform md:translate-x-0">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Menu</h1>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Tasks</h2>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-colors duration-200">
              <ListTodo size={20} />
              <span className="font-medium">Upcoming</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-colors duration-200">
              <Calendar size={20} />
              <span className="font-medium">Today</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 space-y-1">
        <div className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-colors duration-200">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-colors duration-200">
          <LogOut size={20} />
          <span className="font-medium">Sign out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
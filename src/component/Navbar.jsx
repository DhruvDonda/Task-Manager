import React from "react";
import { Search } from "lucide-react";

function Navbar({ searchTerm, onSearchChange, priorityFilter, onPriorityFilterChange }) {
  return (
    <div className="bg-white shadow-sm py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Title */}
          <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>

          {/* Search & Filter Section */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            
            {/* Search Box */}
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

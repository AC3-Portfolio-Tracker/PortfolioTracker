import React from "react";
import TimeFilters from "./TimeFilters";
import Dropdowns from "./Dropdowns";
import PerformanceChart from "./PerformanceChart";
import ModeToggle from "./ModeToggle";

const Performance = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Page Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold">Portfolio Performance</h2>
          <ModeToggle />
        </div>

        {/* Filters and Dropdowns */}
        <div className="flex flex-wrap gap-3 mb-6">
          <TimeFilters />
          <Dropdowns />
        </div>

        {/* Chart Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Cumulative Returns</h3>
          <PerformanceChart />

          {/* Chart Type Toggle */}
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-3 py-1 text-xs font-medium border rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              Time-Weighted
            </button>
            <button className="px-3 py-1 text-xs font-medium border rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              Money-Weighted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;

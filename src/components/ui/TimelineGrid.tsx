import React from 'react';

export const TimelineGrid: React.FC = () => {
    const years = [2025, 2030, 2035, 2040, 2045];

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[600px] flex">
                {years.map((year) => (
                    <div key={year} className="flex-1 flex flex-col">
                        <div className="text-xs font-semibold text-gray-500 mb-2 border-b border-gray-200 pb-1">
                            {year}
                        </div>
                        <div className="h-32 border-l border-dashed border-gray-300 relative bg-gray-50/50">
                            {/* Drop zone visual stub */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

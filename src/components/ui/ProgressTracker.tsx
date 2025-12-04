'use client';

import React from 'react';

export const ProgressTracker: React.FC = () => {
    return (
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/5 bg-lightGreen rounded-full" />
        </div>
    );
};

'use client';

import React from 'react';

interface ProgressTrackerProps {
    step?: number;
    total?: number;
    showBar?: boolean;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
    step,
    total,
    showBar = false,
}) => {
    // If step and total provided, show text indicator
    if (step !== undefined && total !== undefined) {
        return (
            <div className="text-sm font-medium text-gray-500">
                Step {step} of {total}
            </div>
        );
    }

    // Default: show visual bar at 20%
    if (showBar) {
        return (
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/5 bg-lightGreen rounded-full" />
            </div>
        );
    }

    // Fallback for backwards compatibility
    return (
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/5 bg-lightGreen rounded-full" />
        </div>
    );
};

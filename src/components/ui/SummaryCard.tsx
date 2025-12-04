import React, { ReactNode } from 'react';

interface SummaryCardProps {
    icon: ReactNode;
    title: string;
    subtitle: string;
    meta?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, subtitle, meta }) => {
    return (
        <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex-shrink-0 mr-4 text-2xl text-gray-500">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                    {subtitle}
                </p>
                {meta && (
                    <p className="text-xs text-gray-400 mt-1">
                        {meta}
                    </p>
                )}
            </div>
        </div>
    );
};

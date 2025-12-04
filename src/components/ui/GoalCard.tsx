import React, { ReactNode } from 'react';

interface GoalCardProps {
    icon: ReactNode;
    title: string;
    selected: boolean;
    onClick: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ icon, title, selected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
        cursor-pointer rounded-lg border p-4 transition-all duration-200
        flex flex-col items-center justify-center gap-2
        ${selected
                    ? 'border-lightGreen ring-2 ring-lightGreen bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }
      `}
        >
            <div className="text-3xl text-gray-700">
                {icon}
            </div>
            <h3 className="text-sm font-medium text-gray-900 text-center">
                {title}
            </h3>
        </div>
    );
};

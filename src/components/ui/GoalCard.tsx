import React from 'react';

interface GoalCardProps {
    id: string;
    name: string;
    icon: string;
    selected: boolean;
    onToggle: (id: string) => void;
    disabled?: boolean;
    className?: string;
}

export const GoalCard: React.FC<GoalCardProps> = ({
    id,
    name,
    icon,
    selected,
    onToggle,
    disabled = false,
    className = '',
}) => {
    const handleClick = () => {
        if (!disabled) {
            onToggle(id);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onToggle(id);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-pressed={selected}
            disabled={disabled}
            className={`
                cursor-pointer rounded-lg border p-4 transition-all duration-200
                flex flex-col items-center justify-center gap-2 text-center
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightGreen focus-visible:ring-offset-2
                ${selected
                    ? 'border-lightGreen ring-2 ring-lightGreen bg-lightGreen/5'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }
                ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }
                ${className}
            `}
        >
            <div className="text-3xl">
                {icon}
            </div>
            <h3 className="text-sm font-medium text-gray-900">
                {name}
            </h3>
        </button>
    );
};

import React from 'react';
import type { Priority } from '@/modules/mapmaker/types';

interface PrioritySliderProps {
    value: Priority;
    onChange: (value: Priority) => void;
    id?: string;
    label?: string;
    lowLabel?: string;
    highLabel?: string;
    disabled?: boolean;
    className?: string;
}

const isPriority = (n: number): n is Priority => {
    return n >= 1 && n <= 5 && Number.isInteger(n);
};

export const PrioritySlider: React.FC<PrioritySliderProps> = ({
    value,
    onChange,
    id,
    label,
    lowLabel = 'Low',
    highLabel = 'High',
    disabled = false,
    className = '',
}) => {
    const inputId = id || 'priority-slider';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = Number(e.target.value);
        if (isPriority(numValue)) {
            onChange(numValue);
        }
    };

    return (
        <div className={`w-full flex flex-col gap-2 ${className}`}>
            {/* Top Label Row */}
            <div className="flex justify-between items-center">
                {label ? (
                    <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                ) : (
                    <span className="text-sm font-medium text-gray-700">Priority</span>
                )}
                <span className="text-sm font-bold text-deepGreen">
                    {value} / 5
                </span>
            </div>

            {/* Slider Input */}
            <input
                type="range"
                id={inputId}
                min={1}
                max={5}
                step={1}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                aria-label={label ? undefined : 'Priority'}
                aria-valuemin={1}
                aria-valuemax={5}
                aria-valuenow={value}
                className={`
                    w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                    accent-lightGreen 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightGreen focus-visible:ring-offset-2
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            />

            {/* Bottom Labels */}
            <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>{lowLabel}</span>
                <span>{highLabel}</span>
            </div>
        </div>
    );
};

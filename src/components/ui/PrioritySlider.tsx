import React from 'react';

interface PrioritySliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
}

export const PrioritySlider: React.FC<PrioritySliderProps> = ({
    value,
    onChange,
    min = 1,
    max = 5,
    label
}) => {
    return (
        <div className="w-full flex flex-col gap-2">
            {/* Top Label Row */}
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                    {label || "Priority"}
                </span>
                <span className="text-sm font-bold text-deepGreen">
                    {value} / {max}
                </span>
            </div>

            {/* Slider Input */}
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lightGreen focus:outline-none focus:ring-2 focus:ring-lightGreen/50"
            />

            {/* Bottom Labels */}
            <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Lower</span>
                <span>Higher</span>
            </div>
        </div>
    );
};

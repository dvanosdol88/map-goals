import React from 'react';

interface PrioritySliderProps {
    value: number;
    onChange: (value: number) => void;
}

export const PrioritySlider: React.FC<PrioritySliderProps> = ({ value, onChange }) => {
    return (
        <div className="w-full">
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lightGreen"
            />
        </div>
    );
};

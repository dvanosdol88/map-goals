"use client";

import React, { useState } from 'react';
import { PrioritySlider } from '@/components/ui/PrioritySlider';

export default function PlaygroundPage() {
    const [value, setValue] = useState(3);

    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-8">Component Playground</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Priority Slider</h2>
                <PrioritySlider
                    value={value}
                    onChange={setValue}
                    label="Retirement Priority"
                />

                <div className="mt-8 p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Current Value: {value}</p>
                </div>
            </div>
        </div>
    );
}

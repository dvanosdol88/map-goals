"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PrioritySlider } from '@/components/ui/PrioritySlider';
import { PRESET_GOALS } from '@/data/presetGoals';
import type { Priority } from '@/modules/mapmaker/types';

export default function PlaygroundPage() {
    const [value, setValue] = useState<Priority>(3);

    // MAP-2 Sanity check: log preset goals on mount (dev only)
    useEffect(() => {
        console.log('PRESET_GOALS loaded:', PRESET_GOALS.length, 'goals');
        console.log(PRESET_GOALS);
    }, []);

    return (
        <div className="p-10 max-w-md mx-auto space-y-8">
            <h1 className="text-2xl font-bold">Component Playground</h1>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Component Previews</h2>
                <div className="flex flex-col gap-2">
                    <Link href="/playground/goal-card" className="text-deepGreen hover:underline">
                        → GoalCard Preview
                    </Link>
                    <Link href="/playground/priority-slider" className="text-deepGreen hover:underline">
                        → PrioritySlider Preview
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">Quick Test: Priority Slider</h2>
                <PrioritySlider
                    value={value}
                    onChange={setValue}
                    label="Retirement Priority"
                />

                <div className="mt-8 p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Current Value: {value}</p>
                </div>
            </div>

            <div className="p-4 bg-beige rounded border border-gray-200">
                <h3 className="text-sm font-semibold mb-2">MAP-2 Sanity Check</h3>
                <p className="text-sm text-gray-600">
                    PRESET_GOALS: {PRESET_GOALS.length} goals loaded (check console)
                </p>
            </div>
        </div>
    );
}

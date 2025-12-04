'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PrioritySlider } from '@/components/ui/PrioritySlider';

export default function GoalDetailsPage() {
    const [year, setYear] = useState<number>(2030);
    const [cost, setCost] = useState<number>(50000);
    const [priority, setPriority] = useState<number>(3);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Goal Details</h2>
                <p className="text-gray-600">Refine your goals with specific details.</p>
            </div>

            <div className="max-w-md space-y-6 bg-white p-6 rounded-lg border border-gray-200">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Target Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lightGreen focus:border-lightGreen"
                        min={2025}
                        max={2060}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Estimated Cost ($)</label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-lightGreen focus:border-lightGreen"
                        min={0}
                        step={1000}
                    />
                </div>

                <PrioritySlider value={priority} onChange={setPriority} />
            </div>

            <div className="flex justify-end">
                <Link
                    href="/mapmaker/summary"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Next: Summary
                </Link>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { PrioritySlider } from '@/components/ui/PrioritySlider';
import type { Priority } from '@/modules/mapmaker/types';

export default function PrioritySliderPreview() {
    const [priority1, setPriority1] = useState<Priority>(3);
    const [priority2, setPriority2] = useState<Priority>(1);

    return (
        <div className="p-8 space-y-8 max-w-md">
            <div>
                <h1 className="text-2xl font-bold mb-2">PrioritySlider Component Preview</h1>
                <p className="text-gray-600 mb-6">
                    Testing keyboard navigation and value updates.
                </p>
            </div>

            <div className="space-y-8">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-500 mb-4">With Label</h2>
                    <PrioritySlider
                        id="priority-with-label"
                        value={priority1}
                        onChange={setPriority1}
                        label="Goal Priority"
                    />
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-500 mb-4">Custom Labels</h2>
                    <PrioritySlider
                        id="priority-custom"
                        value={priority2}
                        onChange={setPriority2}
                        label="Urgency"
                        lowLabel="Not Urgent"
                        highLabel="Very Urgent"
                    />
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-500 mb-4">Disabled</h2>
                    <PrioritySlider
                        value={4}
                        onChange={() => { }}
                        label="Fixed Priority"
                        disabled
                    />
                </div>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
                <p><strong>Priority 1:</strong> {priority1}</p>
                <p><strong>Priority 2:</strong> {priority2}</p>
            </div>
        </div>
    );
}

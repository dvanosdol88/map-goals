'use client';

import { useState } from 'react';
import { GoalCard } from '@/components/ui/GoalCard';

export default function GoalCardPreview() {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['goal-2']));

    const handleToggle = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-2">GoalCard Component Preview</h1>
                <p className="text-gray-600 mb-6">
                    Testing keyboard navigation (Tab/Enter/Space) and visual states.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg">
                <GoalCard
                    id="goal-1"
                    name="Retire Early"
                    icon="🏖️"
                    selected={selectedIds.has('goal-1')}
                    onToggle={handleToggle}
                />
                <GoalCard
                    id="goal-2"
                    name="Buy a Home"
                    icon="🏡"
                    selected={selectedIds.has('goal-2')}
                    onToggle={handleToggle}
                />
                <GoalCard
                    id="goal-3"
                    name="Disabled Goal"
                    icon="🔒"
                    selected={false}
                    onToggle={handleToggle}
                    disabled
                />
            </div>

            <div className="text-sm text-gray-500">
                <p><strong>Selected IDs:</strong> {Array.from(selectedIds).join(', ') || 'None'}</p>
            </div>
        </div>
    );
}

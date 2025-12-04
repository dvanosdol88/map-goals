'use client';

import Link from 'next/link';
import { GoalCard } from '@/components/ui/GoalCard';
import { useGoalsStore } from '@/modules/mapmaker/state/useGoalsStore';
import { PRESET_GOALS } from '@/data/presetGoals';

export default function SelectGoalsPage() {
    const { goals, addGoal, removeGoal } = useGoalsStore();

    const handleToggle = (id: string) => {
        const goal = PRESET_GOALS.find(g => g.id === id);
        if (!goal) return;

        const isSelected = goals.some(g => g.id === id);
        if (isSelected) {
            removeGoal(id);
        } else {
            addGoal(goal);
        }
    };

    const hasGoals = goals.length > 0;

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Select Goals</h2>
                <p className="text-gray-600">Choose the goals that matter most to you.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {PRESET_GOALS.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        id={goal.id}
                        name={goal.name}
                        icon={goal.icon}
                        selected={goals.some(g => g.id === goal.id)}
                        onToggle={handleToggle}
                    />
                ))}
            </div>

            <div className="flex justify-end">
                <Link
                    href={hasGoals ? "/mapmaker/timeline" : "#"}
                    className={`px-4 py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightGreen focus-visible:ring-offset-2 ${hasGoals
                        ? 'bg-deepGreen text-white hover:bg-deepGreen/90'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    onClick={(e) => !hasGoals && e.preventDefault()}
                    aria-disabled={!hasGoals}
                >
                    Next: Timeline
                </Link>
            </div>
        </div>
    );
}

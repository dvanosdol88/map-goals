'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GoalCard } from '@/components/ui/GoalCard';
import { Goal } from '@/types';

const MOCK_GOALS: Goal[] = [
    { id: '1', title: 'Retire Early', icon: '🏖️' },
    { id: '2', title: 'Buy a Home', icon: '🏠' },
    { id: '3', title: 'Start a Business', icon: '🚀' },
    { id: '4', title: 'Travel the World', icon: '✈️' },
    { id: '5', title: 'Pay off Debt', icon: '💳' },
    { id: '6', title: 'Save for Education', icon: '🎓' },
];

export default function SelectGoalsPage() {
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const toggleGoal = (id: string) => {
        setSelectedGoals(prev =>
            prev.includes(id)
                ? prev.filter(g => g !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Select Goals</h2>
                <p className="text-gray-600">Choose the goals that matter most to you.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {MOCK_GOALS.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        icon={goal.icon || '🎯'}
                        title={goal.title}
                        selected={selectedGoals.includes(goal.id)}
                        onClick={() => toggleGoal(goal.id)}
                    />
                ))}
            </div>

            <div className="flex justify-end">
                <Link
                    href="/mapmaker/timeline"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Next: Timeline
                </Link>
            </div>
        </div>
    );
}

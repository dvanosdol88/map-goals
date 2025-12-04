'use client';


import Link from 'next/link';
import { GoalCard } from '@/components/ui/GoalCard';
import { useGoalsStore } from '@/modules/mapmaker/state/useGoalsStore';
import { Goal } from '@/modules/mapmaker/types';

const MOCK_GOALS: Goal[] = [
    { id: '1', name: 'Retire Early', icon: '🏖️', year: null, cost: null, priority: null },
    { id: '2', name: 'Buy a Home', icon: '🏠', year: null, cost: null, priority: null },
    { id: '3', name: 'Start a Business', icon: '🚀', year: null, cost: null, priority: null },
    { id: '4', name: 'Travel the World', icon: '✈️', year: null, cost: null, priority: null },
    { id: '5', name: 'Pay off Debt', icon: '💳', year: null, cost: null, priority: null },
    { id: '6', name: 'Save for Education', icon: '🎓', year: null, cost: null, priority: null },
];

export default function SelectGoalsPage() {
    const { goals, addGoal, removeGoal } = useGoalsStore();

    const toggleGoal = (goal: Goal) => {
        const isSelected = goals.some(g => g.id === goal.id);
        if (isSelected) {
            removeGoal(goal.id);
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {MOCK_GOALS.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        icon={goal.icon || '🎯'}
                        title={goal.name}
                        selected={goals.some(g => g.id === goal.id)}
                        onClick={() => toggleGoal(goal)}
                    />
                ))}
            </div>

            <div className="flex justify-end">
                <Link
                    href={hasGoals ? "/mapmaker/timeline" : "#"}
                    className={`px-4 py-2 rounded transition-colors ${hasGoals
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
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

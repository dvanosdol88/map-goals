'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PrioritySlider } from '@/components/ui/PrioritySlider';
import { useGoalsStore } from '@/modules/mapmaker/state/useGoalsStore';
import { Goal, Priority } from '@/modules/mapmaker/types';

export default function GoalDetailsPage() {
    const router = useRouter();
    const { goals: storeGoals, setGoals } = useGoalsStore();
    const [draftGoals, setDraftGoals] = useState<Goal[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Redirect if no goals selected
        if (storeGoals.length === 0) {
            router.replace('/mapmaker/select-goals');
            return;
        }

        // Initialize draft state with deep copy to avoid mutating store directly
        setDraftGoals(JSON.parse(JSON.stringify(storeGoals)));
        setIsInitialized(true);
    }, [storeGoals, router]);

    const handleUpdate = (id: string, field: keyof Goal, value: any) => {
        setDraftGoals(prev => prev.map(g => {
            if (g.id === id) {
                return { ...g, [field]: value };
            }
            return g;
        }));
    };

    const handleNext = () => {
        setGoals(draftGoals);
        router.push('/mapmaker/summary');
    };

    if (!isInitialized) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Goal Details</h2>
                <p className="text-gray-600">For each goal, add a rough year and an estimated amount. You can refine these later.</p>
            </div>

            <div className="space-y-6">
                {draftGoals.map((goal) => (
                    <div key={goal.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <span className="text-3xl">{goal.icon}</span>
                            <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor={`year-${goal.id}`} className="block text-sm font-medium text-gray-700">
                                    Target Year
                                </label>
                                <input
                                    id={`year-${goal.id}`}
                                    type="number"
                                    value={goal.year || ''}
                                    onChange={(e) => handleUpdate(goal.id, 'year', e.target.value ? parseInt(e.target.value) : null)}
                                    placeholder="e.g. 2030"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGreen focus:border-transparent"
                                    min={new Date().getFullYear()}
                                    max={2100}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor={`cost-${goal.id}`} className="block text-sm font-medium text-gray-700">
                                    Estimated Cost ($)
                                </label>
                                <input
                                    id={`cost-${goal.id}`}
                                    type="number"
                                    value={goal.cost || ''}
                                    onChange={(e) => handleUpdate(goal.id, 'cost', e.target.value ? parseFloat(e.target.value) : null)}
                                    placeholder="e.g. 50000"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGreen focus:border-transparent"
                                    min={0}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <PrioritySlider
                                value={goal.priority || 3}
                                onChange={(val) => handleUpdate(goal.id, 'priority', val)}
                                label="Priority"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between pt-4">
                <Link
                    href="/mapmaker/select-goals"
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    Back
                </Link>

                <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-deepGreen text-white rounded-lg hover:bg-deepGreen/90 transition-colors focus:outline-none focus:ring-2 focus:ring-deepGreen focus:ring-offset-2 shadow-md font-medium"
                >
                    Next: Summary
                </button>
            </div>
        </div>
    );
}

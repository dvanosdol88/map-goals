'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SummaryCard } from '@/components/ui/SummaryCard';
import { useGoalsStore } from '@/modules/mapmaker/state/useGoalsStore';

export default function SummaryPage() {
    const router = useRouter();
    const { goals } = useGoalsStore();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Redirect if no goals selected
        if (goals.length === 0) {
            router.replace('/mapmaker/select-goals');
            return;
        }
        setIsInitialized(true);
    }, [goals, router]);

    const handleConfirm = () => {
        console.log('Goals confirmed:', goals);
        // In a real app, this might submit to a backend or move to the next module.
        // For now, we'll just show an alert or log it.
        alert("Goals confirmed! Your advisor will review this plan.");
        // router.push('/'); // Or wherever the next step is
    };

    if (!isInitialized) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
                <p className="text-gray-600">Review your financial roadmap.</p>
            </div>

            <div className="space-y-4">
                {goals.map((goal) => {
                    const costStr = goal.cost
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(goal.cost)
                        : 'TBD';
                    const priorityStr = goal.priority ? `${goal.priority}/5` : 'TBD';
                    const yearStr = goal.year ? `Target: ${goal.year}` : 'Target year: TBD';

                    return (
                        <SummaryCard
                            key={goal.id}
                            icon={goal.icon}
                            title={goal.name}
                            subtitle={yearStr}
                            meta={`Estimated cost: ${costStr} • Priority: ${priorityStr}`}
                        />
                    );
                })}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <p className="text-sm text-gray-600">
                    Please review your goals and confirm they are accurate to the best of your knowledge.
                    Your advisor will use this information when building your plan.
                </p>

                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                        className="mt-1 h-4 w-4 text-deepGreen border-gray-300 rounded focus:ring-deepGreen"
                    />
                    <span className="text-sm text-gray-900">
                        I confirm that the information above is accurate to the best of my knowledge.
                    </span>
                </label>
            </div>

            <div className="flex justify-between items-center pt-4">
                <div className="flex gap-4">
                    <Link
                        href="/mapmaker/goal-details"
                        className="text-sm font-medium text-deepGreen hover:text-deepGreen/80 transition-colors"
                    >
                        Edit goals
                    </Link>
                    <button
                        onClick={() => {
                            if (confirm("Are you sure you want to start over? This will clear all your goals.")) {
                                useGoalsStore.getState().clearGoals();
                                router.push('/mapmaker/welcome');
                            }
                        }}
                        className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                        Start over
                    </button>
                </div>

                <button
                    onClick={handleConfirm}
                    disabled={!isConfirmed}
                    className={`
                        px-6 py-3 font-semibold rounded-lg transition-all shadow-md
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deepGreen
                        ${isConfirmed
                            ? 'bg-deepGreen text-white hover:bg-deepGreen/90'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                        }
                    `}
                >
                    Confirm & continue
                </button>
            </div>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GoalCard } from '@/components/ui/GoalCard';
import { useGoalsStore } from '@/modules/mapmaker/state/useGoalsStore';
import { PRESET_GOALS } from '@/data/presetGoals';
import { Goal, createGoal } from '@/modules/mapmaker/types';
import { CustomGoalModal } from './CustomGoalModal';

export default function SelectGoalsPage() {
    const router = useRouter();
    const { goals: storeGoals, setGoals } = useGoalsStore();

    // Local state for selection and custom goals
    // We initialize these in useEffect to avoid hydration mismatches if we were using persist later,
    // but for now we can just initialize empty and populate on mount.
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [customGoals, setCustomGoals] = useState<Goal[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize from store on mount
    useEffect(() => {
        if (storeGoals.length > 0) {
            const initialSelected = new Set(storeGoals.map(g => g.id));
            setSelectedIds(initialSelected);

            // Identify custom goals that are already in the store
            // We assume any goal not in PRESET_GOALS is custom
            const presetIds = new Set(PRESET_GOALS.map(g => g.id));
            const existingCustomGoals = storeGoals.filter(g => !presetIds.has(g.id));
            setCustomGoals(existingCustomGoals);
        }
        setIsInitialized(true);
    }, [storeGoals]);

    const handleToggle = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleAddCustomGoal = (name: string, icon: string) => {
        const newId = `custom-${crypto.randomUUID()}`;
        const newGoal = createGoal({
            id: newId,
            name,
            icon,
            isCustom: true,
        });

        setCustomGoals(prev => [...prev, newGoal]);
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            newSet.add(newId);
            return newSet;
        });
        setIsModalOpen(false);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();

        if (selectedIds.size === 0) return;

        // Construct the new goals list
        const allAvailableGoals = [...PRESET_GOALS, ...customGoals];
        const newGoals = allAvailableGoals
            .filter(g => selectedIds.has(g.id))
            .map(g => {
                // Check if this goal already exists in the store to preserve data
                const existing = storeGoals.find(sg => sg.id === g.id);
                if (existing) {
                    return existing;
                }
                return g;
            });

        setGoals(newGoals);
        router.push('/mapmaker/goal-details');
    };

    const hasSelection = selectedIds.size > 0;

    // Prevent hydration mismatch by not rendering selection state until initialized
    // (Though for this specific case it might not be strictly necessary, it's safer)
    if (!isInitialized) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Select Goals</h2>
                <p className="text-gray-600">Select all the goals you have in mind. You can adjust details later.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Preset Goals */}
                {PRESET_GOALS.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        id={goal.id}
                        name={goal.name}
                        icon={goal.icon}
                        selected={selectedIds.has(goal.id)}
                        onToggle={handleToggle}
                    />
                ))}

                {/* Custom Goals */}
                {customGoals.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        id={goal.id}
                        name={goal.name}
                        icon={goal.icon}
                        selected={selectedIds.has(goal.id)}
                        onToggle={handleToggle}
                    />
                ))}

                {/* Add Custom Goal Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="
                        cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 
                        flex flex-col items-center justify-center gap-2 text-center
                        hover:border-deepGreen hover:bg-deepGreen/5 transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-deepGreen focus:ring-offset-2
                        min-h-[140px]
                    "
                >
                    <div className="text-3xl">➕</div>
                    <h3 className="text-sm font-medium text-gray-600">Add custom goal</h3>
                </button>
            </div>

            <div className="flex justify-between pt-4">
                <Link
                    href="/mapmaker/welcome"
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    Back
                </Link>

                <button
                    onClick={handleNext}
                    disabled={!hasSelection}
                    className={`
                        px-6 py-2 rounded-lg font-medium transition-all
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deepGreen
                        ${hasSelection
                            ? 'bg-deepGreen text-white hover:bg-deepGreen/90 shadow-md'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }
                    `}
                >
                    Next: Timeline
                </button>
            </div>

            <CustomGoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddCustomGoal}
            />
        </div>
    );
}

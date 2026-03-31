'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    DndContext,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor,
    DragStartEvent,
    DragEndEvent,
    useDroppable
} from '@dnd-kit/core';

import { TimelineGrid } from '@/modules/mapmaker/components/TimelineGrid';
import { DraggableGoal } from '@/modules/mapmaker/components/DraggableGoal';
import { GoalDetailModal } from '@/modules/mapmaker/components/GoalDetailModal';
import { useGoalsStore } from '@/modules/mapmaker/state/useGoalsStore';
import { Goal } from '@/modules/mapmaker/types';

// Unscheduled Palette Component
const UnscheduledPalette = ({ goals, onGoalClick }: { goals: Goal[], onGoalClick?: (goal: Goal) => void }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'palette-zone',
    });

    return (
        <div
            ref={setNodeRef}
            className={`
                p-4 bg-gray-50 rounded-xl border-2 border-dashed
                transition-colors duration-200
                ${isOver ? 'border-deepGreen bg-deepGreen/5' : 'border-gray-300'}
            `}
        >
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                Unscheduled Goals
            </h3>

            {goals.length === 0 ? (
                <p className="text-sm text-gray-400 italic py-2">
                    All goals scheduled!
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {goals.map(goal => (
                        <div key={goal.id} className="w-full sm:w-[200px]">
                            <DraggableGoal
                                goal={goal}
                                onClick={() => onGoalClick?.(goal)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const MapmakerTimelineView = () => {
    const router = useRouter();
    const { goals, updateGoal } = useGoalsStore();
    const [activeGoal, setActiveGoal] = useState<Goal | null>(null); // For Drag Overlay
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null); // For Modal
    const [isInitialized, setIsInitialized] = useState(false);

    // Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    useEffect(() => {
        if (goals.length === 0) {
            router.replace('/mapmaker/select-goals');
            return;
        }
        setIsInitialized(true);
    }, [goals, router]);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const goal = goals.find(g => g.id === active.id);
        if (goal) setActiveGoal(goal);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveGoal(null);

        if (!over) return;

        const goalId = active.id as string;
        const overId = over.id as string;

        // Dropped on a year (format: "year-2025")
        if (overId.startsWith('year-')) {
            const year = parseInt(overId.split('-')[1]);
            if (!isNaN(year)) {
                updateGoal(goalId, { year });
            }
        }
        // Dropped back to palette
        else if (overId === 'palette-zone') {
            updateGoal(goalId, { year: null });
        }
    };

    const handleGoalClick = (goal: Goal) => {
        setEditingGoal(goal);
    };

    const handleSaveGoal = (updated: Goal) => {
        updateGoal(updated.id, {
            year: updated.year,
            cost: updated.cost,
            priority: updated.priority
        });
        setEditingGoal(null);
    };

    if (!isInitialized) return <div className="p-8 text-center">Loading...</div>;

    const scheduledGoals = goals.filter(g => g.year !== null);
    const unscheduledGoals = goals.filter(g => g.year === null);
    const hasScheduledItems = scheduledGoals.length > 0;

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="space-y-8 pb-20">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Timeline</h2>
                    <p className="text-gray-600">Drag your goals to the year you want to achieve them. Click any goal to edit details.</p>
                </div>

                <div className="space-y-6">
                    {/* Palette */}
                    <UnscheduledPalette
                        goals={unscheduledGoals}
                        onGoalClick={handleGoalClick}
                    />

                    {/* Timeline Grid */}
                    <TimelineGrid
                        goals={goals}
                        onGoalClick={handleGoalClick}
                    />
                </div>

                <div className="flex justify-between pt-4">
                    <Link
                        href="/mapmaker/select-goals"
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Back
                    </Link>

                    <Link
                        href="/mapmaker/goal-details"
                        className={`
                            px-6 py-2 rounded-lg font-medium transition-all shadow-md
                            ${hasScheduledItems
                                ? 'bg-deepGreen text-white hover:bg-deepGreen/90'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none pointer-events-none'}
                        `}
                        aria-disabled={!hasScheduledItems}
                    >
                        Next: Goal Details
                    </Link>
                </div>

                <DragOverlay>
                    {activeGoal ? (
                        <div className="w-[200px]">
                            <DraggableGoal goal={activeGoal} isOverlay />
                        </div>
                    ) : null}
                </DragOverlay>

                {editingGoal && (
                    <GoalDetailModal
                        goal={editingGoal}
                        isOpen={!!editingGoal}
                        onSave={handleSaveGoal}
                        onCancel={() => setEditingGoal(null)}
                    />
                )}
            </div>
        </DndContext>
    );
};

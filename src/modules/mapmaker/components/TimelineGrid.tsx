'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Goal } from '@/modules/mapmaker/types';
import { DraggableGoal } from './DraggableGoal';

interface TimelineGridProps {
    goals: Goal[];
    startYear?: number;
    yearsCount?: number;
    onGoalClick?: (goal: Goal) => void;
}

const DroppableYear = ({ year, children }: { year: number; children: React.ReactNode }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `year-${year}`,
        data: { year },
    });

    return (
        <div
            ref={setNodeRef}
            className={`
                flex-1 flex flex-col min-w-[140px] border-r border-gray-100 last:border-r-0
                transition-colors duration-200
                ${isOver ? 'bg-deepGreen/10' : 'bg-transparent'}
            `}
        >
            <div className="p-2 text-center text-xs font-semibold text-gray-500 border-b border-gray-200 bg-gray-50/50 sticky top-0 z-10">
                {year}
            </div>
            <div className="flex-1 p-2 space-y-2 bg-white/50 min-h-[500px]">
                {children}
            </div>
        </div>
    );
};

export const TimelineGrid: React.FC<TimelineGridProps> = ({
    goals,
    startYear = new Date().getFullYear(),
    yearsCount = 15,
    onGoalClick
}) => {
    const years = Array.from({ length: yearsCount }, (_, i) => startYear + i);

    // Group goals by year
    const goalsByYear = years.reduce((acc, year) => {
        acc[year] = goals.filter(g => g.year === year);
        return acc;
    }, {} as Record<number, Goal[]>);

    return (
        <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto custom-scrollbar">
                <div className="flex w-max">
                    {years.map((year) => (
                        <DroppableYear key={year} year={year}>
                            {goalsByYear[year]?.map(goal => (
                                <DraggableGoal
                                    key={goal.id}
                                    goal={goal}
                                    onClick={() => onGoalClick?.(goal)}
                                />
                            ))}
                        </DroppableYear>
                    ))}
                </div>
            </div>
        </div>
    );
};

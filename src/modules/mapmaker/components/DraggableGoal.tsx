'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Goal } from '@/modules/mapmaker/types';

interface DraggableGoalProps {
    goal: Goal;
    isOverlay?: boolean;
    onClick?: () => void;
}

export const DraggableGoal: React.FC<DraggableGoalProps> = ({ goal, isOverlay, onClick }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: goal.id,
        data: { goal },
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={onClick}
            {...listeners}
            {...attributes}
            className={`
                p-2 rounded-lg border shadow-sm cursor-grab select-none
                flex items-center gap-2 bg-white
                ${isDragging ? 'opacity-50' : 'opacity-100'}
                ${isOverlay ? 'shadow-xl scale-105 border-deepGreen' : 'border-gray-200'}
                hover:border-deepGreen hover:shadow-md transition-all
            `}
        >
            <span className="text-xl">{goal.icon}</span>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate leading-tight">{goal.name}</p>
                {goal.cost && (
                    <p className="text-xs text-gray-500">
                        ${(goal.cost / 1000).toFixed(0)}k
                    </p>
                )}
            </div>
        </div>
    );
};

'use client';

import React, { useState, useEffect } from 'react';
import { Goal } from '@/modules/mapmaker/types';
import { PrioritySlider } from '@/components/ui/PrioritySlider';

interface GoalDetailModalProps {
    goal: Goal;
    isOpen: boolean;
    onSave: (updatedGoal: Goal) => void;
    onCancel: () => void;
}

export const GoalDetailModal: React.FC<GoalDetailModalProps> = ({
    goal,
    isOpen,
    onSave,
    onCancel,
}) => {
    // Local state for editing
    const [editedGoal, setEditedGoal] = useState<Goal>(goal);
    const [errors, setErrors] = useState<{ year?: string; cost?: string; priority?: string }>({});

    // Reset state when modal opens or goal changes
    useEffect(() => {
        setEditedGoal(goal);
        setErrors({});
    }, [goal, isOpen]);

    if (!isOpen) return null;

    const handleUpdate = (field: keyof Goal, value: Goal[keyof Goal]) => {
        setEditedGoal(prev => ({ ...prev, [field]: value }));
        // Clear error for field on change
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        let isValid = true;
        const currentYear = new Date().getFullYear();

        if (editedGoal.year !== null && editedGoal.year < currentYear) {
            newErrors.year = `Year must be ${currentYear} or later`;
            isValid = false;
        }

        if (editedGoal.cost !== null && editedGoal.cost < 0) {
            newErrors.cost = "Cost cannot be negative";
            isValid = false;
        }

        // Priority is handled by slider constraints usually, but good to check
        if (editedGoal.priority && (editedGoal.priority < 1 || editedGoal.priority > 5)) {
            newErrors.priority = "Priority must be 1-5";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSave(editedGoal);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{editedGoal.icon}</span>
                        <h3 className="text-xl font-semibold text-gray-900">{editedGoal.name}</h3>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Target Year</label>
                            <input
                                type="number"
                                value={editedGoal.year || ''}
                                onChange={(e) => handleUpdate('year', e.target.value ? parseInt(e.target.value) : null)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGreen ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="TBD"
                            />
                            {errors.year && <p className="text-xs text-red-500">{errors.year}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Estimated Cost ($)</label>
                            <input
                                type="number"
                                value={editedGoal.cost || ''}
                                onChange={(e) => handleUpdate('cost', e.target.value ? parseFloat(e.target.value) : null)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGreen ${errors.cost ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="0"
                            />
                            {errors.cost && <p className="text-xs text-red-500">{errors.cost}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <PrioritySlider
                            value={editedGoal.priority || 3}
                            onChange={(val) => handleUpdate('priority', val)}
                            label="Priority"
                        />
                        {errors.priority && <p className="text-xs text-red-500">{errors.priority}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-deepGreen rounded-lg hover:bg-deepGreen/90"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

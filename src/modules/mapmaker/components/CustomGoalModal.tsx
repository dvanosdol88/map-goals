'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CustomGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string, icon: string) => void;
}

export const CustomGoalModal: React.FC<CustomGoalModalProps> = ({
    isOpen,
    onClose,
    onAdd,
}) => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Focus name input when modal opens
    useEffect(() => {
        if (isOpen) {
            setName('');
            setIcon('');
            // Small timeout to ensure DOM is ready
            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 50);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        // Default icon if empty
        const finalIcon = icon.trim() || '⭐';
        onAdd(name.trim(), finalIcon);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="p-6 space-y-4">
                    <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
                        Add Custom Goal
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="goal-name" className="block text-sm font-medium text-gray-700">
                                Goal Name
                            </label>
                            <input
                                ref={nameInputRef}
                                id="goal-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Buy a Boat"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGreen focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="goal-icon" className="block text-sm font-medium text-gray-700">
                                Icon (Emoji)
                            </label>
                            <input
                                id="goal-icon"
                                type="text"
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                placeholder="⭐"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGreen focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500">
                                Paste an emoji or type a short symbol. Defaults to ⭐.
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!name.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-deepGreen rounded-lg hover:bg-deepGreen/90 focus:outline-none focus:ring-2 focus:ring-deepGreen focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Goal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

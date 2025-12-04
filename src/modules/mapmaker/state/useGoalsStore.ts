import { create } from 'zustand';
import { Goal } from '../types';

interface GoalsState {
    goals: Goal[];
    addGoal: (goal: Goal) => void;
    removeGoal: (id: string) => void;
    clearGoals: () => void;
}

export const useGoalsStore = create<GoalsState>((set) => ({
    goals: [],
    addGoal: (goal) => set((state) => ({
        goals: [...state.goals, goal]
    })),
    removeGoal: (id) => set((state) => ({
        goals: state.goals.filter((g) => g.id !== id)
    })),
    clearGoals: () => set({ goals: [] }),
}));

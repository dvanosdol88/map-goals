import { create } from 'zustand';
import { Goal } from '../types';

interface GoalsState {
    goals: Goal[];
    setGoals: (goals: Goal[]) => void;
    clearGoals: () => void;
}

export const useGoalsStore = create<GoalsState>((set) => ({
    goals: [],
    setGoals: (goals) => set({ goals }),
    clearGoals: () => set({ goals: [] }),
}));

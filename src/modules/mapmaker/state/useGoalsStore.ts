import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal } from '../types';

interface GoalsState {
    goals: Goal[];
    setGoals: (goals: Goal[]) => void;
    addGoal: (goal: Goal) => void;
    removeGoal: (id: string) => void;
    clearGoals: () => void;
}

export const useGoalsStore = create<GoalsState>()(
    persist(
        (set) => ({
            goals: [],
            setGoals: (goals) => set({ goals }),
            addGoal: (goal) => set((state) => ({
                goals: [...state.goals, goal]
            })),
            removeGoal: (id) => set((state) => ({
                goals: state.goals.filter((g) => g.id !== id)
            })),
            clearGoals: () => set({ goals: [] }),
        }),
        {
            name: 'mapmaker-goals',
        }
    )
);

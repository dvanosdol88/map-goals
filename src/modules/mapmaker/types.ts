export type Priority = 1 | 2 | 3 | 4 | 5;

export interface Goal {
    id: string;
    name: string;
    icon: string;
    year: number | null;
    cost: number | null;
    priority: Priority | null;
    customNotes: string;
    isCustom?: boolean;
}

const goalDefaults: Omit<Goal, 'id' | 'name' | 'icon'> = {
    year: null,
    cost: null,
    priority: null,
    customNotes: "",
};

export const createGoal = (
    partial: Pick<Goal, 'id' | 'name' | 'icon'> & Partial<Goal>
): Goal => ({
    ...goalDefaults,
    ...partial,
});

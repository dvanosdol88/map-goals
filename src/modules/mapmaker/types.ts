export interface Goal {
    id: string;
    name: string;
    icon: string;
    year: number | null;
    cost: number | null;
    priority: number | null; // 1-5 scale
    customNotes?: string;
}

import { ReactNode } from 'react';

export interface Goal {
    id: string;
    title: string;
    icon?: ReactNode;
    description?: string;
}

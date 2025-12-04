import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ProgressTracker } from '../ui/ProgressTracker';

interface AppShellProps {
    children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/mapmaker/welcome" className="text-xl font-bold text-gray-900">
                        Mapmaker
                    </Link>
                </div>
                <div className="flex items-center gap-6">
                    <ProgressTracker />
                    <nav className="flex gap-4 text-sm font-medium text-gray-600">
                        <Link href="/mapmaker/select-goals" className="hover:text-gray-900">Goals</Link>
                        <Link href="/mapmaker/timeline" className="hover:text-gray-900">Timeline</Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
                {children}
            </main>
        </div>
    );
};

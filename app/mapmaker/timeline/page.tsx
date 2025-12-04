import Link from 'next/link';
import { TimelineGrid } from '@/components/ui/TimelineGrid';

export default function TimelinePage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Timeline</h2>
                <p className="text-gray-600">Drag your goals to the year you want to achieve them.</p>
            </div>

            <TimelineGrid />

            <div className="flex justify-end">
                <Link
                    href="/mapmaker/goal-details"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Next: Goal Details
                </Link>
            </div>
        </div>
    );
}

import Link from 'next/link';

export default function TimelinePage() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Timeline</h2>
            <p>Adjust your timeline.</p>
            <Link href="/mapmaker/goal-details" className="text-blue-600 hover:underline">
                Next: Goal Details
            </Link>
        </div>
    );
}

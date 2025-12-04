import Link from 'next/link';

export default function GoalDetailsPage() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Goal Details</h2>
            <p>Refine your goals.</p>
            <Link href="/mapmaker/summary" className="text-blue-600 hover:underline">
                Next: Summary
            </Link>
        </div>
    );
}

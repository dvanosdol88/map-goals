import Link from 'next/link';

export default function SelectGoalsPage() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Select Goals</h2>
            <p>Choose your goals.</p>
            <Link href="/mapmaker/timeline" className="text-blue-600 hover:underline">
                Next: Timeline
            </Link>
        </div>
    );
}

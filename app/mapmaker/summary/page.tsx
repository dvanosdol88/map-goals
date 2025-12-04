import Link from 'next/link';

export default function SummaryPage() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Summary</h2>
            <p>Review your plan.</p>
            <Link href="/mapmaker/welcome" className="text-blue-600 hover:underline">
                Start Over
            </Link>
        </div>
    );
}

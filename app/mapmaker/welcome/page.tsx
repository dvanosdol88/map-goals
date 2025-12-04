import Link from 'next/link';

export default function WelcomePage() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome to Mapmaker</h2>
            <p>Start your journey here.</p>
            <Link href="/mapmaker/select-goals" className="text-blue-600 hover:underline">
                Get Started
            </Link>
        </div>
    );
}

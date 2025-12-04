import Link from 'next/link';

export default function WelcomePage() {
    return (
        <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    Welcome to Mapmaker
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    We'll help you build a financial roadmap tailored to your life goals.
                    It only takes a few minutes to get started.
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-4">
                <Link
                    href="/mapmaker/select-goals"
                    className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                    Start Mapping
                </Link>
                <Link
                    href="/mapmaker/summary"
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium hover:underline"
                >
                    Skip for now
                </Link>
            </div>
        </div>
    );
}

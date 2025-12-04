'use client';

import { SummaryCard } from '@/components/ui/SummaryCard';

const MOCK_SUMMARY = [
    { id: '1', icon: '🏖️', title: 'Retire Early', subtitle: 'Target: 2045', meta: 'Priority: 5/5 • $1,000,000' },
    { id: '2', icon: '🏠', title: 'Buy a Home', subtitle: 'Target: 2027', meta: 'Priority: 4/5 • $400,000' },
    { id: '3', icon: '🎓', title: 'Save for Education', subtitle: 'Target: 2035', meta: 'Priority: 3/5 • $150,000' },
];

export default function SummaryPage() {
    const handleConfirm = () => {
        console.log('Plan confirmed!', MOCK_SUMMARY);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Summary</h2>
                <p className="text-gray-600">Review your financial roadmap.</p>
            </div>

            <div className="space-y-4">
                {MOCK_SUMMARY.map((goal) => (
                    <SummaryCard
                        key={goal.id}
                        icon={goal.icon}
                        title={goal.title}
                        subtitle={goal.subtitle}
                        meta={goal.meta}
                    />
                ))}
            </div>

            <div className="flex justify-end gap-4">
                <button
                    onClick={handleConfirm}
                    className="px-6 py-3 bg-deepGreen text-white font-semibold rounded-lg hover:bg-deepGreen/90 transition-colors"
                >
                    Confirm Plan
                </button>
            </div>
        </div>
    );
}

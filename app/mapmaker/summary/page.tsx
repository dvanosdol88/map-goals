import { AppShell } from '@/components/layout/AppShell';
import { MapmakerSummaryView } from '@/modules/mapmaker/views/MapmakerSummaryView';

export default function SummaryPage() {
    return (
        <AppShell>
            <MapmakerSummaryView />
        </AppShell>
    );
}

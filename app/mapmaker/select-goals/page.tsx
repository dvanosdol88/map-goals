import { AppShell } from '@/components/layout/AppShell';
import { MapmakerSelectGoalsView } from '@/modules/mapmaker/views/MapmakerSelectGoalsView';

export default function SelectGoalsPage() {
    return (
        <AppShell>
            <MapmakerSelectGoalsView />
        </AppShell>
    );
}

import { AppShell } from '@/components/layout/AppShell';
import { MapmakerGoalDetailsView } from '@/modules/mapmaker/views/MapmakerGoalDetailsView';

export default function GoalDetailsPage() {
    return (
        <AppShell>
            <MapmakerGoalDetailsView />
        </AppShell>
    );
}

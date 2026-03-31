import { AppShell } from '@/components/layout/AppShell';
import { MapmakerTimelineView } from '@/modules/mapmaker/views/MapmakerTimelineView';

export default function TimelinePage() {
    return (
        <AppShell>
            <MapmakerTimelineView />
        </AppShell>
    );
}

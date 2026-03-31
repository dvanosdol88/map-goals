import { AppShell } from '@/components/layout/AppShell';
import { MapmakerWelcomeView } from '@/modules/mapmaker/views/MapmakerWelcomeView';

export default function WelcomePage() {
    return (
        <AppShell>
            <MapmakerWelcomeView />
        </AppShell>
    );
}

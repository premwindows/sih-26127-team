'use client';

import { useState } from 'react';
import { CommandBar } from '@/components/CommandBar';
import { DynamicWorkspace } from '@/components/DynamicWorkspace';
import type { WorkspacePlan } from '@/lib/ui-types';

const emptyPlan: WorkspacePlan = { mode: 'empty', components: [] };

export default function Home() {
  const [plan, setPlan] = useState<WorkspacePlan>(emptyPlan);

  function handleCommand(command: string) {
    const normalized = command.toLowerCase();

    // Mock UI planner only. Replace this with the future AI orchestration endpoint.
    if (normalized.includes('traffic')) {
      setPlan({
        mode: 'traffic_intelligence',
        components: [
          { id: 'traffic', type: 'traffic_overview', title: 'Traffic intelligence' },
        ],
      });
      return;
    }

    setPlan({
      mode: 'vehicle_investigation',
      components: [
        { id: 'vehicle', type: 'vehicle_profile', title: 'Vehicle' },
        { id: 'map', type: 'trajectory_map', title: 'Trajectory' },
        { id: 'timeline', type: 'detection_timeline', title: 'Detection history' },
        { id: 'video', type: 'video_player', title: 'Relevant footage' },
        { id: 'alerts', type: 'alert_status', title: 'Alerts & anomalies' },
      ],
    });
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <div className="brand">CENTRAL AI</div>
          <div className="subtitle">Urban traffic intelligence workspace</div>
        </div>
        <div className="system-status"><span /> SYSTEM READY</div>
      </header>

      <DynamicWorkspace plan={plan} />
      <CommandBar onSubmit={handleCommand} />
    </main>
  );
}

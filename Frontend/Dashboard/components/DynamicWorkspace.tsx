import type { WorkspacePlan } from '@/lib/ui-types';
import { VehicleCard } from './VehicleCard';
import { TrajectoryMap } from './TrajectoryMap';
import { DetectionTimeline } from './DetectionTimeline';
import { VideoPanel } from './VideoPanel';
import { AlertCard } from './AlertCard';
import { TrafficOverview } from './TrafficOverview';

export function DynamicWorkspace({ plan }: { plan: WorkspacePlan }) {
  if (plan.mode === 'empty') {
    return (
      <section className="workspace empty-workspace">
        <div className="empty-center">
          <div className="ai-orb">AI</div>
          <h1>What would you like to investigate?</h1>
          <p>Ask in natural language. The workspace will assemble the relevant intelligence.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="workspace">
      <div className="workspace-heading">
        <div>
          <span className="eyebrow">ACTIVE INVESTIGATION</span>
          <h1>{plan.mode === 'traffic_intelligence' ? 'Traffic intelligence' : 'Vehicle investigation'}</h1>
        </div>
        <span className="mock-badge">MOCK UI STATE</span>
      </div>

      <div className="workspace-grid">
        {plan.components.map((component) => {
          switch (component.type) {
            case 'vehicle_profile': return <VehicleCard key={component.id} />;
            case 'trajectory_map': return <TrajectoryMap key={component.id} />;
            case 'detection_timeline': return <DetectionTimeline key={component.id} />;
            case 'video_player': return <VideoPanel key={component.id} />;
            case 'alert_status': return <AlertCard key={component.id} />;
            case 'traffic_overview': return <TrafficOverview key={component.id} />;
            default: return null;
          }
        })}
      </div>
    </section>
  );
}

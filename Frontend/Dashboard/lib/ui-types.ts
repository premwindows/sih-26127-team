export type ComponentType =
  | 'vehicle_profile'
  | 'trajectory_map'
  | 'detection_timeline'
  | 'video_player'
  | 'alert_status'
  | 'traffic_overview';

export type WorkspaceComponent = {
  id: string;
  type: ComponentType;
  title?: string;
};

export type WorkspacePlan = {
  mode: 'empty' | 'vehicle_investigation' | 'traffic_intelligence' | 'alert_investigation';
  components: WorkspaceComponent[];
};

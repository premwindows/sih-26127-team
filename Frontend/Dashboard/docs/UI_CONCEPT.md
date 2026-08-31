# UI Concept & Implementation Instructions

## 1. The shell

Keep one persistent application shell. Do not create separate top-level pages for every capability.

The shell contains:

- Minimal top status/header
- Dynamic workspace/canvas
- Persistent command/chat bar
- Optional investigation/session controls

## 2. Component registry

Maintain a controlled registry of allowed components.

Conceptually:

```ts
const registry = {
  vehicle_profile: VehicleCard,
  trajectory_map: TrajectoryMap,
  detection_timeline: DetectionTimeline,
  video_player: VideoPanel,
  alert_status: AlertCard,
  traffic_overview: TrafficOverview,
};
```

When the future AI returns a component type, only registered components can render.

## 3. Workspace state

Keep workspace state separate from raw data. A workspace should describe **what is visible**, not contain the entire city dataset.

Example concept:

```text
workspace
├── mode
├── components[]
├── filters
├── focusedEntity
└── selectedTimeRange
```

Actual domain data should later come from backend APIs.

## 4. Layout behavior

Use a responsive grid. Components should be able to occupy different sizes.

Suggested behavior:

- Map: large/focal area
- Vehicle/profile cards: compact
- Timeline: full width
- Video: medium/large
- Alerts: compact but prominent
- Tables: expandable

The AI can eventually suggest layout priority, while the frontend remains responsible for enforcing valid layout constraints.

## 5. Progressive rendering

Do not wait for every possible result before showing the workspace.

For a future request:

```text
User query
  ↓
Show investigation shell
  ↓
Vehicle identity appears
  ↓
Timeline appears
  ↓
Trajectory appears
  ↓
Additional information appears
```

This makes the application feel responsive and intelligent.

## 6. Conversational modifications

A follow-up should modify the current workspace where possible rather than reset it.

Examples:

- `Show yesterday` → update filters
- `Remove RTO` → remove RTO component
- `Show cameras` → add camera component
- `Open the second sighting` → focus video/map/timeline on that detection
- `Compare with MH14XY5678` → add comparison state

## 7. Empty state

The empty state should be visually clean. Avoid filling it with permanent charts that turn the product into a conventional dashboard.

Useful suggestions can appear below the command bar:

- Search a vehicle
- Investigate an alert
- Explore traffic
- Compare routes

## 8. Video UX

A video panel should support, in the future:

- Camera identifier
- Detection timestamp
- Play/pause
- Seek
- Optional short pre/post detection window
- Link back to the detection and map location

Do not place actual video blobs in frontend state.

## 9. GIS UX

The map component should eventually support:

- Camera markers
- Detection markers
- Trajectory lines
- Selected detection
- Time-based filtering
- Route comparison
- Congestion overlays

The map is a visualization of geographic information; it is not the source of truth.

## 10. Avoid these mistakes

- Do not make one giant React component.
- Do not let the LLM generate arbitrary JSX/HTML.
- Do not hardcode a separate page for every AI intent.
- Do not put large videos into application state.
- Do not put the whole dataset into the AI prompt.
- Do not confuse a visualization with the underlying data/service.
- Do not expose sensitive vehicle/footage information without authorization.

## 11. Definition of done for the frontend prototype

A strong prototype should demonstrate this sequence entirely on mock UI state:

1. Start with a blank workspace.
2. Enter a natural-language vehicle query.
3. Generate a simulated structured UI plan.
4. Render the appropriate components dynamically.
5. Keep the workspace visible.
6. Enter a follow-up request.
7. Modify the existing workspace rather than navigating away.
8. Open a mock video panel for a selected detection.
9. Change filters/time range and update visible components.
10. Return to an empty/new investigation cleanly.

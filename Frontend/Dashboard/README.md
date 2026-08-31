# Central AI Traffic Intelligence — Dynamic Dashboard

A frontend-only concept for a city-wide ANPR/traffic intelligence platform. The dashboard is designed as an **AI-controlled workspace**, not a conventional collection of fixed pages.

> **Core idea:** the user asks the Central AI what they want to investigate; the AI selects capabilities and the workspace dynamically assembles the relevant visual components.

## What this repository contains

This package contains the **dashboard/UI concept only**. It deliberately does **not** include:

- Backend services or APIs
- Database schemas or data models
- ANPR/OCR implementation
- CCTV ingestion/streaming infrastructure
- RTO integrations
- Authentication/authorization backend
- Production AI model integration

Those should be connected later without changing the fundamental UI architecture.

## UX vision

The application behaves more like an intelligent operating workspace than a traditional dashboard.

### Initial state

A clean workspace with a command/chat bar.

```text
┌────────────────────────────────────────────────────────────┐
│ CENTRAL AI                                      SYSTEM OK   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                  What would you like to investigate?       │
│                                                            │
│                                                            │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ Ask Central AI...                                   Send   │
└────────────────────────────────────────────────────────────┘
```

### Example: vehicle investigation

User:

> Find MH12AB1234

The future AI orchestrator would request the required capabilities and return a UI plan. The frontend renders that plan using pre-built components:

- Vehicle profile
- Detection history
- GIS trajectory
- Camera sightings
- Video player/footage reference
- RTO information
- Alert status
- AI summary

The user can then continue conversationally:

> Show yesterday only.

> Open the footage from the second camera.

> Compare this route with another vehicle.

The workspace changes without forcing the operator through unrelated pages.

## Core architectural principle

**AI decides. Tools provide information. React renders the workspace.**

```text
User
  │
  ▼
Chat / Command Bar
  │
  ▼
Central AI Orchestrator       ← future integration point
  │
  ├── ANPR/OCR
  ├── Vehicle search
  ├── Trajectory analysis
  ├── GIS
  ├── Traffic analytics
  ├── Video retrieval
  ├── Alerts
  └── Other authorized tools
  │
  ▼
Structured UI Plan            ← future integration point
  │
  ▼
Dynamic Workspace Renderer
  │
  ├── Maps
  ├── Video
  ├── Tables
  ├── Timelines
  ├── Cards
  └── Charts
```

## Important design decision

Do **not** make the LLM generate arbitrary HTML/React code.

Instead, the future AI should return a controlled structured description such as:

```json
{
  "workspace": "vehicle_investigation",
  "components": [
    { "type": "vehicle_profile", "id": "vehicle" },
    { "type": "trajectory_map", "id": "trajectory" },
    { "type": "detection_timeline", "id": "timeline" },
    { "type": "video_player", "id": "footage" },
    { "type": "alert_status", "id": "alerts" }
  ]
}
```

The renderer maps each allowed `type` to a known React component. This keeps the interface consistent, testable, and secure.

## Included UI components

The starter concept includes placeholders for:

- `DynamicWorkspace` — the main adaptive canvas
- `CommandBar` — natural-language interaction surface
- `VehicleCard` — vehicle investigation summary
- `TrajectoryMap` — map/route placeholder
- `DetectionTimeline` — chronological sightings
- `VideoPanel` — footage placeholder
- `AlertCard` — alert/anomaly placeholder
- `TrafficOverview` — traffic analytics placeholder

The placeholders intentionally use mock presentation state only. No real traffic data is included.

## Suggested frontend stack

- Next.js / React
- TypeScript
- Tailwind CSS
- MapLibre or Mapbox for the eventual GIS layer
- A controlled grid/layout library if dynamic resizing is required
- Recharts/ECharts for analytics
- Native video player or a dedicated player component for authorized footage

## Dynamic workspace states

The UI should support several modes without becoming separate dashboards:

### Empty

Minimal canvas + suggestions + command bar.

### Vehicle investigation

Vehicle profile + trajectory + detections + footage + alerts.

### Traffic intelligence

Map + congestion + density + speed + trends + camera context.

### Route comparison

Two or more trajectories + synchronized timeline + comparison insights.

### Alert investigation

Alert details + relevant vehicle + nearby cameras + timeline + footage.

The AI should select a mode and components based on the user's request rather than the user manually navigating to a page.

## Interaction model

The workspace is persistent within an investigation session.

Commands can:

- Add a component
- Remove a component
- Replace a component
- Resize/rearrange components
- Filter existing information
- Focus a map location
- Seek a video to a detection timestamp
- Change the time range
- Compare entities
- Ask for an explanation of the current evidence

Example:

```text
User: Find MH12AB1234
       ↓
Workspace created
       ↓
User: Show yesterday
       ↓
Existing workspace filtered
       ↓
User: Open the second camera footage
       ↓
Video panel added/focused at the relevant timestamp
```

## Video concept

The AI should never stream video itself. A future video service should return an authorized video/segment reference; the dashboard then renders it.

```text
AI request
   ↓
Authorized video retrieval service
   ↓
Video/segment reference
   ↓
VideoPanel
```

This keeps large media outside the UI state and makes the frontend independent of storage/streaming implementation.

## Repository structure

```text
traffic-ai-dashboard/
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── CommandBar.tsx
│   ├── DynamicWorkspace.tsx
│   ├── VehicleCard.tsx
│   ├── TrajectoryMap.tsx
│   ├── DetectionTimeline.tsx
│   ├── VideoPanel.tsx
│   ├── AlertCard.tsx
│   └── TrafficOverview.tsx
├── lib/
│   └── ui-types.ts
├── public/
└── docs/
    └── UI_CONCEPT.md
```

## Getting started

Requirements:

- Node.js 20+
- npm

```bash
npm install
npm run dev
```

Open the local Next.js development URL shown in the terminal.

## Future integration points

When the rest of the system is built, the frontend should eventually consume:

1. **AI orchestration endpoint** — natural-language request → structured workspace plan
2. **Tool/result endpoints** — vehicle, detection, trajectory, traffic, alerts, GIS, and video references
3. **Session state** — persistent investigation context
4. **Authorized media endpoint** — video/image segments
5. **Map data endpoint** — geographic objects and trajectory geometry

These are intentionally **not implemented here**.

## Scope and safety

This UI concept is intended for a lawful, authorized traffic-management/security deployment. Any eventual implementation should enforce role-based access, audit logging, data retention rules, privacy controls, and authorization before exposing vehicle information or surveillance footage.

## Design goal

The final product should feel like:

> **One intelligent city-traffic workspace rather than ten disconnected dashboards.**

The dashboard is the visualization layer. The **Central AI Orchestrator is the main brain** that decides which capabilities are needed and how the results should be presented.

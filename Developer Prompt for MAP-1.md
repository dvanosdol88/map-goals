Developer Prompt for MAP-1

Title: Set up frontend skeleton for Mapmaker module
Status: Todo
Priority: High
Estimate: 1

Prompt to Developer:
Build the initial frontend skeleton for the Mapmaker module according to the RIA design system and the Mapmaker UI/UX spec. Your deliverable is a fully functioning project scaffold with routing, layouts, design tokens, and foundational components installed—but without any Mapmaker business logic implemented yet.

Requirements
1. Choose and initialize the framework

Use Next.js 14 (App Router) or Vite + React. Favor Next.js unless otherwise constrained.
Initialize the project with TypeScript enabled.

2. Install and configure TailwindCSS

Tailwind is the primary styling framework.
Configure the project with:

Global Inter font (as specified across design system docs: Inter SemiBold for headings, Inter Regular for body)

Tailwind plugins: @tailwind/forms, @tailwind/typography

Base global styles in globals.css, including resets and Tailwind layers.

Ensure the layout follows the design guidance: 12-column responsive grid, whitespace-heavy, clean institutional UI (Mapmaker spec section “Layout & Responsiveness”).

3. Implement brand color tokens in Tailwind

Extend tailwind.config.js with the RIA design palette:

Deep Green: #006341 (Primary CTAs, highlights)

Light Green: #00915A (Accents, hover/active states)

Gold: #C1A75C (Subtle emphasis)

Beige: #FAF9F7 (Neutral surfaces)

Grays: Gray-100, Gray-300, Gray-700, Gray-950 for text and structural UI.

Add them as semantic tokens (e.g. bg-deepGreen, text-lightGreen, etc.) per Tailwind theme.extend.colors.

4. Establish project structure & base layout

Create a folder structure like:

src/
  app/                 # Next.js App Router or /src root for Vite
  components/
    layout/
    ui/
  modules/
    mapmaker/
      components/
      pages/ or route segment


Implement:

A root layout with global typography + color tokens applied.

A header placeholder that will eventually hold the ProgressTracker (Mapmaker spec).

A container with max width ~1200px using the 12-column grid.

5. Create empty route stubs for the Mapmaker flow

Per the Mapmaker spec, create these route placeholders:

/mapmaker/welcome (Welcome screen)

/mapmaker/select-goals (Goal selector)

/mapmaker/timeline (Timeline placement)

/mapmaker/goal-details (Detail modal will be integrated later)

/mapmaker/summary (Summary and confirmation)

Each page should:

Render a simple <div> placeholder with the correct title.

Import the global layout.

Confirm routing works end-to-end.

6. Add placeholder components

Create the shell components only—no logic yet:

GoalCard (empty markup; styled container only)

TimelineGrid (empty box with placeholder columns)

PrioritySlider (placeholder slider UI)

ProgressTracker (simple top bar placeholder)

SummaryCard (empty horizontal card)

Do not implement behavior—UI scaffolding only.

7. Define the goal data model

Add a TypeScript interface exactly following the Mapmaker spec:

export interface Goal {
  id: string;
  name: string;
  icon: string;
  year: number | null;
  cost: number | null;
  priority: number | null;
  customNotes?: string;
}


Spec reference: Mapmaker Goal Data Schema.

8. Add placeholder global state

Use either Context or Zustand.
Just create an empty store:

goals: Goal[] = []
setGoals: () => void


No logic required yet.

9. Deliverables for MAP-1

By the end of this issue, we should have:

A running project (npm run dev)

Tailwind configured with brand tokens

Inter font applied

A clean layout shell

Routing skeleton for all Mapmaker pages

Placeholder components with no logic

A defined Goal interface + empty store

This gives us a strong foundation to begin real component and flow implementation in MAP-2 through MAP-9.

If you'd like, I can also:

generate this as a Linear-ready issue description,

turn it into an onboarding README for engineers, or

scaffold the actual project structure + code for you.

You said:

* scaffold the actual project structure + code for you.

yes please
ChatGPT said:
Thought for 10s

Got it. Let’s actually build this thing instead of just talking about it.

Below you’ll find:

Linear-ready issue description for MAP-1

README snippet you can drop into the repo

Concrete project scaffold + code for a Next.js 14 + Tailwind + Mapmaker skeleton

You (or your dev) can copy–paste these into files and run.

1) Linear Issue Description (MAP-1)

You can paste this directly into Linear as the Description for MAP-1 – Set up frontend skeleton.

### Objective

Set up the initial frontend skeleton for the **Mapmaker** module using **Next.js 14 (App Router) + TypeScript + TailwindCSS**, wired to the RIA design system (Inter typography + Fidelity-style palette). No Mapmaker business logic yet—this is about getting the project into a “clean, ready-to-build” state.

---

### Requirements

#### 1. Framework & Project Init
- Use **Next.js 14 (App Router)** with **TypeScript**.
- Initialize the project (e.g. `npx create-next-app@latest mapmaker-app --typescript --tailwind --src-dir --app`).
- Confirm `npm run dev` starts the dev server with no errors.

#### 2. Tailwind & Design System
- Tailwind already installed by the starter, but:
  - Ensure Tailwind is wired via `globals.css` and `tailwind.config`.
  - Apply **Inter** as the primary font (headings: Inter SemiBold; body: Inter Regular).
  - Implement RIA color tokens in `tailwind.config`:

    - `deepGreen: "#006341"`  
    - `lightGreen: "#00915A"`  
    - `gold: "#C1A75C"`  
    - `beige: "#FAF9F7"`  
    - Neutrals: `gray-100`, `gray-300`, `gray-700`, `gray-950` using Tailwind’s default gray scale or mapped aliases.

- Configure a max-width container (~1200px) and 12-column grid in a reusable layout component.

#### 3. Project Structure

Create a structure similar to:

```text
src/
  app/
    layout.tsx
    page.tsx
    mapmaker/
      welcome/page.tsx
      select-goals/page.tsx
      timeline/page.tsx
      goal-details/page.tsx
      summary/page.tsx
  components/
    layout/AppShell.tsx
    ui/GoalCard.tsx
    ui/TimelineGrid.tsx
    ui/PrioritySlider.tsx
    ui/ProgressTracker.tsx
    ui/SummaryCard.tsx
  modules/
    mapmaker/state/useGoalsStore.ts
    mapmaker/types.ts

4. Routing Skeleton

Create the following routes under src/app/mapmaker:

/mapmaker/welcome – Welcome screen placeholder

/mapmaker/select-goals – Goal selector placeholder

/mapmaker/timeline – Timeline placement placeholder

/mapmaker/goal-details – Goal details placeholder

/mapmaker/summary – Summary & confirmation placeholder

Each page should:

Use the shared AppShell layout.

Render a heading with the screen name and a short description.

Include simple navigation links (e.g. “Next” button) so we can click through the flow end-to-end.

5. Placeholder Components (UI-Only, No Logic)

Under src/components/ui, create shells for:

GoalCard – Card with icon/title slots, clickable, Tailwind-styled.

TimelineGrid – A horizontally scrollable section with mock year columns.

PrioritySlider – Slider-like control stub (no actual slider logic needed yet).

ProgressTracker – Simple progress bar or step indicator along the top.

SummaryCard – Card to display goal summary info (icon, name, year, amount).

These components should be visually styled but not wired to real data.

6. Goal Data Model & Store

Under src/modules/mapmaker:

types.ts – Define the Goal interface:

export interface Goal {
  id: string;
  name: string;
  icon: string;
  year: number | null;
  cost: number | null;
  priority: number | null;
  customNotes?: string;
}


state/useGoalsStore.ts – Implement a minimal Zustand or Context-based store:

interface GoalsState {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  clearGoals: () => void;
}


For MAP-1, this can just be a stub implementation; we will extend it in later issues.

Definition of Done

npm run dev starts without errors.

All /mapmaker/* routes load successfully.

Layout uses Inter font + RIA color palette.

Placeholder UI components exist and render on their respective pages.

Goal interface and a stub store are defined and imported without TypeScript errors.


---

## 2) README Snippet for the Repo

Drop this into `README.md` at the root of the project.

```markdown
# Mapmaker – Interactive Goal-Planning (Frontend Skeleton)

This repo contains the frontend skeleton for the **Mapmaker** module of a tech-enabled, flat-fee RIA. It uses **Next.js 14 (App Router)**, **TypeScript**, and **TailwindCSS**, with a design system based on Inter typography and a Fidelity-style palette.

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- TailwindCSS
- Zustand (for Mapmaker state, expandable later)

## Getting Started

```bash
# install dependencies
npm install

# run dev server
npm run dev


Then open http://localhost:3000
 in your browser.

Project Structure
src/
  app/
    layout.tsx          # Root layout with Inter + design system
    page.tsx            # Landing page
    mapmaker/
      welcome/page.tsx        # Mapmaker Welcome
      select-goals/page.tsx   # Goal selection screen
      timeline/page.tsx       # Timeline placement screen
      goal-details/page.tsx   # Goal details screen
      summary/page.tsx        # Summary & confirmation screen
  components/
    layout/AppShell.tsx
    ui/GoalCard.tsx
    ui/TimelineGrid.tsx
    ui/PrioritySlider.tsx
    ui/ProgressTracker.tsx
    ui/SummaryCard.tsx
  modules/
    mapmaker/types.ts
    mapmaker/state/useGoalsStore.ts

Mapmaker v1 Scope (High-Level)

v1 focuses on basic goal creation and summary:

Welcome screen

Goal selection

Simple goal details (year, cost, priority)

Summary & confirmation

Future versions will add:

Drag-and-drop timeline

AI guidance

Richer analytics and planning features

Scripts

npm run dev – Start dev server

npm run build – Create production build

npm run start – Run production server

npm run lint – Lint codebase


---

## 3) Concrete Project Scaffold + Code

Assume you’ve run something like:

```bash
npx create-next-app@latest mapmaker-app \
  --typescript --tailwind --eslint --app --src-dir


Below are the key files to customize.

3.1 tailwind.config.mjs

Replace the generated colors section with this extended palette:

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        deepGreen: '#006341',
        lightGreen: '#00915A',
        gold: '#C1A75C',
        beige: '#FAF9F7',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;

3.2 src/app/globals.css

Ensure Tailwind and base styles are wired:

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

body {
  @apply font-sans bg-beige text-gray-900;
}

3.3 src/app/layout.tsx

Root layout with Inter + container:

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mapmaker – Goal Planning',
  description: 'Interactive goal-planning tool for a tech-enabled RIA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-beige">
          {children}
        </div>
      </body>
    </html>
  );
}

3.4 src/components/layout/AppShell.tsx

Shared layout shell with header + container:

'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { ProgressTracker } from '@/components/ui/ProgressTracker';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-semibold text-deepGreen">
            RIA Mapmaker
          </Link>
          <nav className="flex gap-4 text-sm text-gray-700">
            <Link href="/mapmaker/welcome">Mapmaker</Link>
          </nav>
        </div>
        <div className="border-t border-gray-100 bg-beige/60">
          <div className="mx-auto max-w-container px-4 py-2">
            <ProgressTracker />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-beige">
        <div className="mx-auto max-w-container px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

3.5 src/components/ui/ProgressTracker.tsx

Simple placeholder progress bar:

'use client';

export function ProgressTracker() {
  // Static placeholder for now (e.g., at step 1 of 5)
  const progressPercent = 20;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>Onboarding</span>
        <span>Step 1 of 5</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-lightGreen transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

3.6 Mapmaker UI shells
src/components/ui/GoalCard.tsx
'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface GoalCardProps {
  icon?: ReactNode;
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

export function GoalCard({ icon, title, selected, onClick }: GoalCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-col items-start rounded-xl border p-4 text-left shadow-sm transition',
        'hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightGreen',
        selected
          ? 'border-lightGreen bg-white'
          : 'border-gray-200 bg-white'
      )}
    >
      <div className="mb-2 text-2xl">{icon ?? '🎯'}</div>
      <div className="text-sm font-medium text-gray-900">{title}</div>
    </button>
  );
}

src/components/ui/TimelineGrid.tsx
'use client';

const MOCK_YEARS = [2025, 2030, 2035, 2040, 2045];

export function TimelineGrid() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex gap-4">
        {MOCK_YEARS.map((year) => (
          <div
            key={year}
            className="flex min-w-[80px] flex-col items-center justify-start gap-2"
          >
            <span className="text-xs font-medium text-gray-600">{year}</span>
            <div className="h-32 w-full rounded-lg border border-dashed border-gray-300 bg-beige/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

src/components/ui/PrioritySlider.tsx
'use client';

interface PrioritySliderProps {
  label?: string;
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}

export function PrioritySlider({
  label = 'Priority',
  value,
  onChange,
  min = 1,
  max = 5,
}: PrioritySliderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span className="font-medium text-gray-800">
          {value} / {max}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-lightGreen"
      />
      <div className="flex justify-between text-[0.7rem] text-gray-500">
        <span>Lower</span>
        <span>Higher</span>
      </div>
    </div>
  );
}

src/components/ui/SummaryCard.tsx
'use client';

import { ReactNode } from 'react';

interface SummaryCardProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  meta?: string;
}

export function SummaryCard({ icon, title, subtitle, meta }: SummaryCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon ?? '🎯'}</div>
        <div>
          <div className="text-sm font-medium text-gray-900">{title}</div>
          {subtitle && (
            <div className="text-xs text-gray-600">{subtitle}</div>
          )}
        </div>
      </div>
      {meta && <div className="text-xs text-gray-700">{meta}</div>}
    </div>
  );
}

3.7 Mapmaker Types & Store
src/modules/mapmaker/types.ts
export interface Goal {
  id: string;
  name: string;
  icon: string;
  year: number | null;
  cost: number | null;
  priority: number | null;
  customNotes?: string;
}

src/modules/mapmaker/state/useGoalsStore.ts
'use client';

import { create } from 'zustand';
import { Goal } from '../types';

interface GoalsState {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  clearGoals: () => void;
}

export const useGoalsStore = create<GoalsState>((set) => ({
  goals: [],
  setGoals: (goals) => set({ goals }),
  clearGoals: () => set({ goals: [] }),
}));


Add zustand to package.json:

npm install zustand

3.8 Mapmaker Routes

Each route uses AppShell and placeholder content.

src/app/page.tsx (landing)
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-deepGreen">
          Welcome to the RIA Mapmaker
        </h1>
        <p className="max-w-xl text-sm text-gray-700">
          This is the interactive goal-planning module for a tech-enabled, flat-fee RIA.
          Use the Mapmaker flow to capture client goals in a structured, visual way.
        </p>
        <Link
          href="/mapmaker/welcome"
          className="inline-flex items-center justify-center rounded-lg bg-deepGreen px-4 py-2 text-sm font-medium text-white hover:bg-lightGreen"
        >
          Go to Mapmaker
        </Link>
      </div>
    </AppShell>
  );
}

src/app/mapmaker/welcome/page.tsx
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';

export default function MapmakerWelcomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-deepGreen">
          Mapmaker: Welcome
        </h1>
        <p className="max-w-xl text-sm text-gray-700">
          This is the starting point for the Mapmaker flow. In v1, clients will be
          welcomed, see expectations, and start mapping their goals.
        </p>
        <Link
          href="/mapmaker/select-goals"
          className="inline-flex items-center justify-center rounded-lg bg-deepGreen px-4 py-2 text-sm font-medium text-white hover:bg-lightGreen"
        >
          Next: Select goals
        </Link>
      </div>
    </AppShell>
  );
}

src/app/mapmaker/select-goals/page.tsx
'use client';

import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { GoalCard } from '@/components/ui/GoalCard';
import { useState } from 'react';

const MOCK_GOALS = [
  { id: 'retirement', icon: '🏖', title: 'Retirement' },
  { id: 'home', icon: '🏠', title: 'Buy a home' },
  { id: 'college', icon: '🎓', title: 'College' },
  { id: 'travel', icon: '🌍', title: 'Travel' },
];

export default function SelectGoalsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-deepGreen">
          Mapmaker: Select your goals
        </h1>
        <p className="max-w-xl text-sm text-gray-700">
          In the full implementation, clients will pick one or more goals from a
          library (plus custom goals). For now, this is a styled placeholder.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_GOALS.map((goal) => (
            <GoalCard
              key={goal.id}
              icon={goal.icon}
              title={goal.title}
              selected={selectedIds.includes(goal.id)}
              onClick={() => toggle(goal.id)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link
            href="/mapmaker/welcome"
            className="text-xs text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          <Link
            href="/mapmaker/timeline"
            className="inline-flex items-center justify-center rounded-lg bg-deepGreen px-4 py-2 text-sm font-medium text-white hover:bg-lightGreen"
          >
            Next: Timeline
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

src/app/mapmaker/timeline/page.tsx
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { TimelineGrid } from '@/components/ui/TimelineGrid';

export default function TimelinePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-deepGreen">
          Mapmaker: Timeline
        </h1>
        <p className="max-w-xl text-sm text-gray-700">
          This placeholder shows the future timeline where goals will eventually
          be placed via drag-and-drop. For v1 skeleton, this is visual only.
        </p>

        <TimelineGrid />

        <div className="flex items-center justify-between pt-4">
          <Link
            href="/mapmaker/select-goals"
            className="text-xs text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          <Link
            href="/mapmaker/goal-details"
            className="inline-flex items-center justify-center rounded-lg bg-deepGreen px-4 py-2 text-sm font-medium text-white hover:bg-lightGreen"
          >
            Next: Goal details
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

src/app/mapmaker/goal-details/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { PrioritySlider } from '@/components/ui/PrioritySlider';

export default function GoalDetailsPage() {
  const [priority, setPriority] = useState(3);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-deepGreen">
          Mapmaker: Goal details
        </h1>
        <p className="max-w-xl text-sm text-gray-700">
          This screen will ultimately capture year, estimated cost, and
          priority. For now it demonstrates basic layout and the PrioritySlider
          component.
        </p>

        <div className="max-w-md space-y-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">
              Target year
            </label>
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. 2035"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">
              Estimated cost
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">$</span>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="e.g. 250000"
              />
            </div>
          </div>

          <PrioritySlider value={priority} onChange={setPriority} />
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link
            href="/mapmaker/timeline"
            className="text-xs text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          <Link
            href="/mapmaker/summary"
            className="inline-flex items-center justify-center rounded-lg bg-deepGreen px-4 py-2 text-sm font-medium text-white hover:bg-lightGreen"
          >
            Next: Summary
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

src/app/mapmaker/summary/page.tsx
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { SummaryCard } from '@/components/ui/SummaryCard';

export default function SummaryPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-deepGreen">
          Mapmaker: Summary
        </h1>
        <p className="max-w-xl text-sm text-gray-700">
          This placeholder represents the summary and confirmation step where
          clients will review all goals and confirm they are accurate.
        </p>

        <div className="space-y-3">
          <SummaryCard
            icon="🏖"
            title="Retirement"
            subtitle="Target year: 2055"
            meta="Estimated cost: $2,000,000 • Priority: High"
          />
          <SummaryCard
            icon="🏠"
            title="Buy a home"
            subtitle="Target year: 2030"
            meta="Estimated cost: $600,000 • Priority: Medium"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <Link
            href="/mapmaker/goal-details"
            className="text-xs text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-deepGreen px-4 py-2 text-sm font-medium text-white hover:bg-lightGreen"
          >
            Confirm & finish (placeholder)
          </button>
        </div>
      </div>
    </AppShell>
  );
}
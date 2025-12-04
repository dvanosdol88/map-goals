# Mapmaker Development Prompts (MAP-2 through MAP-5)

These prompts are aligned with the existing codebase conventions.

---

## Prompt for Agent — MAP-2 (Implement Goal data model)

**Role:** You are a senior TypeScript/React engineer working in an existing React + Tailwind repo.

**Task (MAP-2):** Implement the core Goal data model and preset goal seed data.

### Constraints

- Use TypeScript, strictly typed. Do not introduce new heavy dependencies.
- Follow the repo's existing folder conventions:
  - `src/modules/mapmaker/types.ts` for types
  - `src/data/` for seed data
- The Goal shape must match the spec: id, name, icon, year, cost, priority, customNotes.
- Because these fields are user-entered later, model incomplete values safely (prefer null, not undefined, so the keys always exist).

### Implementation Requirements

**Create type(s)**

Update `src/modules/mapmaker/types.ts`:

```typescript
export type Priority = 1 | 2 | 3 | 4 | 5;

export interface Goal {
  id: string;
  name: string;
  icon: string;
  year: number | null;
  cost: number | null;
  priority: Priority | null;
  customNotes: string;
  isCustom?: boolean;
}
```

- `isCustom` is optional but useful for MAP-6. Keep it optional.

**Add helper initializer:**

```typescript
export const createGoal = (partial: Pick<Goal, "id"|"name"|"icon"> & Partial<Goal>): Goal => ({
  year: null,
  cost: null,
  priority: null,
  customNotes: "",
  ...partial
});
```

**Preset goals seed**

Add `src/data/presetGoals.ts` with `export const PRESET_GOALS: Goal[] = [...]`

Include ~8–12 preset goals (reasonable mix), each with:
- stable id (kebab-case)
- icon (emoji is acceptable for v1, e.g. "🏡", "🎓", "💼")
- year/cost/priority set to null, customNotes = ""

**Sanity usage**

Add a tiny non-UI sanity check to ensure the data is importable:
- Import `PRESET_GOALS` in `app/playground/page.tsx` and console.log once (dev only)

Do not build the selector UI yet (that's MAP-6).

### Acceptance Criteria

- `npm run dev` compiles with zero TS errors.
- Goal interface exists and matches the spec fields.
- `PRESET_GOALS` exists and imports cleanly.

### Deliverable

Provide a concise summary of files created/changed and what was added.

---

## Prompt for Agent — MAP-3 (Build GoalCard component)

**Role:** You are implementing reusable UI components in a Tailwind/React codebase.

**Task (MAP-3):** Build a GoalCard component that displays a goal's icon + name, supports selection state, and has hover/focus styles.

### Constraints

- No component libraries. Use Tailwind only.
- Must be keyboard accessible.
- Must support both controlled and semi-controlled usage patterns (but controlled is preferred).

### Props Contract

Update `src/components/ui/GoalCard.tsx` with props:

```typescript
type GoalCardProps = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  onToggle: (id: string) => void;
  disabled?: boolean;
  className?: string;
};
```

### UI/UX Requirements

- Render as a `<button type="button">` to ensure keyboard support.
- Display:
  - icon (large)
  - name (text)
- States:
  - **default:** subtle border, white/neutral background
  - **hover:** slightly stronger border / shadow
  - **focus-visible:** clear focus ring (use tailwind ring utilities; use `lightGreen` brand token)
  - **selected:** stronger border + subtle tinted background; include `aria-pressed={selected}`
  - **disabled (if set):** reduced opacity + cursor-not-allowed, no toggling

### Implementation Requirements

- Use `aria-pressed` for selected state.
- Use `onClick={() => onToggle(id)}` but guard if disabled.
- Ensure name is not truncated aggressively; allow wrap.
- Use Tailwind tokens from the repo (brand colors configured in MAP-1). Do not hardcode hex.

### Dev Preview

Add preview at `app/playground/goal-card/page.tsx`:
- Render 3 cards: one selected, one not, one disabled.

### Acceptance Criteria

- Keyboard: Tab focuses each card; Enter/Space toggles.
- Selected styling is obvious.
- No console errors.

### Deliverable

Summarize styling decisions (which tokens/classes used) and where preview is located.

---

## Prompt for Agent — MAP-4 (Build PrioritySlider component)

**Role:** You are adding an accessible form control component.

**Task (MAP-4):** Implement a reusable 1–5 slider with Low/High labels and a controlled onChange.

### Constraints

- Use native `<input type="range">` for accessibility baseline.
- No external slider libs.
- Must work in forms and be labelable.

### Props Contract

Update `src/components/ui/PrioritySlider.tsx` with:

```typescript
import type { Priority } from "@/modules/mapmaker/types";

type PrioritySliderProps = {
  value: Priority;
  onChange: (value: Priority) => void;
  id?: string;
  label?: string;          // e.g. "Priority"
  lowLabel?: string;       // default "Low"
  highLabel?: string;      // default "High"
  disabled?: boolean;
  className?: string;
};
```

### UI/UX Requirements

- Show optional label above (if provided).
- Show Low on left, High on right under the slider.
- Show current value (1–5) near the slider (either inline to the right, or centered below).
- Tailwind styling: use consistent spacing, focus ring, and brand token colors where applicable.

### Implementation Requirements

- Use: `min={1} max={5} step={1}`
- Convert `event.target.value` to number and cast safely:
  - Validate it's 1–5 before calling onChange.
- Accessibility:
  - If label provided, connect `<label htmlFor={id}>`.
  - If no label, set `aria-label="Priority"` (or similar).
- Disabled state styling.

### Dev Preview

Add preview at `app/playground/priority-slider/page.tsx`:
- Render slider with state; confirm it updates in UI.

### Acceptance Criteria

- Slider changes value 1–5 and calls onChange with the typed union.
- Focus-visible ring appears on keyboard focus.
- No TS any-casts or ignored errors.

### Deliverable

Summarize any repo-specific choices (paths, styling tokens, preview location).

---

## Prompt for Agent — MAP-5 (Build "Welcome / Start Mapping" screen)

**Role:** You are implementing a simple screen in a multi-step flow.

**Task (MAP-5):** Create the Welcome screen with headline, explainer, Start Mapping button, Skip link, and a progress indicator.

### Constraints

- Keep navigation simple; MAP-6 will implement goal selection.
- Do not build the other screens, but you may create placeholders for routing targets.

### Screen Requirements

Welcome screen must include:
- **Headline:** "Welcome to Mapmaker" (or "Start Mapping")
- **Short explainer paragraph** (1–2 lines)
- **Primary button:** "Start Mapping"
- **Secondary link:** "Skip"
- **Progress indicator:** "Step 1 of 4" (simple, not fancy)

### Routing / Navigation

Using Next.js App Router:
- Welcome at `app/mapmaker/welcome/page.tsx`
- Start Mapping navigates to `/mapmaker/select-goals`
- Skip navigates to `/mapmaker/summary`

### UI Layout

- Centered container (reasonable max width).
- Use Tailwind spacing scale.
- Use Inter and brand tokens (from MAP-1).
- Button and link should have clear hover/focus styles.

### Progress Indicator

Update `src/components/ui/ProgressTracker.tsx` with props `step` and `total`:
- Render text "Step X of Y"
- Can support both visual bar mode and text mode

### Acceptance Criteria

- Welcome screen renders correctly on desktop and mobile widths.
- Start Mapping and Skip both navigate without errors.
- Focus styles are present on button and link.
- No lint/TS errors in dev/build.

### Deliverable

List created/changed files and confirm which navigation strategy was used.

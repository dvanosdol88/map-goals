Mapmaker v1 – Agent Prompts for MAP-6 through MAP-9
These prompts assume:
	• You already have a Next.js 14 (App Router) + TypeScript + Tailwind app.
	• The Mapmaker skeleton is in place with:
		○ AppShell, GoalCard, TimelineGrid, PrioritySlider, SummaryCard, ProgressTracker
		○ Routes under src/app/mapmaker/*
		○ A Goal type and a basic Zustand store (useGoalsStore) as stubs. 
	• The design system uses Inter and a Fidelity-style palette (Deep Green, Light Green, Gold, Beige, Gray-100/300/700/950). 

STEP 1 – Prompt for MAP-6: Build Goal Selector screen
Goal: Turn /mapmaker/select-goals into a real, stateful “Goal Selector” that writes Goal objects into the global store, including support for a simple Custom Goal modal.
	Prompt to give the agent:
You are working in a Next.js 14 + TypeScript + Tailwind app that already has:
	• AppShell layout
	• GoalCard component (icon + title, clickable)
	• A Goal interface:

export interface Goal {
  id: string;
  name: string;
  icon: string;
  year: number | null;
  cost: number | null;
  priority: number | null;
  customNotes?: string;
}
	• A Zustand store stub useGoalsStore with:

interface GoalsState {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  clearGoals: () => void;
}
The route src/app/mapmaker/select-goals/page.tsx currently has placeholder logic. I want you to fully implement the Goal Selector screen (MAP-6) as follows.
1. Preset goals
Define a constant list of preset goals in the select-goals page (local constant is fine for now):
	• Retirement – 🏖
	• Buy a home – 🏠
	• College – 🎓
	• Travel – 🌍
	• Start a business – 💼
Each preset should map cleanly into the Goal shape when selected:
	• id: stable string like "preset-retirement"
	• name: human-readable name
	• icon: emoji string
	• year, cost, priority: null initially
	• customNotes: undefined initially
2. Selection behavior
On /mapmaker/select-goals:
	• Render the preset goals as a grid of GoalCards (you can keep the existing grid layout but wire it to real data).
	• Clicking a card should toggle selected state (highlighting via the selected prop).
	• Maintain an internal selectedIds state array to track user selections.
	• When the page loads:
		○ If the store already has goals populated (user is coming back), pre-select those goals by ID.
		○ The source of truth for initial selection is useGoalsStore().goals.
3. Custom Goal Modal
Add a very simple Custom Goal flow:
	• At the end of the grid, add a special GoalCard that says “Add custom goal” with a ➕ icon.
	• Clicking it opens a modal (component local to this page is fine) that asks for:
		○ Goal name (required)
		○ Icon (simple emoji text input, required; you can default to ⭐ if left blank)
	• On “Add goal”:
		○ Create a new Goal with:
			§ id: something like custom-${crypto.randomUUID()} (or a simple incremental fallback if crypto not available)
			§ name and icon from the modal
			§ year, cost, priority: null
		○ Immediately:
			§ Add this new Goal to the store’s goals array.
			§ Mark it as selected in selectedIds.
		○ Close the modal.
	• You do NOT need a separate custom-goal list; treat custom goals just like presets from then on.
	• Keep the modal simple, using Tailwind and a basic overlay; trap focus is nice to have but optional for now.
4. Writing to the store
When the user clicks “Next: Timeline”:
	• If no goals are selected, disable the button or show a subtle validation message: “Select at least one goal to continue.”
	• If one or more goals are selected:
		○ Build a new array of Goal objects corresponding to the selected presets and any custom goals.
			§ For presets, map selected IDs into Goal objects with year, cost, priority preserved from useGoalsStore().goals if they already exist (so data isn’t lost when coming back).
			§ For new selections, create Goal objects with null year/cost/priority.
		○ Call setGoals(newGoals) on the store.
		○ Navigate programmatically to /mapmaker/goal-details.
5. UX copy and layout
	• Keep a concise headline, e.g. “Mapmaker: Select your goals”.
	• Short helper text: “Select all the goals you have in mind. You can adjust details later.”
	• Maintain the existing grid layout and primary/secondary navigation buttons (Back → /mapmaker/welcome, Next → /mapmaker/goal-details), but wire them to the behavior above.
6. Constraints
	• Use existing GoalCard for visual consistency.
	• Keep logic inside the /mapmaker/select-goals/page.tsx file for now.
	• Ensure TypeScript is happy (no any).
When you’re done, I should be able to:
	1. Select preset goals (and add a custom goal).
	2. Click Next.
	3. See that useGoalsStore().goals contains a clean array of Goal objects ready for later steps.

STEP 2 – Prompt for MAP-7: Build Goal Details step (no timeline)
Goal: Implement /mapmaker/goal-details so it shows all selected goals in a list, each with editable year, estimated cost, and priority, updating the global store.
	Prompt to give the agent:
You are now implementing MAP-7 – Goal Details step (no timeline) for the Mapmaker module.
Context:
	• /mapmaker/select-goals already populates useGoalsStore().goals with an array of Goal objects (id, name, icon, year=null, cost=null, priority=null initially).
	• /mapmaker/goal-details/page.tsx currently has a placeholder card with some inputs and a PrioritySlider.
I want you to convert /mapmaker/goal-details/page.tsx into a real Goal Details step:
1. Read goals from the store
	• Import useGoalsStore and read goals from it.
	• If goals.length === 0, redirect the user back to /mapmaker/select-goals (using useRouter from next/navigation), because they shouldn’t be here without goals.
2. Render one “details card” per goal
For each Goal in goals:
	• Render a card (Tailwind-styled div) that includes:
		○ Icon + name at the top (e.g. “🏠 Buy a home”).
		○ Target year input:
			§ Number input or select (e.g. year >= current year).
			§ Bind to that goal’s year.
		○ Estimated cost input:
			§ Currency-like input (number is fine).
			§ Store as a number in goal.cost (use parseFloat and allow null if blank).
		○ PrioritySlider:
			§ Use the existing PrioritySlider component.
			§ Range 1–5, default to 3 if priority is null.
			§ Bind to goal.priority.
Layout:
	• Stack cards vertically using space-y-4.
	• Inside each card, use simple labels Target year, Estimated cost, Priority.
3. Local editing state vs store
Use one of these approaches (your choice, but keep it clean):
	• Option A (recommended): Create a local copy of the goals:
		○ const [draftGoals, setDraftGoals] = useState<Goal[]>(goalsFromStore);
		○ Update draftGoals as the user types.
		○ On “Next: Summary”, validate and then call setGoals(draftGoals).
	• Option B: Update the store on each change.
Either is acceptable; Option A is easier to reason about when adding validation.
4. Validation rules (lightweight)
For MAP-7:
	• year: allow empty/null, but it’s preferable to encourage a year.
	• cost: allow empty/null; if present, must be >= 0.
	• priority: should be between 1 and 5; default to 3 if missing.
No need for huge validation UX; just don’t crash. If you want, you can show a small red text under invalid fields.
5. Save and navigate
When the user clicks “Next: Summary”:
	• If using draftGoals, call setGoals(draftGoals) in the store.
	• Navigate to /mapmaker/summary.
	• “Back” should navigate to /mapmaker/select-goals without resetting the store.
6. UX copy and structure
	• Page title: “Mapmaker: Goal details”.
	• Subtitle: “For each goal, add a rough year and an estimated amount. You can refine these later.”
	• Keep existing navigation layout (Back / Next buttons at bottom).
7. TypeScript & cleanliness
	• Keep the file strongly typed.
	• Avoid any.
	• Make sure the Goal interface is imported from the shared types.ts.
When you’re done, I should be able to:
	1. Come from /mapmaker/select-goals with 2–3 goals selected.
	2. See 2–3 cards on /mapmaker/goal-details.
	3. Enter year, cost, and priority for each.
	4. Click Next and later see those values reflected on the Summary screen.

STEP 3 – Prompt for MAP-8: Build Summary & Confirmation screen
Goal: Implement /mapmaker/summary so it shows a read-only summary of all goals (icon, name, year, cost, priority), with a confirmation checkbox and basic compliance-friendly language.
	Prompt to give the agent:
Now implement MAP-8 – Summary & Confirmation for the Mapmaker module.
Context:
	• useGoalsStore().goals contains fully filled goals after the details step.
	• SummaryCard is available for compact goal display.
	• This screen is conceptually the “Goals Summary & Confirmation” step from the Mapmaker spec. 
1. Read from store and guard empty state
In src/app/mapmaker/summary/page.tsx:
	• Read goals from useGoalsStore.
	• If goals.length === 0, redirect back to /mapmaker/select-goals (or /mapmaker/welcome), similar to the guard you used in MAP-7.
2. Render SummaryCards
For each goal:
	• Use SummaryCard to display:
		○ icon
		○ title = goal.name
		○ subtitle = e.g. Target year: 2035 (if year exists, otherwise “Target year: TBD”)
		○ meta string summarizing cost and priority, e.g.:
			§ If both present: Estimated cost: $250,000 • Priority: 4/5
			§ If missing: handle gracefully, e.g. Estimated cost: TBD
	• Stack them with space-y-3.
3. Confirmation checkbox & button
Below the list:
	• Add explanatory text along the lines of (adapted to your tone):
“Please review your goals and confirm they are accurate to the best of your knowledge. Your advisor will use this information when building your plan.”
	• Add a checkbox:
		○ Label: I confirm that the information above is accurate to the best of my knowledge.
		○ Button “Confirm & continue” should be disabled until the checkbox is checked.
	• On click of “Confirm & continue”:
		○ For now, you can either:
			§ Navigate to / (or a stub “Next module” route).
			§ Or console.log a message such as "Goals confirmed".
		○ No backend integration required for this issue.
4. Edit affordance (optional but nice)
Optionally, allow a simple “Edit goals” link above or below the list that:
	• Navigates back to /mapmaker/goal-details.
You do NOT need per-goal edit buttons for this issue; one global “Edit” is enough.
5. UX language
Align roughly with the compliance-friendly tone from the onboarding plan and Mapmaker spec, which emphasizes review and confirmation instead of promises. 
	• Avoid language like “guarantee” or “will happen.”
	• Use phrasing like “we’ll use these goals to help shape your financial plan.”
6. Layout
	• Use AppShell.
	• Keep consistent spacing and typography with earlier screens.
	• Make sure the page looks good with 1–5 goals.
When done, I should be able to:
	1. See all goals summarized cleanly.
	2. Check the confirmation box.
	3. Click “Confirm & continue” and see appropriate navigation/behavior.

STEP 4 – Prompt for MAP-9: Implement local persistence
Goal: Use Zustand’s persist middleware (or equivalent) to persist Mapmaker goals to localStorage, so a user can refresh the page and keep their data.
	Prompt to give the agent:
Finally, implement MAP-9 – Local persistence for the Mapmaker module.
Context:
	• useGoalsStore currently provides in-memory goals, setGoals, clearGoals.
	• We want to persist goals across page reloads in the browser using localStorage.
1. Add Zustand persist middleware
In src/modules/mapmaker/state/useGoalsStore.ts:
	• Import persist from zustand/middleware.
	• Wrap the store definition with persist, e.g.:

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      goals: [],
      setGoals: (goals) => set({ goals }),
      clearGoals: () => set({ goals: [] }),
    }),
    {
      name: 'mapmaker-goals', // localStorage key
    }
  )
);
	• Ensure this compiles in a Next.js / App Router environment (client-only).
2. Client-only usage
Because Zustand + localStorage rely on window, ensure:
	• useGoalsStore is only used in client components ('use client'; at the top of pages/components that call it).
	• If you get hydration warnings, you may need to:
		○ Keep pages as client components (which is fine for this module).
		○ Or delay reading the store until after mount using useEffect. Only do this if necessary; start simple.
3. Verify behavior across the flow
After wiring persistence:
	• I should be able to:
		1. Go through:
			§ /mapmaker/welcome → /mapmaker/select-goals → /mapmaker/goal-details → /mapmaker/summary
		2. Refresh any of those pages and see:
			§ The same goals list.
			§ The details (year, cost, priority) preserved.
	• The selection step (select-goals) should respect existing goals from the store and pre-select them when revisiting.
4. Optional: “Reset Mapmaker” control
Add a simple way to clear all goals:
	• Option A: A small link on /mapmaker/summary labelled “Start over”.
		○ On click:
			§ Call clearGoals() from the store.
			§ Navigate back to /mapmaker/welcome or /mapmaker/select-goals.
	• Option B: Similar link on the home page.
This is optional but helps with testing.
5. Safety
	• Don’t store anything except the goals array in this key.
	• It’s okay if old data stays in localStorage between sessions; that’s desired here.
When done, MAP-9 is complete if:
	• Goals persist across refresh.
	• The flow still behaves correctly.
	• clearGoals() truly resets the experience.

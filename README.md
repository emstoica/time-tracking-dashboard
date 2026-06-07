# Time Tracking Dashboard

A responsive time tracking dashboard built with **React** and **Vite**. It displays six activity categories — Work, Play, Study, Exercise, Social, and Self Care — and lets you switch between daily, weekly, and monthly views. All data is loaded from a local JSON file; no backend or API is involved.

---

## Tech Stack

| Tool             | Purpose                                  |
| ---------------- | ---------------------------------------- |
| React 18         | UI components and state management       |
| Vite             | Dev server and build tool                |
| vite-plugin-svgr | Converts SVG files into React components |
| CSS (plain)      | Styling with per-component CSS files     |

---

## Project Structure

```
src/
├── main.jsx              # Entry point — mounts the app into index.html
├── App.jsx               # Root component — holds state, renders layout
├── App.css               # Dashboard grid layout styles
├── index.css             # Global base styles
├── assets/
│   ├── data.json         # Activity data (daily/weekly/monthly hours)
│   └── images/           # Icons (SVG) and profile photo (PNG)
└── components/
    ├── Card.jsx          # Single activity card component
    ├── Card.css          # Card styles + per-activity accent colors
    ├── ProfileCard.jsx   # Profile photo, name, and timeframe buttons
    └── ProfileCard.css   # Profile card styles
```

---

## How It Works

1. `main.jsx` mounts `<App />` into the `<div id="root">` in `index.html`.
2. `App.jsx` holds the `timeframe` state (`'daily'`, `'weekly'`, or `'monthly'`).
3. `ProfileCard` renders the user info and three buttons; clicking a button calls `setTimeframe` in App via the `onTimeframeChange` prop.
4. App loops over `data.json` with `.map()` and renders a `Card` for each activity, passing the correct hours for the selected timeframe.

---

## File-by-File Code Notes

### `main.jsx` — App Entry Point

- `import { StrictMode }` — a development-only React wrapper that double-invokes functions to catch bugs early. Adds no visible UI.
- `import { createRoot }` — the React 18+ way to attach your component tree to a real HTML element.
- `import './index.css'` — loads global base styles (fonts, resets) for the whole app.
- `import App` — brings in the top-level component that contains everything on screen.
- `document.getElementById('root')` — finds the `<div id="root">` in `index.html`, which is the container React takes over.
- `createRoot(...).render(...)` — tells React to render your component tree inside that div.
- `<StrictMode><App /></StrictMode>` — mounts the app; StrictMode is the outer wrapper, App is the actual content.

---

### `App.jsx` — Root Component / Dashboard

- `import './App.css'` — styles the dashboard grid layout.
- `import Card / ProfileCard` — child components; App composes them together.
- `import { useState }` — a React Hook. Lets this component remember a value (`timeframe`) between renders.
- `import ... from '...svg?react'` — the `?react` suffix triggers `vite-plugin-svgr`, which converts each SVG file into a React component you can render as JSX and pass `className` to.
- `import data from './assets/data.json'` — loads the activity data (titles + daily/weekly/monthly hours) as a JS array.
- `const [timeframe, setTimeframe] = useState('weekly')` — creates state. `timeframe` is the current value, `setTimeframe` updates it. Changing it causes a re-render.
- `<ProfileCard ... onTimeframeChange={setTimeframe} />` — passes the setter down so ProfileCard can change the state when a button is clicked (this is called "lifting state up").
- `data.map((item) => ...)` — loops over every activity object in the JSON and returns a `<Card>` for each.
- `const tf = item.timeframes[timeframe]` — looks up the right period's data, e.g. `{ current: 32, previous: 36 }`.
- `key={item.title}` — required by React on list items so it can track which element is which during re-renders.
- `icon={(() => { switch ... })()}` — an IIFE (immediately-invoked function expression): defines and calls a function in one step so you can use a `switch` statement inline inside JSX.
- ``time={`${tf.current}hrs`}`` — template literal that glues the number and "hrs" into one string, e.g. `"32hrs"`.
- `period={ timeframe === 'daily' ? 'day' : ... }` — nested ternaries that convert the key (`'weekly'`) into a display label (`'week'`).

---

### `Card.jsx` — Activity Card Component

- Receives all data as **props** — it's purely presentational, owns no state.
- `{ icon, title, time, period, previousTime }` — destructuring props in the function signature for cleaner access instead of `props.icon`, `props.title`, etc.
- `const slug = title.toLowerCase().replace(/\s+/g, '-')` — turns `"Self Care"` into `"self-care"`. The regex `/\s+/g` matches all whitespace globally. The slug is added as a CSS class (e.g. `.self-care`) so each card gets its own accent color.
- The card uses a **layered design**: `card-background` (colored strip) sits behind `card-content` (white panel), which overlaps it — creating the effect of a colored header peeking out at the top.
- `{icon || <EllipsisIcon />}` — renders the passed-in icon, or falls back to the ellipsis icon if nothing was provided.
- `Last {period} - {previousTime}{'hrs'}` — builds the comparison line, e.g. `"Last week - 36hrs"`. `'hrs'` is a separate JSX expression to make the unit easy to change later.

---

### `ProfileCard.jsx` — Profile + Timeframe Switcher

- Receives `name`, `profileImage`, `timeframe`, and `onTimeframeChange` as props from App.
- `const options = ['daily', 'weekly', 'monthly']` — keeping options in an array means adding/removing a timeframe only requires changing this one line, not the JSX.
- `alt={name + ' profile image' || 'John Doe profile image'}` — builds a descriptive accessibility label; the `||` fallback fires if `name` is empty/undefined.
- `{name || 'John Doe'}` — same fallback pattern for the displayed name.
- `options.map((option) => <button ...>)` — renders all three buttons from the array instead of writing three separate `<button>` blocks.
- `key={option}` — required by React when rendering a list so it can track each button.
- `className={timeframe === option ? 'active' : ''}` — highlights the currently selected button by conditionally adding the `active` CSS class.
- `onClick={() => onTimeframeChange(option)}` — the arrow function ensures `onTimeframeChange` is only called on click, not during render. Calling it updates `timeframe` state in App, which flows back down as a prop and re-highlights the right button.
- `option.charAt(0).toUpperCase() + option.slice(1)` — capitalizes the first letter: `charAt(0).toUpperCase()` → `"D"`, `.slice(1)` → `"aily"`, combined → `"Daily"`.

---

## Running the Project

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

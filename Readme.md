Setup Vite
- Docs: https://vite.dev/guide/
- Command: `npm create vite@latest`

My choices during setup
- Project name: `react-supa-fullstack`
- Framework: React
- Variant: TypeScript
- Use `rollup-vite` (experimental): No
- Install with npm and start now: Yes

Result
- Project created at `react-supa-fullstack/`
- Dependencies installed with npm

Install and run
- `npm install`
  - Added 50 packages, audited 226 packages
  - 45 packages looking for funding (`npm fund`)
  - 0 vulnerabilities found
- `npm run dev`
  - Vite re-optimized dependencies after lockfile change
  - Dev server ready at `http://localhost:5173/`

![alt text](image.png)

Add Tailwind (Vite guide)
- Installed: `npm install tailwindcss @tailwindcss/vite`
- Updated config: `react-supa-fullstack/vite.config.ts`
  ```ts
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      tailwindcss(),
      react()
    ],
  })
  ```
- Rationale: the `@tailwindcss/vite` plugin injects Tailwind’s processing into Vite’s build; placing it before `react()` ensures styles are handled before React’s plugin runs.

Add Ant Design UI
- Installed: `npm install antd`
- Use named imports (curly braces) per Ant Design docs:
  ```tsx
  import { Button } from "antd";
  ```
- `react-supa-fullstack/src/App.tsx` test:
  ```tsx
  import { Button } from "antd";

  function App() {
    return (
      <div className="p-5 font-bold flex flex-col gap-5">
        <h1>App Component In Homepage</h1>
        <Button>AntD Default Button</Button>
        <Button type="primary">AntD Primary Button</Button>
      </div>
    )
  }

  export default App;
  ```

AntD theme provider test
- Created folder: `react-supa-fullstack/src/theme/`
- File: `react-supa-fullstack/src/theme/index.tsx`
  ```tsx
  import React from "react";
  import { ConfigProvider } from "antd";

  function ThemeProvider({ children }: { children: React.ReactNode }) {
    const primaryColorCode = '#000'
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primaryColorCode,
            controlOutline: 'none',
          }, // global tokens (colors, radius, fonts, etc.)
          components: {
            Button: { controlHeight: 45 },
            Input: { controlHeight: 45, colorBorder: 'gray' },
          }, // component-specific tokens/overrides
        }}
      >
        {children}
      </ConfigProvider>
    )
  }

  export default ThemeProvider;
  ```
- Wrapped `App` with `ThemeProvider` to centralize future theme customizations:
  ```tsx
  import { Button, Input } from "antd";
  import ThemeProvider from "./theme";

  function App() {
    return (
      <ThemeProvider>
        <div className="p-5 font-bold flex flex-col gap-5">
          <h1>App Component In Homepage</h1>
          <Button>AntD Default Button</Button>
          <Button type="primary">AntD Primary Button</Button>
          <Input placeholder="Antd Input" />
        </div>
      </ThemeProvider>
    )
  }

  export default App;
  ```
- Concept: AntD exposes theming via `ConfigProvider` and `theme` object.
  - `theme.token`: global design tokens (e.g., `colorPrimary`, `borderRadius`, typography). They cascade to all components.
  - `theme.components`: per-component overrides (e.g., `Button.controlHeight`, `Input.colorBorder`) to tweak a specific component without changing everything.
  - Docs: https://ant.design/docs/react/customize-theme
  - Visual editor for experimentation: https://ant.design/theme-editor
  - You can also set `algorithm` (default/dark) and other tokens for broader theming later.

Styles after cleanup
- Removed `react-supa-fullstack/src/App.css`
- Global stylesheet: `react-supa-fullstack/src/index.css`
- Current globals in `index.css`:
  - Imports Montserrat from Google Fonts
  - Imports Tailwind (`@tailwindcss/vite` plugin is configured in Vite)
  - Applies `font-family: "Montserrat", sans-serif;` to all elements
  - Applies `box-sizing: border-box;` to all elements

Edit the default app
- Start with `react-supa-fullstack/src/App.tsx`
- Tailwind test (using utility classes):
  ```tsx
  function App() {
    return (
      <div className="p-5 bg-gray-200 font-bold">
        App Kiran ChilledOut
      </div>
    )
  }

  export default App;
  ```

Component vs. styles
- `App.tsx` is the root component Vite mounts; with `App.css` removed, it now relies on global styles.
- `index.css` is global; it’s loaded in `main.tsx` and now handles fonts, Tailwind, and box sizing for the entire document.
- You can create other components (e.g., `App1.tsx` + `App1.css`), but only the component rendered in `main.tsx` is mounted at `#root`. Swap `App` for another component there if you want a different entry point.

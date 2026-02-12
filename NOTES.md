# Portfolio Development Learning Notes

> **Last Updated:** February 12, 2026  
> **Project:** Nivedh's Portfolio Website  
> **Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion

---

## 📚 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Structure](#architecture--structure)
3. [Key Concepts & Patterns](#key-concepts--patterns)
4. [Component Deep Dives](#component-deep-dives)
5. [Styling & Design](#styling--design)
6. [Performance & Optimization](#performance--optimization)
7. [Common Patterns](#common-patterns)

---

## 🎯 Project Overview

### What We're Building
A modern, interactive portfolio website showcasing:
- Personal projects (MyPlate, Portfolio)
- Certificates and achievements
- Professional profile and social links
- Interactive UI elements with animations

### Tech Stack Explained

#### **Next.js 15**
- **Why?** Server-side rendering (SSR) for better SEO and performance
- **App Router:** Using the new `app/` directory structure (vs old `pages/`)
- **File-based routing:** Each folder in `app/` becomes a route

#### **TypeScript**
- **Why?** Type safety catches bugs before runtime
- **`.tsx` files:** TypeScript + JSX (React components)
- **`.ts` files:** Pure TypeScript (constants, utilities)

#### **Tailwind CSS**
- **Why?** Utility-first CSS - style directly in JSX with classes
- **Example:** `className="text-white bg-black p-4"` instead of separate CSS files

#### **Framer Motion**
- **Why?** Smooth, declarative animations for React
- **Used in:** Hero highlight effects, interactive elements

---

## 🏗️ Architecture & Structure

### Directory Structure
```
portfolio/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout (wraps all pages)
│   │   ├── page.tsx      # Home page (/)
│   │   └── fluid-demo/   # Demo page (/fluid-demo)
│   ├── components/       # Reusable UI components
│   │   └── ui/          # UI library components
│   ├── constants/       # Static data (profile, projects)
│   └── lib/             # Utility functions
└── public/              # Static assets (images, 3D models)
```

### Why This Structure?
- **Separation of Concerns:** Data (constants) separate from UI (components)
- **Reusability:** UI components can be used across pages
- **Scalability:** Easy to add new pages/features

---

## 🧩 Key Concepts & Patterns

### 1. **Server vs Client Components**

#### Server Components (Default in Next.js 15)
```tsx
// No "use client" directive
export default function Page() {
  return <div>I run on the server!</div>
}
```
- **Benefits:** Faster initial load, better SEO, smaller bundle
- **Limitations:** No browser APIs, no interactivity

#### Client Components
```tsx
"use client"  // ← This directive makes it a client component
export default function Interactive() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```
- **When to use:** Need state, events, browser APIs, animations
- **Example in project:** `hero-highlight.tsx` (uses mouse tracking)

### 2. **TypeScript Interfaces & Types**

#### Why Define Types?
```tsx
// Without types (risky!)
export const PROJECTS = [
  { id: 1, title: "MyPlate", description: "..." }
]

// With types (safe!)
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
}
```
- **Benefits:** Autocomplete, catch typos, self-documenting code

### 3. **Component Props Pattern**

```tsx
export const BentoGridItem = ({
  className,
  title,
  description,
}: {
  className?: string;           // Optional prop
  title?: string | React.ReactNode;  // Can be string OR JSX
  description?: string | React.ReactNode;
}) => { /* ... */ }
```

**Key Points:**
- `?` means optional
- `React.ReactNode` accepts any valid JSX
- Destructuring `{ className }` extracts props directly

---

## 🎨 Component Deep Dives

### **HeroHighlight Component**

#### Purpose
Creates an interactive spotlight effect that follows the mouse cursor.

#### How It Works

```tsx
const mouseX = useMotionValue(0);  // Track mouse X position
const mouseY = useMotionValue(0);  // Track mouse Y position

function handleMouseMove({ currentTarget, clientX, clientY }) {
  const { left, top } = currentTarget.getBoundingClientRect();
  mouseX.set(clientX - left);  // Convert to relative position
  mouseY.set(clientY - top);
}
```

**Step-by-step:**
1. `useMotionValue` creates reactive values (Framer Motion)
2. `handleMouseMove` calculates mouse position relative to container
3. `getBoundingClientRect()` gets element's position on screen
4. Subtract container position to get relative coordinates

#### The Spotlight Effect

```tsx
<motion.div
  style={{
    WebkitMaskImage: useMotionTemplate`
      radial-gradient(
        200px circle at ${mouseX}px ${mouseY}px,
        black 0%,
        transparent 100%
      )
    `
  }}
/>
```

**What's happening:**
- `radial-gradient` creates a circular gradient
- `200px circle` = spotlight size
- `at ${mouseX}px ${mouseY}px` = follows mouse
- `WebkitMaskImage` = reveals content only in spotlight area

#### Why Two Dot Patterns?

```tsx
<div className="bg-dot-thick-neutral-800" />  {/* Always visible */}
<motion.div className="bg-dot-thick-indigo-500 opacity-0 group-hover:opacity-100" />  {/* Spotlight */}
```

- **Base layer:** Gray dots always visible
- **Highlight layer:** Purple dots only visible in spotlight
- Creates depth and interactivity

---

### **BentoGrid Component**

#### Purpose
Creates a responsive grid layout (like Apple's design language).

#### CSS Grid Breakdown

```tsx
className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4"
```

**Translation:**
- `grid` - Use CSS Grid layout
- `grid-cols-1` - 1 column on mobile
- `md:grid-cols-3` - 3 columns on medium+ screens
- `md:auto-rows-[18rem]` - Each row is 18rem tall (medium+)
- `gap-4` - 1rem spacing between items

#### Hover Effects

```tsx
className="group/bento hover:shadow-xl transition duration-200"
```

- `group/bento` - Named group for nested hover effects
- `hover:shadow-xl` - Add shadow on hover
- `transition duration-200` - Smooth 200ms transition

```tsx
<div className="group-hover/bento:translate-x-2">
```
- When parent (`.group/bento`) is hovered, translate this element 2 units right
- Creates subtle slide-in effect

---

## 🎨 Styling & Design

### **Tailwind CSS Utility Classes**

#### Spacing
- `p-4` = padding: 1rem (all sides)
- `px-1` = padding-left & padding-right: 0.25rem
- `mb-2` = margin-bottom: 0.5rem
- `space-y-4` = vertical spacing between children

#### Colors
- `bg-black` = background: black
- `text-white` = color: white
- `dark:bg-black` = background black in dark mode
- `border-white/[0.2]` = white border with 20% opacity

#### Responsive Design
- `md:grid-cols-3` = Apply on medium screens and up
- `sm:`, `lg:`, `xl:` = Other breakpoints

### **Custom Utilities**

```tsx
className="bg-dot-thick-neutral-800"
```
- Custom class defined in `globals.css`
- Creates dotted background pattern
- Reusable across components

### **cn() Utility Function**

```tsx
import { cn } from "@/lib/utils";

className={cn(
  "base-classes",
  className  // Allow override from props
)}
```

**Why?**
- Merges multiple class strings
- Handles conditional classes
- Prevents duplicate classes

---

## ⚡ Performance & Optimization

### **Font Optimization**

```tsx
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const against = localFont({
  src: "./fonts/Against.ttf",
  variable: "--font-hero",
  display: "swap",
});
```

**Key Points:**
- `subsets: ["latin"]` - Only load Latin characters (smaller file)
- `variable: "--font-inter"` - Create CSS variable for font
- `display: "swap"` - Show fallback font while loading (prevents invisible text)

### **Image/Asset Loading**

```tsx
<FluidGlass mode="lens" />
```
- 3D models loaded from `public/assets/3d/`
- `public/` folder served statically (no processing)
- Models should be optimized (compressed GLB files)

---

## 🔄 Common Patterns

### **Data-Driven UI**

```tsx
// constants/index.ts
export const PROJECTS = [
  { id: 1, title: "MyPlate", ... },
  { id: 2, title: "Portfolio", ... }
];

// In component
import { PROJECTS } from "@/constants";

{PROJECTS.map(project => (
  <ProjectCard key={project.id} {...project} />
))}
```

**Benefits:**
- Update data in one place
- Easy to add/remove items
- Type-safe with TypeScript

### **Composition Pattern**

```tsx
<HeroHighlight>
  <h1>My Content</h1>
</HeroHighlight>
```

- `HeroHighlight` wraps children with effects
- Flexible - works with any content
- Reusable across pages

### **Conditional Rendering**

```tsx
{icon && <div>{icon}</div>}  // Only render if icon exists
```

---

## 🎓 Key Takeaways

### **React Fundamentals**
1. **Components are functions** that return JSX
2. **Props flow down** (parent → child)
3. **State triggers re-renders** (use `useState`)
4. **Effects run after render** (use `useEffect`)

### **Next.js Specifics**
1. **File-based routing** (`app/page.tsx` = `/`)
2. **Server components by default** (add `"use client"` for interactivity)
3. **Automatic code splitting** (faster page loads)
4. **Built-in optimization** (images, fonts, scripts)

### **TypeScript Benefits**
1. **Catch errors early** (before running code)
2. **Better autocomplete** (IDE knows what's available)
3. **Self-documenting** (types explain what code expects)

### **Tailwind Philosophy**
1. **Utility-first** (compose styles from small classes)
2. **No naming fatigue** (no need to invent class names)
3. **Responsive by default** (mobile-first breakpoints)

---

## 📝 Development Log

### Session 1 - Initial Setup
- ✅ Created Next.js project with TypeScript
- ✅ Set up Tailwind CSS
- ✅ Added custom fonts (Inter, Against)
- ✅ Created constants file for data

### Session 2 - UI Components
- ✅ Built BentoGrid component
- ✅ Implemented HeroHighlight with mouse tracking
- ✅ Added Highlight component for text effects

### Session 3 - Content
- ✅ Added profile data
- ✅ Listed projects (MyPlate, Portfolio)
- ✅ Added certificates section

### Session 4 - Advanced Features
- ✅ Created fluid-demo page
- ✅ Integrated 3D components (FluidGlass)

---

## 🔗 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*These notes will be updated as we continue building the portfolio!*

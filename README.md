# SeekFlow

SeekFlow is a premium-quality web application that visualizes Operating System Disk Scheduling Algorithms.

## Features
- **Visual Simulation:** Horizontal disk track visualization with real-time head position indicators.
- **Multiple Algorithms:** Support for FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK.
- **Mission Control Dashboard:** A professional, industrial-grade engineering interface.
- **Metrics Tracking:** Detailed statistics including Total Seek Distance and Average Seek.

## Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Visualization:** Recharts (for future metrics)

## Getting Started

### Prerequisites
- Node.js (latest LTS)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure
- `src/components/layout`: Core layout components (Navbar, Sidebar, Footer)
- `src/components/controls`: Input and selection controls
- `src/components/visualization`: Disk track and timeline components
- `src/components/metrics`: Statistical cards and grids
- `src/components/ui`: Reusable atomic UI components
- `src/pages`: Main application pages

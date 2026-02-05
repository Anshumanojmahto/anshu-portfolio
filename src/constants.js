// Exact Ludo Path indices
export const LUDO_PATH = [
  // Yellow Track
  {x:1, y:6}, {x:2, y:6}, {x:3, y:6}, {x:4, y:6}, {x:5, y:6},
  {x:6, y:5}, {x:6, y:4}, {x:6, y:3}, {x:6, y:2}, {x:6, y:1}, {x:6, y:0},
  {x:7, y:0}, {x:8, y:0}, 
  // Blue Track
  {x:8, y:1}, {x:8, y:2}, {x:8, y:3}, {x:8, y:4}, {x:8, y:5},
  {x:9, y:6}, {x:10, y:6}, {x:11, y:6}, {x:12, y:6}, {x:13, y:6}, {x:14, y:6},
  {x:14, y:7}, {x:14, y:8}, 
  // Red Track
  {x:13, y:8}, {x:12, y:8}, {x:11, y:8}, {x:10, y:8}, {x:9, y:8},
  {x:8, y:9}, {x:8, y:10}, {x:8, y:11}, {x:8, y:12}, {x:8, y:13}, {x:8, y:14},
  {x:7, y:14}, {x:6, y:14}, 
  // Green Track
  {x:6, y:13}, {x:6, y:12}, {x:6, y:11}, {x:6, y:10}, {x:6, y:9},
  {x:5, y:8}, {x:4, y:8}, {x:3, y:8}, {x:2, y:8}, {x:1, y:8}, {x:0, y:8},
  {x:0, y:7}, 
  // Victory Run
  {x:1, y:7}, {x:2, y:7}, {x:3, y:7}, {x:4, y:7}, {x:5, y:7}, {x:6, y:7}
];

export const SECTIONS = {
  yellow: { id: "intro",      stepIndex: 0,  label: "INTRO",      color: "bg-yellow-400" },
  blue:   { id: "skills",     stepIndex: 13, label: "SKILLS",     color: "bg-blue-500" },
  red:    { id: "projects",   stepIndex: 26, label: "PROJECTS",   color: "bg-red-500" },
  green:  { id: "experience", stepIndex: 39, label: "EXPERIENCE", color: "bg-green-500" },
  center: { id: "contact",    stepIndex: 57, label: "CONTACT",    color: "bg-yellow-200" } 
};

export const THOUGHTS = [
  "Building scalable systems...",
  "Exploring AI Agents...",
  "Optimizing backend latency...",
  "Design is intelligence made visible."
];
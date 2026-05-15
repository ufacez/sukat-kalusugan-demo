import { useState, useEffect, useRef } from "react";

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  primary: "#0B6E4F",
  primaryLight: "#E6F4EF",
  primaryMid: "#1A8F68",
  accent: "#F5A623",
  accentLight: "#FFF8EC",
  danger: "#E03131",
  dangerLight: "#FFF0F0",
  warn: "#E67E22",
  warnLight: "#FFF4E5",
  info: "#1971C2",
  infoLight: "#E7F5FF",
  purple: "#7048E8",
  purpleLight: "#F3F0FF",
  bg: "#F5F7F6",
  card: "#FFFFFF",
  border: "#E2E8E5",
  text: "#1A2B25",
  textMuted: "#6B8C7D",
  textLight: "#9BB5AC",
  sidebar: "#0D2B20",
  sidebarHover: "#163D2E",
  sidebarActive: "#1A8F68",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_CHILDREN = [
  {
    id: 1,
    child_code: "CHD-0001",
    first_name: "Maria",
    last_name: "Santos",
    birthdate: "2022-03-15",
    sex: "Female",
    age_months: 26,
    barangay: "Bagong Silang",
    address: "123 Rizal St.",
    parent: "Ana Santos",
    status: "Normal",
  },
  {
    id: 2,
    child_code: "CHD-0002",
    first_name: "Juan",
    last_name: "Dela Cruz",
    birthdate: "2022-09-20",
    sex: "Male",
    age_months: 20,
    barangay: "Poblacion",
    address: "45 Mabini Ave.",
    parent: "Rosa Dela Cruz",
    status: "Underweight",
  },
  {
    id: 3,
    child_code: "CHD-0003",
    first_name: "Lucia",
    last_name: "Reyes",
    birthdate: "2021-12-01",
    sex: "Female",
    age_months: 29,
    barangay: "San Jose",
    address: "78 Luna St.",
    parent: "Carla Reyes",
    status: "Stunted",
  },
  {
    id: 4,
    child_code: "CHD-0004",
    first_name: "Miguel",
    last_name: "Torres",
    birthdate: "2023-06-10",
    sex: "Male",
    age_months: 11,
    barangay: "Bagong Silang",
    address: "9 Bonifacio Rd.",
    parent: "Pedro Torres",
    status: "Normal",
  },
  {
    id: 5,
    child_code: "CHD-0005",
    first_name: "Sofia",
    last_name: "Garcia",
    birthdate: "2022-01-05",
    sex: "Female",
    age_months: 28,
    barangay: "Sta. Cruz",
    address: "32 Aguinaldo St.",
    parent: "Lena Garcia",
    status: "Severely Underweight",
  },
  {
    id: 6,
    child_code: "CHD-0006",
    first_name: "Carlos",
    last_name: "Lim",
    birthdate: "2023-01-22",
    sex: "Male",
    age_months: 16,
    barangay: "Poblacion",
    address: "55 Del Pilar St.",
    parent: "Mei Lim",
    status: "Wasted",
  },
  {
    id: 7,
    child_code: "CHD-0007",
    first_name: "Isabella",
    last_name: "Ramos",
    birthdate: "2022-07-30",
    sex: "Female",
    age_months: 22,
    barangay: "San Jose",
    address: "101 Burgos Ave.",
    parent: "Gloria Ramos",
    status: "Normal",
  },
  {
    id: 8,
    child_code: "CHD-0008",
    first_name: "Andres",
    last_name: "Cruz",
    birthdate: "2021-05-14",
    sex: "Male",
    age_months: 36,
    barangay: "Sta. Cruz",
    address: "22 Rizal Blvd.",
    parent: "Nena Cruz",
    status: "Overweight",
  },
];

const MOCK_MEASUREMENTS = [
  {
    id: 1,
    child_id: 1,
    child: "Maria Santos",
    height_cm: 85.2,
    weight_kg: 11.8,
    age_months: 26,
    measurement_date: "2024-05-10",
    source_type: "kiosk",
    nutritional_status: "Normal",
    waz: 0.4,
    haz: 0.2,
    whz: 0.5,
  },
  {
    id: 2,
    child_id: 2,
    child: "Juan Dela Cruz",
    height_cm: 76.1,
    weight_kg: 8.2,
    age_months: 20,
    measurement_date: "2024-05-09",
    source_type: "mobile",
    nutritional_status: "Underweight",
    waz: -2.1,
    haz: -1.3,
    whz: -1.8,
  },
  {
    id: 3,
    child_id: 3,
    child: "Lucia Reyes",
    height_cm: 78.3,
    weight_kg: 10.2,
    age_months: 29,
    measurement_date: "2024-05-08",
    source_type: "kiosk",
    nutritional_status: "Stunted",
    waz: -1.2,
    haz: -2.4,
    whz: -0.6,
  },
  {
    id: 4,
    child_id: 5,
    child: "Sofia Garcia",
    height_cm: 80.0,
    weight_kg: 7.9,
    age_months: 28,
    measurement_date: "2024-05-07",
    source_type: "manual",
    nutritional_status: "Severely Underweight",
    waz: -3.2,
    haz: -1.5,
    whz: -3.1,
  },
  {
    id: 5,
    child_id: 6,
    child: "Carlos Lim",
    height_cm: 72.5,
    weight_kg: 7.1,
    age_months: 16,
    measurement_date: "2024-05-06",
    source_type: "kiosk",
    nutritional_status: "Wasted",
    waz: -1.8,
    haz: -1.0,
    whz: -2.2,
  },
  {
    id: 6,
    child_id: 8,
    child: "Andres Cruz",
    height_cm: 92.0,
    weight_kg: 16.5,
    age_months: 36,
    measurement_date: "2024-05-05",
    source_type: "mobile",
    nutritional_status: "Overweight",
    waz: 2.2,
    haz: 0.8,
    whz: 2.5,
  },
];

const MOCK_PARENTS = [
  {
    id: 1,
    name: "Ana Santos",
    email: "ana.santos@email.com",
    phone: "09171234567",
    children: 1,
    status: "Active",
  },
  {
    id: 2,
    name: "Rosa Dela Cruz",
    email: "rosa.dc@email.com",
    phone: "09281234567",
    children: 1,
    status: "Active",
  },
  {
    id: 3,
    name: "Carla Reyes",
    email: "carla.reyes@email.com",
    phone: "09391234567",
    children: 1,
    status: "Active",
  },
  {
    id: 4,
    name: "Pedro Torres",
    email: "pedro.torres@email.com",
    phone: "09451234567",
    children: 1,
    status: "Active",
  },
  {
    id: 5,
    name: "Lena Garcia",
    email: "lena.garcia@email.com",
    phone: "09561234567",
    children: 1,
    status: "Inactive",
  },
];

const TREND_DATA = [
  {
    month: "Dec",
    normal: 42,
    underweight: 10,
    stunted: 7,
    wasted: 5,
    severelyUnderweight: 3,
    overweight: 4,
  },
  {
    month: "Jan",
    normal: 45,
    underweight: 9,
    stunted: 7,
    wasted: 4,
    severelyUnderweight: 3,
    overweight: 4,
  },
  {
    month: "Feb",
    normal: 47,
    underweight: 8,
    stunted: 6,
    wasted: 4,
    severelyUnderweight: 2,
    overweight: 5,
  },
  {
    month: "Mar",
    normal: 50,
    underweight: 8,
    stunted: 6,
    wasted: 3,
    severelyUnderweight: 2,
    overweight: 4,
  },
  {
    month: "Apr",
    normal: 53,
    underweight: 7,
    stunted: 5,
    wasted: 3,
    severelyUnderweight: 2,
    overweight: 3,
  },
  {
    month: "May",
    normal: 55,
    underweight: 7,
    stunted: 5,
    wasted: 3,
    severelyUnderweight: 2,
    overweight: 3,
  },
];

// ─── WHO Z-Score computation (simplified LMS approximation) ──────────────────
function computeWHO({ weight_kg, height_cm, age_months, }) {
  // Simplified reference medians (not real WHO tables, for demo)
  const wazRef = { median: 9.5 + age_months * 0.15, sd: 1.2 };
  const hazRef = { median: 65 + age_months * 0.9, sd: 3.2 };
  const whzRef = { median: 10.5 + (height_cm - 65) * 0.09, sd: 1.1 };

  const waz = ((weight_kg - wazRef.median) / wazRef.sd).toFixed(2);
  const haz = ((height_cm - hazRef.median) / hazRef.sd).toFixed(2);
  const whz = ((weight_kg - whzRef.median) / whzRef.sd).toFixed(2);

  let status = "Normal";
  if (parseFloat(waz) < -3 || parseFloat(whz) < -3)
    status = "Severely Underweight";
  else if (parseFloat(waz) < -2) status = "Underweight";
  else if (parseFloat(haz) < -2) status = "Stunted";
  else if (parseFloat(whz) < -2) status = "Wasted";
  else if (parseFloat(whz) > 2) status = "Overweight";

  return {
    waz: parseFloat(waz),
    haz: parseFloat(haz),
    whz: parseFloat(whz),
    status,
  };
}

// ─── SVG Icon Components ──────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor", style = {} }) => {
  const icons = {
    dashboard: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    children: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    measurements: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h4M3 15h4M9 3v4M15 3v4M21 9h-4M21 15h-4M9 21v-4M15 21v-4" />
      </svg>
    ),
    parents: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    reports: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    kiosk: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    settings: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    bell: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    logout: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    heart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    activity: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    alertTriangle: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    alertCircle: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    trendingDown: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
    trendingUp: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    zap: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    checkCircle: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    check: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    arrowRight: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    arrowLeft: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    ),
    mail: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    phone: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    baby: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M12 11c-4.42 0-8 2.69-8 6v1h16v-1c0-3.31-3.58-6-8-6z" />
      </svg>
    ),
    barChart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    lineChart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    refreshCw: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    save: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
    search: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    childFemale: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12v8" />
        <path d="M9 18h6" />
        <path d="M8 14c-.5.5-1 1-1 2" />
        <path d="M16 14c.5.5 1 1 1 2" />
      </svg>
    ),
    childMale: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M8 20l4-8 4 8" />
        <path d="M9 16h6" />
      </svg>
    ),
    playCircle: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    info: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    plus: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    eye: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    x: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    ruler: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </svg>
    ),
    scale: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M12 3v2" />
        <path d="M3 12h2" />
        <path d="M19 12h2" />
        <path d="M12 17l-5 2V12a5 5 0 0 1 10 0v7l-5-2z" />
      </svg>
    ),
    wifi: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
    scan: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
      >
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <line x1="7" y1="12" x2="17" y2="12" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusColor = (s) =>
  ({
    Normal: C.primary,
    Underweight: C.warn,
    "Severely Underweight": C.danger,
    Stunted: C.purple,
    Wasted: C.info,
    Overweight: C.accent,
  })[s] || C.textMuted;

const statusBg = (s) =>
  ({
    Normal: C.primaryLight,
    Underweight: C.warnLight,
    "Severely Underweight": C.dangerLight,
    Stunted: C.purpleLight,
    Wasted: C.infoLight,
    Overweight: C.accentLight,
  })[s] || "#f5f5f5";

const StatusBadge = ({ status }) => (
  <span
    style={{
      background: statusBg(status),
      color: statusColor(status),
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 10px",
      borderRadius: 20,
      display: "inline-block",
      letterSpacing: 0.3,
      whiteSpace: "nowrap",
    }}
  >
    {status}
  </span>
);

const sourceIconName = (s) =>
  ({ kiosk: "scan", mobile: "phone", manual: "activity" })[s] || "activity";
const SourceIcon = ({ type, size = 12 }) => (
  <Icon name={sourceIconName(type)} size={size} color="currentColor" />
);

// ─── Mini bar chart ───────────────────────────────────────────────────────────
function MiniBarChart({ data }) {
  const keys = [
    "normal",
    "underweight",
    "stunted",
    "wasted",
    "severelyUnderweight",
    "overweight",
  ];
  const colors = [C.primary, C.warn, C.purple, C.info, C.danger, C.accent];
  const maxVal = Math.max(...data.map((d) => d.normal));
  const h = 120,
    bw = 8,
    gap = 4;
  const barGroups = data.length;
  const groupW = keys.length * (bw + gap) - gap + 12;
  const totalW = barGroups * (groupW + 12) + 40;

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={totalW} height={h + 40} style={{ display: "block" }}>
        {data.map((d, gi) => {
          const gx = 20 + gi * (groupW + 12);
          return (
            <g key={gi}>
              {keys.map((k, ki) => {
                const val = d[k] || 0;
                const bh = Math.max(2, (val / maxVal) * h);
                const bx = gx + ki * (bw + gap);
                const by = h - bh + 10;
                return (
                  <rect
                    key={k}
                    x={bx}
                    y={by}
                    width={bw}
                    height={bh}
                    fill={colors[ki]}
                    rx={2}
                    opacity={0.85}
                  />
                );
              })}
              <text
                x={gx + groupW / 2}
                y={h + 26}
                textAnchor="middle"
                fontSize={10}
                fill={C.textMuted}
              >
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
        {keys.map((k, i) => (
          <div
            key={k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              color: C.textMuted,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: colors[i],
              }}
            />
            {k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gauge / Z-Score visual ───────────────────────────────────────────────────
function ZScoreGauge({ label, value, color }) {
  const pct = Math.min(Math.max((value + 4) / 8, 0), 1);
  const angle = pct * 180 - 90;
  const r = 38,
    cx = 50,
    cy = 50;
  const rad = (a) => (a * Math.PI) / 180;
  const nx = cx + r * Math.cos(rad(angle - 90));
  const ny = cy + r * Math.sin(rad(angle - 90));

  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <svg width={100} height={60} viewBox="0 0 100 60">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={C.border}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${nx} ${ny}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <circle cx={nx} cy={ny} r={4} fill={color} />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize={14}
          fontWeight={600}
          fill={color}
        >
          {value > 0 ? `+${value}` : value}
        </text>
      </svg>
      <div style={{ fontSize: 10, color: C.textMuted, marginTop: -4 }}>
        {label}
      </div>
    </div>
  );
}

// ─── Kiosk interface ──────────────────────────────────────────────────────────
function KioskView({ onBack }) {
  const [step, setStep] = useState(0); // 0=select child, 1=measure, 2=processing, 3=result
  const [selectedChild, setSelectedChild] = useState(null);
  const [form, setForm] = useState({ height_cm: "", weight_kg: "" });
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [sensorStage, setSensorStage] = useState(0);
  const timerRef = useRef();

  const sensorStages = [
    { label: "Initializing sensors...", iconName: "scan" },
    { label: "Connecting to TF-Luna LiDAR...", iconName: "wifi" },
    { label: "Measuring height via LiDAR...", iconName: "ruler" },
    { label: "Reading load cell weight sensor...", iconName: "scale" },
    { label: "Processing anthropometric data...", iconName: "activity" },
    { label: "Computing WHO Z-Scores...", iconName: "barChart" },
    { label: "Saving to database...", iconName: "save" },
    { label: "Complete!", iconName: "checkCircle" },
  ];

  const startMeasurement = () => {
    if (!form.height_cm || !form.weight_kg) return;
    setStep(2);
    setProgress(0);
    setSensorStage(0);
    let p = 0,
      s = 0;
    timerRef.current = setInterval(() => {
      p += 100 / 35;
      s = Math.floor((p / 100) * sensorStages.length);
      setProgress(Math.min(p, 100));
      setSensorStage(Math.min(s, sensorStages.length - 1));
      if (p >= 100) {
        clearInterval(timerRef.current);
        const r = computeWHO({
          weight_kg: parseFloat(form.weight_kg),
          height_cm: parseFloat(form.height_cm),
          age_months: selectedChild.age_months,
          sex: selectedChild.sex,
        });
        setResult(r);
        setTimeout(() => setStep(3), 400);
      }
    }, 100);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0D2B20 0%,#0B3D2A 50%,#0D2B20 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI',sans-serif",
      }}
    >
      {/* Kiosk Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: C.primaryMid,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            <Icon name="heart" size={18} color="#fff" />
          </div>
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: 0.5,
              }}
            >
              SukatKalusugan
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 10,
                letterSpacing: 1,
              }}
            >
              ANTHROPOMETRIC KIOSK v1.0
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>
              SENSOR STATUS
            </div>
            <div
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                marginTop: 2,
              }}
            >
              {["LiDAR", "Weight", "WiFi"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 10,
                    color: C.primaryMid,
                    background: "rgba(26,143,104,0.15)",
                    padding: "2px 6px",
                    borderRadius: 4,
                    border: "1px solid rgba(26,143,104,0.3)",
                  }}
                >
                  ● {s}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onBack}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ← Exit Kiosk
          </button>
        </div>
      </div>

      {/* Steps indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          padding: "20px 0 0",
        }}
      >
        {["Select Child", "Enter Data", "Processing", "Results"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    step > i
                      ? C.primaryMid
                      : step === i
                        ? "rgba(26,143,104,0.3)"
                        : "rgba(255,255,255,0.05)",
                  border: `2px solid ${step >= i ? C.primaryMid : "rgba(255,255,255,0.1)"}`,
                  color: step >= i ? "#fff" : "rgba(255,255,255,0.3)",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {step > i ? (
                  <Icon name="check" size={14} color="#fff" />
                ) : (
                  i + 1
                )}
              </div>
              <div
                style={{
                  color: step === i ? C.primaryMid : "rgba(255,255,255,0.3)",
                  fontSize: 10,
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </div>
            </div>
            {i < 3 && (
              <div
                style={{
                  width: 60,
                  height: 2,
                  background:
                    step > i ? C.primaryMid : "rgba(255,255,255,0.08)",
                  margin: "0 4px 16px",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        {/* Step 0: Select Child */}
        {step === 0 && (
          <div style={{ width: "100%", maxWidth: 700 }}>
            <h2
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 20,
                marginBottom: 6,
              }}
            >
              Select Child Profile
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                textAlign: "center",
                fontSize: 13,
                marginBottom: 24,
              }}
            >
              Scan child QR code or select from list
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                gap: 12,
              }}
            >
              {MOCK_CHILDREN.slice(0, 6).map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedChild(c);
                    setStep(1);
                  }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${selectedChild?.id === c.id ? C.primaryMid : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 12,
                    padding: 16,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(26,143,104,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.05)")
                  }
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background:
                        c.sex === "Female"
                          ? "rgba(240,98,146,0.2)"
                          : "rgba(30,136,229,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      marginBottom: 8,
                    }}
                  >
                    {c.sex === "Female" ? (
                      <Icon
                        name="childFemale"
                        size={20}
                        color={c.sex === "Female" ? "#F06292" : "#42A5F5"}
                      />
                    ) : (
                      <Icon
                        name="childMale"
                        size={20}
                        color={c.sex === "Female" ? "#F06292" : "#42A5F5"}
                      />
                    )}
                  </div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>
                    {c.first_name} {c.last_name}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 11,
                      marginTop: 2,
                    }}
                  >
                    {c.age_months} months · {c.sex}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 10,
                      marginTop: 2,
                    }}
                  >
                    {c.child_code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Enter Data */}
        {step === 1 && selectedChild && (
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)",
              padding: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(26,143,104,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {selectedChild.sex === "Female" ? (
                  <Icon name="childFemale" size={22} color="#F06292" />
                ) : (
                  <Icon name="childMale" size={22} color="#42A5F5" />
                )}
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
                  {selectedChild.first_name} {selectedChild.last_name}
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
                  {selectedChild.child_code} · {selectedChild.age_months} months
                  · {selectedChild.sex}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                {
                  label: "Height (cm)",
                  key: "height_cm",
                  placeholder: "e.g. 82.5",
                  iconName: "ruler",
                },
                {
                  label: "Weight (kg)",
                  key: "weight_kg",
                  placeholder: "e.g. 10.8",
                  iconName: "scale",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 11,
                      marginBottom: 6,
                      letterSpacing: 0.5,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Icon
                        name={f.iconName}
                        size={12}
                        color="rgba(255,255,255,0.6)"
                      />{" "}
                      {f.label}
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: 600,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                background: "rgba(26,143,104,0.08)",
                border: "1px solid rgba(26,143,104,0.2)",
                borderRadius: 10,
                padding: 12,
                marginBottom: 20,
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <Icon name="info" size={12} color="rgba(255,255,255,0.5)" />{" "}
                Sensor data will be populated via ESP32 +
                TF-Luna LiDAR + Load Cell
              </span>
            </div>

            <button
              onClick={startMeasurement}
              disabled={!form.height_cm || !form.weight_kg}
              style={{
                width: "100%",
                background:
                  form.height_cm && form.weight_kg
                    ? C.primaryMid
                    : "rgba(255,255,255,0.05)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px 0",
                fontSize: 15,
                fontWeight: 700,
                cursor:
                  form.height_cm && form.weight_kg ? "pointer" : "not-allowed",
                letterSpacing: 0.5,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                <Icon name="scan" size={16} color="#fff" /> START MEASUREMENT
              </span>
            </button>
          </div>
        )}

        {/* Step 2: Processing */}
        {step === 2 && (
          <div style={{ textAlign: "center", width: "100%", maxWidth: 420 }}>
            <div
              style={{
                position: "relative",
                width: 140,
                height: 140,
                margin: "0 auto 28px",
              }}
            >
              <svg
                width={140}
                height={140}
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <circle
                  cx={70}
                  cy={70}
                  r={60}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={6}
                />
                <circle
                  cx={70}
                  cy={70}
                  r={60}
                  fill="none"
                  stroke={C.primaryMid}
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                  transform="rotate(-90 70 70)"
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 4,
                  }}
                >
                  <Icon
                    name={sensorStages[sensorStage]?.iconName || "activity"}
                    size={28}
                    color={C.primaryMid}
                  />
                </div>
                <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <div
              style={{
                color: C.primaryMid,
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {sensorStages[sensorStage]?.label}
            </div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
              Please wait while we process the measurement data
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {sensorStages.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 11,
                    color:
                      i <= sensorStage
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.2)",
                  }}
                >
                  <span
                    style={{
                      color:
                        i < sensorStage
                          ? C.primaryMid
                          : i === sensorStage
                            ? C.accent
                            : "transparent",
                    }}
                  >
                    {i < sensorStage ? (
                      <Icon name="check" size={12} color={C.primaryMid} />
                    ) : i === sensorStage ? (
                      <Icon name="playCircle" size={12} color={C.accent} />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          border: `1px solid rgba(255,255,255,0.2)`,
                        }}
                      />
                    )}
                  </span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && result && selectedChild && (
          <div style={{ width: "100%", maxWidth: 560 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>
                {result.status === "Normal" ? (
                  <Icon name="checkCircle" size={48} color={C.primary} />
                ) : result.status === "Overweight" ? (
                  <Icon name="alertTriangle" size={48} color={C.warn} />
                ) : (
                  <Icon name="alertCircle" size={48} color={C.danger} />
                )}
              </div>
              <h2 style={{ color: "#fff", fontSize: 22, margin: 0 }}>
                Measurement Complete
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                {selectedChild.first_name} {selectedChild.last_name} ·{" "}
                {selectedChild.age_months} months
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 10,
                    letterSpacing: 1,
                  }}
                >
                  HEIGHT
                </div>
                <div style={{ color: "#fff", fontSize: 28, fontWeight: 700 }}>
                  {form.height_cm}
                  <span style={{ fontSize: 14, marginLeft: 2 }}>cm</span>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 10,
                    letterSpacing: 1,
                  }}
                >
                  WEIGHT
                </div>
                <div style={{ color: "#fff", fontSize: 28, fontWeight: 700 }}>
                  {form.weight_kg}
                  <span style={{ fontSize: 14, marginLeft: 2 }}>kg</span>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 16,
                padding: 20,
                border: `1px solid ${statusColor(result.status)}40`,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                  NUTRITIONAL STATUS
                </div>
                <div
                  style={{
                    background: statusBg(result.status),
                    color: statusColor(result.status),
                    padding: "4px 14px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {result.status}
                </div>
              </div>
              <div style={{ display: "flex", gap: 0 }}>
                {[
                  { label: "Weight-for-Age", val: result.waz, color: C.accent },
                  { label: "Height-for-Age", val: result.haz, color: C.info },
                  {
                    label: "Weight-for-Height",
                    val: result.whz,
                    color: C.primaryMid,
                  },
                ].map((z) => (
                  <div
                    key={z.label}
                    style={{ flex: 1, textAlign: "center", padding: "8px 0" }}
                  >
                    <div
                      style={{ color: z.color, fontSize: 20, fontWeight: 700 }}
                    >
                      {z.val > 0 ? `+${z.val}` : z.val}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.35)",
                        fontSize: 9,
                        marginTop: 2,
                      }}
                    >
                      {z.label}
                    </div>
                    <div
                      style={{ color: "rgba(255,255,255,0.35)", fontSize: 9 }}
                    >
                      Z-score
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => {
                  setStep(0);
                  setSelectedChild(null);
                  setForm({ height_cm: "", weight_kg: "" });
                  setResult(null);
                }}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "12px 0",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                New Measurement
              </button>
              <button
                onClick={onBack}
                style={{
                  flex: 1,
                  background: C.primaryMid,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 0",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const stats = [
    {
      label: "Total Children",
      value: 75,
      iconName: "children",
      color: C.primary,
      bg: C.primaryLight,
      delta: "+3",
    },
    {
      label: "Normal",
      value: 55,
      iconName: "checkCircle",
      color: C.primary,
      bg: C.primaryLight,
      delta: "+2",
    },
    {
      label: "Underweight",
      value: 7,
      iconName: "alertTriangle",
      color: C.warn,
      bg: C.warnLight,
      delta: "-1",
    },
    {
      label: "Severely Underweight",
      value: 2,
      iconName: "alertCircle",
      color: C.danger,
      bg: C.dangerLight,
      delta: "0",
    },
    {
      label: "Stunted",
      value: 5,
      iconName: "trendingDown",
      color: C.purple,
      bg: C.purpleLight,
      delta: "-1",
    },
    {
      label: "Wasted",
      value: 3,
      iconName: "zap",
      color: C.info,
      bg: C.infoLight,
      delta: "0",
    },
    {
      label: "Overweight",
      value: 3,
      iconName: "trendingUp",
      color: C.accent,
      bg: C.accentLight,
      delta: "-1",
    },
  ];

  const recentMeasurements = MOCK_MEASUREMENTS.slice(0, 4);

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0 }}>
          Good morning, Admin!
        </h1>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "4px 0 0" }}>
          Here's a summary of child health monitoring — May 2024
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: C.card,
              borderRadius: 14,
              padding: "16px 18px",
              border: `1px solid ${C.border}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 14,
                opacity: 0.15,
              }}
            >
              <Icon name={s.iconName} size={22} color={s.color} />
            </div>
            <div
              style={{
                fontSize: 11,
                color: C.textMuted,
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>
              {s.value}
            </div>
            <div
              style={{
                fontSize: 11,
                color:
                  parseFloat(s.delta) > 0
                    ? C.primary
                    : parseFloat(s.delta) < 0
                      ? C.danger
                      : C.textLight,
                marginTop: 2,
              }}
            >
              {s.delta !== "0" ? s.delta : "—"}{" "}
              {s.delta !== "0" ? "this month" : "no change"}
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Table Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {/* Bar Chart */}
        <div
          style={{
            background: C.card,
            borderRadius: 14,
            padding: 20,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: C.text,
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Growth Trend (6 Months)
          </div>
          <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 14 }}>
            Monthly nutritional status distribution
          </div>
          <MiniBarChart data={TREND_DATA} />
        </div>

        {/* Donut-style summary */}
        <div
          style={{
            background: C.card,
            borderRadius: 14,
            padding: 20,
            border: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: C.text,
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Status Breakdown
          </div>
          <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 14 }}>
            Current month distribution
          </div>
          <svg width="100%" height={160} viewBox="0 0 300 160">
            {(() => {
              const items = [
                { label: "Normal", val: 55, color: C.primary },
                { label: "Underweight", val: 7, color: C.warn },
                { label: "Stunted", val: 5, color: C.purple },
                { label: "Wasted", val: 3, color: C.info },
                { label: "Sev. Underweight", val: 2, color: C.danger },
                { label: "Overweight", val: 3, color: C.accent },
              ];
              const total = items.reduce((a, b) => a + b.val, 0);
              let startAngle = -90;
              const cx = 85,
                cy = 80,
                r = 60,
                inner = 38;
              return (
                <>
                  {items.map((item, i) => {
                    const angle = (item.val / total) * 360;
                    const start = (startAngle * Math.PI) / 180;
                    const end = ((startAngle + angle) * Math.PI) / 180;
                    const x1 = cx + r * Math.cos(start),
                      y1 = cy + r * Math.sin(start);
                    const x2 = cx + r * Math.cos(end),
                      y2 = cy + r * Math.sin(end);
                    const ix1 = cx + inner * Math.cos(start),
                      iy1 = cy + inner * Math.sin(start);
                    const ix2 = cx + inner * Math.cos(end),
                      iy2 = cy + inner * Math.sin(end);
                    const lg = angle > 180 ? 1 : 0;
                    const d = `M${ix1},${iy1} L${x1},${y1} A${r},${r} 0 ${lg} 1 ${x2},${y2} L${ix2},${iy2} A${inner},${inner} 0 ${lg} 0 ${ix1},${iy1} Z`;
                    startAngle += angle;
                    return (
                      <path key={i} d={d} fill={item.color} opacity={0.88} />
                    );
                  })}
                  <text
                    x={cx}
                    y={cy - 6}
                    textAnchor="middle"
                    fontSize={20}
                    fontWeight={700}
                    fill={C.text}
                  >
                    {total}
                  </text>
                  <text
                    x={cx}
                    y={cy + 10}
                    textAnchor="middle"
                    fontSize={9}
                    fill={C.textMuted}
                  >
                    children
                  </text>
                  {items.map((item, i) => (
                    <g key={i}>
                      <rect
                        x={182}
                        y={10 + i * 24}
                        width={10}
                        height={10}
                        rx={2}
                        fill={item.color}
                      />
                      <text x={196} y={20 + i * 24} fontSize={11} fill={C.text}>
                        {item.label}
                      </text>
                      <text
                        x={295}
                        y={20 + i * 24}
                        textAnchor="end"
                        fontSize={11}
                        fontWeight={600}
                        fill={item.color}
                      >
                        {item.val}
                      </text>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Recent Measurements */}
      <div
        style={{
          background: C.card,
          borderRadius: 14,
          padding: 20,
          border: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>
              Recent Measurements
            </div>
            <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>
              Latest anthropometric records
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              color: C.primary,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            View All →
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Child",
                  "Height",
                  "Weight",
                  "Age",
                  "Date",
                  "Source",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      fontSize: 11,
                      color: C.textMuted,
                      fontWeight: 600,
                      borderBottom: `1px solid ${C.border}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentMeasurements.map((m) => (
                <tr
                  key={m.id}
                  style={{ borderBottom: `1px solid ${C.border}` }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.text,
                    }}
                  >
                    {m.child}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: 13,
                      color: C.textMuted,
                    }}
                  >
                    {m.height_cm} cm
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: 13,
                      color: C.textMuted,
                    }}
                  >
                    {m.weight_kg} kg
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: 13,
                      color: C.textMuted,
                    }}
                  >
                    {m.age_months} mo
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      fontSize: 13,
                      color: C.textMuted,
                    }}
                  >
                    {m.measurement_date}
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 12 }}>
                    <span
                      style={{
                        background: C.bg,
                        padding: "2px 8px",
                        borderRadius: 6,
                        color: C.textMuted,
                        fontSize: 11,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          verticalAlign: "middle",
                        }}
                      >
                        <SourceIcon type={m.source_type} size={11} />{" "}
                        {m.source_type}
                      </span>
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <StatusBadge status={m.nutritional_status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Children List ────────────────────────────────────────────────────────────
function ChildrenList({ onViewChild }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const statuses = [
    "All",
    "Normal",
    "Underweight",
    "Severely Underweight",
    "Stunted",
    "Wasted",
    "Overweight",
  ];
  const filtered = MOCK_CHILDREN.filter(
    (c) =>
      (filter === "All" || c.status === filter) &&
      `${c.first_name} ${c.last_name} ${c.child_code}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}
          >
            Child Profiles
          </h1>
          <p style={{ color: C.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            {MOCK_CHILDREN.length} registered children
          </p>
        </div>
        <button
          style={{
            background: C.primary,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Add Child
        </button>
      </div>

      <div
        style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          placeholder="Search children..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: "9px 14px",
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            fontSize: 13,
            outline: "none",
            background: C.card,
          }}
        />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                border: `1px solid ${filter === s ? statusColor(s) : C.border}`,
                background: filter === s ? statusBg(s) : C.card,
                color: filter === s ? statusColor(s) : C.textMuted,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          background: C.card,
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {[
                "Code",
                "Name",
                "Age",
                "Sex",
                "Barangay",
                "Parent",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 14px",
                    fontSize: 11,
                    color: C.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr
                key={c.id}
                style={{
                  borderBottom:
                    i < filtered.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                    fontFamily: "monospace",
                  }}
                >
                  {c.child_code}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: c.sex === "Female" ? "#FCE4EC" : "#E3F2FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                      }}
                    >
                      {c.sex === "Female" ? (
                        <Icon
                          name="childFemale"
                          size={20}
                          color={c.sex === "Female" ? "#F06292" : "#42A5F5"}
                        />
                      ) : (
                        <Icon
                          name="childMale"
                          size={20}
                          color={c.sex === "Female" ? "#F06292" : "#42A5F5"}
                        />
                      )}
                    </div>
                    <div>
                      <div
                        style={{ fontSize: 13, fontWeight: 600, color: C.text }}
                      >
                        {c.first_name} {c.last_name}
                      </div>
                      <div style={{ fontSize: 10, color: C.textMuted }}>
                        {c.birthdate}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {c.age_months} mo
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {c.sex}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                  }}
                >
                  {c.barangay}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                  }}
                >
                  {c.parent}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={c.status} />
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <button
                    onClick={() => onViewChild(c)}
                    style={{
                      background: C.primaryLight,
                      color: C.primary,
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Child Detail ─────────────────────────────────────────────────────────────
function ChildDetail({ child, onBack }) {
  const measurements = MOCK_MEASUREMENTS.filter((m) => m.child_id === child.id);
  const latest = measurements[0];

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: C.primary,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: 20,
          padding: 0,
        }}
      >
        ← Back to Children
      </button>

      <div
        style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}
      >
        {/* Profile Card */}
        <div
          style={{
            background: C.card,
            borderRadius: 16,
            border: `1px solid ${C.border}`,
            padding: 24,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: child.sex === "Female" ? "#FCE4EC" : "#E3F2FD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                margin: "0 auto 12px",
              }}
            >
              {child.sex === "Female" ? (
                <Icon name="childFemale" size={36} color="#F06292" />
              ) : (
                <Icon name="childMale" size={36} color="#42A5F5" />
              )}
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: C.text,
              }}
            >
              {child.first_name} {child.last_name}
            </h2>
            <div
              style={{ color: C.textMuted, fontSize: 12, margin: "4px 0 10px" }}
            >
              {child.child_code}
            </div>
            {latest && <StatusBadge status={latest.nutritional_status} />}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
            {[
              ["Birthdate", child.birthdate],
              ["Age", `${child.age_months} months`],
              ["Sex", child.sex],
              ["Barangay", child.barangay],
              ["Parent/Guardian", child.parent],
              ["Address", child.address],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: 12, color: C.textMuted }}>{k}</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.text,
                    textAlign: "right",
                    maxWidth: "55%",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Latest Z-scores */}
          {latest && (
            <div
              style={{
                background: C.card,
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                Latest WHO Growth Results
              </div>
              <div
                style={{ color: C.textMuted, fontSize: 11, marginBottom: 16 }}
              >
                Measured on {latest.measurement_date}
              </div>
              <div style={{ display: "flex", gap: 0 }}>
                <ZScoreGauge
                  label="Weight-for-Age"
                  value={latest.waz}
                  color={C.accent}
                />
                <ZScoreGauge
                  label="Height-for-Age"
                  value={latest.haz}
                  color={C.info}
                />
                <ZScoreGauge
                  label="Weight-for-Height"
                  value={latest.whz}
                  color={C.primaryMid}
                />
              </div>
              <div
                style={{
                  marginTop: 12,
                  background: statusBg(latest.nutritional_status),
                  border: `1px solid ${statusColor(latest.nutritional_status)}30`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: statusColor(latest.nutritional_status),
                    fontWeight: 600,
                  }}
                >
                  Nutritional Status: {latest.nutritional_status}
                </span>
                <span style={{ fontSize: 11, color: C.textMuted }}>
                  Height: {latest.height_cm}cm | Weight: {latest.weight_kg}kg
                </span>
              </div>
            </div>
          )}

          {/* Measurement history */}
          <div
            style={{
              background: C.card,
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: 20,
              flex: 1,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: C.text,
                marginBottom: 14,
              }}
            >
              Measurement History
            </div>
            {measurements.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: C.textMuted,
                  fontSize: 13,
                  padding: 20,
                }}
              >
                No measurements recorded
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {[
                      "Date",
                      "Height",
                      "Weight",
                      "Age",
                      "WAZ",
                      "HAZ",
                      "WHZ",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "6px 10px",
                          fontSize: 11,
                          color: C.textMuted,
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((m) => (
                    <tr
                      key={m.id}
                      style={{ borderBottom: `1px solid ${C.border}` }}
                    >
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.text,
                        }}
                      >
                        {m.measurement_date}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.textMuted,
                        }}
                      >
                        {m.height_cm}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.textMuted,
                        }}
                      >
                        {m.weight_kg}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.textMuted,
                        }}
                      >
                        {m.age_months}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.accent,
                        }}
                      >
                        {m.waz > 0 ? "+" : ""}
                        {m.waz}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.info,
                        }}
                      >
                        {m.haz > 0 ? "+" : ""}
                        {m.haz}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: 12,
                          color: C.primaryMid,
                        }}
                      >
                        {m.whz > 0 ? "+" : ""}
                        {m.whz}
                      </td>
                      <td style={{ padding: "8px 10px" }}>
                        <StatusBadge status={m.nutritional_status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Measurements Page ────────────────────────────────────────────────────────
function MeasurementsPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}
          >
            Anthropometric Records
          </h1>
          <p style={{ color: C.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            {MOCK_MEASUREMENTS.length} measurements recorded
          </p>
        </div>
        <button
          style={{
            background: C.primary,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Add Record
        </button>
      </div>

      <div
        style={{
          background: C.card,
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {[
                "#",
                "Child",
                "Height (cm)",
                "Weight (kg)",
                "Age (mo)",
                "WAZ",
                "HAZ",
                "WHZ",
                "Date",
                "Source",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 14px",
                    fontSize: 11,
                    color: C.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${C.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_MEASUREMENTS.map((m,) => (
              <tr key={m.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                  }}
                >
                  {m.id}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.text,
                  }}
                >
                  {m.child}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {m.height_cm}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {m.weight_kg}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                  }}
                >
                  {m.age_months}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      m.waz < -2 ? C.danger : m.waz > 2 ? C.warn : C.primary,
                  }}
                >
                  {m.waz > 0 ? "+" : ""}
                  {m.waz}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: m.haz < -2 ? C.danger : C.info,
                  }}
                >
                  {m.haz > 0 ? "+" : ""}
                  {m.haz}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      m.whz < -2 ? C.danger : m.whz > 2 ? C.warn : C.primaryMid,
                  }}
                >
                  {m.whz > 0 ? "+" : ""}
                  {m.whz}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: C.textMuted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.measurement_date}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span
                    style={{
                      background: C.bg,
                      padding: "2px 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      color: C.textMuted,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        verticalAlign: "middle",
                      }}
                    >
                      <SourceIcon type={m.source_type} size={11} />{" "}
                      {m.source_type}
                    </span>
                  </span>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={m.nutritional_status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Parents Page ─────────────────────────────────────────────────────────────
function ParentsPage() {
  const [selectedParent, setSelectedParent] = useState(null);

  const childrenByParent = MOCK_CHILDREN.reduce((acc, c) => {
    if (!acc[c.parent]) acc[c.parent] = [];
    acc[c.parent].push(c);
    return acc;
  }, {});

  return (
    <div>
      {selectedParent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,30,20,0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setSelectedParent(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.card,
              borderRadius: 20,
              border: `1px solid ${C.border}`,
              width: "100%",
              maxWidth: 640,
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: C.bg,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: C.primaryLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 15,
                    color: C.primary,
                  }}
                >
                  {selectedParent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>
                    {selectedParent.name}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>
                    {(childrenByParent[selectedParent.name] || []).length}{" "}
                    registered child(ren)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedParent(null)}
                style={{
                  background: C.border,
                  border: "none",
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Icon name="x" size={16} color={C.textMuted} />
              </button>
            </div>

            <div style={{ overflowY: "auto", padding: 24 }}>
              {(childrenByParent[selectedParent.name] || []).length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: C.textMuted,
                    fontSize: 13,
                    padding: "32px 0",
                  }}
                >
                  No children registered under this parent.
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {(childrenByParent[selectedParent.name] || []).map(
                    (child) => {
                      const latest = MOCK_MEASUREMENTS.find(
                        (m) => m.child_id === child.id,
                      );
                      return (
                        <div
                          key={child.id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr auto",
                            alignItems: "center",
                            gap: 16,
                            background: C.bg,
                            borderRadius: 12,
                            padding: "14px 16px",
                            border: `1px solid ${C.border}`,
                          }}
                        >
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                              background:
                                child.sex === "Female" ? "#FCE4EC" : "#E3F2FD",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Icon
                              name={
                                child.sex === "Female"
                                  ? "childFemale"
                                  : "childMale"
                              }
                              size={22}
                              color={
                                child.sex === "Female" ? "#F06292" : "#42A5F5"
                              }
                            />
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: 700,
                                fontSize: 13,
                                color: C.text,
                                marginBottom: 2,
                              }}
                            >
                              {child.first_name} {child.last_name}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: C.textMuted,
                                display: "flex",
                                gap: 8,
                                flexWrap: "wrap",
                              }}
                            >
                              <span>{child.child_code}</span>
                              <span>·</span>
                              <span>{child.age_months} months</span>
                              <span>·</span>
                              <span>{child.sex}</span>
                              <span>·</span>
                              <span>{child.barangay}</span>
                            </div>
                            {latest && (
                              <div
                                style={{
                                  fontSize: 11,
                                  color: C.textMuted,
                                  marginTop: 3,
                                }}
                              >
                                Last measured: {latest.measurement_date} —{" "}
                                {latest.height_cm}cm / {latest.weight_kg}kg
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <StatusBadge status={child.status} />
                            {latest && (
                              <div
                                style={{
                                  fontSize: 10,
                                  color: C.textMuted,
                                  marginTop: 4,
                                }}
                              >
                                WAZ: {latest.waz > 0 ? "+" : ""}
                                {latest.waz}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </div>

            <div
              style={{
                padding: "14px 24px",
                borderTop: `1px solid ${C.border}`,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setSelectedParent(null)}
                style={{
                  background: C.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "9px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}
          >
            Parent Accounts
          </h1>
          <p style={{ color: C.textMuted, fontSize: 13, margin: "4px 0 0" }}>
            {MOCK_PARENTS.length} registered parents
          </p>
        </div>
        <button
          style={{
            background: C.primary,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Icon name="plus" size={14} color="#fff" /> Add Parent
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 14,
        }}
      >
        {MOCK_PARENTS.map((p) => {
          const pChildren = childrenByParent[p.name] || [];
          return (
            <div
              key={p.id}
              style={{
                background: C.card,
                borderRadius: 14,
                border: `1px solid ${C.border}`,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: C.primaryLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 16,
                    color: C.primary,
                  }}
                >
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>
                    {p.name}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 10,
                      background:
                        p.status === "Active" ? C.primaryLight : "#f5f5f5",
                      color: p.status === "Active" ? C.primary : C.textMuted,
                      fontWeight: 600,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {[
                  ["mail", p.email],
                  ["phone", p.phone],
                  ["baby", `${p.children} child(ren)`],
                ].map(([iconName, val]) => (
                  <div
                    key={val}
                    style={{
                      fontSize: 12,
                      color: C.textMuted,
                      display: "flex",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Icon name={iconName} size={13} color={C.textMuted} />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedParent(p)}
                style={{
                  marginTop: 14,
                  width: "100%",
                  background: C.primaryLight,
                  color: C.primary,
                  border: `1px solid ${C.primary}22`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Icon name="eye" size={13} color={C.primary} />
                View Children ({pChildren.length})
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Reports Page ─────────────────────────────────────────────────────────────
function ReportsPage() {
  return (
    <div>
      <h1
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: C.text,
          margin: "0 0 6px",
        }}
      >
        Reports & Analytics
      </h1>
      <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 20px" }}>
        Generate and export health monitoring reports
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {[
          {
            title: "Monthly Summary Report",
            desc: "Nutritional status overview for May 2024",
            iconName: "barChart",
            color: C.primary,
          },
          {
            title: "Growth Trend Analysis",
            desc: "6-month trend comparison per barangay",
            iconName: "lineChart",
            color: C.info,
          },
          {
            title: "At-Risk Children Report",
            desc: "Children with critical nutritional status",
            iconName: "alertTriangle",
            color: C.danger,
          },
          {
            title: "eOPT+ Sync Report",
            desc: "Integration status with national database",
            iconName: "refreshCw",
            color: C.accent,
          },
        ].map((r) => (
          <div
            key={r.title}
            style={{
              background: C.card,
              borderRadius: 14,
              border: `1px solid ${C.border}`,
              padding: 20,
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                background: `${r.color}18`,
                borderRadius: 10,
              }}
            >
              <Icon name={r.iconName} size={22} color={r.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                {r.title}
              </div>
              <div
                style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}
              >
                {r.desc}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  style={{
                    background: r.color,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "7px 14px",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Generate
                </button>
                <button
                  style={{
                    background: C.bg,
                    color: C.textMuted,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    padding: "7px 14px",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary stats for report */}
      <div
        style={{
          background: C.card,
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          padding: 20,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: C.text,
            marginBottom: 14,
          }}
        >
          May 2024 — Quick Summary
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
          }}
        >
          {[
            { label: "Total Measurements", val: 58, note: "+12 vs last month" },
            { label: "Kiosk Sessions", val: 34, note: "58.6% of total" },
            { label: "Mobile Records", val: 18, note: "31% of total" },
            { label: "At-Risk Children", val: 12, note: "16% of population" },
            { label: "Barangays Covered", val: 4, note: "100% coverage" },
            { label: "eOPT+ Synced", val: 52, note: "89.6% sync rate" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: C.bg,
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}
              >
                {s.label}
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>
                {s.val}
              </div>
              <div style={{ fontSize: 11, color: C.primary, marginTop: 2 }}>
                {s.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage() {
  const settings = [
    {
      key: "who_reference_year",
      value: "2006",
      desc: "WHO Child Growth Standards Reference Year",
    },
    {
      key: "kiosk_timeout_seconds",
      value: "120",
      desc: "Kiosk session timeout in seconds",
    },
    {
      key: "eopt_sync_url",
      value: "https://eopt.doh.gov.ph/api/sync",
      desc: "eOPT+ national sync endpoint",
    },
    {
      key: "alert_threshold_waz",
      value: "-2.0",
      desc: "Alert threshold for Weight-for-Age Z-score",
    },
    {
      key: "barangay_name",
      value: "Bagong Silang, Caloocan City",
      desc: "Health center barangay name",
    },
    {
      key: "auto_notify_parents",
      value: "true",
      desc: "Automatically notify parents on new results",
    },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: C.text,
          margin: "0 0 6px",
        }}
      >
        System Settings
      </h1>
      <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 20px" }}>
        Configure system parameters and integrations
      </p>
      <div
        style={{
          background: C.card,
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        {settings.map((s, i) => (
          <div
            key={s.key}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr 160px",
              gap: 16,
              alignItems: "center",
              padding: "16px 20px",
              borderBottom:
                i < settings.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: C.primary,
                  marginBottom: 2,
                }}
              >
                {s.key}
              </div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{s.desc}</div>
            </div>
            <input
              defaultValue={s.value}
              style={{
                padding: "8px 12px",
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                fontSize: 13,
                color: C.text,
                outline: "none",
                background: C.bg,
              }}
            />
            <button
              style={{
                background: C.primaryLight,
                color: C.primary,
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({
    email: "admin@sukat.ph",
    password: "admin123",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (form.email && form.password) {
        onLogin({ name: "Admin User", role: "admin", email: form.email });
      } else {
        setError("Please enter your credentials.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #0D2B20 0%, #0B4A34 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI',sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 900,
          minHeight: 520,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Left panel */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(160deg, #0B6E4F 0%, #0D4A32 100%)",
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 48,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                ⚕
              </div>
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 18,
                    letterSpacing: 0.5,
                  }}
                >
                  SukatKalusugan
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 10,
                    letterSpacing: 2,
                  }}
                >
                  HEALTH MONITORING SYSTEM
                </div>
              </div>
            </div>
            <h2
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: 800,
                lineHeight: 1.3,
                margin: "0 0 12px",
              }}
            >
              Monitoring Child Growth with WHO Standards
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              A kiosk-based anthropometric system for children aged 0–59 months,
              using eOPT+ framework and WHO growth standards.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["WHO Standards", "eOPT+ Ready", "IoT Kiosk", "Mobile App"].map(
              (t) => (
                <span
                  key={t}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Right: Login form */}
        <div
          style={{
            width: 380,
            background: "#fff",
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: C.text,
              margin: "0 0 4px",
            }}
          >
            Welcome back
          </h2>
          <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 32px" }}>
            Sign in to your account to continue
          </p>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: C.textMuted,
                marginBottom: 6,
              }}
            >
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "11px 14px",
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: C.textMuted,
                marginBottom: 6,
              }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%",
                padding: "11px 14px",
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: C.dangerLight,
                color: C.danger,
                fontSize: 12,
                padding: "8px 12px",
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              background: loading ? C.primaryLight : C.primary,
              color: loading ? C.primary : "#fff",
              border: "none",
              borderRadius: 10,
              padding: "13px 0",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <div
            style={{
              marginTop: 24,
              padding: 14,
              background: C.bg,
              borderRadius: 10,
              fontSize: 11,
              color: C.textMuted,
            }}
          >
            <strong>Demo credentials</strong>
            <br />
            Email: admin@sukat.ph | Password: admin123
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", iconName: "dashboard" },
  { id: "children", label: "Children", iconName: "children" },
  { id: "measurements", label: "Measurements", iconName: "measurements" },
  { id: "parents", label: "Parents", iconName: "parents" },
  { id: "reports", label: "Reports", iconName: "reports" },
  { id: "kiosk", label: "Kiosk Interface", iconName: "kiosk" },
  { id: "settings", label: "Settings", iconName: "settings" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [selectedChild, setSelectedChild] = useState(null);
  const [kioskMode, setKioskMode] = useState(false);
  const [notifications] = useState(3);

  if (!user) return <LoginPage onLogin={setUser} />;
  if (kioskMode) return <KioskView onBack={() => setKioskMode(false)} />;

  const handleNav = (id) => {
    if (id === "kiosk") {
      setKioskMode(true);
      return;
    }
    setPage(id);
    setSelectedChild(null);
  };

  const renderPage = () => {
    if (page === "children" && selectedChild)
      return (
        <ChildDetail
          child={selectedChild}
          onBack={() => setSelectedChild(null)}
        />
      );
    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "children":
        return (
          <ChildrenList
            onViewChild={(c) => {
              setSelectedChild(c);
            }}
          />
        );
      case "measurements":
        return <MeasurementsPage />;
      case "parents":
        return <ParentsPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: C.bg,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          background: C.sidebar,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "20px 18px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: C.primaryMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              <Icon name="heart" size={18} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: 0.3,
                }}
              >
                SukatKalusugan
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 9,
                }}
              >
                eOPT+ Admin Panel
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: 1.5,
              padding: "4px 8px 8px",
              fontWeight: 600,
            }}
          >
            MAIN MENU
          </div>
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNav(n.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                marginBottom: 2,
                textAlign: "left",
                transition: "all 0.15s",
                background:
                  page === n.id ? "rgba(26,143,104,0.25)" : "transparent",
                color: page === n.id ? C.primaryMid : "rgba(255,255,255,0.6)",
                borderLeft:
                  page === n.id
                    ? `3px solid ${C.primaryMid}`
                    : "3px solid transparent",
              }}
            >
              <span
                style={{
                  width: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name={n.iconName}
                  size={15}
                  color={page === n.id ? C.primaryMid : "rgba(255,255,255,0.6)"}
                />
              </span>
              <span
                style={{ fontSize: 13, fontWeight: page === n.id ? 700 : 400 }}
              >
                {n.label}
              </span>
              {n.id === "kiosk" && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 9,
                    background: C.primaryMid,
                    color: "#fff",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  LIVE
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User card */}
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: C.primaryMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.name}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 10,
                  textTransform: "capitalize",
                }}
              >
                {user.role}
              </div>
            </div>
            <button
              onClick={() => setUser(null)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.3)",
                cursor: "pointer",
                fontSize: 13,
                padding: 4,
              }}
              title="Sign out"
            >
              <Icon name="logout" size={13} color="rgba(255,255,255,0.5)" />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            background: C.card,
            borderBottom: `1px solid ${C.border}`,
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
              {NAV_ITEMS.find((n) => n.id === page)?.label || "Dashboard"}
            </div>
            <div style={{ fontSize: 11, color: C.textMuted }}>
              SukatKalusugan ·{" "}
              {new Date().toLocaleDateString("en-PH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Icon name="bell" size={18} color={C.textMuted} />
              {notifications > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    background: C.danger,
                    color: "#fff",
                    borderRadius: "50%",
                    width: 14,
                    height: 14,
                    fontSize: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {notifications}
                </span>
              )}
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: C.primaryMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

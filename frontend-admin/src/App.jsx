import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
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
const INIT_CHILDREN = [
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

const INIT_MEASUREMENTS = [
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

const INIT_PARENTS = [
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

const INIT_USERS = [
  {
    id: 1,
    name: "Super Admin",
    email: "admin@sukat.ph",
    role: "admin",
    status: "Active",
    last_login: "2024-05-10 08:30",
    barangay: "All",
  },
  {
    id: 2,
    name: "Dr. Maria Santos",
    email: "nutritionist@sukat.ph",
    role: "nutritionist",
    status: "Active",
    last_login: "2024-05-10 09:15",
    barangay: "Bagong Silang",
  },
  {
    id: 3,
    name: "Nurse Cynthia Reyes",
    email: "cynthia@sukat.ph",
    role: "nutritionist",
    status: "Active",
    last_login: "2024-05-09 14:22",
    barangay: "Poblacion",
  },
  {
    id: 4,
    name: "Dr. Jose Garcia",
    email: "jose@sukat.ph",
    role: "nutritionist",
    status: "Inactive",
    last_login: "2024-04-28 11:00",
    barangay: "San Jose",
  },
];

const INIT_AUDIT_LOGS = [
  {
    id: 1,
    user: "admin@sukat.ph",
    action: "LOGIN",
    detail: "Admin login from 192.168.1.10",
    timestamp: "2024-05-10 08:30:12",
    level: "info",
  },
  {
    id: 2,
    user: "nutritionist@sukat.ph",
    action: "ADD_MEASUREMENT",
    detail: "Added measurement for CHD-0001 (Maria Santos)",
    timestamp: "2024-05-10 09:18:44",
    level: "info",
  },
  {
    id: 3,
    user: "nutritionist@sukat.ph",
    action: "LOGIN",
    detail: "Nutritionist login from 192.168.1.15",
    timestamp: "2024-05-10 09:15:05",
    level: "info",
  },
  {
    id: 4,
    user: "KIOSK-01",
    action: "KIOSK_MEASURE",
    detail: "Measurement taken: CHD-0002, H=76.1cm W=8.2kg",
    timestamp: "2024-05-09 10:22:33",
    level: "info",
  },
  {
    id: 5,
    user: "admin@sukat.ph",
    action: "CALIBRATE_SENSOR",
    detail: "HX711 load cell calibrated. Factor: 2280.5",
    timestamp: "2024-05-09 08:05:17",
    level: "warn",
  },
  {
    id: 6,
    user: "admin@sukat.ph",
    action: "DELETE_USER",
    detail: "Deactivated user jose@sukat.ph",
    timestamp: "2024-05-08 16:40:09",
    level: "danger",
  },
  {
    id: 7,
    user: "KIOSK-01",
    action: "SENSOR_ERROR",
    detail: "TF-Luna LiDAR timeout – retried 3x",
    timestamp: "2024-05-08 11:15:02",
    level: "danger",
  },
  {
    id: 8,
    user: "nutritionist@sukat.ph",
    action: "EXPORT_REPORT",
    detail: "Exported malnutrition report (May 2024)",
    timestamp: "2024-05-07 15:00:41",
    level: "info",
  },
];

const INIT_APPOINTMENTS = [
  {
    id: 1,
    child: "Maria Santos",
    parent: "Ana Santos",
    date: "2024-05-15",
    time: "09:00",
    type: "Follow-up",
    status: "Scheduled",
    note: "Monthly growth check",
  },
  {
    id: 2,
    child: "Juan Dela Cruz",
    parent: "Rosa Dela Cruz",
    date: "2024-05-16",
    time: "10:30",
    type: "Nutrition Counseling",
    status: "Scheduled",
    note: "Underweight case – dietary plan",
  },
  {
    id: 3,
    child: "Sofia Garcia",
    parent: "Lena Garcia",
    date: "2024-05-14",
    time: "08:00",
    type: "Emergency",
    status: "Completed",
    note: "Severely underweight intervention",
  },
  {
    id: 4,
    child: "Lucia Reyes",
    parent: "Carla Reyes",
    date: "2024-05-20",
    time: "14:00",
    type: "Follow-up",
    status: "Scheduled",
    note: "Stunting monitoring",
  },
];

// ─── WHO Z-Score ──────────────────────────────────────────────────────────────
function computeWHO({ weight_kg, height_cm, age_months }) {
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

// ─── Status Helpers ───────────────────────────────────────────────────────────
const STATUS_COLOR = {
  Normal: T.primary,
  Underweight: T.warn,
  "Severely Underweight": T.danger,
  Stunted: T.purple,
  Wasted: T.info,
  Overweight: T.accent,
};
const STATUS_BG = {
  Normal: T.primaryLight,
  Underweight: T.warnLight,
  "Severely Underweight": T.dangerLight,
  Stunted: T.purpleLight,
  Wasted: T.infoLight,
  Overweight: T.accentLight,
};
const sColor = (s) => STATUS_COLOR[s] || T.textMuted;
const sBg = (s) => STATUS_BG[s] || "#f5f5f5";

const StatusBadge = ({ status }) => (
  <span
    style={{
      background: sBg(status),
      color: sColor(status),
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 20,
      display: "inline-block",
      letterSpacing: 0.3,
      whiteSpace: "nowrap",
    }}
  >
    {status}
  </span>
);

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const PATHS = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  children:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  measurements:
    "M3 3h18v18H3zM3 9h4M3 15h4M9 3v4M15 3v4M21 9h-4M21 15h-4M9 21v-4M15 21v-4",
  parents:
    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  reports: "M18 20V10M12 20V4M6 20v-6",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  kiosk: "M2 3h20v14H2zM8 21h8M12 17v4",
  sensor:
    "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M15 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
  audit:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  heart:
    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:
    "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  x: "M18 6 6 18M6 6l12 12",
  check: "M20 6 9 17l-5-5",
  search: "M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
  wifi: "M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01",
  cpu: "M12 12H4V4h8v8zM20 4h-4v4h4V4zM20 12h-4v4h4v-4zM4 16H2M4 12H2M4 8H2M12 20v2M8 20v2M16 20v2M20 20v2",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  scan: "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10",
  ruler: "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3zM13 13l6 6",
  scale: "M12 3v2M3 12h2M19 12h2M12 17l-5 2V12a5 5 0 0 1 10 0v7l-5-2z",
  playCircle: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM10 8l6 4-6 4V8z",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  trendUp: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  trendDown: "M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6",
  alertTriangle:
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  info: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 16v-4M12 8h.01",
  rolesIcon:
    "M12 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6zM5 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 8v4M5 15l5.5 3M18.5 15 13 18",
  child:
    "M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 11c-4.42 0-8 2.69-8 6v1h16v-1c0-3.31-3.58-6-8-6z",
};

const Icon = ({ name, size = 16, color = "currentColor", style = {} }) => {
  const d = PATHS[name];
  if (!d) return null;
  return (
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
      {d
        .split("M")
        .filter(Boolean)
        .map((seg, i) => (i === 0 ? null : null))}
      <path d={d} />
    </svg>
  );
};

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  });
  const bg =
    type === "success" ? T.primaryMid : type === "danger" ? T.danger : T.warn;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        background: bg,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        minWidth: 240,
      }}
    >
      <Icon
        name={type === "success" ? "check" : "alertTriangle"}
        size={15}
        color="#fff"
      />
      {msg}
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({ msg, onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,30,20,0.5)",
        zIndex: 5000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: T.card,
          borderRadius: 16,
          padding: 28,
          width: 340,
          boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          border: `1px solid ${T.border}`,
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
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: T.dangerLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="alertTriangle" size={18} color={T.danger} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: T.text }}>
            Confirm Delete
          </div>
        </div>
        <p
          style={{
            fontSize: 13,
            color: T.textMuted,
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {msg}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: `1px solid ${T.border}`,
              background: T.bg,
              color: T.textMuted,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "none",
              background: T.danger,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal Shell ──────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, width = 540 }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,30,20,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.card,
          borderRadius: 20,
          border: `1px solid ${T.border}`,
          width: "100%",
          maxWidth: width,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: T.bg,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15, color: T.text }}>
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              background: T.border,
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Icon name="x" size={14} color={T.textMuted} />
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Form Helpers ─────────────────────────────────────────────────────────────
function Field({ label, children, required }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 600,
          color: T.textMuted,
          marginBottom: 5,
          letterSpacing: 0.4,
        }}
      >
        {label}
        {required && <span style={{ color: T.danger, marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}
const inputS = {
  width: "100%",
  padding: "9px 12px",
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  fontSize: 13,
  color: T.text,
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};
const selectS = { ...inputS, cursor: "pointer" };
const btnPrimary = {
  background: T.primary,
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
};
const btnSecondary = {
  padding: "9px 20px",
  borderRadius: 8,
  border: `1px solid ${T.border}`,
  background: T.bg,
  color: T.textMuted,
  fontSize: 13,
  cursor: "pointer",
};

// ─── Page Header ──────────────────────────────────────────────────────────────
function PageHeader({ title, subtitle, action, secondaryAction }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              color: T.textMuted,
              fontSize: 13,
              margin: "6px 0 0",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {(action || secondaryAction) && (
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {secondaryAction}
          {action}
        </div>
      )}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, bg, delta, desc, featured }) {
  return (
    <div
      style={{
        background: featured ? T.primaryMid : T.card,
        borderRadius: 14,
        padding: "16px 18px",
        border: `1px solid ${featured ? T.primaryMid : T.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: featured ? "rgba(255,255,255,0.2)" : bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name={icon} size={14} color={featured ? "#fff" : color} />
          </div>
          <span
            style={{
              fontSize: 12,
              color: featured ? "rgba(255,255,255,0.85)" : T.textMuted,
              fontWeight: 500,
            }}
          >
            {label}
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: featured ? "#fff" : color,
          marginBottom: 3,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: featured ? "rgba(255,255,255,0.7)" : T.primary,
          fontWeight: 600,
          marginBottom: 2,
        }}
      >
        ↑ {delta}
      </div>
      <div
        style={{
          fontSize: 10,
          color: featured ? "rgba(255,255,255,0.55)" : T.textMuted,
        }}
      >
        {desc}
      </div>
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          opacity: featured ? 0.18 : 0.06,
        }}
        width={80}
        height={40}
        viewBox="0 0 80 40"
      >
        <polyline
          points="0,35 15,25 30,30 45,15 60,20 80,5"
          fill="none"
          stroke={featured ? "#fff" : color}
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function LoginPage({ onLogin, onKiosk }) {
  const [form, setForm] = useState({
    email: "admin@sukat.ph",
    password: "admin123",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const CREDS = {
    "admin@sukat.ph": {
      password: "admin123",
      role: "admin",
      name: "Super Admin",
    },
    "nutritionist@sukat.ph": {
      password: "health123",
      role: "nutritionist",
      name: "Dr. Maria Santos",
    },
    "cynthia@sukat.ph": {
      password: "health123",
      role: "nutritionist",
      name: "Nurse Cynthia Reyes",
    },
  };

  const handleLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      const cred = CREDS[form.email];
      if (cred && cred.password === form.password) {
        onLogin({ name: cred.name, role: cred.role, email: form.email });
      } else {
        setError("Invalid email or password. Check demo credentials below.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0D2B20 0%,#0B4A34 100%)",
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
          maxWidth: 940,
          minHeight: 540,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Left panel */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(160deg,#0B6E4F 0%,#0D4A32 100%)",
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
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
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
              A kiosk-based anthropometric system for children aged 0–59 months
              using eOPT+ framework and WHO growth standards.
            </p>
            <div style={{ marginTop: 32, display: "grid", gap: 10 }}>
              {[
                [
                  "Admin Panel",
                  "System management, sensor calibration, audit logs",
                  "⚙️",
                ],
                [
                  "Nutritionist Panel",
                  "WHO monitoring, growth analysis, appointments",
                  "🏥",
                ],
                [
                  "Kiosk Interface",
                  "IoT measurement station for direct child assessment",
                  "📡",
                ],
              ].map(([t, d, e]) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 10,
                    padding: "10px 14px",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{e}</span>
                  <div>
                    <div
                      style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}
                    >
                      {t}
                    </div>
                    <div
                      style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}
                    >
                      {d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onKiosk}
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 10,
              padding: "12px 0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Icon name="kiosk" size={16} color="#fff" /> Open Kiosk Interface
          </button>
        </div>

        {/* Right panel */}
        <div
          style={{
            width: 400,
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
              color: T.text,
              margin: "0 0 4px",
            }}
          >
            Welcome back
          </h2>
          <p style={{ color: T.textMuted, fontSize: 13, margin: "0 0 32px" }}>
            Sign in to access your panel
          </p>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: T.textMuted,
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
              style={inputS}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: T.textMuted,
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
              style={inputS}
            />
          </div>
          {error && (
            <div
              style={{
                background: T.dangerLight,
                color: T.danger,
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
              background: loading ? T.primaryLight : T.primary,
              color: loading ? T.primary : "#fff",
              border: "none",
              borderRadius: 10,
              padding: "13px 0",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
          <div
            style={{
              marginTop: 20,
              padding: 14,
              background: T.bg,
              borderRadius: 10,
              fontSize: 11,
              color: T.textMuted,
              lineHeight: 1.7,
            }}
          >
            <strong>Demo credentials</strong>
            <br />
            🔐 Admin: admin@sukat.ph / admin123
            <br />
            🏥 Nutritionist: nutritionist@sukat.ph / health123
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED SIDEBAR SHELL
// ═══════════════════════════════════════════════════════════════════════════════
function AppShell({
  user,
  navItems,
  page,
  onNav,
  onLogout,
  children,
  alerts = 0,
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI',system-ui,sans-serif",
        background: T.bg,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 224,
          background: T.sidebar,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div
          style={{
            padding: "18px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: T.primaryMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="heart" size={16} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: 1.2,
                }}
              >
                SukatKalusugan
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 9,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {user.role} panel
              </div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "8px 10px 4px", overflowY: "auto" }}>
          {navItems.map((section, si) => (
            <div key={si}>
              {section.label && (
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: 1.5,
                    padding: "10px 8px 6px",
                    fontWeight: 600,
                  }}
                >
                  {section.label}
                </div>
              )}
              {section.items.map((n) => (
                <button
                  key={n.id}
                  onClick={() => onNav(n.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "9px 12px",
                    borderRadius: 9,
                    border: "none",
                    cursor: "pointer",
                    marginBottom: 2,
                    textAlign: "left",
                    background:
                      page === n.id ? "rgba(26,143,104,0.22)" : "transparent",
                    color: page === n.id ? "#2BC88A" : "rgba(255,255,255,0.55)",
                    borderLeft:
                      page === n.id
                        ? "2px solid #2BC88A"
                        : "2px solid transparent",
                  }}
                >
                  <Icon
                    name={n.icon}
                    size={15}
                    color={page === n.id ? "#2BC88A" : "rgba(255,255,255,0.55)"}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: page === n.id ? 600 : 400,
                    }}
                  >
                    {n.label}
                  </span>
                  {n.badge && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 8,
                        background: T.danger,
                        color: "#fff",
                        padding: "1px 6px",
                        borderRadius: 4,
                      }}
                    >
                      {n.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: T.primaryMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
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
              onClick={onLogout}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.3)",
                cursor: "pointer",
                padding: 4,
              }}
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
        <div
          style={{
            background: T.card,
            borderBottom: `1px solid ${T.border}`,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
              Good morning, {user.name.split(" ").slice(-1)[0]}!
            </div>
            <div style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>
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
              <Icon name="bell" size={18} color={T.textMuted} />
              {alerts > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    background: T.danger,
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
                  {alerts}
                </span>
              )}
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: T.primaryMid,
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
            <button
              onClick={onLogout}
              style={{
                background: T.dangerLight,
                color: T.danger,
                border: "none",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          </div>
        </div>
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN PAGES
// ═══════════════════════════════════════════════════════════════════════════════

// ── Admin Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard({ users, auditLogs }) {
  const adminCount = users.filter((u) => u.role === "admin").length;
  const nutritionistCount = users.filter(
    (u) => u.role === "nutritionist",
  ).length;
  const activeCount = users.filter((u) => u.status === "Active").length;
  const errorLogs = auditLogs.filter((l) => l.level === "danger").length;

  const cards = [
    {
      label: "Total Users",
      value: users.length,
      icon: "users",
      color: T.primary,
      bg: T.primaryLight,
      delta: `${activeCount} active`,
      desc: "System accounts",
      featured: true,
    },
    {
      label: "Admins",
      value: adminCount,
      icon: "settings",
      color: T.purple,
      bg: T.purpleLight,
      delta: "All active",
      desc: "Administrator accounts",
    },
    {
      label: "Nutritionists",
      value: nutritionistCount,
      icon: "activity",
      color: T.info,
      bg: T.infoLight,
      delta: "Field workers",
      desc: "Health professionals",
    },
    {
      label: "Error Logs",
      value: errorLogs,
      icon: "alertTriangle",
      color: T.danger,
      bg: T.dangerLight,
      delta: "Needs review",
      desc: "System errors today",
    },
  ];

  const KIOSKS = [
    {
      id: "KIOSK-01",
      location: "Bagong Silang BHC",
      status: "Online",
      last_sync: "5 min ago",
      measurements_today: 12,
    },
    {
      id: "KIOSK-02",
      location: "Poblacion BHC",
      status: "Online",
      last_sync: "2 min ago",
      measurements_today: 8,
    },
    {
      id: "KIOSK-03",
      location: "San Jose BHC",
      status: "Offline",
      last_sync: "3 hr ago",
      measurements_today: 0,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="System overview and operational status"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {cards.map((c, i) => (
          <StatCard key={c.label} {...c} featured={i === 0} />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Kiosk Status */}
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 20,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 4,
            }}
          >
            Kiosk Status
          </div>
          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 16 }}>
            Live kiosk monitoring
          </div>
          {KIOSKS.map((k) => (
            <div
              key={k.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: k.status === "Online" ? T.primaryMid : T.danger,
                  }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
                    {k.id}
                  </div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>
                    {k.location}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: k.status === "Online" ? T.primary : T.danger,
                    fontWeight: 600,
                  }}
                >
                  {k.status}
                </div>
                <div style={{ fontSize: 10, color: T.textMuted }}>
                  Sync: {k.last_sync} · {k.measurements_today} today
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Audit */}
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 20,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 4,
            }}
          >
            Recent Activity
          </div>
          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 16 }}>
            Latest audit events
          </div>
          {auditLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "8px 0",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background:
                    log.level === "danger"
                      ? T.danger
                      : log.level === "warn"
                        ? T.warn
                        : T.primaryMid,
                  marginTop: 5,
                  flexShrink: 0,
                }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>
                  {log.action}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: T.textMuted,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {log.detail}
                </div>
                <div style={{ fontSize: 9, color: T.textLight }}>
                  {log.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          padding: 20,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: T.text,
            marginBottom: 16,
          }}
        >
          System Health
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 12,
          }}
        >
          {[
            {
              label: "Database",
              value: "Healthy",
              icon: "cpu",
              color: T.primary,
            },
            {
              label: "eOPT+ Sync",
              value: "Connected",
              icon: "wifi",
              color: T.primaryMid,
            },
            {
              label: "API Server",
              value: "Running",
              icon: "zap",
              color: T.accent,
            },
            {
              label: "Last Backup",
              value: "2h ago",
              icon: "save",
              color: T.info,
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: T.bg,
                borderRadius: 12,
                padding: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: item.color + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={item.icon} size={16} color={item.color} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: T.textMuted }}>
                  {item.label}
                </div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: T.primary }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── User Management ───────────────────────────────────────────────────────────
function UserManagement({ users, onAdd, onEdit, onDelete, showToast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "nutritionist",
    barangay: "",
    status: "Active",
  });
  const [confirm, setConfirm] = useState(null);

  const openAdd = () => {
    setForm({
      name: "",
      email: "",
      role: "nutritionist",
      barangay: "",
      status: "Active",
    });
    setModal("add");
  };
  const openEdit = (u) => {
    setForm({ ...u });
    setModal("edit");
  };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (modal === "add") onAdd(form);
    else onEdit(form);
    setModal(null);
  };

  const roleColor = { admin: T.purple, nutritionist: T.info };
  const roleBg = { admin: T.purpleLight, nutritionist: T.infoLight };

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle={`${users.length} system accounts`}
        action={
          <button onClick={openAdd} style={btnPrimary}>
            <Icon name="plus" size={14} color="#fff" />
            Add User
          </button>
        }
      />

      {modal && (
        <Modal
          title={modal === "add" ? "Add User" : "Edit User"}
          onClose={() => setModal(null)}
          width={460}
        >
          <div style={{ padding: 24 }}>
            <Field label="Full Name" required>
              <input
                style={inputS}
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </Field>
            <Field label="Email Address" required>
              <input
                type="email"
                style={inputS}
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </Field>
            <Field label="Role">
              <select
                style={selectS}
                value={form.role}
                onChange={(e) =>
                  setForm((p) => ({ ...p, role: e.target.value }))
                }
              >
                <option value="admin">Admin</option>
                <option value="nutritionist">Nutritionist</option>
              </select>
            </Field>
            <Field label="Assigned Barangay">
              <input
                style={inputS}
                value={form.barangay}
                onChange={(e) =>
                  setForm((p) => ({ ...p, barangay: e.target.value }))
                }
                placeholder="e.g. Bagong Silang or All"
              />
            </Field>
            <Field label="Status">
              <select
                style={selectS}
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </Field>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 6,
              }}
            >
              <button onClick={() => setModal(null)} style={btnSecondary}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{ ...btnPrimary, padding: "9px 20px" }}
              >
                {modal === "add" ? "Add User" : "Save Changes"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {confirm && (
        <ConfirmDialog
          msg={`Delete user ${confirm.name}? This cannot be undone.`}
          onConfirm={() => {
            onDelete(confirm);
            setConfirm(null);
            showToast(`${confirm.name} deleted`, "danger");
          }}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.bg }}>
              {[
                "Name",
                "Email",
                "Role",
                "Barangay",
                "Status",
                "Last Login",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 16px",
                    fontSize: 11,
                    color: T.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id}
                style={{
                  borderBottom:
                    i < users.length - 1 ? `1px solid ${T.border}` : "none",
                }}
              >
                <td style={{ padding: "12px 16px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background:
                          u.role === "admin" ? T.purpleLight : T.infoLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        color: u.role === "admin" ? T.purple : T.info,
                      }}
                    >
                      {u.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: T.text }}
                    >
                      {u.name}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {u.email}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      background: roleBg[u.role],
                      color: roleColor[u.role],
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {u.barangay || "—"}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      background: u.status === "Active" ? T.primaryLight : T.bg,
                      color: u.status === "Active" ? T.primary : T.textMuted,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {u.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: 11,
                    color: T.textMuted,
                  }}
                >
                  {u.last_login}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => openEdit(u)}
                      style={{
                        background: T.infoLight,
                        color: T.info,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 8px",
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="edit" size={12} color={T.info} />
                    </button>
                    <button
                      onClick={() => setConfirm(u)}
                      style={{
                        background: T.dangerLight,
                        color: T.danger,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 8px",
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="trash" size={12} color={T.danger} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Sensor Calibration ────────────────────────────────────────────────────────
function SensorCalibration({ showToast }) {
  const [hx711, setHx711] = useState({
    calibration_factor: "2280.5",
    known_weight: "500",
    tare_offset: "0",
    gain: "128",
    sample_rate: "10",
  });
  const [tfLuna, setTfLuna] = useState({
    baud_rate: "115200",
    sample_rate: "100",
    min_dist: "20",
    max_dist: "800",
    offset_cm: "0.0",
    mode: "short",
  });
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const runTest = (sensor) => {
    setTesting(sensor);
    setTestResult(null);
    setTimeout(() => {
      setTestResult({
        sensor,
        height:
          sensor === "tf_luna" ? (82.3 + Math.random() * 0.4).toFixed(1) : null,
        weight:
          sensor === "hx711" ? (10.2 + Math.random() * 0.1).toFixed(2) : null,
        status: "Pass",
      });
      setTesting(false);
    }, 2000);
  };

  const panelStyle = {
    background: T.card,
    borderRadius: 16,
    border: `1px solid ${T.border}`,
    padding: 24,
    marginBottom: 16,
  };
  const sectionHeader = (title, desc, icon, color) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: color + "18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={20} color={color} />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: T.text }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: T.textMuted }}>{desc}</div>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Sensor Calibration"
        subtitle="Configure and calibrate IoT sensors for accurate measurements"
      />

      {/* HX711 */}
      <div style={panelStyle}>
        {sectionHeader(
          "HX711 Load Cell Amplifier",
          "Weight measurement sensor calibration",
          "scale",
          T.warn,
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginBottom: 16,
          }}
        >
          {[
            ["Calibration Factor", "calibration_factor", "e.g. 2280.5"],
            ["Known Weight (g)", "known_weight", "e.g. 500"],
            ["Tare Offset", "tare_offset", "e.g. 0"],
            ["Gain (64/128)", "gain", "64 or 128"],
            ["Sample Rate (Hz)", "sample_rate", "e.g. 10"],
          ].map(([label, key, ph]) => (
            <Field key={key} label={label}>
              <input
                style={inputS}
                value={hx711[key]}
                onChange={(e) =>
                  setHx711((p) => ({ ...p, [key]: e.target.value }))
                }
                placeholder={ph}
              />
            </Field>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => {
              showToast("HX711 calibration saved", "success");
            }}
            style={btnPrimary}
          >
            <Icon name="save" size={14} color="#fff" />
            Save Calibration
          </button>
          <button
            onClick={() => runTest("hx711")}
            style={{ ...btnPrimary, background: T.accent }}
          >
            <Icon name="activity" size={14} color="#fff" />
            {testing === "hx711" ? "Testing..." : "Run Test"}
          </button>
          {testResult?.sensor === "hx711" && (
            <span
              style={{
                background: T.primaryLight,
                color: T.primary,
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              ✓ Test Weight: {testResult.weight}kg — {testResult.status}
            </span>
          )}
        </div>
      </div>

      {/* TF-Luna */}
      <div style={panelStyle}>
        {sectionHeader(
          "TF-Luna LiDAR Sensor",
          "Height measurement sensor calibration",
          "ruler",
          T.info,
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 14,
            marginBottom: 16,
          }}
        >
          {[
            ["Baud Rate", "baud_rate", "e.g. 115200"],
            ["Sample Rate (Hz)", "sample_rate", "e.g. 100"],
            ["Min Distance (cm)", "min_dist", "e.g. 20"],
            ["Max Distance (cm)", "max_dist", "e.g. 800"],
            ["Offset (cm)", "offset_cm", "e.g. 0.0"],
            ["Mode", "mode", "short / long"],
          ].map(([label, key, ph]) => (
            <Field key={key} label={label}>
              {key === "mode" ? (
                <select
                  style={selectS}
                  value={tfLuna[key]}
                  onChange={(e) =>
                    setTfLuna((p) => ({ ...p, [key]: e.target.value }))
                  }
                >
                  <option value="short">Short Range (0–2m)</option>
                  <option value="long">Long Range (2–8m)</option>
                </select>
              ) : (
                <input
                  style={inputS}
                  value={tfLuna[key]}
                  onChange={(e) =>
                    setTfLuna((p) => ({ ...p, [key]: e.target.value }))
                  }
                  placeholder={ph}
                />
              )}
            </Field>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => showToast("TF-Luna calibration saved", "success")}
            style={btnPrimary}
          >
            <Icon name="save" size={14} color="#fff" />
            Save Calibration
          </button>
          <button
            onClick={() => runTest("tf_luna")}
            style={{ ...btnPrimary, background: T.info }}
          >
            <Icon name="scan" size={14} color="#fff" />
            {testing === "tf_luna" ? "Scanning..." : "Run Test"}
          </button>
          {testResult?.sensor === "tf_luna" && (
            <span
              style={{
                background: T.infoLight,
                color: T.info,
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              ✓ Measured Height: {testResult.height}cm — {testResult.status}
            </span>
          )}
        </div>
      </div>

      {/* Status panel */}
      <div style={panelStyle}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: T.text,
            marginBottom: 16,
          }}
        >
          Sensor Connection Status
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {[
            {
              name: "HX711 Load Cell",
              port: "/dev/ttyUSB0",
              status: "Connected",
              reading: "0.00 kg (tare)",
            },
            {
              name: "TF-Luna LiDAR",
              port: "/dev/ttyUSB1",
              status: "Connected",
              reading: "0.00 cm (idle)",
            },
            {
              name: "Arduino Mega 2560",
              port: "/dev/ttyACM0",
              status: "Connected",
              reading: "Firmware v2.1.0",
            },
            {
              name: "eOPT+ Sync",
              port: "HTTPS",
              status: "Online",
              reading: "Last sync: 5 min ago",
            },
          ].map((s) => (
            <div
              key={s.name}
              style={{
                background: T.bg,
                borderRadius: 12,
                padding: 14,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    s.status === "Connected" || s.status === "Online"
                      ? T.primaryMid
                      : T.danger,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 11, color: T.textMuted }}>
                  {s.port} · {s.reading}
                </div>
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 10,
                  color: T.primaryMid,
                  fontWeight: 600,
                }}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Audit Logs ────────────────────────────────────────────────────────────────
function AuditLogs({ logs }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = logs.filter(
    (l) =>
      (filter === "all" || l.level === filter) &&
      (l.action + l.detail + l.user)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const levelColor = { info: T.info, warn: T.warn, danger: T.danger };
  const levelBg = {
    info: T.infoLight,
    warn: T.warnLight,
    danger: T.dangerLight,
  };

  return (
    <div>
      <PageHeader
        title="Audit Logs"
        subtitle={`${logs.length} system events recorded`}
      />
      <div
        style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}
      >
        <input
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: "9px 14px",
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            fontSize: 13,
            outline: "none",
            background: T.card,
          }}
        />
        {["all", "info", "warn", "danger"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 14px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              border: `1px solid ${filter === f ? levelColor[f] || T.primary : T.border}`,
              background: filter === f ? levelBg[f] || T.primaryLight : T.card,
              color: filter === f ? levelColor[f] || T.primary : T.textMuted,
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.bg }}>
              {["Level", "Timestamp", "User", "Action", "Detail"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 16px",
                    fontSize: 11,
                    color: T.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => (
              <tr
                key={log.id}
                style={{
                  borderBottom:
                    i < filtered.length - 1 ? `1px solid ${T.border}` : "none",
                }}
              >
                <td style={{ padding: "10px 16px" }}>
                  <span
                    style={{
                      background: levelBg[log.level],
                      color: levelColor[log.level],
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20,
                      textTransform: "uppercase",
                    }}
                  >
                    {log.level}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontSize: 11,
                    color: T.textMuted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {log.timestamp}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontSize: 12,
                    fontFamily: "monospace",
                    color: T.text,
                  }}
                >
                  {log.user}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.text,
                  }}
                >
                  {log.action}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {log.detail}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: 32,
                    textAlign: "center",
                    color: T.textMuted,
                    fontSize: 13,
                  }}
                >
                  No logs match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Roles & Permissions ───────────────────────────────────────────────────────
function RolesPermissions() {
  const ROLES = [
    {
      role: "Admin",
      desc: "Full system access. Manage users, sensors, settings, and audit logs.",
      permissions: [
        "Dashboard",
        "User Management",
        "Sensor Calibration",
        "Audit Logs",
        "Roles & Permissions",
        "System Settings",
      ],
    },
    {
      role: "Nutritionist",
      desc: "Health and nutrition management access. Child monitoring and reporting.",
      permissions: [
        "Dashboard",
        "Children / Growth",
        "Measurements",
        "WHO Analysis",
        "Parents",
        "Appointments",
        "Reports",
      ],
    },
    {
      role: "Kiosk",
      desc: "Read-only kiosk interface for field measurements. No admin access.",
      permissions: ["Measurement Input", "Child Lookup", "WHO Z-Score Display"],
    },
  ];
  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        subtitle="View role definitions and access control"
      />
      <div style={{ display: "grid", gap: 16 }}>
        {ROLES.map((r) => (
          <div
            key={r.role}
            style={{
              background: T.card,
              borderRadius: 16,
              border: `1px solid ${T.border}`,
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: T.text,
                    marginBottom: 4,
                  }}
                >
                  {r.role}
                </div>
                <div style={{ fontSize: 13, color: T.textMuted }}>{r.desc}</div>
              </div>
              <span
                style={{
                  background: T.primaryLight,
                  color: T.primary,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "4px 14px",
                  borderRadius: 20,
                }}
              >
                {r.permissions.length} modules
              </span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {r.permissions.map((p) => (
                <span
                  key={p}
                  style={{
                    background: T.bg,
                    color: T.textMuted,
                    border: `1px solid ${T.border}`,
                    fontSize: 12,
                    padding: "4px 12px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Icon name="check" size={11} color={T.primaryMid} />
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── System Settings ───────────────────────────────────────────────────────────
function AdminSystemSettings({ showToast }) {
  const [settings, setSettings] = useState([
    {
      key: "who_reference_year",
      value: "2006",
      desc: "WHO Child Growth Standards reference year",
    },
    {
      key: "kiosk_timeout_seconds",
      value: "120",
      desc: "Kiosk session timeout in seconds",
    },
    {
      key: "eopt_sync_url",
      value: "https://eopt.doh.gov.ph/api",
      desc: "eOPT+ national sync endpoint",
    },
    {
      key: "alert_threshold_waz",
      value: "-2.0",
      desc: "Alert threshold for Weight-for-Age Z-score",
    },
    {
      key: "barangay_coverage",
      value: "Bagong Silang, Poblacion, San Jose, Sta. Cruz",
      desc: "Covered barangays",
    },
    {
      key: "auto_notify_parents",
      value: "true",
      desc: "Automatically notify parents on new results",
    },
    {
      key: "backup_interval_hours",
      value: "6",
      desc: "Automated database backup interval (hours)",
    },
    {
      key: "sync_interval_minutes",
      value: "5",
      desc: "eOPT+ data synchronization interval",
    },
  ]);
  const [saved, setSaved] = useState(null);

  return (
    <div>
      <PageHeader
        title="System Settings"
        subtitle="Configure global system parameters"
      />
      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
        }}
      >
        {settings.map((s, i) => (
          <div
            key={s.key}
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr 140px",
              gap: 16,
              alignItems: "center",
              padding: "16px 20px",
              borderBottom:
                i < settings.length - 1 ? `1px solid ${T.border}` : "none",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: T.primary,
                  marginBottom: 2,
                }}
              >
                {s.key}
              </div>
              <div style={{ fontSize: 11, color: T.textMuted }}>{s.desc}</div>
            </div>
            <input
              value={s.value}
              onChange={(e) =>
                setSettings((prev) =>
                  prev.map((x, xi) =>
                    xi === i ? { ...x, value: e.target.value } : x,
                  ),
                )
              }
              style={inputS}
            />
            <button
              onClick={() => {
                setSaved(s.key);
                showToast("Setting saved");
              }}
              style={{
                background: saved === s.key ? T.primaryLight : T.primaryLight,
                color: T.primary,
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {saved === s.key ? "✓ Saved" : "Update"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NUTRITIONIST PAGES
// ═══════════════════════════════════════════════════════════════════════════════

// ── Nutritionist Dashboard ────────────────────────────────────────────────────
function NutritionistDashboard({
  children,
  measurements,
  parents,
  appointments,
}) {
  const atRisk = children.filter(
    (c) => !["Normal", "Overweight"].includes(c.status),
  );
  const statusCounts = children.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  const todayAppts = appointments.filter((a) => a.status === "Scheduled");

  const cards = [
    {
      label: "Children Monitored",
      value: children.length,
      icon: "children",
      color: T.primary,
      bg: T.primaryLight,
      delta: `${statusCounts["Normal"] || 0} Normal`,
      desc: "Registered children",
      featured: true,
    },
    {
      label: "At-Risk Cases",
      value: atRisk.length,
      icon: "alertTriangle",
      color: T.danger,
      bg: T.dangerLight,
      delta: "Need attention",
      desc: "Priority follow-up",
    },
    {
      label: "Parents Linked",
      value: parents.length,
      icon: "parents",
      color: T.info,
      bg: T.infoLight,
      delta: `${parents.filter((p) => p.status === "Active").length} active`,
      desc: "Guardian accounts",
    },
    {
      label: "Appointments",
      value: todayAppts.length,
      icon: "calendar",
      color: T.purple,
      bg: T.purpleLight,
      delta: "Upcoming",
      desc: "Scheduled visits",
    },
  ];

  const ALERTS = [
    {
      child: "Sofia Garcia",
      status: "Severely Underweight",
      msg: "WAZ -3.2 — immediate intervention needed",
      icon: "alertTriangle",
      color: T.danger,
    },
    {
      child: "Juan Dela Cruz",
      status: "Underweight",
      msg: "2nd consecutive underweight reading",
      icon: "info",
      color: T.warn,
    },
    {
      child: "Carlos Lim",
      status: "Wasted",
      msg: "WHZ -2.2 — dietary plan required",
      icon: "info",
      color: T.info,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Nutrition Dashboard"
        subtitle="Child health overview and priority alerts"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {cards.map((c, i) => (
          <StatCard key={c.label} {...c} featured={i === 0} />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Alerts */}
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 20,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 4,
            }}
          >
            Priority Alerts
          </div>
          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 16 }}>
            Children requiring immediate follow-up
          </div>
          {ALERTS.map((a) => (
            <div
              key={a.child}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 14px",
                background: a.color + "0E",
                border: `1px solid ${a.color}30`,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Icon
                name={a.icon}
                size={16}
                color={a.color}
                style={{ flexShrink: 0, marginTop: 1 }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>
                  {a.child}
                </div>
                <StatusBadge status={a.status} />
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
                  {a.msg}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Breakdown */}
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 20,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 4,
            }}
          >
            Nutritional Status
          </div>
          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 16 }}>
            Distribution across all registered children
          </div>
          {Object.entries(statusCounts).map(([status, count]) => {
            const pct = Math.round((count / children.length) * 100);
            return (
              <div key={status} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  <StatusBadge status={status} />
                  <span style={{ color: T.textMuted }}>
                    {count} ({pct}%)
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 999,
                    background: T.bg,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(4, pct)}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: sColor(status),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          padding: 20,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: T.text,
            marginBottom: 16,
          }}
        >
          Upcoming Appointments
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 10,
          }}
        >
          {appointments
            .filter((a) => a.status === "Scheduled")
            .map((a) => (
              <div
                key={a.id}
                style={{
                  background: T.bg,
                  borderRadius: 12,
                  padding: 14,
                  border: `1px solid ${T.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>
                    {a.child}
                  </div>
                  <span
                    style={{
                      background: T.primaryLight,
                      color: T.primary,
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {a.type}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
                  {a.parent} · {a.date} at {a.time}
                </div>
                <div style={{ fontSize: 11, color: T.textLight, marginTop: 2 }}>
                  {a.note}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ── Children Growth Monitoring ────────────────────────────────────────────────
function ChildrenMonitoring({ children, parents, measurements, showToast }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [viewChild, setViewChild] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    birthdate: "",
    sex: "Male",
    barangay: "",
    address: "",
    parent: "",
    age_months: "",
    status: "Normal",
  });

  const statuses = [
    "All",
    "Normal",
    "Underweight",
    "Severely Underweight",
    "Stunted",
    "Wasted",
    "Overweight",
  ];
  const filtered = children.filter(
    (c) =>
      (filter === "All" || c.status === filter) &&
      `${c.first_name} ${c.last_name} ${c.child_code}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  if (viewChild) {
    const childMeasurements = measurements.filter(
      (m) => m.child_id === viewChild.id,
    );
    const latest = childMeasurements[0];
    return (
      <div>
        <PageHeader
          title={`${viewChild.first_name} ${viewChild.last_name}`}
          subtitle={`${viewChild.child_code} · ${viewChild.barangay} · ${viewChild.age_months} months`}
          action={
            <button onClick={() => setViewChild(null)} style={btnSecondary}>
              ← Back
            </button>
          }
        />
        <div
          style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}
        >
          <div
            style={{
              background: T.card,
              borderRadius: 16,
              border: `1px solid ${T.border}`,
              padding: 24,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background:
                    viewChild.sex === "Female" ? "#FCE4EC" : "#E3F2FD",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: 28,
                }}
              >
                {viewChild.sex === "Female" ? "👧" : "👦"}
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 700,
                  color: T.text,
                }}
              >
                {viewChild.first_name} {viewChild.last_name}
              </h2>
              <div
                style={{
                  color: T.textMuted,
                  fontSize: 12,
                  margin: "4px 0 10px",
                }}
              >
                {viewChild.child_code}
              </div>
              {latest && <StatusBadge status={latest.nutritional_status} />}
            </div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
              {[
                ["Birthdate", viewChild.birthdate],
                ["Age", `${viewChild.age_months} months`],
                ["Sex", viewChild.sex],
                ["Barangay", viewChild.barangay],
                ["Parent", viewChild.parent],
                ["Address", viewChild.address],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  <span style={{ fontSize: 12, color: T.textMuted }}>{k}</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: T.text,
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
          <div>
            {latest && (
              <div
                style={{
                  background: T.card,
                  borderRadius: 16,
                  border: `1px solid ${T.border}`,
                  padding: 20,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: T.text,
                    marginBottom: 14,
                  }}
                >
                  Latest WHO Z-Scores — {latest.measurement_date}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 12,
                  }}
                >
                  {[
                    ["WAZ", latest.waz, T.accent, "Weight-for-Age"],
                    ["HAZ", latest.haz, T.info, "Height-for-Age"],
                    ["WHZ", latest.whz, T.primaryMid, "Weight-for-Height"],
                  ].map(([l, v, c, d]) => (
                    <div
                      key={l}
                      style={{
                        background: T.bg,
                        borderRadius: 12,
                        padding: 16,
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          color: T.textMuted,
                          letterSpacing: 0.5,
                        }}
                      >
                        {d}
                      </div>
                      <div
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          color: Math.abs(v) > 2 ? T.danger : c,
                          margin: "8px 0 4px",
                        }}
                      >
                        {v > 0 ? "+" : ""}
                        {v}
                      </div>
                      <div style={{ fontSize: 10, color: T.textMuted }}>
                        {l} Z-Score
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    background: sBg(latest.nutritional_status),
                    border: `1px solid ${sColor(latest.nutritional_status)}30`,
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
                      color: sColor(latest.nutritional_status),
                      fontWeight: 700,
                    }}
                  >
                    Nutritional Status: {latest.nutritional_status}
                  </span>
                  <span style={{ fontSize: 11, color: T.textMuted }}>
                    H: {latest.height_cm}cm · W: {latest.weight_kg}kg
                  </span>
                </div>
              </div>
            )}
            <div
              style={{
                background: T.card,
                borderRadius: 16,
                border: `1px solid ${T.border}`,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: T.text,
                  marginBottom: 14,
                }}
              >
                Measurement History
              </div>
              {childMeasurements.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: T.textMuted,
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
                            color: T.textMuted,
                            borderBottom: `1px solid ${T.border}`,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {childMeasurements.map((m) => (
                      <tr
                        key={m.id}
                        style={{ borderBottom: `1px solid ${T.border}` }}
                      >
                        <td style={{ padding: "8px 10px", fontSize: 12 }}>
                          {m.measurement_date}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: 12,
                            color: T.textMuted,
                          }}
                        >
                          {m.height_cm}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: 12,
                            color: T.textMuted,
                          }}
                        >
                          {m.weight_kg}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: 12,
                            color: T.accent,
                            fontWeight: 600,
                          }}
                        >
                          {m.waz > 0 ? "+" : ""}
                          {m.waz}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: 12,
                            color: T.info,
                            fontWeight: 600,
                          }}
                        >
                          {m.haz > 0 ? "+" : ""}
                          {m.haz}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: 12,
                            color: T.primaryMid,
                            fontWeight: 600,
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

  return (
    <div>
      <PageHeader
        title="Children & Growth"
        subtitle={`${children.length} registered children`}
        action={
          <button
            onClick={() => {
              setForm({
                first_name: "",
                last_name: "",
                birthdate: "",
                sex: "Male",
                barangay: "",
                address: "",
                parent: "",
                age_months: "",
                status: "Normal",
              });
              setModal("add");
            }}
            style={btnPrimary}
          >
            <Icon name="plus" size={14} color="#fff" />
            Add Child
          </button>
        }
      />

      {modal && (
        <Modal
          title={modal === "add" ? "Add New Child" : "Edit Child"}
          onClose={() => setModal(null)}
        >
          <div style={{ padding: 24 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Field label="First Name" required>
                <input
                  style={inputS}
                  value={form.first_name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, first_name: e.target.value }))
                  }
                />
              </Field>
              <Field label="Last Name" required>
                <input
                  style={inputS}
                  value={form.last_name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, last_name: e.target.value }))
                  }
                />
              </Field>
              <Field label="Birthdate" required>
                <input
                  type="date"
                  style={inputS}
                  value={form.birthdate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, birthdate: e.target.value }))
                  }
                />
              </Field>
              <Field label="Age (months)">
                <input
                  type="number"
                  style={inputS}
                  value={form.age_months}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, age_months: e.target.value }))
                  }
                />
              </Field>
              <Field label="Sex">
                <select
                  style={selectS}
                  value={form.sex}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, sex: e.target.value }))
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </Field>
              <Field label="Barangay">
                <input
                  style={inputS}
                  value={form.barangay}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, barangay: e.target.value }))
                  }
                />
              </Field>
              <Field label="Parent/Guardian" required>
                <select
                  style={selectS}
                  value={form.parent}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, parent: e.target.value }))
                  }
                >
                  <option value="">-- Select Parent --</option>
                  {parents.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Initial Status">
                <select
                  style={selectS}
                  value={form.status}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, status: e.target.value }))
                  }
                >
                  {[
                    "Normal",
                    "Underweight",
                    "Severely Underweight",
                    "Stunted",
                    "Wasted",
                    "Overweight",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Address">
              <input
                style={inputS}
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
              />
            </Field>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 8,
              }}
            >
              <button onClick={() => setModal(null)} style={btnSecondary}>
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!form.first_name || !form.last_name) return;
                  showToast(`${form.first_name} ${form.last_name} added`);
                  setModal(null);
                }}
                style={{ ...btnPrimary, padding: "9px 20px" }}
              >
                Add Child
              </button>
            </div>
          </div>
        </Modal>
      )}

      {confirm && (
        <ConfirmDialog
          msg={`Delete ${confirm.first_name} ${confirm.last_name}? This cannot be undone.`}
          onConfirm={() => {
            showToast(`${confirm.first_name} deleted`, "danger");
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}

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
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            fontSize: 13,
            outline: "none",
            background: T.card,
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
                border: `1px solid ${filter === s ? sColor(s) : T.border}`,
                background: filter === s ? sBg(s) : T.card,
                color: filter === s ? sColor(s) : T.textMuted,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.bg }}>
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
                    color: T.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${T.border}`,
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
                    i < filtered.length - 1 ? `1px solid ${T.border}` : "none",
                }}
              >
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: T.textMuted,
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
                      {c.sex === "Female" ? "👧" : "👦"}
                    </div>
                    <div>
                      <div
                        style={{ fontSize: 13, fontWeight: 600, color: T.text }}
                      >
                        {c.first_name} {c.last_name}
                      </div>
                      <div style={{ fontSize: 10, color: T.textMuted }}>
                        {c.birthdate}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: T.textMuted,
                  }}
                >
                  {c.age_months} mo
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: T.textMuted,
                  }}
                >
                  {c.sex}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {c.barangay}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {c.parent}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={c.status} />
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => setViewChild(c)}
                      style={{
                        background: T.primaryLight,
                        color: T.primary,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 10px",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => setConfirm(c)}
                      style={{
                        background: T.dangerLight,
                        color: T.danger,
                        border: "none",
                        borderRadius: 7,
                        padding: "5px 8px",
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="trash" size={12} color={T.danger} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Measurements ──────────────────────────────────────────────────────────────
function MeasurementsPage({ measurements, children, onAdd, showToast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    child_id: "",
    height_cm: "",
    weight_kg: "",
    measurement_date: new Date().toISOString().split("T")[0],
    source_type: "manual",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (form.child_id && form.height_cm && form.weight_kg) {
      const child = children.find((c) => c.id === parseInt(form.child_id));
      if (child)
        setPreview(
          computeWHO({
            weight_kg: parseFloat(form.weight_kg),
            height_cm: parseFloat(form.height_cm),
            age_months: child.age_months,
          }),
        );
    } else setPreview(null);
  }, [form.child_id, form.height_cm, form.weight_kg]);

  return (
    <div>
      <PageHeader
        title="Anthropometric Records"
        subtitle={`${measurements.length} measurements recorded`}
        action={
          <button onClick={() => setModal(true)} style={btnPrimary}>
            <Icon name="plus" size={14} color="#fff" />
            Add Record
          </button>
        }
      />

      {modal && (
        <Modal
          title="Add Measurement Record"
          onClose={() => setModal(false)}
          width={520}
        >
          <div style={{ padding: 24 }}>
            <Field label="Child" required>
              <select
                style={selectS}
                value={form.child_id}
                onChange={(e) =>
                  setForm((p) => ({ ...p, child_id: e.target.value }))
                }
              >
                <option value="">-- Select Child --</option>
                {children.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.first_name} {c.last_name} ({c.age_months} mo)
                  </option>
                ))}
              </select>
            </Field>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Field label="Height (cm)" required>
                <input
                  type="number"
                  step="0.1"
                  style={inputS}
                  value={form.height_cm}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, height_cm: e.target.value }))
                  }
                  placeholder="e.g. 82.5"
                />
              </Field>
              <Field label="Weight (kg)" required>
                <input
                  type="number"
                  step="0.1"
                  style={inputS}
                  value={form.weight_kg}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, weight_kg: e.target.value }))
                  }
                  placeholder="e.g. 10.8"
                />
              </Field>
              <Field label="Date">
                <input
                  type="date"
                  style={inputS}
                  value={form.measurement_date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, measurement_date: e.target.value }))
                  }
                />
              </Field>
              <Field label="Source">
                <select
                  style={selectS}
                  value={form.source_type}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, source_type: e.target.value }))
                  }
                >
                  <option value="kiosk">Kiosk</option>
                  <option value="mobile">Mobile</option>
                  <option value="manual">Manual</option>
                </select>
              </Field>
            </div>
            {preview && (
              <div
                style={{
                  background: sBg(preview.status),
                  border: `1px solid ${sColor(preview.status)}30`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <StatusBadge status={preview.status} />
                <span style={{ fontSize: 12, color: T.textMuted }}>
                  WAZ: {preview.waz > 0 ? "+" : ""}
                  {preview.waz} · HAZ: {preview.haz > 0 ? "+" : ""}
                  {preview.haz} · WHZ: {preview.whz > 0 ? "+" : ""}
                  {preview.whz}
                </span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 14,
              }}
            >
              <button onClick={() => setModal(false)} style={btnSecondary}>
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!form.child_id || !form.height_cm || !form.weight_kg)
                    return;
                  showToast("Measurement added");
                  setModal(false);
                }}
                style={{ ...btnPrimary, padding: "9px 20px" }}
              >
                Add Record
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.bg }}>
              {[
                "#",
                "Child",
                "Height",
                "Weight",
                "Age",
                "WAZ",
                "HAZ",
                "WHZ",
                "Date",
                "Source",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 14px",
                    fontSize: 11,
                    color: T.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${T.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {measurements.map((m, i) => (
              <tr
                key={m.id}
                style={{
                  borderBottom:
                    i < measurements.length - 1
                      ? `1px solid ${T.border}`
                      : "none",
                }}
              >
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {m.id}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.text,
                  }}
                >
                  {m.child}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: T.textMuted,
                  }}
                >
                  {m.height_cm}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: T.textMuted,
                  }}
                >
                  {m.weight_kg}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    color: T.textMuted,
                  }}
                >
                  {m.age_months}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: m.waz < -2 ? T.danger : T.primary,
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
                    color: m.haz < -2 ? T.danger : T.info,
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
                    color: m.whz < -2 ? T.danger : T.primaryMid,
                  }}
                >
                  {m.whz > 0 ? "+" : ""}
                  {m.whz}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: 12,
                    color: T.textMuted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.measurement_date}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span
                    style={{
                      background: T.bg,
                      padding: "2px 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      color: T.textMuted,
                    }}
                  >
                    {m.source_type}
                  </span>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={m.nutritional_status} />
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <button
                    onClick={() => showToast("Record deleted", "danger")}
                    style={{
                      background: T.dangerLight,
                      color: T.danger,
                      border: "none",
                      borderRadius: 7,
                      padding: "5px 8px",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="trash" size={12} color={T.danger} />
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

// ── WHO Analysis ──────────────────────────────────────────────────────────────
function WHOAnalysis({ children, measurements }) {
  const statusCounts = children.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  const avgWaz = (
    measurements.reduce((s, m) => s + m.waz, 0) / measurements.length
  ).toFixed(2);
  const avgHaz = (
    measurements.reduce((s, m) => s + m.haz, 0) / measurements.length
  ).toFixed(2);
  const avgWhz = (
    measurements.reduce((s, m) => s + m.whz, 0) / measurements.length
  ).toFixed(2);

  return (
    <div>
      <PageHeader
        title="WHO Growth Analysis"
        subtitle="Z-score analysis using WHO Child Growth Standards (2006)"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {[
          ["Weight-for-Age (WAZ)", avgWaz, T.accent, "Population average"],
          ["Height-for-Age (HAZ)", avgHaz, T.info, "Population average"],
          [
            "Weight-for-Height (WHZ)",
            avgWhz,
            T.primaryMid,
            "Population average",
          ],
        ].map(([label, val, color, desc]) => (
          <div
            key={label}
            style={{
              background: T.card,
              borderRadius: 14,
              border: `1px solid ${T.border}`,
              padding: 20,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>
              {label}
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: Math.abs(parseFloat(val)) > 2 ? T.danger : color,
              }}
            >
              {parseFloat(val) > 0 ? "+" : ""}
              {val}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
              {desc}
            </div>
            <div
              style={{
                marginTop: 10,
                padding: "6px 12px",
                borderRadius: 20,
                display: "inline-block",
                background:
                  Math.abs(parseFloat(val)) > 2
                    ? T.dangerLight
                    : T.primaryLight,
                color: Math.abs(parseFloat(val)) > 2 ? T.danger : T.primary,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {Math.abs(parseFloat(val)) > 2
                ? "Below Normal"
                : Math.abs(parseFloat(val)) < 1
                  ? "Within Range"
                  : "Borderline"}
            </div>
          </div>
        ))}
      </div>

      {/* Z-score interpretation guide */}
      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          padding: 24,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: T.text,
            marginBottom: 16,
          }}
        >
          WHO Z-Score Interpretation Guide
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 10,
          }}
        >
          {[
            [
              "Z < -3",
              "Severely Underweight / Severely Wasted / Severely Stunted",
              T.danger,
            ],
            ["-3 ≤ Z < -2", "Underweight / Wasted / Stunted", T.warn],
            ["-2 ≤ Z < -1", "Mild Risk (monitor closely)", T.accent],
            ["-1 ≤ Z ≤ +1", "Normal range — healthy growth", T.primary],
            ["+1 < Z ≤ +2", "Above average (acceptable)", T.info],
            ["Z > +2", "Overweight / Obese", T.purple],
          ].map(([range, label, color]) => (
            <div
              key={range}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 14px",
                background: color + "0D",
                borderRadius: 10,
                border: `1px solid ${color}25`,
              }}
            >
              <span
                style={{
                  background: color,
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 20,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {range}
              </span>
              <span style={{ fontSize: 12, color: T.text }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual records */}
      <div
        style={{
          background: T.card,
          borderRadius: 16,
          border: `1px solid ${T.border}`,
          padding: 24,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: T.text,
            marginBottom: 16,
          }}
        >
          Individual Z-Score Records
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: T.bg }}>
              {[
                "Child",
                "Age",
                "Height",
                "Weight",
                "WAZ",
                "HAZ",
                "WHZ",
                "Nutritional Status",
                "Date",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    fontSize: 11,
                    color: T.textMuted,
                    fontWeight: 600,
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {measurements.map((m, i) => (
              <tr
                key={m.id}
                style={{
                  borderBottom:
                    i < measurements.length - 1
                      ? `1px solid ${T.border}`
                      : "none",
                }}
              >
                <td
                  style={{
                    padding: "10px 12px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.text,
                  }}
                >
                  {m.child}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {m.age_months} mo
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {m.height_cm} cm
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    fontSize: 12,
                    color: T.textMuted,
                  }}
                >
                  {m.weight_kg} kg
                </td>
                {[
                  ["waz", T.accent],
                  ["haz", T.info],
                  ["whz", T.primaryMid],
                ].map(([key, color]) => (
                  <td
                    key={key}
                    style={{
                      padding: "10px 12px",
                      fontSize: 13,
                      fontWeight: 700,
                      color: Math.abs(m[key]) > 2 ? T.danger : color,
                    }}
                  >
                    {m[key] > 0 ? "+" : ""}
                    {m[key]}
                  </td>
                ))}
                <td style={{ padding: "10px 12px" }}>
                  <StatusBadge status={m.nutritional_status} />
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    fontSize: 11,
                    color: T.textMuted,
                  }}
                >
                  {m.measurement_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Parents Page ──────────────────────────────────────────────────────────────
function ParentsPage({ parents, children, showToast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });
  const [confirm, setConfirm] = useState(null);

  const childrenByParent = children.reduce((acc, c) => {
    if (!acc[c.parent]) acc[c.parent] = [];
    acc[c.parent].push(c);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Parent Accounts"
        subtitle={`${parents.length} registered guardians`}
        action={
          <button
            onClick={() => {
              setForm({ name: "", email: "", phone: "", status: "Active" });
              setModal("add");
            }}
            style={btnPrimary}
          >
            <Icon name="plus" size={14} color="#fff" />
            Add Parent
          </button>
        }
      />

      {modal && (
        <Modal
          title={modal === "add" ? "Add Parent" : "Edit Parent"}
          onClose={() => setModal(null)}
          width={440}
        >
          <div style={{ padding: 24 }}>
            <Field label="Full Name" required>
              <input
                style={inputS}
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </Field>
            <Field label="Email Address" required>
              <input
                type="email"
                style={inputS}
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </Field>
            <Field label="Phone Number" required>
              <input
                style={inputS}
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </Field>
            <Field label="Status">
              <select
                style={selectS}
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </Field>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 8,
              }}
            >
              <button onClick={() => setModal(null)} style={btnSecondary}>
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!form.name || !form.email) return;
                  showToast(`${form.name} added`);
                  setModal(null);
                }}
                style={{ ...btnPrimary, padding: "9px 20px" }}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}

      {confirm && (
        <ConfirmDialog
          msg={`Remove ${confirm.name}?`}
          onConfirm={() => {
            showToast(`${confirm.name} removed`, "danger");
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 14,
        }}
      >
        {parents.map((p) => {
          const pChildren = childrenByParent[p.name] || [];
          return (
            <div
              key={p.id}
              style={{
                background: T.card,
                borderRadius: 14,
                border: `1px solid ${T.border}`,
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
                    background: T.primaryLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 16,
                    color: T.primary,
                  }}
                >
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>
                    {p.name}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 10,
                      background: p.status === "Active" ? T.primaryLight : T.bg,
                      color: p.status === "Active" ? T.primary : T.textMuted,
                      fontWeight: 600,
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
              <div
                style={{
                  borderTop: `1px solid ${T.border}`,
                  paddingTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {[
                  [T.mail, p.email],
                  [T.phone, p.phone],
                ].map((_, i) => (
                  <div key={i} style={{ fontSize: 12, color: T.textMuted }}>
                    {i === 0 ? `📧 ${p.email}` : `📞 ${p.phone}`}
                  </div>
                ))}
                <div style={{ fontSize: 12, color: T.textMuted }}>
                  👶 {pChildren.length} child(ren)
                </div>
                {pChildren.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      flexWrap: "wrap",
                      marginTop: 4,
                    }}
                  >
                    {pChildren.map((c) => (
                      <StatusBadge key={c.id} status={c.status} />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
                <button
                  onClick={() => {
                    setForm({ ...p });
                    setModal("edit");
                  }}
                  style={{
                    flex: 1,
                    background: T.infoLight,
                    color: T.info,
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 0",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirm(p)}
                  style={{
                    background: T.dangerLight,
                    color: T.danger,
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 10px",
                    cursor: "pointer",
                  }}
                >
                  <Icon name="trash" size={13} color={T.danger} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Appointments ──────────────────────────────────────────────────────────────
function AppointmentsPage({ appointments, children, parents, showToast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    child: "",
    parent: "",
    date: "",
    time: "",
    type: "Follow-up",
    note: "",
    status: "Scheduled",
  });

  const upcoming = appointments.filter((a) => a.status === "Scheduled");
  const completed = appointments.filter((a) => a.status === "Completed");

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle={`${upcoming.length} upcoming · ${completed.length} completed`}
        action={
          <button onClick={() => setModal(true)} style={btnPrimary}>
            <Icon name="plus" size={14} color="#fff" />
            New Appointment
          </button>
        }
      />

      {modal && (
        <Modal
          title="New Appointment"
          onClose={() => setModal(false)}
          width={480}
        >
          <div style={{ padding: 24 }}>
            <Field label="Child">
              <select
                style={selectS}
                value={form.child}
                onChange={(e) =>
                  setForm((p) => ({ ...p, child: e.target.value }))
                }
              >
                <option value="">-- Select Child --</option>
                {children.map((c) => (
                  <option key={c.id}>
                    {c.first_name} {c.last_name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Parent/Guardian">
              <select
                style={selectS}
                value={form.parent}
                onChange={(e) =>
                  setForm((p) => ({ ...p, parent: e.target.value }))
                }
              >
                <option value="">-- Select Parent --</option>
                {parents.map((pa) => (
                  <option key={pa.id}>{pa.name}</option>
                ))}
              </select>
            </Field>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <Field label="Date">
                <input
                  type="date"
                  style={inputS}
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </Field>
              <Field label="Time">
                <input
                  type="time"
                  style={inputS}
                  value={form.time}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, time: e.target.value }))
                  }
                />
              </Field>
            </div>
            <Field label="Type">
              <select
                style={selectS}
                value={form.type}
                onChange={(e) =>
                  setForm((p) => ({ ...p, type: e.target.value }))
                }
              >
                {[
                  "Follow-up",
                  "Nutrition Counseling",
                  "Emergency",
                  "Initial Assessment",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Note">
              <input
                style={inputS}
                value={form.note}
                onChange={(e) =>
                  setForm((p) => ({ ...p, note: e.target.value }))
                }
                placeholder="Optional note..."
              />
            </Field>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 8,
              }}
            >
              <button onClick={() => setModal(false)} style={btnSecondary}>
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast("Appointment scheduled");
                  setModal(false);
                }}
                style={{ ...btnPrimary, padding: "9px 20px" }}
              >
                Schedule
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 20,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 16,
            }}
          >
            Upcoming ({upcoming.length})
          </div>
          {upcoming.map((a) => (
            <div
              key={a.id}
              style={{
                background: T.bg,
                borderRadius: 12,
                padding: 14,
                marginBottom: 10,
                border: `1px solid ${T.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 6,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>
                  {a.child}
                </div>
                <span
                  style={{
                    background: T.primaryLight,
                    color: T.primary,
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  {a.type}
                </span>
              </div>
              <div style={{ fontSize: 12, color: T.textMuted }}>
                👤 {a.parent}
              </div>
              <div style={{ fontSize: 12, color: T.textMuted }}>
                📅 {a.date} at {a.time}
              </div>
              {a.note && (
                <div style={{ fontSize: 11, color: T.textLight, marginTop: 4 }}>
                  📝 {a.note}
                </div>
              )}
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <button
                  onClick={() => showToast("Marked as complete")}
                  style={{
                    flex: 1,
                    background: T.primaryLight,
                    color: T.primary,
                    border: "none",
                    borderRadius: 7,
                    padding: "6px 0",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Mark Complete
                </button>
                <button
                  onClick={() => showToast("Appointment cancelled", "warn")}
                  style={{
                    flex: 1,
                    background: T.dangerLight,
                    color: T.danger,
                    border: "none",
                    borderRadius: 7,
                    padding: "6px 0",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 20,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 16,
            }}
          >
            Completed ({completed.length})
          </div>
          {completed.map((a) => (
            <div
              key={a.id}
              style={{
                background: T.bg,
                borderRadius: 12,
                padding: 14,
                marginBottom: 10,
                border: `1px solid ${T.border}`,
                opacity: 0.8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 6,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>
                  {a.child}
                </div>
                <span
                  style={{
                    background: T.primaryLight,
                    color: T.primary,
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  ✓ Done
                </span>
              </div>
              <div style={{ fontSize: 12, color: T.textMuted }}>
                👤 {a.parent}
              </div>
              <div style={{ fontSize: 12, color: T.textMuted }}>
                📅 {a.date} at {a.time}
              </div>
              {a.note && (
                <div style={{ fontSize: 11, color: T.textLight, marginTop: 4 }}>
                  📝 {a.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Reports ───────────────────────────────────────────────────────────────────
function ReportsPage({ children, measurements }) {
  const statusCounts = children.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  const atRisk = children.filter((c) => !["Normal"].includes(c.status)).length;
  const normal = children.filter((c) => c.status === "Normal").length;

  return (
    <div>
      <PageHeader
        title="Nutrition Reports"
        subtitle="Monthly growth and malnutrition analytics"
        action={
          <button style={btnPrimary}>
            <Icon name="save" size={14} color="#fff" />
            Export CSV
          </button>
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {[
          {
            label: "Total Children",
            value: children.length,
            color: T.primary,
            bg: T.primaryLight,
          },
          {
            label: "Normal Growth",
            value: normal,
            color: T.primaryMid,
            bg: T.primaryLight,
          },
          {
            label: "At-Risk",
            value: atRisk,
            color: T.danger,
            bg: T.dangerLight,
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: T.card,
              borderRadius: 14,
              border: `1px solid ${T.border}`,
              padding: 20,
            }}
          >
            <div style={{ fontSize: 12, color: T.textMuted }}>{s.label}</div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: s.color,
                margin: "8px 0",
              }}
            >
              {s.value}
            </div>
            <div style={{ height: 6, borderRadius: 999, background: T.bg }}>
              <div
                style={{
                  width: `${(s.value / children.length) * 100}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: s.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 24,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 16,
            }}
          >
            Status Breakdown
          </div>
          {Object.entries(statusCounts).map(([status, count]) => {
            const pct = Math.round((count / children.length) * 100);
            return (
              <div key={status} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <StatusBadge status={status} />
                  <span style={{ fontSize: 12, color: T.textMuted }}>
                    {count} children ({pct}%)
                  </span>
                </div>
                <div
                  style={{
                    height: 10,
                    borderRadius: 999,
                    background: T.bg,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(4, pct)}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: sColor(status),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 24,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 16,
            }}
          >
            Priority Follow-up List
          </div>
          {children
            .filter((c) => c.status !== "Normal")
            .slice(0, 6)
            .map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>
                    {c.first_name} {c.last_name}
                  </div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>
                    {c.barangay} · {c.age_months} months · Parent: {c.parent}
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ── Nutritionist Settings ─────────────────────────────────────────────────────
function NutritionistSettings({ user, showToast }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: "09171234560",
    barangay: "Bagong Silang",
    role: "Registered Dietitian Nutritionist (RDN)",
    notify_alerts: true,
    notify_appointments: true,
  });

  return (
    <div>
      <PageHeader
        title="My Settings"
        subtitle="Manage your profile and notification preferences"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 24,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 20,
            }}
          >
            Profile Information
          </div>
          <Field label="Full Name">
            <input
              style={inputS}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </Field>
          <Field label="Email Address">
            <input
              type="email"
              style={inputS}
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
            />
          </Field>
          <Field label="Phone Number">
            <input
              style={inputS}
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </Field>
          <Field label="Assigned Barangay">
            <input
              style={inputS}
              value={form.barangay}
              onChange={(e) =>
                setForm((p) => ({ ...p, barangay: e.target.value }))
              }
            />
          </Field>
          <Field label="Professional Role">
            <input
              style={inputS}
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            />
          </Field>
          <button
            onClick={() => showToast("Profile updated")}
            style={btnPrimary}
          >
            <Icon name="save" size={14} color="#fff" />
            Save Profile
          </button>
        </div>
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            border: `1px solid ${T.border}`,
            padding: 24,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: T.text,
              marginBottom: 20,
            }}
          >
            Notification Preferences
          </div>
          {[
            ["notify_alerts", "Priority health alerts (at-risk children)"],
            ["notify_appointments", "Appointment reminders"],
          ].map(([key, label]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <div style={{ fontSize: 13, color: T.text }}>{label}</div>
              <button
                onClick={() => setForm((p) => ({ ...p, [key]: !p[key] }))}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: form[key] ? T.primaryMid : T.border,
                  position: "relative",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: form[key] ? "calc(100% - 22px)" : 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                  }}
                />
              </button>
            </div>
          ))}
          <div
            style={{
              marginTop: 24,
              padding: 16,
              background: T.bg,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: T.text,
                marginBottom: 4,
              }}
            >
              Account Info
            </div>
            <div style={{ fontSize: 11, color: T.textMuted }}>
              Role: {user.role}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted }}>
              Email: {user.email}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted }}>
              Last login: Today, 09:15 AM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// KIOSK VIEW (standalone, from login)
// ═══════════════════════════════════════════════════════════════════════════════
function KioskView({ children, onBack }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);
  const [form, setForm] = useState({ height_cm: "", weight_kg: "" });
  const [progress, setProgress] = useState(0);
  const [sensorStage, setSensorStage] = useState(0);
  const [result, setResult] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const timerRef = useRef();

  useEffect(() => {
    const iv = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => () => clearInterval(timerRef.current), []);

  const STAGES = [
    "Initializing sensors...",
    "Connecting TF-Luna LiDAR...",
    "Measuring height...",
    "Reading load cell...",
    "Processing data...",
    "Computing WHO Z-Scores...",
    "Saving to database...",
    "Complete!",
  ];

  const startMeasurement = () => {
    setStep(2);
    setProgress(0);
    setSensorStage(0);
    let p = 0,
      s = 0;
    timerRef.current = setInterval(() => {
      p += 100 / 35;
      s = Math.floor((p / 100) * STAGES.length);
      setProgress(Math.min(p, 100));
      setSensorStage(Math.min(s, STAGES.length - 1));
      if (p >= 100) {
        clearInterval(timerRef.current);
        const r = computeWHO({
          weight_kg: parseFloat(form.weight_kg),
          height_cm: parseFloat(form.height_cm),
          age_months: selectedChild.age_months,
        });
        setResult(r);
        setTimeout(() => setStep(3), 400);
      }
    }, 100);
  };

  const KBG = {
    bg: "linear-gradient(135deg,#0D2B20 0%,#0B3D2A 50%,#0D2B20 100%)",
    text: "#fff",
    muted: "rgba(255,255,255,0.6)",
    faint: "rgba(255,255,255,0.25)",
    panel: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.1)",
    accent: "#2BC88A",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: KBG.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI',sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: `1px solid ${KBG.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: KBG.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="heart" size={18} color="#fff" />
          </div>
          <div>
            <div style={{ color: KBG.text, fontWeight: 700, fontSize: 15 }}>
              SukatKalusugan
            </div>
            <div style={{ color: KBG.muted, fontSize: 10, letterSpacing: 1 }}>
              ANTHROPOMETRIC KIOSK v1.0
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {["TF-Luna LiDAR", "HX711 Load Cell", "WiFi"].map((s) => (
            <span
              key={s}
              style={{
                fontSize: 10,
                color: KBG.accent,
                background: "rgba(43,200,138,0.15)",
                padding: "2px 8px",
                borderRadius: 6,
                border: "1px solid rgba(43,200,138,0.3)",
              }}
            >
              ● {s}
            </span>
          ))}
          <button
            onClick={onBack}
            style={{
              background: KBG.panel,
              color: KBG.muted,
              border: `1px solid ${KBG.border}`,
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ← Exit
          </button>
        </div>
      </div>

      {/* Steps indicator (not on welcome) */}
      {!showWelcome && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            padding: "20px 0 0",
          }}
        >
          {["Select Child", "Enter Data", "Processing", "Results"].map(
            (s, i) => (
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
                          ? KBG.accent
                          : step === i
                            ? "rgba(43,200,138,0.2)"
                            : KBG.panel,
                      border: `2px solid ${step >= i ? KBG.accent : KBG.border}`,
                      color: step >= i ? KBG.text : KBG.faint,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {step > i ? "✓" : i + 1}
                  </div>
                  <div
                    style={{
                      color: step === i ? KBG.accent : KBG.faint,
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
                      background: step > i ? KBG.accent : KBG.border,
                      margin: "0 4px 16px",
                    }}
                  />
                )}
              </div>
            ),
          )}
        </div>
      )}

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        {/* Welcome */}
        {showWelcome && (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 500,
            }}
          >
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: "rgba(43,200,138,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 32,
                fontSize: 70,
              }}
            >
              💚
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 42, fontWeight: 600, color: KBG.muted }}>
                Sukat
              </span>
              <span
                style={{ fontSize: 42, fontWeight: 700, color: KBG.accent }}
              >
                {" "}
                Kalusugan
              </span>
            </div>
            <div style={{ fontSize: 18, color: KBG.muted, marginBottom: 28 }}>
              Anthropometric Measurement Kiosk
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: KBG.text,
                letterSpacing: -1,
                marginBottom: 8,
              }}
            >
              {currentTime.toLocaleTimeString("en-PH", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </div>
            <div style={{ fontSize: 13, color: KBG.muted, marginBottom: 36 }}>
              {currentTime.toLocaleDateString("en-PH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              style={{
                background: T.danger,
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "16px 56px",
                fontSize: 18,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Touch to Start
            </button>
          </div>
        )}

        {/* Step 0: Select child */}
        {!showWelcome && step === 0 && (
          <div style={{ width: "100%", maxWidth: 700 }}>
            <h2
              style={{
                color: KBG.text,
                textAlign: "center",
                fontSize: 20,
                marginBottom: 6,
              }}
            >
              Select Child Profile
            </h2>
            <p
              style={{
                color: KBG.muted,
                textAlign: "center",
                fontSize: 13,
                marginBottom: 24,
              }}
            >
              Search or select from registered children below
            </p>
            <div style={{ position: "relative", marginBottom: 20 }}>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  background: KBG.panel,
                  border: `1px solid ${KBG.border}`,
                  borderRadius: 12,
                  padding: "12px 16px",
                  color: KBG.text,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                gap: 12,
              }}
            >
              {children
                .filter(
                  (c) =>
                    search === "" ||
                    `${c.first_name} ${c.last_name}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                )
                .slice(0, 9)
                .map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedChild(c);
                      setStep(1);
                    }}
                    style={{
                      background: KBG.panel,
                      border: `1px solid ${KBG.border}`,
                      borderRadius: 14,
                      padding: 16,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 8 }}>
                      {c.sex === "Female" ? "👧" : "👦"}
                    </div>
                    <div
                      style={{ color: KBG.text, fontWeight: 700, fontSize: 13 }}
                    >
                      {c.first_name} {c.last_name}
                    </div>
                    <div
                      style={{ color: KBG.muted, fontSize: 11, marginTop: 2 }}
                    >
                      {c.age_months} months · {c.sex}
                    </div>
                    <div
                      style={{ color: KBG.faint, fontSize: 10, marginTop: 2 }}
                    >
                      {c.child_code}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Step 1: Enter measurements */}
        {!showWelcome && step === 1 && selectedChild && (
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              background: KBG.panel,
              borderRadius: 20,
              border: `1px solid ${KBG.border}`,
              padding: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 28,
              }}
            >
              <div style={{ fontSize: 48 }}>
                {selectedChild.sex === "Female" ? "👧" : "👦"}
              </div>
              <div>
                <div style={{ color: KBG.text, fontWeight: 700, fontSize: 18 }}>
                  {selectedChild.first_name} {selectedChild.last_name}
                </div>
                <div style={{ color: KBG.muted, fontSize: 13 }}>
                  {selectedChild.child_code} · {selectedChild.age_months} months
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
                ["Height (cm)", "height_cm", "e.g. 82.5"],
                ["Weight (kg)", "weight_kg", "e.g. 10.8"],
              ].map(([label, key, ph]) => (
                <div key={key}>
                  <label
                    style={{
                      display: "block",
                      color: KBG.muted,
                      fontSize: 11,
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder={ph}
                    value={form[key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [key]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.07)",
                      border: `1px solid ${KBG.border}`,
                      borderRadius: 12,
                      padding: "12px 14px",
                      color: KBG.text,
                      fontSize: 18,
                      fontWeight: 600,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={startMeasurement}
              disabled={!form.height_cm || !form.weight_kg}
              style={{
                width: "100%",
                background:
                  form.height_cm && form.weight_kg ? KBG.accent : KBG.panel,
                color: KBG.text,
                border: "none",
                borderRadius: 12,
                padding: "14px 0",
                fontSize: 16,
                fontWeight: 700,
                cursor:
                  form.height_cm && form.weight_kg ? "pointer" : "not-allowed",
              }}
            >
              📡 START MEASUREMENT
            </button>
          </div>
        )}

        {/* Step 2: Processing */}
        {!showWelcome && step === 2 && (
          <div style={{ textAlign: "center", maxWidth: 400 }}>
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
                  stroke={KBG.border}
                  strokeWidth={6}
                />
                <circle
                  cx={70}
                  cy={70}
                  r={60}
                  fill="none"
                  stroke={KBG.accent}
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
                <div style={{ fontSize: 24, marginBottom: 4 }}>📡</div>
                <div style={{ color: KBG.text, fontSize: 18, fontWeight: 700 }}>
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <div
              style={{
                color: KBG.accent,
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              {STAGES[sensorStage]}
            </div>
            {STAGES.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 11,
                  color: i <= sensorStage ? KBG.muted : KBG.faint,
                  marginBottom: 6,
                }}
              >
                <span>
                  {i < sensorStage ? "✓" : i === sensorStage ? "▶" : "○"}
                </span>
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Step 3: Results */}
        {!showWelcome && step === 3 && result && selectedChild && (
          <div style={{ width: "100%", maxWidth: 540 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>
                {result.status === "Normal" ? "✅" : "⚠️"}
              </div>
              <h2 style={{ color: KBG.text, fontSize: 22, margin: 0 }}>
                Measurement Complete
              </h2>
              <p style={{ color: KBG.muted, fontSize: 13 }}>
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
              {[
                ["HEIGHT", form.height_cm, "cm"],
                ["WEIGHT", form.weight_kg, "kg"],
              ].map(([l, v, u]) => (
                <div
                  key={l}
                  style={{
                    background: KBG.panel,
                    borderRadius: 14,
                    padding: 18,
                    border: `1px solid ${KBG.border}`,
                  }}
                >
                  <div
                    style={{ color: KBG.muted, fontSize: 10, letterSpacing: 1 }}
                  >
                    {l}
                  </div>
                  <div
                    style={{ color: KBG.text, fontSize: 30, fontWeight: 700 }}
                  >
                    {v}
                    <span style={{ fontSize: 14 }}> {u}</span>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: KBG.panel,
                borderRadius: 16,
                padding: 20,
                border: `1px solid ${sColor(result.status)}40`,
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
                <div style={{ color: KBG.muted, fontSize: 12 }}>
                  NUTRITIONAL STATUS
                </div>
                <StatusBadge status={result.status} />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 10,
                }}
              >
                {[
                  ["WAZ", result.waz, T.accent],
                  ["HAZ", result.haz, T.info],
                  ["WHZ", result.whz, T.primaryMid],
                ].map(([l, v, c]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ color: c, fontSize: 22, fontWeight: 700 }}>
                      {v > 0 ? "+" : ""}
                      {v}
                    </div>
                    <div
                      style={{ color: KBG.muted, fontSize: 9, marginTop: 2 }}
                    >
                      {l}
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
                  background: KBG.accent,
                  color: KBG.text,
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 0",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                New Measurement
              </button>
              <button
                onClick={onBack}
                style={{
                  flex: 1,
                  background: KBG.panel,
                  color: KBG.text,
                  border: `1px solid ${KBG.border}`,
                  borderRadius: 12,
                  padding: "14px 0",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Return to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(null);
  const [kioskMode, setKioskMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // Shared state
  const [childrenData, setChildrenData] = useState(INIT_CHILDREN);
  const [measurementsData, setMeasurementsData] = useState(INIT_MEASUREMENTS);
  const [parentsData, setParentsData] = useState(INIT_PARENTS);
  const [usersData, setUsersData] = useState(INIT_USERS);
  const [auditLogs] = useState(INIT_AUDIT_LOGS);
  const [appointments] = useState(INIT_APPOINTMENTS);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const handleLogin = (u) => {
    setUser(u);
    setPage(u.role === "admin" ? "admin-dashboard" : "nutri-dashboard");
  };

  // Admin nav structure
  const ADMIN_NAV = [
    {
      label: "MAIN",
      items: [
        { id: "admin-dashboard", label: "Dashboard", icon: "dashboard" },
        { id: "admin-users", label: "User Management", icon: "users" },
      ],
    },
    {
      label: "HARDWARE",
      items: [
        { id: "admin-sensors", label: "Sensor Calibration", icon: "sensor" },
      ],
    },
    {
      label: "SECURITY",
      items: [
        {
          id: "admin-audit",
          label: "Audit Logs",
          icon: "audit",
          badge: auditLogs.filter((l) => l.level === "danger").length,
        },
        { id: "admin-roles", label: "Roles & Permissions", icon: "rolesIcon" },
      ],
    },
    {
      label: "CONFIG",
      items: [
        { id: "admin-settings", label: "System Settings", icon: "settings" },
      ],
    },
  ];

  // Nutritionist nav structure
  const NUTRI_NAV = [
    {
      label: "OVERVIEW",
      items: [{ id: "nutri-dashboard", label: "Dashboard", icon: "dashboard" }],
    },
    {
      label: "HEALTH MONITORING",
      items: [
        { id: "nutri-children", label: "Children & Growth", icon: "children" },
        {
          id: "nutri-measurements",
          label: "Measurements",
          icon: "measurements",
        },
        { id: "nutri-who", label: "WHO Analysis", icon: "activity" },
      ],
    },
    {
      label: "COMMUNITY",
      items: [
        { id: "nutri-parents", label: "Parents", icon: "parents" },
        { id: "nutri-appointments", label: "Appointments", icon: "calendar" },
      ],
    },
    {
      label: "REPORTING",
      items: [{ id: "nutri-reports", label: "Reports", icon: "reports" }],
    },
    {
      label: "ACCOUNT",
      items: [{ id: "nutri-settings", label: "My Settings", icon: "settings" }],
    },
  ];

  if (kioskMode)
    return (
      <KioskView children={childrenData} onBack={() => setKioskMode(false)} />
    );
  if (!user)
    return (
      <LoginPage onLogin={handleLogin} onKiosk={() => setKioskMode(true)} />
    );

  // ── Admin Pages ──
  const renderAdminPage = () => {
    switch (page) {
      case "admin-dashboard":
        return <AdminDashboard users={usersData} auditLogs={auditLogs} />;
      case "admin-users":
        return (
          <UserManagement
            users={usersData}
            showToast={showToast}
            onAdd={(u) =>
              setUsersData((p) => [
                ...p,
                {
                  ...u,
                  id: Math.max(...p.map((x) => x.id)) + 1,
                  last_login: "Never",
                },
              ])
            }
            onEdit={(u) =>
              setUsersData((p) =>
                p.map((x) => (x.id === u.id ? { ...x, ...u } : x)),
              )
            }
            onDelete={(u) =>
              setUsersData((p) => p.filter((x) => x.id !== u.id))
            }
          />
        );
      case "admin-sensors":
        return <SensorCalibration showToast={showToast} />;
      case "admin-audit":
        return <AuditLogs logs={auditLogs} />;
      case "admin-roles":
        return <RolesPermissions />;
      case "admin-settings":
        return <AdminSystemSettings showToast={showToast} />;
      default:
        return <AdminDashboard users={usersData} auditLogs={auditLogs} />;
    }
  };

  // ── Nutritionist Pages ──
  const renderNutriPage = () => {
    switch (page) {
      case "nutri-dashboard":
        return (
          <NutritionistDashboard
            children={childrenData}
            measurements={measurementsData}
            parents={parentsData}
            appointments={appointments}
          />
        );
      case "nutri-children":
        return (
          <ChildrenMonitoring
            children={childrenData}
            parents={parentsData}
            measurements={measurementsData}
            showToast={showToast}
          />
        );
      case "nutri-measurements":
        return (
          <MeasurementsPage
            measurements={measurementsData}
            children={childrenData}
            showToast={showToast}
          />
        );
      case "nutri-who":
        return (
          <WHOAnalysis
            children={childrenData}
            measurements={measurementsData}
          />
        );
      case "nutri-parents":
        return (
          <ParentsPage
            parents={parentsData}
            children={childrenData}
            showToast={showToast}
          />
        );
      case "nutri-appointments":
        return (
          <AppointmentsPage
            appointments={appointments}
            children={childrenData}
            parents={parentsData}
            showToast={showToast}
          />
        );
      case "nutri-reports":
        return (
          <ReportsPage
            children={childrenData}
            measurements={measurementsData}
          />
        );
      case "nutri-settings":
        return <NutritionistSettings user={user} showToast={showToast} />;
      default:
        return (
          <NutritionistDashboard
            children={childrenData}
            measurements={measurementsData}
            parents={parentsData}
            appointments={appointments}
          />
        );
    }
  };

  const isAdmin = user.role === "admin";

  return (
    <>
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AppShell
        user={user}
        navItems={isAdmin ? ADMIN_NAV : NUTRI_NAV}
        page={page}
        onNav={setPage}
        onLogout={() => {
          setUser(null);
          setPage(null);
        }}
        alerts={
          isAdmin
            ? auditLogs.filter((l) => l.level === "danger").length
            : childrenData.filter(
                (c) =>
                  c.status === "Severely Underweight" || c.status === "Wasted",
              ).length
        }
      >
        {isAdmin ? renderAdminPage() : renderNutriPage()}
      </AppShell>
    </>
  );
}

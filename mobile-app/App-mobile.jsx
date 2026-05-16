/**
 * SukatKalusugan Mobile — Dual-Role App
 * Nutritionist (health worker) + Parent (guardian) roles
 * Auto-detected from credentials on login
 * Updated: Appointments tab, SVG icons, AI chatbot for parents
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
  Polygon,
} from "react-native-svg";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  primary: "#0B6E4F",
  primaryLight: "#E6F4EF",
  primaryMid: "#1A8F68",
  primaryDark: "#074D37",
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
  bg: "#F4F7F5",
  bgAlt: "#EAEFEC",
  card: "#FFFFFF",
  border: "#DDE8E3",
  text: "#172B22",
  textMuted: "#5E8272",
  textLight: "#9BB5A8",
  sidebar: "#0D2B20",
};

// ─── SVG Icon Components ──────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = C.textMuted, strokeWidth = 1.8 }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "home":
      return (
        <Svg {...props}>
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Polyline points="9 22 9 12 15 12 15 22" />
        </Svg>
      );
    case "users":
      return (
        <Svg {...props}>
          <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <Circle cx="9" cy="7" r="4" />
          <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </Svg>
      );
    case "clipboard":
      return (
        <Svg {...props}>
          <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </Svg>
      );
    case "bar-chart":
      return (
        <Svg {...props}>
          <Line x1="18" y1="20" x2="18" y2="10" />
          <Line x1="12" y1="20" x2="12" y2="4" />
          <Line x1="6" y1="20" x2="6" y2="14" />
          <Line x1="2" y1="20" x2="22" y2="20" />
        </Svg>
      );
    case "user":
      return (
        <Svg {...props}>
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <Circle cx="12" cy="7" r="4" />
        </Svg>
      );
    case "heart":
      return (
        <Svg {...props}>
          <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </Svg>
      );
    case "lightbulb":
      return (
        <Svg {...props}>
          <Path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.2-1.2 4.1-3 5.2V17H9v-2.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6z" />
        </Svg>
      );
    case "calendar":
      return (
        <Svg {...props}>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <Line x1="16" y1="2" x2="16" y2="6" />
          <Line x1="8" y1="2" x2="8" y2="6" />
          <Line x1="3" y1="10" x2="21" y2="10" />
        </Svg>
      );
    case "bell":
      return (
        <Svg {...props}>
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </Svg>
      );
    case "message-circle":
      return (
        <Svg {...props}>
          <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </Svg>
      );
    case "send":
      return (
        <Svg {...props}>
          <Line x1="22" y1="2" x2="11" y2="13" />
          <Polygon points="22 2 15 22 11 13 2 9 22 2" />
        </Svg>
      );
    case "plus":
      return (
        <Svg {...props}>
          <Line x1="12" y1="5" x2="12" y2="19" />
          <Line x1="5" y1="12" x2="19" y2="12" />
        </Svg>
      );
    case "x":
      return (
        <Svg {...props}>
          <Line x1="18" y1="6" x2="6" y2="18" />
          <Line x1="6" y1="6" x2="18" y2="18" />
        </Svg>
      );
    case "check":
      return (
        <Svg {...props}>
          <Polyline points="20 6 9 17 4 12" />
        </Svg>
      );
    case "check-circle":
      return (
        <Svg {...props}>
          <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <Polyline points="22 4 12 14.01 9 11.01" />
        </Svg>
      );
    case "clock":
      return (
        <Svg {...props}>
          <Circle cx="12" cy="12" r="10" />
          <Polyline points="12 6 12 12 16 14" />
        </Svg>
      );
    case "alert-triangle":
      return (
        <Svg {...props}>
          <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <Line x1="12" y1="9" x2="12" y2="13" />
          <Line x1="12" y1="17" x2="12.01" y2="17" />
        </Svg>
      );
    case "activity":
      return (
        <Svg {...props}>
          <Polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </Svg>
      );
    case "book-open":
      return (
        <Svg {...props}>
          <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </Svg>
      );
    case "map-pin":
      return (
        <Svg {...props}>
          <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <Circle cx="12" cy="10" r="3" />
        </Svg>
      );
    case "phone":
      return (
        <Svg {...props}>
          <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.72-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
        </Svg>
      );
    case "edit":
      return (
        <Svg {...props}>
          <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </Svg>
      );
    case "log-out":
      return (
        <Svg {...props}>
          <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <Polyline points="16 17 21 12 16 7" />
          <Line x1="21" y1="12" x2="9" y2="12" />
        </Svg>
      );
    case "arrow-left":
      return (
        <Svg {...props}>
          <Line x1="19" y1="12" x2="5" y2="12" />
          <Polyline points="12 19 5 12 12 5" />
        </Svg>
      );
    case "chevron-right":
      return (
        <Svg {...props}>
          <Polyline points="9 18 15 12 9 6" />
        </Svg>
      );
    case "search":
      return (
        <Svg {...props}>
          <Circle cx="11" cy="11" r="8" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" />
        </Svg>
      );
    case "sun":
      return (
        <Svg {...props}>
          <Circle cx="12" cy="12" r="5" />
          <Line x1="12" y1="1" x2="12" y2="3" />
          <Line x1="12" y1="21" x2="12" y2="23" />
          <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <Line x1="1" y1="12" x2="3" y2="12" />
          <Line x1="21" y1="12" x2="23" y2="12" />
          <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </Svg>
      );
    case "moon":
      return (
        <Svg {...props}>
          <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </Svg>
      );
    case "zap":
      return (
        <Svg {...props}>
          <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </Svg>
      );
    case "bot":
      return (
        <Svg {...props}>
          <Rect x="3" y="11" width="18" height="10" rx="2" />
          <Circle cx="12" cy="5" r="2" />
          <Path d="M12 7v4" />
          <Line x1="8" y1="16" x2="8" y2="16" />
          <Line x1="16" y1="16" x2="16" y2="16" />
        </Svg>
      );
    case "info":
      return (
        <Svg {...props}>
          <Circle cx="12" cy="12" r="10" />
          <Line x1="12" y1="8" x2="12" y2="12" />
          <Line x1="12" y1="16" x2="12.01" y2="16" />
        </Svg>
      );
    case "weight":
      return (
        <Svg {...props}>
          <Path d="M6 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2" />
          <Path d="M6 9c0-3.31 2.69-6 6-6s6 2.69 6 6" />
          <Path d="M12 12v4" />
        </Svg>
      );
    case "ruler":
      return (
        <Svg {...props}>
          <Path d="M21.3 8.7l-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4z" />
          <Path d="M12 3l4 4-4 4-4-4z" fill="none" />
        </Svg>
      );
    case "trending-up":
      return (
        <Svg {...props}>
          <Polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <Polyline points="17 6 23 6 23 12" />
        </Svg>
      );
    case "shield":
      return (
        <Svg {...props}>
          <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </Svg>
      );
    case "award":
      return (
        <Svg {...props}>
          <Circle cx="12" cy="8" r="7" />
          <Polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </Svg>
      );
    default:
      return (
        <Svg {...props}>
          <Circle cx="12" cy="12" r="10" />
        </Svg>
      );
  }
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const USERS = [
  {
    id: "n1",
    name: "Dr. Maria Santos",
    email: "maria@health.gov",
    password: "health123",
    role: "nutritionist",
    title: "Registered Dietitian",
  },
  {
    id: "n2",
    name: "Nurse Cynthia Reyes",
    email: "cynthia@health.gov",
    password: "health123",
    role: "nutritionist",
    title: "Nurse",
  },
  {
    id: "n3",
    name: "Dr. Jose Garcia",
    email: "jose@health.gov",
    password: "health123",
    role: "nutritionist",
    title: "Physician",
  },
  {
    id: "p1",
    name: "Ana Santos",
    email: "ana@email.com",
    password: "parent123",
    role: "parent",
    childIds: [1, 2],
  },
  {
    id: "p2",
    name: "Rosa Dela Cruz",
    email: "rosa@email.com",
    password: "parent123",
    role: "parent",
    childIds: [3],
  },
  {
    id: "p3",
    name: "Carla Reyes",
    email: "carla@email.com",
    password: "parent123",
    role: "parent",
    childIds: [4],
  },
  {
    id: "p4",
    name: "Pedro Torres",
    email: "pedro@email.com",
    password: "parent123",
    role: "parent",
    childIds: [5],
  },
  {
    id: "p5",
    name: "Lena Garcia",
    email: "lena@email.com",
    password: "parent123",
    role: "parent",
    childIds: [6],
  },
];

const INITIAL_CHILDREN = [
  {
    id: 1,
    firstName: "Maria",
    lastName: "Santos",
    birthdate: "2022-03-15",
    sex: "Female",
    ageMonths: 26,
    barangay: "Bagong Silang",
    parentId: "p1",
    status: "Normal",
    lastWeight: 11.8,
    lastHeight: 85.2,
  },
  {
    id: 2,
    firstName: "Juan",
    lastName: "Santos",
    birthdate: "2023-01-10",
    sex: "Male",
    ageMonths: 16,
    barangay: "Bagong Silang",
    parentId: "p1",
    status: "Underweight",
    lastWeight: 8.1,
    lastHeight: 73.0,
  },
  {
    id: 3,
    firstName: "Lucia",
    lastName: "Dela Cruz",
    birthdate: "2021-12-01",
    sex: "Female",
    ageMonths: 29,
    barangay: "Poblacion",
    parentId: "p2",
    status: "Stunted",
    lastWeight: 10.2,
    lastHeight: 78.3,
  },
  {
    id: 4,
    firstName: "Miguel",
    lastName: "Reyes",
    birthdate: "2023-06-10",
    sex: "Male",
    ageMonths: 11,
    barangay: "San Jose",
    parentId: "p3",
    status: "Normal",
    lastWeight: 8.9,
    lastHeight: 71.0,
  },
  {
    id: 5,
    firstName: "Sofia",
    lastName: "Torres",
    birthdate: "2022-01-05",
    sex: "Female",
    ageMonths: 28,
    barangay: "Sta. Cruz",
    parentId: "p4",
    status: "Severely Underweight",
    lastWeight: 7.9,
    lastHeight: 80.0,
  },
  {
    id: 6,
    firstName: "Carlos",
    lastName: "Garcia",
    birthdate: "2023-01-22",
    sex: "Male",
    ageMonths: 16,
    barangay: "Poblacion",
    parentId: "p5",
    status: "Wasted",
    lastWeight: 7.1,
    lastHeight: 72.5,
  },
  {
    id: 7,
    firstName: "Isabella",
    lastName: "Ramos",
    birthdate: "2022-07-30",
    sex: "Female",
    ageMonths: 22,
    barangay: "San Jose",
    parentId: "p2",
    status: "Normal",
    lastWeight: 10.5,
    lastHeight: 82.0,
  },
  {
    id: 8,
    firstName: "Andres",
    lastName: "Cruz",
    birthdate: "2021-05-14",
    sex: "Male",
    ageMonths: 36,
    barangay: "Sta. Cruz",
    parentId: "p3",
    status: "Overweight",
    lastWeight: 16.5,
    lastHeight: 92.0,
  },
];

const INITIAL_MEASUREMENTS = [
  {
    id: 1,
    childId: 1,
    date: "2024-05-10",
    heightCm: 85.2,
    weightKg: 11.8,
    ageMonths: 26,
    waz: 0.4,
    haz: 0.2,
    whz: 0.5,
    status: "Normal",
    source: "Kiosk",
  },
  {
    id: 2,
    childId: 2,
    date: "2024-05-10",
    heightCm: 73.0,
    weightKg: 8.1,
    ageMonths: 16,
    waz: -2.1,
    haz: -0.8,
    whz: -1.8,
    status: "Underweight",
    source: "Mobile",
  },
  {
    id: 3,
    childId: 3,
    date: "2024-05-08",
    heightCm: 78.3,
    weightKg: 10.2,
    ageMonths: 29,
    waz: -1.2,
    haz: -2.4,
    whz: -0.6,
    status: "Stunted",
    source: "Manual",
  },
  {
    id: 4,
    childId: 4,
    date: "2024-05-07",
    heightCm: 71.0,
    weightKg: 8.9,
    ageMonths: 11,
    waz: 0.2,
    haz: 0.1,
    whz: 0.1,
    status: "Normal",
    source: "Kiosk",
  },
  {
    id: 5,
    childId: 5,
    date: "2024-05-07",
    heightCm: 80.0,
    weightKg: 7.9,
    ageMonths: 28,
    waz: -3.2,
    haz: -1.5,
    whz: -3.1,
    status: "Severely Underweight",
    source: "Manual",
  },
  {
    id: 6,
    childId: 6,
    date: "2024-05-06",
    heightCm: 72.5,
    weightKg: 7.1,
    ageMonths: 16,
    waz: -1.8,
    haz: -1.0,
    whz: -2.2,
    status: "Wasted",
    source: "Kiosk",
  },
  {
    id: 7,
    childId: 7,
    date: "2024-05-05",
    heightCm: 82.0,
    weightKg: 10.5,
    ageMonths: 22,
    waz: 0.3,
    haz: 0.4,
    whz: 0.2,
    status: "Normal",
    source: "Mobile",
  },
  {
    id: 8,
    childId: 8,
    date: "2024-05-05",
    heightCm: 92.0,
    weightKg: 16.5,
    ageMonths: 36,
    waz: 2.2,
    haz: 0.8,
    whz: 2.5,
    status: "Overweight",
    source: "Kiosk",
  },
];

const APPOINTMENTS_DATA = [
  {
    id: 1,
    childName: "Maria Santos",
    parentName: "Ana Santos",
    type: "Monthly Weigh-In",
    date: "2025-05-20",
    time: "09:00 AM",
    barangay: "Bagong Silang",
    status: "confirmed",
    nutritionist: "Dr. Maria Santos",
    notes: "Regular monthly check-up",
  },
  {
    id: 2,
    childName: "Juan Santos",
    parentName: "Ana Santos",
    type: "Nutrition Counseling",
    date: "2025-05-22",
    time: "10:30 AM",
    barangay: "Bagong Silang",
    status: "pending",
    nutritionist: "Dr. Maria Santos",
    notes: "Follow-up for underweight status",
  },
  {
    id: 3,
    childName: "Lucia Dela Cruz",
    parentName: "Rosa Dela Cruz",
    type: "Growth Monitoring",
    date: "2025-05-23",
    time: "02:00 PM",
    barangay: "Poblacion",
    status: "confirmed",
    nutritionist: "Nurse Cynthia Reyes",
    notes: "Stunting follow-up",
  },
  {
    id: 4,
    childName: "Sofia Torres",
    parentName: "Pedro Torres",
    type: "Urgent Consultation",
    date: "2025-05-21",
    time: "08:00 AM",
    barangay: "Sta. Cruz",
    status: "confirmed",
    nutritionist: "Dr. Jose Garcia",
    notes: "Severely underweight - priority case",
  },
  {
    id: 5,
    childName: "Carlos Garcia",
    parentName: "Lena Garcia",
    type: "Vitamin A Distribution",
    date: "2025-05-28",
    time: "09:00 AM",
    barangay: "Poblacion",
    status: "pending",
    nutritionist: "Nurse Cynthia Reyes",
    notes: "Scheduled vitamin supplementation",
  },
  {
    id: 6,
    childName: "Isabella Ramos",
    parentName: "Rosa Dela Cruz",
    type: "Monthly Weigh-In",
    date: "2025-06-03",
    time: "11:00 AM",
    barangay: "San Jose",
    status: "pending",
    nutritionist: "Dr. Maria Santos",
    notes: "Routine monitoring",
  },
  {
    id: 7,
    childName: "Miguel Reyes",
    parentName: "Carla Reyes",
    type: "Immunization Check",
    date: "2025-05-29",
    time: "03:00 PM",
    barangay: "San Jose",
    status: "cancelled",
    nutritionist: "Dr. Jose Garcia",
    notes: "Rescheduled from last week",
  },
  {
    id: 8,
    childName: "Andres Cruz",
    parentName: "Carla Reyes",
    type: "Dietary Assessment",
    date: "2025-05-30",
    time: "01:00 PM",
    barangay: "Sta. Cruz",
    status: "confirmed",
    nutritionist: "Dr. Maria Santos",
    notes: "Overweight management",
  },
];

const APPOINTMENT_TYPES = [
  "Monthly Weigh-In",
  "Nutrition Counseling",
  "Growth Monitoring",
  "Vitamin A Distribution",
  "Immunization Check",
  "Dietary Assessment",
  "Urgent Consultation",
];

const TIME_SLOTS = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

const CALENDAR_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AI_CHAT_RESPONSES = {
  weight:
    "Based on WHO 2006 standards, healthy weight-for-age varies by sex and age. For children 0-5 years, a WAZ (weight-for-age z-score) between -2 and +2 is considered normal. I can see from your child's records what their current status is. Would you like specific advice about improving nutrition?",
  height:
    "Height or length-for-age (HAZ) reflects long-term nutritional status. A HAZ below -2 indicates stunting. Stunting can be prevented through adequate nutrition in the first 1000 days of life. Malunggay (moringa), kamote (sweet potato), and mongo beans are excellent local foods to support growth.",
  food: "Great local foods for young children include: malunggay leaves (high in iron and vitamins), kamote (rich in vitamin A), mongo/munggo beans (protein), bangus (fish, omega-3), and fresh tropical fruits. Offer a variety at every meal and ensure adequate breastfeeding for children under 2.",
  underweight:
    "If your child is underweight, here are key steps: (1) Increase feeding frequency to 5-6 small meals daily, (2) Add energy-dense foods like avocado, peanut butter, and eggs, (3) Ensure adequate hydration, (4) Consult your barangay health worker for supplemental feeding programs, (5) Schedule a follow-up weigh-in in 2 weeks.",
  stunted:
    "Stunting (low height-for-age) requires consistent nutritional intervention. Focus on: iron-rich foods, vitamin A sources, adequate protein, and zinc. Local programs like Supplementary Feeding and ECCD can help. Please visit your barangay health center for a personalized growth plan.",
  breastfeeding:
    "WHO recommends exclusive breastfeeding for the first 6 months, then continued breastfeeding with complementary foods until 2 years or beyond. Breast milk provides complete nutrition and immunity. If you have concerns about breastfeeding, your barangay health worker can connect you with a lactation counselor.",
  appointment:
    "To book an appointment, go to the Appointments tab and tap the '+' button. You can choose the type of visit, preferred date and time. Your barangay health worker will confirm the schedule. For urgent concerns, you can also walk in to the health center.",
  default:
    "Thank you for your question! I'm here to help with child nutrition and health guidance. You can ask me about: weight and height standards, healthy foods for your child, what to do if your child is underweight or stunted, breastfeeding tips, or how to book appointments. What would you like to know?",
};

const NUTRITION_TIPS = [
  {
    id: 1,
    tip: "Offer iron-rich foods like malunggay, kangkong and mongo beans twice a week.",
    category: "Iron",
  },
  {
    id: 2,
    tip: "Exclusive breastfeeding for the first 6 months supports healthy growth.",
    category: "Breastfeeding",
  },
  {
    id: 3,
    tip: "Weigh and measure your child monthly to catch growth issues early.",
    category: "Monitoring",
  },
  {
    id: 4,
    tip: "Vitamin A–rich foods like camote, squash, and papaya support eye health.",
    category: "Vitamins",
  },
  {
    id: 5,
    tip: "Serve 3 small meals and 2–3 healthy snacks every day.",
    category: "Feeding",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function statusColor(s) {
  return (
    {
      Normal: C.primary,
      Underweight: C.warn,
      "Severely Underweight": C.danger,
      Stunted: C.purple,
      Wasted: C.info,
      Overweight: C.accent,
    }[s] || C.textMuted
  );
}
function statusBg(s) {
  return (
    {
      Normal: C.primaryLight,
      Underweight: C.warnLight,
      "Severely Underweight": C.dangerLight,
      Stunted: C.purpleLight,
      Wasted: C.infoLight,
      Overweight: C.accentLight,
    }[s] || "#f5f5f5"
  );
}
function apptStatusColor(s) {
  return (
    { confirmed: C.primary, pending: C.warn, cancelled: C.danger }[s] ||
    C.textMuted
  );
}
function apptStatusBg(s) {
  return (
    {
      confirmed: C.primaryLight,
      pending: C.warnLight,
      cancelled: C.dangerLight,
    }[s] || "#f5f5f5"
  );
}
function childName(c) {
  return `${c.firstName} ${c.lastName}`;
}
function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function fmtShortDate(d) {
  if (!d) return "—";
  const date = new Date(d);
  return `${date.toLocaleDateString("en-PH", { month: "short", day: "numeric" })}`;
}
function zSign(v) {
  return v > 0 ? `+${v}` : `${v}`;
}
function computeWHO({ weightKg, heightCm, ageMonths }) {
  const waz = +((weightKg - (9.5 + ageMonths * 0.15)) / 1.2).toFixed(2);
  const haz = +((heightCm - (65 + ageMonths * 0.9)) / 3.2).toFixed(2);
  const whz = +((weightKg - (10.5 + (heightCm - 65) * 0.09)) / 1.1).toFixed(2);
  let status = "Normal";
  if (waz < -3 || whz < -3) status = "Severely Underweight";
  else if (waz < -2) status = "Underweight";
  else if (haz < -2) status = "Stunted";
  else if (whz < -2) status = "Wasted";
  else if (whz > 2) status = "Overweight";
  return { waz, haz, whz, status };
}

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes("weight") || lower.includes("timbang"))
    return AI_CHAT_RESPONSES.weight;
  if (
    lower.includes("height") ||
    lower.includes("height") ||
    lower.includes("tall") ||
    lower.includes("taas")
  )
    return AI_CHAT_RESPONSES.height;
  if (
    lower.includes("food") ||
    lower.includes("eat") ||
    lower.includes("pagkain") ||
    lower.includes("diet")
  )
    return AI_CHAT_RESPONSES.food;
  if (
    lower.includes("underweight") ||
    lower.includes("thin") ||
    lower.includes("payat")
  )
    return AI_CHAT_RESPONSES.underweight;
  if (
    lower.includes("stunt") ||
    lower.includes("short") ||
    lower.includes("pandak")
  )
    return AI_CHAT_RESPONSES.stunted;
  if (
    lower.includes("breast") ||
    lower.includes("breastfeed") ||
    lower.includes("gatas")
  )
    return AI_CHAT_RESPONSES.breastfeeding;
  if (
    lower.includes("appointment") ||
    lower.includes("schedule") ||
    lower.includes("book")
  )
    return AI_CHAT_RESPONSES.appointment;
  return AI_CHAT_RESPONSES.default;
}

// ─── Shared UI Components ─────────────────────────────────────────────────────
function StatusPill({ status, small }) {
  return (
    <View
      style={[
        ss.pill,
        { backgroundColor: statusBg(status) },
        small && { paddingHorizontal: 7, paddingVertical: 2 },
      ]}
    >
      <View style={[ss.pillDot, { backgroundColor: statusColor(status) }]} />
      <Text
        style={[
          ss.pillText,
          { color: statusColor(status) },
          small && { fontSize: 10 },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

function ApptStatusPill({ status }) {
  return (
    <View
      style={[
        ss.pill,
        {
          backgroundColor: apptStatusBg(status),
          paddingHorizontal: 9,
          paddingVertical: 4,
        },
      ]}
    >
      <View
        style={[ss.pillDot, { backgroundColor: apptStatusColor(status) }]}
      />
      <Text
        style={[
          ss.pillText,
          { color: apptStatusColor(status), textTransform: "capitalize" },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

function Avatar({ name, size = 40, color = C.primary, bg = C.primaryLight }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: size * 0.36, fontWeight: "800", color }}>
        {initials(name)}
      </Text>
    </View>
  );
}

function Card({ children, style, onPress }) {
  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[ss.card, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[ss.card, style]}>{children}</View>;
}

function SectionHeader({ title, sub, action, onAction }) {
  return (
    <View style={ss.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={ss.sectionTitle}>{title}</Text>
        {sub ? <Text style={ss.sectionSub}>{sub}</Text> : null}
      </View>
      {action ? (
        <TouchableOpacity onPress={onAction}>
          <Text style={{ fontSize: 13, color: C.primary, fontWeight: "600" }}>
            {action}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function MetricChip({ label, value, color }) {
  return (
    <View
      style={[
        ss.metricChip,
        { borderColor: color + "40", backgroundColor: color + "10" },
      ]}
    >
      <Text style={[ss.metricValue, { color }]}>{value}</Text>
      <Text style={ss.metricLabel}>{label}</Text>
    </View>
  );
}

function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secure,
  required,
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={ss.fieldLabel}>
        {label}
        {required && <Text style={{ color: C.danger }}> *</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={C.textLight}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        style={ss.input}
      />
    </View>
  );
}

function PrimaryBtn({ label, onPress, loading, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      style={[ss.primaryBtn, style]}
    >
      <Text style={ss.primaryBtnText}>{loading ? "Please wait…" : label}</Text>
    </TouchableOpacity>
  );
}

function GhostBtn({ label, onPress, danger, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[ss.ghostBtn, danger && { borderColor: C.danger + "60" }, style]}
    >
      <Text style={[ss.ghostBtnText, danger && { color: C.danger }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
const NUTRI_TABS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "children", label: "Children", icon: "users" },
  { id: "records", label: "Records", icon: "clipboard" },
  { id: "appointments", label: "Schedule", icon: "calendar" },
  { id: "profile", label: "Profile", icon: "user" },
];
const PARENT_TABS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "children", label: "My Kids", icon: "heart" },
  { id: "appointments", label: "Schedule", icon: "calendar" },
  { id: "chat", label: "AI Chat", icon: "message-circle" },
  { id: "profile", label: "Profile", icon: "user" },
];

function TabBar({ tabs, active, onChange }) {
  return (
    <View style={ss.tabBar}>
      {tabs.map((t) => {
        const sel = t.id === active;
        return (
          <TouchableOpacity
            key={t.id}
            activeOpacity={0.7}
            onPress={() => onChange(t.id)}
            style={ss.tabItem}
          >
            {sel && <View style={ss.tabIndicator} />}
            <Icon
              name={t.icon}
              size={20}
              color={sel ? C.primaryMid : "rgba(255,255,255,0.4)"}
              strokeWidth={sel ? 2.2 : 1.6}
            />
            <Text
              style={[
                ss.tabLabel,
                sel && { color: C.primaryMid, fontWeight: "700" },
              ]}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── App Header ───────────────────────────────────────────────────────────────
function AppHeader({ title, sub, user, onAvatarPress }) {
  return (
    <View style={ss.header}>
      <View style={ss.headerBrand}>
        <View style={ss.headerLogo}>
          <Icon name="activity" size={16} color="#fff" strokeWidth={2.5} />
        </View>
        <View>
          <Text style={ss.headerTitle}>{title}</Text>
          {sub ? <Text style={ss.headerSub}>{sub}</Text> : null}
        </View>
      </View>
      {user && (
        <TouchableOpacity onPress={onAvatarPress} style={ss.headerAvatar}>
          <Text style={{ fontSize: 13, fontWeight: "800", color: "#fff" }}>
            {initials(user.name)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── Calendar Strip Component ──────────────────────────────────────────────────
function CalendarStrip({ selectedDate, onSelectDate, appointments }) {
  const today = new Date();
  const days = [];
  for (let i = -1; i <= 13; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }

  const hasAppt = (date) => {
    const ds = date.toISOString().slice(0, 10);
    return appointments.some((a) => a.date === ds);
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={ss.calStrip}
    >
      {days.map((d, i) => {
        const ds = d.toISOString().slice(0, 10);
        const sel = ds === selectedDate;
        const dot = hasAppt(d);
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onSelectDate(ds)}
            style={[ss.calDay, sel && { backgroundColor: C.primary }]}
          >
            <Text style={[ss.calDayName, sel && { color: "#fff" }]}>
              {dayNames[d.getDay()]}
            </Text>
            <Text style={[ss.calDayNum, sel && { color: "#fff" }]}>
              {d.getDate()}
            </Text>
            {dot && (
              <View style={[ss.calDot, sel && { backgroundColor: "#fff" }]} />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// ─── Appointment Card ─────────────────────────────────────────────────────────
function AppointmentCard({ appt, isNutri, onStatusChange }) {
  return (
    <Card style={[ss.listCard, { marginBottom: 10 }]}>
      <View style={ss.listRow}>
        <View style={[ss.apptTypeIcon, { backgroundColor: C.primaryLight }]}>
          <Icon name="calendar" size={20} color={C.primary} strokeWidth={2} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={ss.listName}>{appt.childName}</Text>
          <Text
            style={[
              ss.listMeta,
              { color: C.text, fontWeight: "600", marginBottom: 2 },
            ]}
          >
            {appt.type}
          </Text>
          <View style={ss.listRow}>
            <Icon name="clock" size={12} color={C.textMuted} />
            <Text style={[ss.listMeta, { marginLeft: 4 }]}>{appt.time}</Text>
            <Text style={[ss.listMeta, { marginLeft: 8 }]}>·</Text>
            <Icon
              name="map-pin"
              size={12}
              color={C.textMuted}
              style={{ marginLeft: 8 }}
            />
            <Text style={[ss.listMeta, { marginLeft: 4 }]}>
              {appt.barangay}
            </Text>
          </View>
        </View>
        <ApptStatusPill status={appt.status} />
      </View>

      {isNutri && (
        <View
          style={[
            ss.listRow,
            {
              marginTop: 10,
              paddingTop: 10,
              borderTopWidth: 1,
              borderTopColor: C.border,
              gap: 8,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon name="user" size={13} color={C.textMuted} />
            <Text style={ss.listMeta}>{appt.parentName}</Text>
          </View>
          {appt.status === "pending" && (
            <View style={ss.listRow}>
              <TouchableOpacity
                onPress={() => onStatusChange(appt.id, "confirmed")}
                style={[ss.miniBtn, { backgroundColor: C.primaryLight }]}
              >
                <Icon
                  name="check"
                  size={12}
                  color={C.primary}
                  strokeWidth={2.5}
                />
                <Text style={[ss.miniBtnText, { color: C.primary }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onStatusChange(appt.id, "cancelled")}
                style={[
                  ss.miniBtn,
                  { backgroundColor: C.dangerLight, marginLeft: 6 },
                ]}
              >
                <Icon name="x" size={12} color={C.danger} strokeWidth={2.5} />
                <Text style={[ss.miniBtnText, { color: C.danger }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {appt.notes ? (
        <View style={[ss.listRow, { marginTop: 8, gap: 6 }]}>
          <Icon name="info" size={12} color={C.textLight} />
          <Text style={[ss.listMeta, { flex: 1 }]}>{appt.notes}</Text>
        </View>
      ) : null}
    </Card>
  );
}

// ─── Book Appointment Modal ───────────────────────────────────────────────────
function BookAppointmentModal({ children, onSave, onClose, isNutri }) {
  const [step, setStep] = useState(1);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  const canProceed1 = selectedChild && selectedType;
  const canProceed2 = selectedDate && selectedTime;

  const handleSave = () => {
    if (!canProceed1 || !canProceed2) return;
    const child = children.find((c) => c.id === selectedChild);
    const parent = USERS.find((u) => u.childIds?.includes(selectedChild));
    onSave({
      id: Date.now(),
      childName: childName(child),
      parentName: parent?.name || "—",
      type: selectedType,
      date: selectedDate,
      time: selectedTime,
      barangay: child.barangay,
      status: isNutri ? "confirmed" : "pending",
      nutritionist: "Dr. Maria Santos",
      notes,
    });
    onClose();
  };

  return (
    <View style={ss.modalOverlay}>
      <View style={[ss.modalCard, { maxHeight: "85%" }]}>
        <View
          style={[
            ss.listRow,
            { marginBottom: 16, justifyContent: "space-between" },
          ]}
        >
          <View>
            <Text style={[ss.listName, { fontSize: 16 }]}>
              Book Appointment
            </Text>
            <Text style={ss.listMeta}>Step {step} of 2</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Icon name="x" size={22} color={C.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Step indicator */}
        <View style={[ss.listRow, { marginBottom: 20, gap: 6 }]}>
          <View style={[ss.stepDot, { backgroundColor: C.primary }]}>
            <Text style={ss.stepDotText}>1</Text>
          </View>
          <View
            style={[
              ss.stepLine,
              { backgroundColor: step >= 2 ? C.primary : C.border },
            ]}
          />
          <View
            style={[
              ss.stepDot,
              { backgroundColor: step >= 2 ? C.primary : C.border },
            ]}
          >
            <Text
              style={[
                ss.stepDotText,
                { color: step >= 2 ? "#fff" : C.textLight },
              ]}
            >
              2
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {step === 1 && (
            <>
              <Text style={ss.fieldLabel}>SELECT CHILD *</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 16 }}
              >
                {children.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => setSelectedChild(c.id)}
                    style={[
                      ss.childChip,
                      c.id === selectedChild && {
                        backgroundColor: C.primary,
                        borderColor: C.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        ss.childChipText,
                        c.id === selectedChild && { color: "#fff" },
                      ]}
                    >
                      {c.firstName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={ss.fieldLabel}>APPOINTMENT TYPE *</Text>
              {APPOINTMENT_TYPES.map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setSelectedType(t)}
                  style={[
                    ss.typeOption,
                    t === selectedType && {
                      borderColor: C.primary,
                      backgroundColor: C.primaryLight,
                    },
                  ]}
                >
                  <View
                    style={[
                      ss.typeRadio,
                      t === selectedType && { borderColor: C.primary },
                    ]}
                  >
                    {t === selectedType && <View style={ss.typeRadioInner} />}
                  </View>
                  <Text
                    style={[
                      { fontSize: 13, color: C.text, flex: 1 },
                      t === selectedType && {
                        color: C.primary,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <Text style={ss.fieldLabel}>SELECT DATE</Text>
              <CalendarStrip
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                appointments={[]}
              />

              <Text style={[ss.fieldLabel, { marginTop: 16 }]}>
                AVAILABLE TIME SLOTS
              </Text>
              <View style={ss.timeGrid}>
                {TIME_SLOTS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setSelectedTime(t)}
                    style={[
                      ss.timeSlot,
                      t === selectedTime && {
                        backgroundColor: C.primary,
                        borderColor: C.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        ss.timeSlotText,
                        t === selectedTime && {
                          color: "#fff",
                          fontWeight: "700",
                        },
                      ]}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[ss.fieldLabel, { marginTop: 16 }]}>
                NOTES (OPTIONAL)
              </Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Any special notes or concerns..."
                placeholderTextColor={C.textLight}
                style={[ss.input, { height: 80, textAlignVertical: "top" }]}
                multiline
              />
            </>
          )}
        </ScrollView>

        <View style={[ss.listRow, { marginTop: 16, gap: 10 }]}>
          {step === 2 && (
            <GhostBtn
              label="Back"
              onPress={() => setStep(1)}
              style={{ flex: 1 }}
            />
          )}
          {step === 1 ? (
            <PrimaryBtn
              label="Next: Choose Time"
              onPress={() => canProceed1 && setStep(2)}
              style={[{ flex: 1 }, !canProceed1 && { opacity: 0.5 }]}
            />
          ) : (
            <PrimaryBtn
              label="Book Now"
              onPress={handleSave}
              style={[{ flex: 1 }, !canProceed2 && { opacity: 0.5 }]}
            />
          )}
        </View>
      </View>
    </View>
  );
}

// ─── APPOINTMENTS SCREEN ──────────────────────────────────────────────────────
function AppointmentsScreen({
  appointments,
  setAppointments,
  children,
  isNutri,
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showBook, setShowBook] = useState(false);

  const filteredByDate = appointments.filter((a) => a.date === selectedDate);
  const filtered =
    filterStatus === "all"
      ? filteredByDate
      : filteredByDate.filter((a) => a.status === filterStatus);

  const upcoming = appointments
    .filter((a) => a.date >= today && a.status !== "cancelled")
    .slice(0, 3);

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
  };

  const handleBook = (appt) => {
    setAppointments((prev) => [appt, ...prev]);
  };

  const confirmedCount = appointments.filter(
    (a) => a.status === "confirmed" && a.date >= today,
  ).length;
  const pendingCount = appointments.filter(
    (a) => a.status === "pending",
  ).length;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={ss.screenPad}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Stats */}
        <View style={ss.statsRow}>
          <Card style={[ss.statCard, { backgroundColor: C.primary }]}>
            <Text style={ss.statNumW}>{confirmedCount}</Text>
            <Text style={ss.statLblW}>{"Confirmed\nAppointments"}</Text>
          </Card>
          <Card
            style={[
              ss.statCard,
              { backgroundColor: C.warnLight, borderColor: C.warn + "30" },
            ]}
          >
            <Text style={[ss.statNum, { color: C.warn }]}>{pendingCount}</Text>
            <Text style={[ss.statLbl, { color: C.warn }]}>
              {"Pending\nRequests"}
            </Text>
          </Card>
          <Card
            style={[
              ss.statCard,
              { backgroundColor: C.infoLight, borderColor: C.info + "30" },
            ]}
          >
            <Text style={[ss.statNum, { color: C.info }]}>
              {appointments.filter((a) => a.date === today).length}
            </Text>
            <Text style={[ss.statLbl, { color: C.info }]}>
              {"Today's\nVisits"}
            </Text>
          </Card>
        </View>

        {/* Calendar Strip */}
        <Card
          style={[
            ss.listCard,
            { marginBottom: 14, paddingHorizontal: 0, paddingVertical: 14 },
          ]}
        >
          <Text
            style={[
              ss.sectionTitle,
              { paddingHorizontal: 14, marginBottom: 12 },
            ]}
          >
            {new Date(selectedDate).toLocaleDateString("en-PH", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <CalendarStrip
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            appointments={appointments}
          />
        </Card>

        {/* Status Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 14 }}
        >
          {["all", "confirmed", "pending", "cancelled"].map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setFilterStatus(s)}
              style={[
                ss.filterChip,
                filterStatus === s && {
                  backgroundColor: s === "all" ? C.primary : apptStatusBg(s),
                  borderColor: s === "all" ? C.primary : apptStatusColor(s),
                },
              ]}
            >
              <Text
                style={[
                  ss.filterChipText,
                  filterStatus === s && {
                    color: s === "all" ? "#fff" : apptStatusColor(s),
                    fontWeight: "700",
                  },
                ]}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Appointments for selected date */}
        <SectionHeader
          title={`${fmtShortDate(selectedDate)} — ${filtered.length} appointment${filtered.length !== 1 ? "s" : ""}`}
          sub={selectedDate === today ? "Today" : ""}
        />

        {filtered.length === 0 ? (
          <Card style={ss.emptyCard}>
            <Icon name="calendar" size={32} color={C.textLight} />
            <Text style={[ss.emptyText, { marginTop: 10 }]}>
              No appointments on this date
            </Text>
            <Text style={[ss.listMeta, { textAlign: "center", marginTop: 4 }]}>
              Tap + to schedule one
            </Text>
          </Card>
        ) : (
          filtered.map((a) => (
            <AppointmentCard
              key={a.id}
              appt={a}
              isNutri={isNutri}
              onStatusChange={handleStatusChange}
            />
          ))
        )}

        {/* Upcoming section if today has nothing */}
        {filtered.length === 0 && upcoming.length > 0 && (
          <>
            <SectionHeader
              title="Upcoming Appointments"
              sub="Next scheduled visits"
              style={{ marginTop: 8 }}
            />
            {upcoming.map((a) => (
              <AppointmentCard
                key={a.id}
                appt={a}
                isNutri={isNutri}
                onStatusChange={handleStatusChange}
              />
            ))}
          </>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity onPress={() => setShowBook(true)} style={ss.fab}>
        <Icon name="plus" size={24} color="#fff" strokeWidth={2.5} />
      </TouchableOpacity>

      {showBook && (
        <BookAppointmentModal
          children={isNutri ? children : children}
          onSave={handleBook}
          onClose={() => setShowBook(false)}
          isNutri={isNutri}
        />
      )}
    </View>
  );
}

// ─── AI CHAT SCREEN ───────────────────────────────────────────────────────────
function AIChatScreen({ user, myChildren }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: `Kumusta! I'm your Child Health Assistant. I can help you with questions about your child's nutrition, growth, and health. You can ask me in English or Filipino!\n\nTry asking about:\n• Feeding and nutrition tips\n• What to do if your child is underweight\n• How to read your child's growth report\n• Booking an appointment`,
      time: new Date().toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      role: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(
      () => {
        const response = getAIResponse(userMsg.text);
        const aiMsg = {
          id: Date.now() + 1,
          role: "assistant",
          text: response,
          time: new Date().toLocaleTimeString("en-PH", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      },
      1000 + Math.random() * 800,
    );
  };

  const quickReplies = [
    "Weight & height",
    "Food for babies",
    "My child is underweight",
    "Book appointment",
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Chat header */}
      <View style={ss.chatHeader}>
        <View style={ss.chatBotAvatar}>
          <Icon name="bot" size={20} color="#fff" strokeWidth={2} />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={[ss.listName, { color: "#fff" }]}>Health Assistant</Text>
          <View style={ss.listRow}>
            <View
              style={[
                ss.pillDot,
                { backgroundColor: "#4ade80", width: 7, height: 7 },
              ]}
            />
            <Text
              style={[
                ss.listMeta,
                { color: "rgba(255,255,255,0.7)", marginLeft: 5 },
              ]}
            >
              Online · WHO Standards
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={ss.chatMessages}
        contentContainerStyle={{ padding: 14 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((m) => (
          <View
            key={m.id}
            style={[ss.msgWrapper, m.role === "user" && ss.msgWrapperUser]}
          >
            {m.role === "assistant" && (
              <View style={ss.msgBotIcon}>
                <Icon name="bot" size={14} color={C.primary} strokeWidth={2} />
              </View>
            )}
            <View
              style={[
                ss.msgBubble,
                m.role === "user" ? ss.msgBubbleUser : ss.msgBubbleBot,
              ]}
            >
              <Text
                style={[ss.msgText, m.role === "user" && { color: "#fff" }]}
              >
                {m.text}
              </Text>
              <Text
                style={[
                  ss.msgTime,
                  m.role === "user" && { color: "rgba(255,255,255,0.65)" },
                ]}
              >
                {m.time}
              </Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={ss.msgWrapper}>
            <View style={ss.msgBotIcon}>
              <Icon name="bot" size={14} color={C.primary} strokeWidth={2} />
            </View>
            <View style={ss.msgBubbleBot}>
              <View style={ss.typingDots}>
                <View style={[ss.typingDot, { opacity: 0.4 }]} />
                <View style={[ss.typingDot, { opacity: 0.7 }]} />
                <View style={ss.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick replies */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={ss.quickReplies}
        contentContainerStyle={{ paddingHorizontal: 14, gap: 8 }}
      >
        {quickReplies.map((q, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setInput(q);
            }}
            style={ss.quickReply}
          >
            <Text style={ss.quickReplyText}>{q}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={ss.chatInputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your child's health..."
          placeholderTextColor={C.textLight}
          style={ss.chatInput}
          multiline
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[ss.sendBtn, !input.trim() && { opacity: 0.4 }]}
          disabled={!input.trim()}
        >
          <Icon name="send" size={18} color="#fff" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    setErr("");
    const user = USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password,
    );
    if (!user) {
      setErr("Invalid email or password. Please try again.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onLogin(user);
      setLoading(false);
    }, 800);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.primaryDark }}>
      <StatusBar barStyle="light-content" backgroundColor={C.primaryDark} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={ss.loginScroll}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={ss.loginBrand}>
              <View style={ss.loginLogoRing}>
                <View style={ss.loginLogoDot}>
                  <Icon
                    name="activity"
                    size={28}
                    color="#fff"
                    strokeWidth={2.5}
                  />
                </View>
              </View>
              <Text style={ss.loginAppName}>SukatKalusugan</Text>
              <Text style={ss.loginTagline}>
                Child Health Monitoring System
              </Text>
              <Text style={ss.loginTaglineSub}>
                Barangay Health Program · WHO Standards
              </Text>
            </View>

            <View style={ss.loginCard}>
              <Text style={ss.loginHeading}>Welcome back</Text>
              <Text style={ss.loginCaption}>Sign in to continue</Text>
              <FormInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                keyboardType="email-address"
                required
              />
              <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secure
                required
              />
              {err ? (
                <View style={ss.loginErr}>
                  <Text
                    style={{ color: C.danger, fontSize: 12, lineHeight: 17 }}
                  >
                    {err}
                  </Text>
                </View>
              ) : null}
              <PrimaryBtn
                label="Sign In"
                onPress={handleLogin}
                loading={loading}
                style={{ marginTop: 4 }}
              />
              <View style={ss.loginDemo}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: C.textMuted,
                    marginBottom: 6,
                  }}
                >
                  Demo Credentials
                </Text>
                <View style={{ gap: 4 }}>
                  <Text style={ss.loginDemoRow}>
                    <Text style={{ fontWeight: "700" }}>Nutritionist:</Text>{" "}
                    maria@health.gov / health123
                  </Text>
                  <Text style={ss.loginDemoRow}>
                    <Text style={{ fontWeight: "700" }}>Parent:</Text>{" "}
                    ana@email.com / parent123
                  </Text>
                </View>
              </View>
            </View>

            <View style={ss.loginTags}>
              {["WHO Standards", "eOPT+ Ready", "IoT Kiosk", "Mobile"].map(
                (t) => (
                  <View key={t} style={ss.loginTag}>
                    <Text style={ss.loginTagText}>{t}</Text>
                  </View>
                ),
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════
// NUTRITIONIST SIDE
// ═══════════════════════════════════════════════════════

function NutriHome({ user, children, measurements }) {
  const normal = children.filter((c) => c.status === "Normal").length;
  const atRisk = children.filter((c) => c.status !== "Normal").length;
  const today = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const recentMs = measurements.slice(0, 3);
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <View style={ss.greetBanner}>
        <Text style={ss.greetDay}>{today}</Text>
        <Text style={ss.greetName}>
          {greeting}, {user.name.split(" ")[0]}!
        </Text>
        <Text style={ss.greetRole}>{user.title} · SukatKalusugan</Text>
      </View>

      <View style={ss.statsRow}>
        <Card style={[ss.statCard, { backgroundColor: C.primary }]}>
          <Text style={ss.statNumW}>{children.length}</Text>
          <Text style={ss.statLblW}>{"Registered\nChildren"}</Text>
        </Card>
        <Card
          style={[
            ss.statCard,
            { backgroundColor: C.dangerLight, borderColor: C.danger + "30" },
          ]}
        >
          <Text style={[ss.statNum, { color: C.danger }]}>{atRisk}</Text>
          <Text style={[ss.statLbl, { color: C.danger }]}>
            {"At Risk\nChildren"}
          </Text>
        </Card>
        <Card
          style={[
            ss.statCard,
            { backgroundColor: C.primaryLight, borderColor: C.primary + "30" },
          ]}
        >
          <Text style={[ss.statNum, { color: C.primary }]}>{normal}</Text>
          <Text style={[ss.statLbl, { color: C.primary }]}>
            {"Normal\nStatus"}
          </Text>
        </Card>
      </View>

      <SectionHeader
        title="Needs Attention"
        sub="Children requiring follow-up"
      />
      {children
        .filter((c) => c.status !== "Normal")
        .slice(0, 4)
        .map((c, i, arr) => (
          <Card
            key={c.id}
            style={[ss.listCard, i < arr.length - 1 && { marginBottom: 8 }]}
          >
            <View style={ss.listRow}>
              <Avatar
                name={childName(c)}
                size={42}
                color={c.sex === "Female" ? "#D81B60" : C.info}
                bg={c.sex === "Female" ? "#FCE4EC" : C.infoLight}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={ss.listName}>{childName(c)}</Text>
                <Text style={ss.listMeta}>
                  {c.barangay} · {c.ageMonths} months · {c.sex}
                </Text>
              </View>
              <StatusPill status={c.status} small />
            </View>
            <View style={[ss.listMetrics, { marginTop: 8 }]}>
              <MetricChip
                label="Weight"
                value={`${c.lastWeight}kg`}
                color={C.info}
              />
              <MetricChip
                label="Height"
                value={`${c.lastHeight}cm`}
                color={C.primaryMid}
              />
              <MetricChip
                label="Age"
                value={`${c.ageMonths}mo`}
                color={C.accent}
              />
            </View>
          </Card>
        ))}
      {children.filter((c) => c.status !== "Normal").length === 0 && (
        <Card style={ss.emptyCard}>
          <Icon name="check-circle" size={32} color={C.primary} />
          <Text style={[ss.emptyText, { marginTop: 8 }]}>
            All children are healthy!
          </Text>
        </Card>
      )}

      <SectionHeader
        title="Recent Measurements"
        sub="Latest recorded entries"
        style={{ marginTop: 16 }}
      />
      {recentMs.map((m, i) => {
        const child = children.find((c) => c.id === m.childId);
        if (!child) return null;
        return (
          <Card
            key={m.id}
            style={[
              ss.activityCard,
              i < recentMs.length - 1 && { marginBottom: 8 },
            ]}
          >
            <View style={ss.listRow}>
              <View style={ss.activityIcon}>
                <Icon name="clipboard" size={18} color={C.primaryMid} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={ss.listName}>{childName(child)}</Text>
                <Text style={ss.listMeta}>
                  {fmtDate(m.date)} · {m.source}
                </Text>
              </View>
              <StatusPill status={m.status} small />
            </View>
          </Card>
        );
      })}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function NutriChildren({ children, measurements, onAddMeasurement }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const statuses = [
    "All",
    "Normal",
    "Underweight",
    "Stunted",
    "Wasted",
    "Overweight",
    "Severely Underweight",
  ];

  const filtered = children.filter(
    (c) =>
      (filter === "All" || c.status === filter) &&
      childName(c).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        title="Child Profiles"
        sub={`${children.length} registered children`}
      />
      <View style={ss.searchBox}>
        <Icon name="search" size={16} color={C.textLight} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search children..."
          placeholderTextColor={C.textLight}
          style={{ flex: 1, fontSize: 13, color: C.text, marginLeft: 8 }}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 14 }}
      >
        {statuses.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setFilter(s)}
            style={[
              ss.filterChip,
              filter === s && {
                backgroundColor: s === "All" ? C.primary : statusBg(s),
                borderColor: s === "All" ? C.primary : statusColor(s),
              },
            ]}
          >
            <Text
              style={[
                ss.filterChipText,
                filter === s && {
                  color: s === "All" ? "#fff" : statusColor(s),
                  fontWeight: "700",
                },
              ]}
            >
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {filtered.map((c) => {
        const childMs = measurements.filter((m) => m.childId === c.id);
        const latest = childMs[0];
        return (
          <Card key={c.id} style={[ss.listCard, { marginBottom: 10 }]}>
            <View style={ss.listRow}>
              <Avatar
                name={childName(c)}
                size={44}
                color={c.sex === "Female" ? "#D81B60" : C.info}
                bg={c.sex === "Female" ? "#FCE4EC" : C.infoLight}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={ss.listName}>{childName(c)}</Text>
                <Text style={ss.listMeta}>
                  {c.barangay} · {c.ageMonths} months · {c.sex}
                </Text>
                {latest && (
                  <Text style={[ss.listMeta, { marginTop: 2 }]}>
                    Last: {fmtDate(latest.date)} — {latest.heightCm}cm /{" "}
                    {latest.weightKg}kg
                  </Text>
                )}
              </View>
              <StatusPill status={c.status} small />
            </View>
            <View style={[ss.listMetrics, { marginTop: 10 }]}>
              <MetricChip
                label="WAZ"
                value={zSign(latest?.waz ?? 0)}
                color={latest?.waz < -2 ? C.danger : C.primaryMid}
              />
              <MetricChip
                label="HAZ"
                value={zSign(latest?.haz ?? 0)}
                color={latest?.haz < -2 ? C.danger : C.info}
              />
              <MetricChip
                label="WHZ"
                value={zSign(latest?.whz ?? 0)}
                color={latest?.whz < -2 ? C.danger : C.accent}
              />
            </View>
            <TouchableOpacity
              onPress={() => onAddMeasurement(c)}
              style={ss.addMsBtn}
            >
              <Icon name="plus" size={13} color={C.primary} />
              <Text style={[ss.addMsBtnText, { marginLeft: 5 }]}>
                Add Measurement
              </Text>
            </TouchableOpacity>
          </Card>
        );
      })}
      {filtered.length === 0 && (
        <Card style={ss.emptyCard}>
          <Text style={ss.emptyText}>No children found</Text>
        </Card>
      )}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function NutriRecords({ measurements, children, onSave }) {
  const [childId, setChildId] = useState(null);
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [source, setSource] = useState("Manual");
  const [showForm, setShowForm] = useState(false);

  const preview = useMemo(() => {
    const child = children.find((c) => c.id === childId);
    if (!child || !heightCm || !weightKg) return null;
    return computeWHO({
      weightKg: +weightKg,
      heightCm: +heightCm,
      ageMonths: child.ageMonths,
    });
  }, [childId, heightCm, weightKg]);

  const handleSave = () => {
    const child = children.find((c) => c.id === childId);
    if (!child || !heightCm || !weightKg) {
      Alert.alert(
        "Missing data",
        "Select a child and enter both measurements.",
      );
      return;
    }
    const r = computeWHO({
      weightKg: +weightKg,
      heightCm: +heightCm,
      ageMonths: child.ageMonths,
    });
    onSave({
      childId,
      date: new Date().toISOString().slice(0, 10),
      heightCm: +heightCm,
      weightKg: +weightKg,
      ageMonths: child.ageMonths,
      source,
      ...r,
      status: r.status,
    });
    setHeightCm("");
    setWeightKg("");
    setChildId(null);
    setShowForm(false);
    Alert.alert("Saved", `Measurement recorded for ${childName(child)}.`);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <View style={ss.sectionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={ss.sectionTitle}>Measurement Records</Text>
          <Text style={ss.sectionSub}>{measurements.length} entries</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowForm((v) => !v)}
          style={ss.addFab}
        >
          <Icon
            name={showForm ? "x" : "plus"}
            size={18}
            color="#fff"
            strokeWidth={2.5}
          />
        </TouchableOpacity>
      </View>

      {showForm && (
        <Card style={[ss.listCard, { marginBottom: 14 }]}>
          <Text style={[ss.listName, { marginBottom: 12 }]}>
            New Measurement
          </Text>
          <Text style={ss.fieldLabel}>Select Child *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 12 }}
          >
            {children.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() => setChildId(c.id)}
                style={[
                  ss.childChip,
                  c.id === childId && {
                    backgroundColor: C.primary,
                    borderColor: C.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    ss.childChipText,
                    c.id === childId && { color: "#fff" },
                  ]}
                >
                  {c.firstName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={ss.fieldLabel}>Source</Text>
          <View style={[ss.listMetrics, { marginBottom: 12 }]}>
            {["Manual", "Kiosk", "Mobile"].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSource(s)}
                style={[
                  ss.filterChip,
                  source === s && {
                    backgroundColor: C.primaryLight,
                    borderColor: C.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    ss.filterChipText,
                    source === s && { color: C.primary, fontWeight: "700" },
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <FormInput
                label="Height (cm)"
                value={heightCm}
                onChangeText={setHeightCm}
                placeholder="82.5"
                keyboardType="numeric"
                required
              />
            </View>
            <View style={{ flex: 1 }}>
              <FormInput
                label="Weight (kg)"
                value={weightKg}
                onChangeText={setWeightKg}
                placeholder="10.8"
                keyboardType="numeric"
                required
              />
            </View>
          </View>
          {preview && (
            <View
              style={[
                ss.previewBox,
                {
                  backgroundColor: statusBg(preview.status),
                  borderColor: statusColor(preview.status) + "40",
                },
              ]}
            >
              <StatusPill status={preview.status} />
              <Text style={[ss.listMeta, { marginTop: 6 }]}>
                WAZ {zSign(preview.waz)} · HAZ {zSign(preview.haz)} · WHZ{" "}
                {zSign(preview.whz)}
              </Text>
            </View>
          )}
          <PrimaryBtn
            label="Save Measurement"
            onPress={handleSave}
            style={{ marginTop: 10 }}
          />
        </Card>
      )}

      {measurements.map((m, i) => {
        const child = children.find((c) => c.id === m.childId);
        if (!child) return null;
        return (
          <Card
            key={m.id}
            style={[
              ss.listCard,
              i < measurements.length - 1 && { marginBottom: 8 },
            ]}
          >
            <View style={ss.listRow}>
              <View style={ss.activityIcon}>
                <Icon name="ruler" size={18} color={C.primaryMid} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={ss.listName}>{childName(child)}</Text>
                <Text style={ss.listMeta}>
                  {fmtDate(m.date)} · {m.source}
                </Text>
              </View>
              <StatusPill status={m.status} small />
            </View>
            <View style={[ss.listMetrics, { marginTop: 8 }]}>
              <MetricChip
                label="Height"
                value={`${m.heightCm}cm`}
                color={C.info}
              />
              <MetricChip
                label="Weight"
                value={`${m.weightKg}kg`}
                color={C.primaryMid}
              />
              <MetricChip
                label="WAZ"
                value={zSign(m.waz)}
                color={m.waz < -2 ? C.danger : C.text}
              />
            </View>
          </Card>
        );
      })}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function NutriProfile({ user, onLogout }) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <Card
        style={[
          ss.listCard,
          { alignItems: "center", paddingVertical: 28, marginBottom: 16 },
        ]}
      >
        <Avatar name={user.name} size={72} color="#fff" bg={C.primary} />
        <Text style={[ss.listName, { marginTop: 12, fontSize: 18 }]}>
          {user.name}
        </Text>
        <Text style={ss.listMeta}>{user.title}</Text>
        <View
          style={[ss.pill, { backgroundColor: C.primaryLight, marginTop: 8 }]}
        >
          <Text style={{ fontSize: 11, fontWeight: "700", color: C.primary }}>
            Nutritionist
          </Text>
        </View>
      </Card>
      <Card style={ss.listCard}>
        {[
          ["Email", user.email],
          ["WHO Reference", "2006 Standards"],
          ["eOPT+ Sync", "Enabled"],
          ["Alert WAZ", "< −2.0"],
          ["App Version", "1.0.0"],
        ].map(([k, v], i, arr) => (
          <View
            key={k}
            style={[
              ss.settingRow,
              i < arr.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: C.border,
              },
            ]}
          >
            <Text style={ss.settingKey}>{k}</Text>
            <Text style={ss.settingVal}>{v}</Text>
          </View>
        ))}
      </Card>
      <TouchableOpacity
        onPress={onLogout}
        style={[ss.ghostBtn, { borderColor: C.danger + "60", marginTop: 14 }]}
      >
        <View style={ss.listRow}>
          <Icon name="log-out" size={15} color={C.danger} />
          <Text style={[ss.ghostBtnText, { color: C.danger, marginLeft: 8 }]}>
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════
// PARENT SIDE
// ═══════════════════════════════════════════════════════

function ParentHome({ user, myChildren, measurements }) {
  const atRisk = myChildren.filter((c) => c.status !== "Normal");
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <View style={ss.greetBanner}>
        <Text style={ss.greetDay}>
          {new Date().toLocaleDateString("en-PH", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text style={ss.greetName}>
          {greeting}, {user.name.split(" ")[0]}!
        </Text>
        <Text style={ss.greetRole}>Parent Portal · SukatKalusugan</Text>
      </View>

      <SectionHeader
        title="Your Children"
        sub={`${myChildren.length} registered`}
      />
      {myChildren.map((c) => {
        const ms = measurements.filter((m) => m.childId === c.id);
        const latest = ms[0];
        return (
          <Card key={c.id} style={[ss.listCard, { marginBottom: 10 }]}>
            <View style={ss.listRow}>
              <Avatar
                name={childName(c)}
                size={48}
                color={c.sex === "Female" ? "#D81B60" : C.info}
                bg={c.sex === "Female" ? "#FCE4EC" : C.infoLight}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={ss.listName}>{childName(c)}</Text>
                <Text style={ss.listMeta}>
                  {c.ageMonths} months old · {c.sex}
                </Text>
                <Text style={ss.listMeta}>{c.barangay}</Text>
              </View>
              <StatusPill status={c.status} />
            </View>
            {latest && (
              <View style={[ss.listMetrics, { marginTop: 10 }]}>
                <MetricChip
                  label="Weight"
                  value={`${latest.weightKg}kg`}
                  color={C.info}
                />
                <MetricChip
                  label="Height"
                  value={`${latest.heightCm}cm`}
                  color={C.primaryMid}
                />
                <MetricChip
                  label="Measured"
                  value={fmtDate(latest.date)}
                  color={C.accent}
                />
              </View>
            )}
          </Card>
        );
      })}

      {atRisk.length > 0 && (
        <>
          <SectionHeader
            title="Health Alerts"
            sub="Children that may need attention"
          />
          {atRisk.map((c) => (
            <Card key={c.id} style={[ss.alertCard, { marginBottom: 8 }]}>
              <View style={ss.listRow}>
                <View
                  style={[ss.activityIcon, { backgroundColor: C.dangerLight }]}
                >
                  <Icon name="alert-triangle" size={18} color={C.danger} />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={[ss.listName, { color: C.danger }]}>
                    {childName(c)}
                  </Text>
                  <Text style={ss.listMeta}>
                    Status:{" "}
                    <Text
                      style={{
                        color: statusColor(c.status),
                        fontWeight: "700",
                      }}
                    >
                      {c.status}
                    </Text>
                  </Text>
                  <Text style={ss.listMeta}>
                    Please consult your barangay health worker.
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </>
      )}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function ParentChildren({ myChildren, measurements }) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        title="Child Health Records"
        sub="Growth history and measurements"
      />
      {myChildren.map((c) => {
        const ms = measurements.filter((m) => m.childId === c.id);
        return (
          <Card key={c.id} style={[ss.listCard, { marginBottom: 14 }]}>
            <View
              style={[
                ss.listRow,
                {
                  paddingBottom: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: C.border,
                },
              ]}
            >
              <Avatar
                name={childName(c)}
                size={44}
                color={c.sex === "Female" ? "#D81B60" : C.info}
                bg={c.sex === "Female" ? "#FCE4EC" : C.infoLight}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={ss.listName}>{childName(c)}</Text>
                <Text style={ss.listMeta}>
                  Born {fmtDate(c.birthdate)} · {c.ageMonths} months
                </Text>
              </View>
              <StatusPill status={c.status} small />
            </View>
            <View style={{ marginTop: 10 }}>
              {[
                ["Sex", c.sex],
                ["Barangay", c.barangay],
              ].map(([k, v]) => (
                <View key={k} style={[ss.settingRow, { paddingVertical: 6 }]}>
                  <Text style={ss.settingKey}>{k}</Text>
                  <Text style={ss.settingVal}>{v}</Text>
                </View>
              ))}
            </View>
            {ms[0] && (
              <View
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTopWidth: 1,
                  borderTopColor: C.border,
                }}
              >
                <Text style={[ss.fieldLabel, { marginBottom: 8 }]}>
                  Latest WHO Z-Scores
                </Text>
                <View style={ss.listMetrics}>
                  <MetricChip
                    label="WAZ"
                    value={zSign(ms[0].waz)}
                    color={ms[0].waz < -2 ? C.danger : C.primaryMid}
                  />
                  <MetricChip
                    label="HAZ"
                    value={zSign(ms[0].haz)}
                    color={ms[0].haz < -2 ? C.danger : C.info}
                  />
                  <MetricChip
                    label="WHZ"
                    value={zSign(ms[0].whz)}
                    color={ms[0].whz < -2 ? C.danger : C.accent}
                  />
                </View>
              </View>
            )}
            {ms.length > 0 && (
              <View
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTopWidth: 1,
                  borderTopColor: C.border,
                }}
              >
                <Text style={[ss.fieldLabel, { marginBottom: 8 }]}>
                  Measurement History
                </Text>
                {ms.slice(0, 3).map((m) => (
                  <View
                    key={m.id}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                      borderBottomWidth: 1,
                      borderBottomColor: C.bgAlt,
                    }}
                  >
                    <Text style={ss.listMeta}>{fmtDate(m.date)}</Text>
                    <Text
                      style={[
                        ss.listMeta,
                        { fontWeight: "600", color: C.text },
                      ]}
                    >
                      {m.heightCm}cm / {m.weightKg}kg
                    </Text>
                    <Text
                      style={[ss.listMeta, { color: statusColor(m.status) }]}
                    >
                      {m.status}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </Card>
        );
      })}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function ParentProfile({ user, onLogout }) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <Card
        style={[
          ss.listCard,
          { alignItems: "center", paddingVertical: 28, marginBottom: 16 },
        ]}
      >
        <Avatar name={user.name} size={72} color="#fff" bg={C.primaryMid} />
        <Text style={[ss.listName, { marginTop: 12, fontSize: 18 }]}>
          {user.name}
        </Text>
        <Text style={ss.listMeta}>{user.email}</Text>
        <View
          style={[ss.pill, { backgroundColor: C.accentLight, marginTop: 8 }]}
        >
          <Text style={{ fontSize: 11, fontWeight: "700", color: C.accent }}>
            Parent / Guardian
          </Text>
        </View>
      </Card>
      <Card style={ss.listCard}>
        {[
          ["App Version", "1.0.0"],
          ["Health Program", "Barangay Nutrition Program"],
          ["Standards", "WHO 2006 Growth Standards"],
          ["Language", "English / Filipino"],
        ].map(([k, v], i, arr) => (
          <View
            key={k}
            style={[
              ss.settingRow,
              i < arr.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: C.border,
              },
            ]}
          >
            <Text style={ss.settingKey}>{k}</Text>
            <Text style={ss.settingVal}>{v}</Text>
          </View>
        ))}
      </Card>
      <Card
        style={[
          ss.listCard,
          {
            marginTop: 12,
            backgroundColor: C.infoLight,
            borderColor: C.info + "30",
          },
        ]}
      >
        <View style={ss.listRow}>
          <View style={[ss.activityIcon, { backgroundColor: C.info + "20" }]}>
            <Icon name="phone" size={18} color={C.info} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[ss.listName, { color: C.info }]}>
              Contact Health Worker
            </Text>
            <Text style={[ss.listMeta, { color: C.info }]}>
              For questions about your child's health, contact your barangay
              health center.
            </Text>
          </View>
        </View>
      </Card>
      <TouchableOpacity
        onPress={onLogout}
        style={[ss.ghostBtn, { borderColor: C.danger + "60", marginTop: 14 }]}
      >
        <View style={ss.listRow}>
          <Icon name="log-out" size={15} color={C.danger} />
          <Text style={[ss.ghostBtnText, { color: C.danger, marginLeft: 8 }]}>
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

// ─── Add Measurement modal ────────────────────────────────────────────────────
function AddMeasurementModal({ child, onSave, onClose }) {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [source, setSource] = useState("Manual");

  const preview = useMemo(() => {
    if (!heightCm || !weightKg) return null;
    return computeWHO({
      weightKg: +weightKg,
      heightCm: +heightCm,
      ageMonths: child.ageMonths,
    });
  }, [heightCm, weightKg]);

  const handleSave = () => {
    if (!heightCm || !weightKg) {
      Alert.alert("Missing data", "Enter both height and weight.");
      return;
    }
    const r = computeWHO({
      weightKg: +weightKg,
      heightCm: +heightCm,
      ageMonths: child.ageMonths,
    });
    onSave({
      childId: child.id,
      date: new Date().toISOString().slice(0, 10),
      heightCm: +heightCm,
      weightKg: +weightKg,
      ageMonths: child.ageMonths,
      source,
      ...r,
      status: r.status,
    });
    Alert.alert("Saved", `Measurement saved for ${childName(child)}.`);
    onClose();
  };

  return (
    <View style={ss.modalOverlay}>
      <View style={ss.modalCard}>
        <View style={ss.listRow}>
          <Avatar
            name={childName(child)}
            size={36}
            color={child.sex === "Female" ? "#D81B60" : C.info}
            bg={child.sex === "Female" ? "#FCE4EC" : C.infoLight}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={ss.listName}>{childName(child)}</Text>
            <Text style={ss.listMeta}>{child.ageMonths} months old</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Icon name="x" size={20} color={C.textMuted} />
          </TouchableOpacity>
        </View>
        <View style={[ss.listMetrics, { marginVertical: 12 }]}>
          {["Manual", "Kiosk", "Mobile"].map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSource(s)}
              style={[
                ss.filterChip,
                source === s && {
                  backgroundColor: C.primaryLight,
                  borderColor: C.primary,
                },
              ]}
            >
              <Text
                style={[
                  ss.filterChipText,
                  source === s && { color: C.primary, fontWeight: "700" },
                ]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <FormInput
              label="Height (cm)"
              value={heightCm}
              onChangeText={setHeightCm}
              placeholder="82.5"
              keyboardType="numeric"
              required
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormInput
              label="Weight (kg)"
              value={weightKg}
              onChangeText={setWeightKg}
              placeholder="10.8"
              keyboardType="numeric"
              required
            />
          </View>
        </View>
        {preview && (
          <View
            style={[
              ss.previewBox,
              {
                backgroundColor: statusBg(preview.status),
                borderColor: statusColor(preview.status) + "40",
              },
            ]}
          >
            <StatusPill status={preview.status} />
            <Text style={[ss.listMeta, { marginTop: 6 }]}>
              WAZ {zSign(preview.waz)} · HAZ {zSign(preview.haz)} · WHZ{" "}
              {zSign(preview.whz)}
            </Text>
          </View>
        )}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          <GhostBtn label="Cancel" onPress={onClose} style={{ flex: 1 }} />
          <PrimaryBtn label="Save" onPress={handleSave} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [children, setChildren] = useState(INITIAL_CHILDREN);
  const [measurements, setMeasurements] = useState(INITIAL_MEASUREMENTS);
  const [appointments, setAppointments] = useState(APPOINTMENTS_DATA);
  const [msModal, setMsModal] = useState(null);

  const handleLogin = (u) => {
    setUser(u);
    setTab("home");
  };
  const handleLogout = () => {
    setUser(null);
    setTab("home");
  };

  const saveMeasurement = (data) => {
    const newId = Math.max(...measurements.map((m) => m.id), 0) + 1;
    setMeasurements((prev) => [{ ...data, id: newId }, ...prev]);
    setChildren((prev) =>
      prev.map((c) =>
        c.id === data.childId
          ? {
              ...c,
              status: data.status,
              lastWeight: data.weightKg,
              lastHeight: data.heightCm,
            }
          : c,
      ),
    );
  };

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  const isNutri = user.role === "nutritionist";
  const tabs = isNutri ? NUTRI_TABS : PARENT_TABS;
  const myChildren = isNutri
    ? children
    : children.filter((c) => user.childIds?.includes(c.id));
  const myAppointments = isNutri
    ? appointments
    : appointments.filter((a) => {
        const child = myChildren.find((c) => childName(c) === a.childName);
        return !!child;
      });

  const renderScreen = () => {
    if (isNutri) {
      switch (tab) {
        case "home":
          return (
            <NutriHome
              user={user}
              children={children}
              measurements={measurements}
            />
          );
        case "children":
          return (
            <NutriChildren
              children={children}
              measurements={measurements}
              onAddMeasurement={(c) => setMsModal(c)}
            />
          );
        case "records":
          return (
            <NutriRecords
              measurements={measurements}
              children={children}
              onSave={saveMeasurement}
            />
          );
        case "appointments":
          return (
            <AppointmentsScreen
              appointments={appointments}
              setAppointments={setAppointments}
              children={children}
              isNutri={true}
            />
          );
        case "profile":
          return <NutriProfile user={user} onLogout={handleLogout} />;
        default:
          return null;
      }
    } else {
      switch (tab) {
        case "home":
          return (
            <ParentHome
              user={user}
              myChildren={myChildren}
              measurements={measurements}
            />
          );
        case "children":
          return (
            <ParentChildren
              myChildren={myChildren}
              measurements={measurements}
            />
          );
        case "appointments":
          return (
            <AppointmentsScreen
              appointments={myAppointments}
              setAppointments={setAppointments}
              children={myChildren}
              isNutri={false}
            />
          );
        case "chat":
          return <AIChatScreen user={user} myChildren={myChildren} />;
        case "profile":
          return <ParentProfile user={user} onLogout={handleLogout} />;
        default:
          return null;
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={C.primaryDark} />
      <AppHeader
        title="SukatKalusugan"
        sub={isNutri ? "Health Worker Portal" : "Parent Portal"}
        user={user}
        onAvatarPress={() => setTab("profile")}
      />
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      {msModal && (
        <AddMeasurementModal
          child={msModal}
          onSave={(data) => {
            saveMeasurement(data);
            setMsModal(null);
          }}
          onClose={() => setMsModal(null)}
        />
      )}
      <TabBar tabs={tabs} active={tab} onChange={setTab} />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const ss = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: C.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBrand: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: C.primaryMid,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.2,
  },
  headerSub: { fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 1 },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.primaryMid,
    alignItems: "center",
    justifyContent: "center",
  },

  tabBar: {
    flexDirection: "row",
    backgroundColor: C.primaryDark,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
    paddingBottom: Platform.OS === "ios" ? 20 : 6,
    paddingTop: 8,
  },
  tabItem: { flex: 1, alignItems: "center", position: "relative" },
  tabIndicator: {
    position: "absolute",
    top: -8,
    left: "25%",
    right: "25%",
    height: 2.5,
    backgroundColor: C.primaryMid,
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 9,
    color: "rgba(255,255,255,0.45)",
    fontWeight: "500",
    marginTop: 3,
  },

  screenPad: { padding: 14, paddingBottom: 28 },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: C.text },
  sectionSub: { fontSize: 11, color: C.textMuted, marginTop: 2 },

  greetBanner: {
    backgroundColor: C.primary,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  greetDay: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  greetName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 2,
  },
  greetRole: { fontSize: 11, color: "rgba(255,255,255,0.7)" },

  statsRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 12,
    alignItems: "flex-start",
  },
  statNumW: { fontSize: 26, fontWeight: "900", color: "#fff", marginBottom: 2 },
  statLblW: { fontSize: 10, color: "rgba(255,255,255,0.75)", lineHeight: 14 },
  statNum: { fontSize: 26, fontWeight: "900", marginBottom: 2 },
  statLbl: { fontSize: 10, lineHeight: 14 },

  listCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 0,
  },
  listRow: { flexDirection: "row", alignItems: "center" },
  listName: { fontSize: 14, fontWeight: "700", color: C.text, marginBottom: 2 },
  listMeta: { fontSize: 11, color: C.textMuted, lineHeight: 16 },
  listMetrics: { flexDirection: "row", gap: 8, flexWrap: "wrap" },

  activityCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: C.bgAlt,
    alignItems: "center",
    justifyContent: "center",
  },

  alertCard: {
    backgroundColor: C.dangerLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.danger + "30",
    padding: 14,
  },

  metricChip: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    minWidth: 60,
  },
  metricValue: { fontSize: 14, fontWeight: "800" },
  metricLabel: { fontSize: 9, color: C.textMuted, marginTop: 1 },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  pillDot: { width: 5, height: 5, borderRadius: 3 },
  pillText: { fontSize: 11, fontWeight: "700" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: C.card,
    marginRight: 6,
  },
  filterChipText: { fontSize: 12, fontWeight: "500", color: C.textMuted },

  childChip: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: C.card,
    marginRight: 8,
  },
  childChipText: { fontSize: 12, fontWeight: "600", color: C.text },

  addMsBtn: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.primary + "50",
    backgroundColor: C.primaryLight,
    flexDirection: "row",
    justifyContent: "center",
  },
  addMsBtnText: { fontSize: 12, fontWeight: "700", color: C.primary },

  addFab: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 28,
    alignItems: "center",
  },
  emptyText: { fontSize: 13, color: C.textMuted, textAlign: "center" },

  previewBox: { borderRadius: 10, borderWidth: 1, padding: 12, marginTop: 8 },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingKey: { fontSize: 13, color: C.textMuted },
  settingVal: {
    fontSize: 13,
    fontWeight: "600",
    color: C.text,
    maxWidth: "55%",
    textAlign: "right",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: C.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },

  fieldLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: C.textMuted,
    letterSpacing: 0.6,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: C.text,
  },

  primaryBtn: {
    backgroundColor: C.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  ghostBtn: {
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  ghostBtnText: { fontSize: 14, fontWeight: "700", color: C.textMuted },

  loginScroll: { flexGrow: 1, padding: 20, paddingTop: 40, paddingBottom: 36 },
  loginBrand: { alignItems: "center", marginBottom: 32 },
  loginLogoRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  loginLogoDot: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: C.primaryMid,
    alignItems: "center",
    justifyContent: "center",
  },
  loginAppName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  loginTagline: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    marginBottom: 2,
  },
  loginTaglineSub: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 0.5,
  },
  loginCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
  },
  loginHeading: {
    fontSize: 22,
    fontWeight: "800",
    color: C.text,
    marginBottom: 4,
  },
  loginCaption: { fontSize: 13, color: C.textMuted, marginBottom: 20 },
  loginErr: {
    backgroundColor: C.dangerLight,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  loginDemo: {
    marginTop: 14,
    backgroundColor: C.bg,
    borderRadius: 10,
    padding: 12,
  },
  loginDemoRow: { fontSize: 11, color: C.textMuted, lineHeight: 18 },
  loginTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  loginTag: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  loginTagText: { fontSize: 11, color: "rgba(255,255,255,0.6)" },

  // Calendar strip
  calStrip: { paddingHorizontal: 10 },
  calDay: {
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 68,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  calDayName: {
    fontSize: 10,
    color: C.textMuted,
    fontWeight: "600",
    marginBottom: 4,
  },
  calDayNum: { fontSize: 18, fontWeight: "800", color: C.text },
  calDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.primary,
    marginTop: 4,
  },

  // Appointment
  apptTypeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  miniBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  miniBtnText: { fontSize: 11, fontWeight: "700" },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },

  // Booking modal step
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotText: { fontSize: 12, fontWeight: "800", color: "#fff" },
  stepLine: { flex: 1, height: 2, borderRadius: 1 },

  // Type option
  typeOption: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  typeRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  typeRadioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: C.primary,
  },

  // Time grid
  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  timeSlot: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
  },
  timeSlotText: { fontSize: 12, fontWeight: "600", color: C.text },

  // Chat
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.07)",
  },
  chatBotAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.primaryMid,
    alignItems: "center",
    justifyContent: "center",
  },
  chatMessages: { flex: 1, backgroundColor: C.bg },
  msgWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  msgWrapperUser: { flexDirection: "row-reverse" },
  msgBotIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: C.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 2,
  },
  msgBubble: { maxWidth: "78%", borderRadius: 16, padding: 12 },
  msgBubbleBot: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderBottomLeftRadius: 4,
  },
  msgBubbleUser: { backgroundColor: C.primary, borderBottomRightRadius: 4 },
  msgText: { fontSize: 13, color: C.text, lineHeight: 19 },
  msgTime: {
    fontSize: 10,
    color: C.textLight,
    marginTop: 5,
    textAlign: "right",
  },
  typingDots: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.textLight,
  },
  quickReplies: {
    backgroundColor: C.card,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingVertical: 10,
    flexGrow: 0,
  },
  quickReply: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.primary + "50",
    backgroundColor: C.primaryLight,
  },
  quickReplyText: { fontSize: 12, color: C.primary, fontWeight: "600" },
  chatInputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    gap: 10,
    backgroundColor: C.card,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: C.text,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

/**
 * SukatKalusugan Mobile — Dual-Role App
 * Nutritionist (health worker) + Parent (guardian) roles
 * Auto-detected from credentials on login
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

// ─── Mock Data ────────────────────────────────────────────────────────────────
const USERS = [
  // Nutritionists / health workers
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
  // Parents / guardians
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

const NUTRITION_TIPS = [
  {
    id: 1,
    tip: "Offer iron-rich foods like malunggay, kangkong and mongo beans twice a week.",
    icon: "🥬",
  },
  {
    id: 2,
    tip: "Exclusive breastfeeding for the first 6 months supports healthy growth.",
    icon: "🤱",
  },
  {
    id: 3,
    tip: "Weigh and measure your child monthly to catch growth issues early.",
    icon: "📏",
  },
  {
    id: 4,
    tip: "Vitamin A–rich foods like camote, squash, and papaya support eye health.",
    icon: "🍠",
  },
  {
    id: 5,
    tip: "Serve 3 small meals and 2–3 healthy snacks every day.",
    icon: "🍽️",
  },
];

const REMINDERS = [
  {
    id: 1,
    title: "Monthly Weigh-In",
    date: "May 20",
    icon: "⚖️",
    barangay: "Bagong Silang",
  },
  {
    id: 2,
    title: "Nutrition Counseling",
    date: "May 22",
    icon: "🥗",
    barangay: "Poblacion",
  },
  {
    id: 3,
    title: "Vitamin A Distribution",
    date: "May 28",
    icon: "💊",
    barangay: "All Barangays",
  },
  {
    id: 4,
    title: "Growth Monitoring",
    date: "Jun 3",
    icon: "📊",
    barangay: "San Jose",
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

function GhostBtn({ label, onPress, danger }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[ss.ghostBtn, danger && { borderColor: C.danger + "60" }]}
    >
      <Text style={[ss.ghostBtnText, danger && { color: C.danger }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
const NUTRI_TABS = [
  { id: "home", label: "Home", sym: "⊞" },
  { id: "children", label: "Children", sym: "♡" },
  { id: "records", label: "Records", sym: "◎" },
  { id: "reports", label: "Reports", sym: "≡" },
  { id: "profile", label: "Profile", sym: "◉" },
];
const PARENT_TABS = [
  { id: "home", label: "Home", sym: "⊞" },
  { id: "children", label: "My Kids", sym: "♡" },
  { id: "tips", label: "Tips", sym: "✦" },
  { id: "reminders", label: "Schedule", sym: "◷" },
  { id: "profile", label: "Profile", sym: "◉" },
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
            <Text style={[ss.tabSym, sel && { color: C.primaryMid }]}>
              {t.sym}
            </Text>
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
          <Text style={{ fontSize: 15, color: "#fff" }}>✚</Text>
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
            {/* Brand */}
            <View style={ss.loginBrand}>
              <View style={ss.loginLogoRing}>
                <View style={ss.loginLogoDot}>
                  <Text style={{ fontSize: 28, color: "#fff" }}>✚</Text>
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

            {/* Card */}
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
      {/* Greeting Banner */}
      <View style={ss.greetBanner}>
        <Text style={ss.greetDay}>{today}</Text>
        <Text style={ss.greetName}>
          {greeting}, {user.name.split(" ")[0]}!
        </Text>
        <Text style={ss.greetRole}>{user.title} · SukatKalusugan</Text>
      </View>

      {/* Quick Stats Row */}
      <View style={ss.statsRow}>
        <Card style={[ss.statCard, { backgroundColor: C.primary }]}>
          <Text style={ss.statNumW}>{children.length}</Text>
          <Text style={ss.statLblW}>Registered{"\n"}Children</Text>
        </Card>
        <Card
          style={[
            ss.statCard,
            { backgroundColor: C.dangerLight, borderColor: C.danger + "30" },
          ]}
        >
          <Text style={[ss.statNum, { color: C.danger }]}>{atRisk}</Text>
          <Text style={[ss.statLbl, { color: C.danger }]}>
            At Risk{"\n"}Children
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
            Normal{"\n"}Status
          </Text>
        </Card>
      </View>

      {/* Attention Queue */}
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
          <Text style={{ fontSize: 28, marginBottom: 6 }}>🎉</Text>
          <Text style={ss.emptyText}>All children are healthy!</Text>
        </Card>
      )}

      {/* Recent Activity */}
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
                <Text style={{ fontSize: 18 }}>📋</Text>
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

      {/* Search */}
      <View style={ss.searchBox}>
        <Text style={{ color: C.textLight, marginRight: 8, fontSize: 16 }}>
          ⊕
        </Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search children..."
          placeholderTextColor={C.textLight}
          style={{ flex: 1, fontSize: 13, color: C.text }}
        />
      </View>

      {/* Filter Chips */}
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

      {/* List */}
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
              style={[ss.addMsBtn]}
            >
              <Text style={ss.addMsBtnText}>+ Add Measurement</Text>
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
          <Text style={{ color: "#fff", fontSize: 18, lineHeight: 20 }}>
            {showForm ? "✕" : "+"}
          </Text>
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
                <Text style={{ fontSize: 18 }}>📐</Text>
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

function NutriReports({ children, measurements }) {
  const counts = {};
  measurements.forEach((m) => {
    counts[m.status] = (counts[m.status] || 0) + 1;
  });
  const total = measurements.length || 1;
  const statuses = [
    "Normal",
    "Underweight",
    "Stunted",
    "Wasted",
    "Overweight",
    "Severely Underweight",
  ];
  const atRisk = children.filter((c) => c.status !== "Normal").length;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        title="Reports & Analytics"
        sub="Health monitoring overview"
      />

      {/* Summary cards */}
      <View style={ss.statsRow}>
        <Card style={[ss.statCard, { backgroundColor: C.primary }]}>
          <Text style={ss.statNumW}>{children.length}</Text>
          <Text style={ss.statLblW}>Total{"\n"}Children</Text>
        </Card>
        <Card
          style={[
            ss.statCard,
            { backgroundColor: C.infoLight, borderColor: C.info + "30" },
          ]}
        >
          <Text style={[ss.statNum, { color: C.info }]}>
            {measurements.length}
          </Text>
          <Text style={[ss.statLbl, { color: C.info }]}>
            Records{"\n"}Taken
          </Text>
        </Card>
        <Card
          style={[
            ss.statCard,
            { backgroundColor: C.dangerLight, borderColor: C.danger + "30" },
          ]}
        >
          <Text style={[ss.statNum, { color: C.danger }]}>{atRisk}</Text>
          <Text style={[ss.statLbl, { color: C.danger }]}>
            At Risk{"\n"}Children
          </Text>
        </Card>
      </View>

      {/* Bar chart */}
      <Card style={[ss.listCard, { marginBottom: 14 }]}>
        <Text style={[ss.listName, { marginBottom: 14 }]}>
          Status Distribution
        </Text>
        {statuses.map((s) => {
          const cnt = counts[s] || 0;
          const pct = cnt / total;
          return (
            <View key={s} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{ fontSize: 11, color: C.text, fontWeight: "600" }}
                >
                  {s}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: C.textMuted,
                    fontWeight: "700",
                  }}
                >
                  {cnt}
                </Text>
              </View>
              <View style={ss.barTrack}>
                <View
                  style={[
                    ss.barFill,
                    { width: `${pct * 100}%`, backgroundColor: statusColor(s) },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </Card>

      {/* Barangay Summary */}
      <Card style={ss.listCard}>
        <Text style={[ss.listName, { marginBottom: 12 }]}>By Barangay</Text>
        {["Bagong Silang", "Poblacion", "San Jose", "Sta. Cruz"].map((b) => {
          const bc = children.filter((c) => c.barangay === b);
          const br = bc.filter((c) => c.status !== "Normal");
          return (
            <View
              key={b}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 13, fontWeight: "600", color: C.text }}
                >
                  {b}
                </Text>
                <Text style={ss.listMeta}>
                  {bc.length} children · {br.length} at risk
                </Text>
              </View>
              <View
                style={[
                  ss.pill,
                  {
                    backgroundColor:
                      br.length > 0 ? C.dangerLight : C.primaryLight,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: br.length > 0 ? C.danger : C.primary,
                  }}
                >
                  {br.length > 0 ? `${br.length} at risk` : "All clear"}
                </Text>
              </View>
            </View>
          );
        })}
      </Card>

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

      <GhostBtn
        label="Sign Out"
        onPress={onLogout}
        danger
        style={{ marginTop: 14 }}
      />
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
      {/* Greeting */}
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

      {/* Kids Overview */}
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
            {!latest && (
              <Text style={[ss.listMeta, { marginTop: 8 }]}>
                No measurements recorded yet
              </Text>
            )}
          </Card>
        );
      })}

      {/* Alert if at risk */}
      {atRisk.length > 0 && (
        <>
          <SectionHeader
            title="Health Alerts"
            sub="Children that may need attention"
          />
          {atRisk.map((c) => (
            <Card key={c.id} style={[ss.alertCard, { marginBottom: 8 }]}>
              <View style={ss.listRow}>
                <Text style={{ fontSize: 24 }}>⚠️</Text>
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
            {/* Child header */}
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

            {/* Profile details */}
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

            {/* Z-score section */}
            {ms[0] && (
              <View
                style={[
                  {
                    marginTop: 10,
                    paddingTop: 10,
                    borderTopWidth: 1,
                    borderTopColor: C.border,
                  },
                ]}
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

            {/* History */}
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

            {ms.length === 0 && (
              <Text
                style={[ss.listMeta, { marginTop: 10, textAlign: "center" }]}
              >
                No measurements yet. Visit your barangay health center.
              </Text>
            )}
          </Card>
        );
      })}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function ParentTips() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        title="Nutrition Tips"
        sub="Helpful guidance for healthy children"
      />

      {NUTRITION_TIPS.map((tip, i) => (
        <Card key={tip.id} style={[ss.listCard, { marginBottom: 10 }]}>
          <View style={ss.listRow}>
            <View style={ss.tipIcon}>
              <Text style={{ fontSize: 22 }}>{tip.icon}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontSize: 13, color: C.text, lineHeight: 20 }}>
                {tip.tip}
              </Text>
            </View>
          </View>
        </Card>
      ))}

      {/* WHO Standards info */}
      <Card
        style={[
          ss.listCard,
          {
            marginTop: 4,
            backgroundColor: C.primaryLight,
            borderColor: C.primary + "30",
          },
        ]}
      >
        <View style={ss.listRow}>
          <Text style={{ fontSize: 22 }}>📘</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[ss.listName, { color: C.primary }]}>
              WHO Growth Standards
            </Text>
            <Text style={[ss.listMeta, { color: C.primaryMid }]}>
              This app uses WHO 2006 Child Growth Standards to assess your
              child's nutritional status.
            </Text>
          </View>
        </View>
      </Card>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function ParentReminders() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={ss.screenPad}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        title="Upcoming Schedule"
        sub="Health activities in your area"
      />

      {REMINDERS.map((r, i) => (
        <Card key={r.id} style={[ss.listCard, { marginBottom: 10 }]}>
          <View style={ss.listRow}>
            <View style={ss.reminderIcon}>
              <Text style={{ fontSize: 22 }}>{r.icon}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={ss.listName}>{r.title}</Text>
              <Text style={ss.listMeta}>{r.barangay}</Text>
            </View>
            <View style={[ss.pill, { backgroundColor: C.primaryLight }]}>
              <Text
                style={{ fontSize: 11, fontWeight: "700", color: C.primary }}
              >
                {r.date}
              </Text>
            </View>
          </View>
        </Card>
      ))}

      {/* What to bring */}
      <Card style={[ss.listCard, { marginTop: 4 }]}>
        <Text style={[ss.listName, { marginBottom: 10 }]}>What to Bring</Text>
        {[
          "Child's health card (Road to Good Health card)",
          "Immunization records",
          "The child (clean, fed, and rested)",
        ].map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: C.primary,
                fontWeight: "700",
                marginRight: 8,
                fontSize: 14,
              }}
            >
              ✓
            </Text>
            <Text
              style={{ fontSize: 13, color: C.text, flex: 1, lineHeight: 19 }}
            >
              {item}
            </Text>
          </View>
        ))}
      </Card>

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
          <Text style={{ fontSize: 20 }}>📞</Text>
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

      <GhostBtn
        label="Sign Out"
        onPress={onLogout}
        danger
        style={{ marginTop: 14 }}
      />
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

// ─── Add Measurement modal from children screen ───────────────────────────────
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
            <Text style={{ fontSize: 20, color: C.textMuted }}>✕</Text>
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
  const [msModal, setMsModal] = useState(null); // child to add measurement for

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
  const headerTitle = isNutri ? "SukatKalusugan" : "SukatKalusugan";
  const headerSub = isNutri ? "Health Worker Portal" : "Parent Portal";

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
        case "reports":
          return (
            <NutriReports children={children} measurements={measurements} />
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
        case "tips":
          return <ParentTips />;
        case "reminders":
          return <ParentReminders />;
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
        title={headerTitle}
        sub={headerSub}
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
  // Header
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

  // Tab Bar
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
  tabSym: { fontSize: 17, color: "rgba(255,255,255,0.4)", lineHeight: 22 },
  tabLabel: {
    fontSize: 9,
    color: "rgba(255,255,255,0.45)",
    fontWeight: "500",
    marginTop: 2,
  },

  // Screen
  screenPad: { padding: 14, paddingBottom: 28 },

  // Card
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
  },

  // Section Header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: C.text },
  sectionSub: { fontSize: 11, color: C.textMuted, marginTop: 2 },

  // Greeting Banner
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

  // Stats Row
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

  // List
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

  // Activity Icon
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: C.bgAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  tipIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: C.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  reminderIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: C.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },

  // Alert Card
  alertCard: {
    backgroundColor: C.dangerLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.danger + "30",
    padding: 14,
  },

  // Metric Chip
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

  // Status Pill
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

  // Search
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

  // Filter Chips
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

  // Child Chip
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

  // Add Measurement Button
  addMsBtn: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.primary + "50",
    backgroundColor: C.primaryLight,
  },
  addMsBtnText: { fontSize: 12, fontWeight: "700", color: C.primary },

  // FAB
  addFab: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  // Empty Card
  emptyCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 28,
    alignItems: "center",
  },
  emptyText: { fontSize: 13, color: C.textMuted, textAlign: "center" },

  // Preview Box
  previewBox: { borderRadius: 10, borderWidth: 1, padding: 12, marginTop: 8 },

  // Settings
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

  // Bar Chart
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: C.bgAlt,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 4 },

  // Modal
  modalOverlay: {
    position: "absolute",
    inset: 0,
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

  // Forms
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

  // Buttons
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

  // Login
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
});

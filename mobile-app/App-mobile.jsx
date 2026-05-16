import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// ─── Design Tokens (matches frontend-admin App.jsx) ──────────────────────────
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
  sidebarActive: "#1A8F68",
};

// ─── Status helpers (matches frontend-admin) ──────────────────────────────────
function statusColor(s) {
  return (
    {
      Normal: C.primary,
      Underweight: C.warn,
      "Severely Underweight": C.danger,
      Stunted: C.purple,
      Wasted: C.info,
      Overweight: C.accent,
      Active: C.primary,
      Inactive: C.textMuted,
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
      Active: C.primaryLight,
      Inactive: "#f5f5f5",
    }[s] || "#f5f5f5"
  );
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const INITIAL_PARENTS = [
  {
    id: 1,
    name: "Ana Santos",
    email: "ana.santos@email.com",
    phone: "09171234567",
    status: "Active",
  },
  {
    id: 2,
    name: "Rosa Dela Cruz",
    email: "rosa.dc@email.com",
    phone: "09281234567",
    status: "Active",
  },
  {
    id: 3,
    name: "Carla Reyes",
    email: "carla.reyes@email.com",
    phone: "09391234567",
    status: "Active",
  },
  {
    id: 4,
    name: "Pedro Torres",
    email: "pedro.torres@email.com",
    phone: "09451234567",
    status: "Active",
  },
  {
    id: 5,
    name: "Lena Garcia",
    email: "lena.garcia@email.com",
    phone: "09561234567",
    status: "Inactive",
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
    address: "123 Rizal St.",
    parentId: 1,
    status: "Normal",
  },
  {
    id: 2,
    firstName: "Juan",
    lastName: "Dela Cruz",
    birthdate: "2022-09-20",
    sex: "Male",
    ageMonths: 20,
    barangay: "Poblacion",
    address: "45 Mabini Ave.",
    parentId: 2,
    status: "Underweight",
  },
  {
    id: 3,
    firstName: "Lucia",
    lastName: "Reyes",
    birthdate: "2021-12-01",
    sex: "Female",
    ageMonths: 29,
    barangay: "San Jose",
    address: "78 Luna St.",
    parentId: 3,
    status: "Stunted",
  },
  {
    id: 4,
    firstName: "Miguel",
    lastName: "Torres",
    birthdate: "2023-06-10",
    sex: "Male",
    ageMonths: 11,
    barangay: "Bagong Silang",
    address: "9 Bonifacio Rd.",
    parentId: 4,
    status: "Normal",
  },
  {
    id: 5,
    firstName: "Sofia",
    lastName: "Garcia",
    birthdate: "2022-01-05",
    sex: "Female",
    ageMonths: 28,
    barangay: "Sta. Cruz",
    address: "32 Aguinaldo St.",
    parentId: 5,
    status: "Severely Underweight",
  },
  {
    id: 6,
    firstName: "Carlos",
    lastName: "Lim",
    birthdate: "2023-01-22",
    sex: "Male",
    ageMonths: 16,
    barangay: "Poblacion",
    address: "55 Del Pilar St.",
    parentId: 2,
    status: "Wasted",
  },
  {
    id: 7,
    firstName: "Isabella",
    lastName: "Ramos",
    birthdate: "2022-07-30",
    sex: "Female",
    ageMonths: 22,
    barangay: "San Jose",
    address: "101 Burgos Ave.",
    parentId: 3,
    status: "Normal",
  },
  {
    id: 8,
    firstName: "Andres",
    lastName: "Cruz",
    birthdate: "2021-05-14",
    sex: "Male",
    ageMonths: 36,
    barangay: "Sta. Cruz",
    address: "22 Rizal Blvd.",
    parentId: 4,
    status: "Overweight",
  },
];

const INITIAL_MEASUREMENTS = [
  {
    id: 1,
    childId: 1,
    childName: "Maria Santos",
    measurementDate: "2024-05-10",
    sourceType: "Kiosk",
    heightCm: 85.2,
    weightKg: 11.8,
    ageMonths: 26,
    waz: 0.4,
    haz: 0.2,
    whz: 0.5,
    status: "Normal",
  },
  {
    id: 2,
    childId: 2,
    childName: "Juan Dela Cruz",
    measurementDate: "2024-05-09",
    sourceType: "Mobile",
    heightCm: 76.1,
    weightKg: 8.2,
    ageMonths: 20,
    waz: -2.1,
    haz: -1.3,
    whz: -1.8,
    status: "Underweight",
  },
  {
    id: 3,
    childId: 3,
    childName: "Lucia Reyes",
    measurementDate: "2024-05-08",
    sourceType: "Manual",
    heightCm: 78.3,
    weightKg: 10.2,
    ageMonths: 29,
    waz: -1.2,
    haz: -2.4,
    whz: -0.6,
    status: "Stunted",
  },
  {
    id: 4,
    childId: 5,
    childName: "Sofia Garcia",
    measurementDate: "2024-05-07",
    sourceType: "Manual",
    heightCm: 80.0,
    weightKg: 7.9,
    ageMonths: 28,
    waz: -3.2,
    haz: -1.5,
    whz: -3.1,
    status: "Severely Underweight",
  },
  {
    id: 5,
    childId: 6,
    childName: "Carlos Lim",
    measurementDate: "2024-05-06",
    sourceType: "Kiosk",
    heightCm: 72.5,
    weightKg: 7.1,
    ageMonths: 16,
    waz: -1.8,
    haz: -1.0,
    whz: -2.2,
    status: "Wasted",
  },
];

const INITIAL_NUTRITIONISTS = [
  {
    id: 1,
    name: "Dr. Maria Santos",
    email: "maria.santos@health.gov",
    phone: "09171234560",
    role: "Registered Dietitian",
    barangay: "Bagong Silang",
    license: "RDN-2020-001",
    status: "Active",
  },
  {
    id: 2,
    name: "Nurse Cynthia Reyes",
    email: "cynthia.reyes@health.gov",
    phone: "09281234561",
    role: "Nurse",
    barangay: "Poblacion",
    license: "PN-2019-045",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Jose Garcia",
    email: "jose.garcia@health.gov",
    phone: "09391234562",
    role: "Physician",
    barangay: "San Jose",
    license: "MD-2018-023",
    status: "Active",
  },
];

const NUTRITION_TIPS = [
  "Serve iron-rich meals twice a week to support healthy development.",
  "Track height and weight every month so trends are easy to spot.",
  "Encourage water intake before snacks to reduce empty calories.",
  "Bring the child to the next weigh-in even when they feel healthy.",
  "Include vitamin A-rich foods like camote and malunggay in daily meals.",
];

// ─── WHO Z-Score helper ────────────────────────────────────────────────────────
function computeWHO({ weightKg, heightCm, ageMonths }) {
  const wazMedian = 9.5 + ageMonths * 0.15;
  const hazMedian = 65 + ageMonths * 0.9;
  const whzMedian = 10.5 + (heightCm - 65) * 0.09;
  const waz = +((weightKg - wazMedian) / 1.2).toFixed(2);
  const haz = +((heightCm - hazMedian) / 3.2).toFixed(2);
  const whz = +((weightKg - whzMedian) / 1.1).toFixed(2);
  let status = "Normal";
  if (waz < -3 || whz < -3) status = "Severely Underweight";
  else if (waz < -2) status = "Underweight";
  else if (haz < -2) status = "Stunted";
  else if (whz < -2) status = "Wasted";
  else if (whz > 2) status = "Overweight";
  return { waz, haz, whz, status };
}

function getChildName(c) {
  return `${c.firstName} ${c.lastName}`;
}
function getParentName(parents, id) {
  return parents.find((p) => p.id === id)?.name ?? "—";
}
function formatDate(v) {
  if (!v) return "—";
  return new Date(v).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── Navigation tabs ───────────────────────────────────────────────────────────
const NUTRITIONIST_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "children", label: "Children" },
  { id: "measurements", label: "Records" },
  { id: "staff", label: "Staff" },
  { id: "reports", label: "Reports" },
];

// ─── Shared UI Components (mirroring frontend-admin design language) ───────────

function StatusBadge({ status }) {
  return (
    <View style={[ss.badge, { backgroundColor: statusBg(status) }]}>
      <View style={[ss.badgeDot, { backgroundColor: statusColor(status) }]} />
      <Text style={[ss.badgeText, { color: statusColor(status) }]}>
        {status}
      </Text>
    </View>
  );
}

function Card({ children, style }) {
  return <View style={[ss.card, style]}>{children}</View>;
}

function SectionTitle({ title, subtitle }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={ss.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={ss.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function StatCard({ label, value, hint, color, highlighted }) {
  const bg = highlighted ? C.primaryMid : color ? `${color}18` : C.primaryLight;
  const fg = highlighted ? "#fff" : color || C.primary;
  const labelColor = highlighted ? "rgba(255,255,255,0.8)" : C.textMuted;
  const hintColor = highlighted ? "rgba(255,255,255,0.6)" : C.textMuted;
  return (
    <View
      style={[
        ss.statCard,
        {
          backgroundColor: bg,
          borderColor: highlighted ? C.primaryMid : `${color || C.primary}20`,
        },
      ]}
    >
      <Text style={[ss.statValue, { color: fg }]}>{value}</Text>
      <Text style={[ss.statLabel, { color: labelColor }]}>{label}</Text>
      {hint ? (
        <Text style={[ss.statHint, { color: hintColor }]}>{hint}</Text>
      ) : null}
    </View>
  );
}

function Field({ label, required, children }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={ss.fieldLabel}>
        {label}
        {required ? <Text style={{ color: C.danger }}> *</Text> : null}
      </Text>
      {children}
    </View>
  );
}

function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  secureTextEntry,
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={C.textLight}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={ss.input}
    />
  );
}

function ChoiceGroup({ value, options, onChange }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const sel = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            style={[
              ss.choiceBtn,
              sel && { backgroundColor: C.primary, borderColor: C.primary },
            ]}
          >
            <Text style={[ss.choiceBtnText, sel && { color: "#fff" }]}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function AvatarCircle({
  name,
  size = 36,
  color = C.primary,
  bg = C.primaryLight,
}) {
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
      <Text style={{ fontSize: size * 0.35, fontWeight: "700", color }}>
        {initials(name)}
      </Text>
    </View>
  );
}

function PrimaryButton({ label, onPress, loading, style }) {
  return (
    <Pressable onPress={onPress} style={[ss.primaryBtn, style]}>
      <Text style={ss.primaryBtnText}>{loading ? "Please wait…" : label}</Text>
    </Pressable>
  );
}

function SecondaryButton({ label, onPress, danger }) {
  return (
    <Pressable
      onPress={onPress}
      style={[ss.secondaryBtn, danger && { borderColor: C.danger }]}
    >
      <Text style={[ss.secondaryBtnText, danger && { color: C.danger }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ListRow({ title, meta, right, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={[ss.listRow, style]}>
      <View style={{ flex: 1 }}>
        <Text style={ss.listRowTitle}>{title}</Text>
        {meta ? <Text style={ss.listRowMeta}>{meta}</Text> : null}
      </View>
      {right}
    </Pressable>
  );
}

// ─── Bottom Tab Bar (mirrors sidebar nav of admin) ─────────────────────────────
function TabBar({ tabs, active, onChange }) {
  return (
    <View style={ss.tabBar}>
      {tabs.map((t) => {
        const sel = t.id === active;
        return (
          <Pressable
            key={t.id}
            onPress={() => onChange(t.id)}
            style={ss.tabItem}
          >
            {sel && <View style={ss.tabIndicator} />}
            <Text
              style={[
                ss.tabLabel,
                sel && { color: C.primaryMid, fontWeight: "700" },
              ]}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── App Header (mirrors admin topbar) ────────────────────────────────────────
function AppHeader({ title, subtitle, user, onLogout }) {
  return (
    <View style={ss.appHeader}>
      <View style={ss.appHeaderLeft}>
        <View style={ss.appHeaderBrand}>
          <Text style={{ fontSize: 16, color: C.primaryMid }}>♥</Text>
        </View>
        <View>
          <Text style={ss.appHeaderTitle}>{title}</Text>
          {subtitle ? <Text style={ss.appHeaderSub}>{subtitle}</Text> : null}
        </View>
      </View>
      {user && (
        <Pressable onPress={onLogout} style={ss.headerAvatarBtn}>
          <View style={ss.headerAvatar}>
            <Text style={ss.headerAvatarText}>{initials(user.name)}</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

// ─── Login Screen (single form, no role toggle) ───────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("maria.santos@health.gov");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onLogin({ name: "Dr. Maria Santos", email });
      setLoading(false);
    }, 900);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.sidebar }}>
      <StatusBar barStyle="light-content" backgroundColor={C.sidebar} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={ss.loginScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={ss.loginBrand}>
            <View style={ss.loginBrandMark}>
              <Text style={{ fontSize: 28, color: C.primaryMid }}>♥</Text>
            </View>
            <View>
              <Text style={ss.loginBrandTitle}>SukatKalusugan</Text>
              <Text style={ss.loginBrandSub}>HEALTH MONITORING SYSTEM</Text>
            </View>
          </View>

          {/* White card */}
          <View style={ss.loginCard}>
            <Text style={ss.loginHeading}>Welcome back</Text>
            <Text style={ss.loginCaption}>
              Sign in to your account to continue
            </Text>

            <Field label="EMAIL ADDRESS">
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="email@example.com"
                keyboardType="email-address"
              />
            </Field>
            <Field label="PASSWORD">
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
              />
            </Field>

            <PrimaryButton
              label="Sign In →"
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
                  marginBottom: 3,
                }}
              >
                Demo Credentials
              </Text>
              <Text
                style={{ fontSize: 11, color: C.textLight, lineHeight: 17 }}
              >
                Email: maria.santos@health.gov{"\n"}Password: admin123
              </Text>
            </View>
          </View>

          {/* Feature tags */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            {["WHO Standards", "eOPT+ Ready", "IoT Kiosk", "Mobile App"].map(
              (t) => (
                <View key={t} style={ss.featureTag}>
                  <Text style={ss.featureTagText}>{t}</Text>
                </View>
              ),
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function DashboardScreen({ children, measurements, parents, nutritionists }) {
  const normalCount = children.filter((c) => c.status === "Normal").length;
  const atRisk = children.filter((c) => c.status !== "Normal").length;

  return (
    <ScrollView contentContainerStyle={ss.screen}>
      {/* Greeting */}
      <View style={{ marginBottom: 16 }}>
        <Text style={ss.greeting}>Good morning, Admin!</Text>
        <Text style={ss.greetingSub}>
          Here's a summary of child health monitoring
        </Text>
      </View>

      {/* Stat cards row — matches admin dashboard cards */}
      <View style={ss.statsRow}>
        <StatCard label="Children" value={children.length} hint="registered" />
        <StatCard
          label="At Risk"
          value={atRisk}
          hint="need attention"
          color={C.danger}
          highlighted={false}
        />
        <StatCard
          label="Healthy"
          value={normalCount}
          hint="normal"
          color={C.primary}
          highlighted={true}
        />
      </View>

      {/* Second row */}
      <View style={[ss.statsRow, { marginTop: 10 }]}>
        <StatCard
          label="Measurements"
          value={measurements.length}
          hint="records"
          color={C.warn}
        />
        <StatCard
          label="Parents"
          value={parents.length}
          hint="registered"
          color={C.info}
        />
        <StatCard
          label="Staff"
          value={nutritionists.length}
          hint="active"
          color={C.purple}
        />
      </View>

      {/* Attention queue */}
      <Card style={{ marginTop: 4 }}>
        <SectionTitle
          title="Attention Queue"
          subtitle="Children needing follow-up"
        />
        {children
          .filter((c) => c.status !== "Normal")
          .slice(0, 5)
          .map((c, i, arr) => (
            <View
              key={c.id}
              style={[
                ss.listRow,
                i < arr.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: C.border,
                },
              ]}
            >
              <AvatarCircle
                name={getChildName(c)}
                size={34}
                color={c.sex === "Female" ? "#E91E8C" : C.info}
                bg={c.sex === "Female" ? "#FCE4EC" : C.infoLight}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={ss.listRowTitle}>{getChildName(c)}</Text>
                <Text style={ss.listRowMeta}>
                  {c.barangay} · {c.ageMonths} months
                </Text>
              </View>
              <StatusBadge status={c.status} />
            </View>
          ))}
        {atRisk === 0 && (
          <Text style={ss.emptyText}>No children need immediate attention</Text>
        )}
      </Card>

      {/* Recent measurements */}
      <Card>
        <SectionTitle
          title="Recent Measurements"
          subtitle="Latest saved entries"
        />
        {measurements.slice(0, 4).map((m, i, arr) => (
          <View
            key={m.id}
            style={[
              ss.listRow,
              i < arr.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: C.border,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={ss.listRowTitle}>{m.childName}</Text>
              <Text style={ss.listRowMeta}>
                {formatDate(m.measurementDate)} · {m.sourceType}
              </Text>
            </View>
            <StatusBadge status={m.status} />
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

// ─── Children Screen ──────────────────────────────────────────────────────────
function ChildrenScreen({ children, parents, onSaveChild, onDeleteChild }) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    sex: "Female",
    ageMonths: "",
    barangay: "",
    address: "",
    parentId: parents[0]?.id ?? null,
  });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const filtered = children.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.barangay}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({
      firstName: "",
      lastName: "",
      birthdate: "",
      sex: "Female",
      ageMonths: "",
      barangay: "",
      address: "",
      parentId: parents[0]?.id ?? null,
    });
  };

  const handleSubmit = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.birthdate ||
      !form.parentId
    ) {
      Alert.alert("Missing data", "Please complete required fields.");
      return;
    }
    onSaveChild(editingId, {
      ...form,
      ageMonths: Number(form.ageMonths || 0),
      parentId: Number(form.parentId),
    });
    resetForm();
  };

  const editChild = (c) => {
    setEditingId(c.id);
    setForm({
      firstName: c.firstName,
      lastName: c.lastName,
      birthdate: c.birthdate,
      sex: c.sex,
      ageMonths: String(c.ageMonths ?? ""),
      barangay: c.barangay,
      address: c.address,
      parentId: c.parentId,
    });
    setShowForm(true);
  };

  return (
    <ScrollView contentContainerStyle={ss.screen}>
      <View style={ss.pageHeader}>
        <View>
          <Text style={ss.pageTitle}>Child Profiles</Text>
          <Text style={ss.pageSubtitle}>
            {children.length} registered children
          </Text>
        </View>
        <Pressable onPress={() => setShowForm(!showForm)} style={ss.addBtn}>
          <Text style={ss.addBtnText}>+ Add Child</Text>
        </Pressable>
      </View>

      <View style={ss.searchBar}>
        <Text style={{ color: C.textMuted, fontSize: 14, marginRight: 8 }}>
          ⌕
        </Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or barangay..."
          placeholderTextColor={C.textLight}
          style={{ flex: 1, fontSize: 13, color: C.text }}
        />
      </View>

      {showForm && (
        <Card>
          <Text style={ss.cardTitle}>
            {editingId ? "Edit Child Profile" : "Add New Child"}
          </Text>
          <View style={ss.twoCol}>
            <View style={{ flex: 1 }}>
              <Field label="FIRST NAME" required>
                <Input
                  value={form.firstName}
                  onChangeText={(v) => set("firstName", v)}
                  placeholder="Maria"
                />
              </Field>
            </View>
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <Field label="LAST NAME" required>
                <Input
                  value={form.lastName}
                  onChangeText={(v) => set("lastName", v)}
                  placeholder="Santos"
                />
              </Field>
            </View>
          </View>
          <View style={ss.twoCol}>
            <View style={{ flex: 1 }}>
              <Field label="BIRTHDATE" required>
                <Input
                  value={form.birthdate}
                  onChangeText={(v) => set("birthdate", v)}
                  placeholder="2022-03-15"
                />
              </Field>
            </View>
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <Field label="AGE (MONTHS)">
                <Input
                  value={String(form.ageMonths)}
                  onChangeText={(v) => set("ageMonths", v)}
                  placeholder="26"
                  keyboardType="numeric"
                />
              </Field>
            </View>
          </View>
          <Field label="SEX">
            <ChoiceGroup
              value={form.sex}
              onChange={(v) => set("sex", v)}
              options={[
                { label: "Female", value: "Female" },
                { label: "Male", value: "Male" },
              ]}
            />
          </Field>
          <Field label="BARANGAY">
            <Input
              value={form.barangay}
              onChangeText={(v) => set("barangay", v)}
              placeholder="Bagong Silang"
            />
          </Field>
          <Field label="ADDRESS">
            <Input
              value={form.address}
              onChangeText={(v) => set("address", v)}
              placeholder="House no. and street"
            />
          </Field>
          <Field label="PARENT/GUARDIAN" required>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {parents.map((p) => {
                  const sel = p.id === form.parentId;
                  return (
                    <Pressable
                      key={p.id}
                      onPress={() => set("parentId", p.id)}
                      style={[
                        ss.choiceBtn,
                        sel && {
                          backgroundColor: C.primary,
                          borderColor: C.primary,
                        },
                      ]}
                    >
                      <Text
                        style={[ss.choiceBtnText, sel && { color: "#fff" }]}
                      >
                        {p.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </Field>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
            <PrimaryButton
              label={editingId ? "Update" : "Save Child"}
              onPress={handleSubmit}
              style={{ flex: 1 }}
            />
            <SecondaryButton label="Cancel" onPress={resetForm} />
          </View>
        </Card>
      )}

      {/* Child list — matches admin Children table style */}
      <Card>
        <SectionTitle
          title="Child Records"
          subtitle={`${filtered.length} children`}
        />
        {filtered.map((c, i) => (
          <View
            key={c.id}
            style={[
              ss.childRow,
              i < filtered.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: C.border,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <AvatarCircle
                name={getChildName(c)}
                size={36}
                color={c.sex === "Female" ? "#E91E8C" : C.info}
                bg={c.sex === "Female" ? "#FCE4EC" : C.infoLight}
              />
              <View style={{ flex: 1 }}>
                <Text style={ss.listRowTitle}>{getChildName(c)}</Text>
                <Text style={ss.listRowMeta}>
                  {getParentName(parents, c.parentId)} · {c.barangay}
                </Text>
              </View>
              <StatusBadge status={c.status} />
            </View>
            <View style={{ flexDirection: "row", gap: 6, marginBottom: 8 }}>
              <Text style={ss.metaChip}>{c.sex}</Text>
              <Text style={ss.metaChip}>{c.ageMonths} mo</Text>
              <Text style={ss.metaChip}>{formatDate(c.birthdate)}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                onPress={() => editChild(c)}
                style={[ss.iconBtn, { backgroundColor: C.infoLight }]}
              >
                <Text
                  style={{ color: C.info, fontSize: 12, fontWeight: "700" }}
                >
                  ✎ Edit
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onDeleteChild(c)}
                style={[ss.iconBtn, { backgroundColor: C.dangerLight }]}
              >
                <Text
                  style={{ color: C.danger, fontSize: 12, fontWeight: "700" }}
                >
                  ⌫ Delete
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
        {filtered.length === 0 && (
          <Text style={ss.emptyText}>No children found</Text>
        )}
      </Card>
    </ScrollView>
  );
}

// ─── Measurements Screen ──────────────────────────────────────────────────────
function MeasurementsScreen({
  children,
  measurements,
  onSaveMeasurement,
  onDeleteMeasurement,
}) {
  const [childId, setChildId] = useState(children[0]?.id ?? null);
  const [sourceType, setSourceType] = useState("Manual");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [measurementDate, setMeasurementDate] = useState(
    new Date().toISOString().slice(0, 10),
  );

  const preview = useMemo(() => {
    const child = children.find((c) => c.id === childId);
    if (!child || !heightCm || !weightKg) return null;
    return computeWHO({
      weightKg: +weightKg,
      heightCm: +heightCm,
      ageMonths: child.ageMonths,
    });
  }, [childId, heightCm, weightKg, children]);

  const submit = () => {
    const child = children.find((c) => c.id === childId);
    if (!child || !heightCm || !weightKg || !measurementDate) {
      Alert.alert(
        "Missing data",
        "Choose a child and enter all required fields.",
      );
      return;
    }
    const computed = computeWHO({
      weightKg: +weightKg,
      heightCm: +heightCm,
      ageMonths: child.ageMonths,
    });
    onSaveMeasurement({
      childId: child.id,
      childName: getChildName(child),
      measurementDate,
      sourceType,
      heightCm: +heightCm,
      weightKg: +weightKg,
      ageMonths: child.ageMonths,
      ...computed,
      status: computed.status,
    });
    setHeightCm("");
    setWeightKg("");
  };

  return (
    <ScrollView contentContainerStyle={ss.screen}>
      <View style={ss.pageHeader}>
        <View>
          <Text style={ss.pageTitle}>Measurements</Text>
          <Text style={ss.pageSubtitle}>Record anthropometric entries</Text>
        </View>
      </View>

      <Card>
        <Text style={ss.cardTitle}>Add Measurement Record</Text>
        <Field label="CHILD" required>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {children.map((c) => {
                const sel = c.id === childId;
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => setChildId(c.id)}
                    style={[
                      ss.choiceBtn,
                      sel && {
                        backgroundColor: C.primary,
                        borderColor: C.primary,
                      },
                    ]}
                  >
                    <Text style={[ss.choiceBtnText, sel && { color: "#fff" }]}>
                      {getChildName(c)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </Field>
        <Field label="SOURCE">
          <ChoiceGroup
            value={sourceType}
            onChange={setSourceType}
            options={["Kiosk", "Mobile", "Manual"].map((v) => ({
              label: v,
              value: v,
            }))}
          />
        </Field>
        <View style={ss.twoCol}>
          <View style={{ flex: 1 }}>
            <Field label="HEIGHT (CM)" required>
              <Input
                value={heightCm}
                onChangeText={setHeightCm}
                placeholder="85.2"
                keyboardType="numeric"
              />
            </Field>
          </View>
          <View style={{ width: 10 }} />
          <View style={{ flex: 1 }}>
            <Field label="WEIGHT (KG)" required>
              <Input
                value={weightKg}
                onChangeText={setWeightKg}
                placeholder="11.8"
                keyboardType="numeric"
              />
            </Field>
          </View>
        </View>
        <Field label="DATE">
          <Input
            value={measurementDate}
            onChangeText={setMeasurementDate}
            placeholder="2024-05-10"
          />
        </Field>

        {/* Live Z-score preview — mirrors admin measurement modal preview */}
        {preview && (
          <View
            style={[
              ss.previewBox,
              {
                backgroundColor: statusBg(preview.status),
                borderColor: `${statusColor(preview.status)}30`,
              },
            ]}
          >
            <StatusBadge status={preview.status} />
            <Text style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>
              WAZ {preview.waz > 0 ? "+" : ""}
              {preview.waz} · HAZ {preview.haz > 0 ? "+" : ""}
              {preview.haz} · WHZ {preview.whz > 0 ? "+" : ""}
              {preview.whz}
            </Text>
          </View>
        )}
        <PrimaryButton
          label="Save Measurement"
          onPress={submit}
          style={{ marginTop: 8 }}
        />
      </Card>

      <Card>
        <SectionTitle
          title="Recent Entries"
          subtitle={`${measurements.length} records`}
        />
        {measurements.map((m, i) => (
          <View
            key={m.id}
            style={[
              ss.childRow,
              i < measurements.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: C.border,
              },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text style={ss.listRowTitle}>{m.childName}</Text>
                <Text style={ss.listRowMeta}>
                  {formatDate(m.measurementDate)} · {m.sourceType}
                </Text>
              </View>
              <StatusBadge status={m.status} />
            </View>
            <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
              <Text style={ss.metaChip}>{m.heightCm} cm</Text>
              <Text style={ss.metaChip}>{m.weightKg} kg</Text>
              <Text
                style={[
                  ss.metaChip,
                  { color: m.waz < -2 ? C.danger : C.primary },
                ]}
              >
                WAZ {m.waz > 0 ? "+" : ""}
                {m.waz}
              </Text>
            </View>
            <Pressable
              onPress={() => onDeleteMeasurement(m)}
              style={[
                ss.iconBtn,
                {
                  backgroundColor: C.dangerLight,
                  marginTop: 8,
                  alignSelf: "flex-start",
                },
              ]}
            >
              <Text
                style={{ color: C.danger, fontSize: 12, fontWeight: "700" }}
              >
                ⌫ Delete
              </Text>
            </Pressable>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

// ─── Staff Screen (mirrors admin Parents + Nutritionists pages) ───────────────
function StaffScreen({ parents, children, nutritionists }) {
  return (
    <ScrollView contentContainerStyle={ss.screen}>
      <View style={ss.pageHeader}>
        <View>
          <Text style={ss.pageTitle}>Staff Directory</Text>
          <Text style={ss.pageSubtitle}>Health workers & parents</Text>
        </View>
      </View>

      <Card>
        <Text style={ss.cardTitle}>Nutritionists & Medical Staff</Text>
        {nutritionists.map((n, i) => (
          <View
            key={n.id}
            style={[
              ss.childRow,
              i < nutritionists.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: C.border,
              },
            ]}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <AvatarCircle name={n.name} size={36} color="#fff" bg={C.info} />
              <View style={{ flex: 1 }}>
                <Text style={ss.listRowTitle}>{n.name}</Text>
                <Text style={ss.listRowMeta}>
                  {n.role} · {n.barangay}
                </Text>
                <Text
                  style={[
                    ss.listRowMeta,
                    { fontFamily: "monospace", fontSize: 10 },
                  ]}
                >
                  {n.license}
                </Text>
              </View>
              <StatusBadge status={n.status} />
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <Text style={ss.cardTitle}>Parents / Guardians</Text>
        {parents.map((p, i) => {
          const linked = children.filter((c) => c.parentId === p.id);
          return (
            <View
              key={p.id}
              style={[
                ss.childRow,
                i < parents.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: C.border,
                },
              ]}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <AvatarCircle name={p.name} size={36} />
                <View style={{ flex: 1 }}>
                  <Text style={ss.listRowTitle}>{p.name}</Text>
                  <Text style={ss.listRowMeta}>{p.email}</Text>
                  <Text style={ss.listRowMeta}>{linked.length} child(ren)</Text>
                </View>
                <StatusBadge status={p.status} />
              </View>
              {linked.map((c) => (
                <View
                  key={c.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 6,
                    paddingLeft: 46,
                  }}
                >
                  <Text style={{ color: C.textMuted, fontSize: 11 }}>
                    • {getChildName(c)}
                  </Text>
                  <StatusBadge status={c.status} />
                </View>
              ))}
            </View>
          );
        })}
      </Card>
    </ScrollView>
  );
}

// ─── Reports Screen ───────────────────────────────────────────────────────────
function ReportsScreen({ children, measurements }) {
  const counts = measurements.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});
  const statuses = [
    "Normal",
    "Underweight",
    "Stunted",
    "Wasted",
    "Overweight",
    "Severely Underweight",
  ];
  const maxCount = Math.max(...statuses.map((s) => counts[s] || 0), 1);
  const normalCount = children.filter((c) => c.status === "Normal").length;
  const atRisk = children.length - normalCount;

  return (
    <ScrollView contentContainerStyle={ss.screen}>
      <View style={ss.pageHeader}>
        <View>
          <Text style={ss.pageTitle}>Reports & Analytics</Text>
          <Text style={ss.pageSubtitle}>Growth & nutrition status</Text>
        </View>
      </View>

      <View style={ss.statsRow}>
        <StatCard label="Children" value={children.length} hint="Profiles" />
        <StatCard
          label="Records"
          value={measurements.length}
          hint="Measurements"
          color={C.info}
        />
        <StatCard
          label="Healthy"
          value={normalCount}
          hint="Normal"
          color={C.primary}
          highlighted={true}
        />
      </View>

      <Card style={{ marginTop: 4 }}>
        <SectionTitle
          title="At-Risk Summary"
          subtitle="Breakdown by category"
        />
        <View style={ss.statsRow}>
          <StatCard
            label="At Risk"
            value={atRisk}
            hint="children"
            color={C.danger}
          />
          <StatCard
            label="Normal"
            value={normalCount}
            hint="children"
            color={C.primary}
          />
        </View>
      </Card>

      <Card>
        <SectionTitle
          title="Status Distribution"
          subtitle="Measurement records"
        />
        {statuses.map((s) => (
          <View
            key={s}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                width: 120,
                fontSize: 11,
                color: C.text,
                fontWeight: "600",
              }}
            >
              {s}
            </Text>
            <View
              style={{
                flex: 1,
                height: 10,
                borderRadius: 5,
                backgroundColor: C.border,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${((counts[s] || 0) / maxCount) * 100}%`,
                  backgroundColor: statusColor(s),
                  borderRadius: 5,
                }}
              />
            </View>
            <Text
              style={{
                width: 20,
                textAlign: "right",
                fontSize: 11,
                color: C.textMuted,
                fontWeight: "700",
              }}
            >
              {counts[s] || 0}
            </Text>
          </View>
        ))}
      </Card>

      <Card>
        <SectionTitle
          title="Nutrition Tips"
          subtitle="Health reminders for parents"
        />
        {NUTRITION_TIPS.map((tip, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              gap: 12,
              paddingVertical: 10,
              borderBottomWidth: i < NUTRITION_TIPS.length - 1 ? 1 : 0,
              borderBottomColor: C.border,
            }}
          >
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: C.primaryLight,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: C.primary }}
              >
                {i + 1}
              </Text>
            </View>
            <Text
              style={{ flex: 1, fontSize: 13, color: C.text, lineHeight: 20 }}
            >
              {tip}
            </Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────
function SettingsScreen({ user, onLogout }) {
  return (
    <ScrollView contentContainerStyle={ss.screen}>
      <View style={ss.pageHeader}>
        <View>
          <Text style={ss.pageTitle}>Settings</Text>
          <Text style={ss.pageSubtitle}>Account & preferences</Text>
        </View>
      </View>

      <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <AvatarCircle name={user.name} size={52} />
          <View>
            <Text style={ss.sectionTitle}>{user.name}</Text>
            <Text style={ss.sectionSubtitle}>{user.email}</Text>
            <View
              style={[
                ss.badge,
                { backgroundColor: C.primaryLight, marginTop: 4 },
              ]}
            >
              <Text
                style={{ fontSize: 10, color: C.primary, fontWeight: "700" }}
              >
                Nutritionist
              </Text>
            </View>
          </View>
        </View>

        {[
          { label: "WHO Reference Year", value: "2006" },
          { label: "Barangay", value: "Bagong Silang, Caloocan City" },
          { label: "eOPT+ Sync", value: "Enabled" },
          { label: "Alert Threshold WAZ", value: "-2.0" },
        ].map((item, i, arr) => (
          <View
            key={item.label}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 12,
              borderTopWidth: i === 0 ? 1 : 0,
              borderBottomWidth: 1,
              borderColor: C.border,
            }}
          >
            <Text style={{ fontSize: 13, color: C.textMuted }}>
              {item.label}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "600", color: C.text }}>
              {item.value}
            </Text>
          </View>
        ))}

        <Pressable
          onPress={onLogout}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 14,
            marginTop: 4,
          }}
        >
          <Text style={{ color: C.danger, fontSize: 13, fontWeight: "700" }}>
            ⤷ Sign Out
          </Text>
        </Pressable>
      </Card>
    </ScrollView>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [parents] = useState(INITIAL_PARENTS);
  const [children, setChildren] = useState(INITIAL_CHILDREN);
  const [measurements, setMeasurements] = useState(INITIAL_MEASUREMENTS);
  const [nutritionists] = useState(INITIAL_NUTRITIONISTS);

  const tabs = [...NUTRITIONIST_TABS, { id: "settings", label: "Settings" }];

  const handleSaveChild = (editingId, payload) => {
    if (editingId) {
      setChildren((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...payload } : c)),
      );
    } else {
      const newId = Math.max(...children.map((c) => c.id), 0) + 1;
      setChildren((prev) => [
        ...prev,
        { id: newId, ...payload, status: "Normal" },
      ]);
    }
  };

  const handleDeleteChild = (c) => {
    Alert.alert(
      "Delete child",
      `Remove ${getChildName(c)} and all measurements?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setChildren((prev) => prev.filter((x) => x.id !== c.id));
            setMeasurements((prev) => prev.filter((x) => x.childId !== c.id));
          },
        },
      ],
    );
  };

  const handleSaveMeasurement = (m) => {
    const newId = Math.max(...measurements.map((x) => x.id), 0) + 1;
    setMeasurements((prev) => [{ ...m, id: newId }, ...prev]);
    setChildren((prev) =>
      prev.map((c) => (c.id === m.childId ? { ...c, status: m.status } : c)),
    );
  };

  const handleDeleteMeasurement = (m) => {
    Alert.alert("Delete measurement", `Delete record for ${m.childName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setMeasurements((prev) => prev.filter((x) => x.id !== m.id)),
      },
    ]);
  };

  if (!user) return <LoginScreen onLogin={setUser} />;

  const renderScreen = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardScreen
            children={children}
            measurements={measurements}
            parents={parents}
            nutritionists={nutritionists}
          />
        );
      case "children":
        return (
          <ChildrenScreen
            children={children}
            parents={parents}
            onSaveChild={handleSaveChild}
            onDeleteChild={handleDeleteChild}
          />
        );
      case "measurements":
        return (
          <MeasurementsScreen
            children={children}
            measurements={measurements}
            onSaveMeasurement={handleSaveMeasurement}
            onDeleteMeasurement={handleDeleteMeasurement}
          />
        );
      case "staff":
        return (
          <StaffScreen
            parents={parents}
            children={children}
            nutritionists={nutritionists}
          />
        );
      case "reports":
        return (
          <ReportsScreen children={children} measurements={measurements} />
        );
      case "settings":
        return <SettingsScreen user={user} onLogout={() => setUser(null)} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={C.sidebar} />
      <AppHeader
        title="SukatKalusugan"
        subtitle="Health Monitoring"
        user={user}
        onLogout={() => setUser(null)}
      />
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}

// ─── Styles (mirrors frontend-admin design system) ────────────────────────────
const ss = StyleSheet.create({
  // App header — mirrors admin top navbar dark green
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: C.sidebar,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  appHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  appHeaderBrand: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(26,143,104,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  appHeaderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.2,
  },
  appHeaderSub: { fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 1 },
  headerAvatarBtn: { padding: 2 },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.primaryMid,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarText: { fontSize: 12, fontWeight: "700", color: "#fff" },

  // Screens
  screen: { padding: 14, paddingBottom: 28, gap: 14 },

  // Page header
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  pageTitle: { fontSize: 20, fontWeight: "800", color: C.text },
  pageSubtitle: { fontSize: 13, color: C.textMuted, marginTop: 3 },
  addBtn: {
    backgroundColor: C.primary,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  addBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  // Greeting
  greeting: { fontSize: 20, fontWeight: "700", color: C.text },
  greetingSub: { fontSize: 13, color: C.textMuted, marginTop: 3 },

  // Search bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 4,
  },

  // Cards
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: C.text,
    marginBottom: 12,
  },

  // Section titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: C.text,
    marginBottom: 2,
  },
  sectionSubtitle: { fontSize: 12, color: C.textMuted, lineHeight: 17 },

  // Stat cards — mirrors admin dashboard stat cards
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: { flex: 1, borderRadius: 12, borderWidth: 1, padding: 12 },
  statValue: { fontSize: 22, fontWeight: "800", marginBottom: 2 },
  statLabel: { fontSize: 11, fontWeight: "700", color: C.text },
  statHint: { fontSize: 10, color: C.textMuted, marginTop: 2 },

  // Badges — mirrors admin StatusBadge
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  badgeDot: { width: 5, height: 5, borderRadius: 3 },
  badgeText: { fontSize: 10, fontWeight: "700" },

  // List rows
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  listRowTitle: { fontSize: 13, fontWeight: "600", color: C.text },
  listRowMeta: { fontSize: 11, color: C.textMuted, marginTop: 2 },

  // Child rows
  childRow: { paddingVertical: 12 },

  // Meta chips
  metaChip: {
    fontSize: 11,
    color: C.textMuted,
    backgroundColor: C.bg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  // Form
  fieldLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: C.textMuted,
    letterSpacing: 0.5,
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
  twoCol: { flexDirection: "row" },
  choiceBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: C.card,
  },
  choiceBtnText: { fontSize: 12, fontWeight: "600", color: C.text },

  // Buttons
  primaryBtn: {
    backgroundColor: C.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  secondaryBtnText: { fontSize: 13, fontWeight: "700", color: C.text },
  iconBtn: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  // Preview box
  previewBox: { borderRadius: 10, borderWidth: 1, padding: 12, marginTop: 8 },

  // Empty state
  emptyText: {
    fontSize: 12,
    color: C.textMuted,
    paddingVertical: 8,
    textAlign: "center",
  },

  // Bottom Tab Bar — mirrors admin sidebar nav items
  tabBar: {
    flexDirection: "row",
    backgroundColor: C.sidebar,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.07)",
    paddingBottom: Platform.OS === "ios" ? 20 : 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 6,
    position: "relative",
  },
  tabLabel: { fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: "500" },
  tabIndicator: {
    position: "absolute",
    top: 0,
    left: "20%",
    right: "20%",
    height: 2,
    backgroundColor: C.primaryMid,
    borderRadius: 1,
  },

  // Login screen
  loginScroll: { flexGrow: 1, padding: 20, paddingTop: 48, paddingBottom: 32 },
  loginBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  loginBrandMark: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBrandTitle: { fontSize: 20, fontWeight: "900", color: "#fff" },
  loginBrandSub: {
    fontSize: 9,
    color: "rgba(255,255,255,0.45)",
    marginTop: 2,
    letterSpacing: 1.5,
  },
  loginCard: { backgroundColor: "#fff", borderRadius: 20, padding: 24 },
  loginHeading: {
    fontSize: 22,
    fontWeight: "800",
    color: C.text,
    marginBottom: 4,
  },
  loginCaption: { fontSize: 13, color: C.textMuted, marginBottom: 22 },
  loginDemo: {
    marginTop: 16,
    backgroundColor: C.bg,
    borderRadius: 10,
    padding: 12,
  },
  featureTag: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  featureTagText: { fontSize: 11, color: "rgba(255,255,255,0.65)" },
});
